
import base64
import datetime
import imp
import json
import shutil
from threading import Thread
from tkinter.tix import Tree
import chevron
import django
from main.models import Simulation
from main.serializers import SimulationSerializer
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
import os
from distutils.dir_util import copy_tree
import subprocess
from PIL import Image

from django.template import Template

# Create your views here.


class SimulationViewSet(viewsets.ModelViewSet):
    model = Simulation
    serializer_class = SimulationSerializer
    queryset = Simulation.objects.order_by("-id").all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(request.data)

        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        headers = self.get_success_headers(serializer.data)
        print(os.getcwd())
        copy_tree("./main/bmsim-codes", "./main/simulations/"+str(data.id))
        fin = open("./main/bmsim-codes/initializer.py", "rt")
        fout = open("./main/simulations/"+str(data.id)+"/initializer.py", "wt")
        outstr = fin.read()
        
        PAIn = open("./main/bmsim-codes/performance_analyzer.py", "rt")
        PAoutStr = PAIn.read()
        PAout = open("./main/simulations/"+str(data.id)+"/performance_analyzer.py", "wt")

    

        if(len(request.data["nodes"]) > 0):
            request.data["hasNode"] = True
            nodesX="["
            nodesY="["
            for i in request.data["nodes"]:
                print("here",i)
                nodesX+=str(i["x"])+","
                nodesY+=str(i["y"])+","
            nodesX = nodesX[:-1]
            nodesY = nodesY[:-1]
            nodesX+="]"
            nodesY+="]"
            request.data["nodesX"] = nodesX
            request.data["nodesY"] = nodesY
        else:
            request.data["hasNode"] = False
        print(request.data)
        if request.data['center_node_number'] == 0:
            request.data['hasCenterNode'] = False
        else:
            request.data['hasCenterNode'] = True


        
        outstr = chevron.render(outstr, request.data)
        PAoutStr = chevron.render(PAoutStr,request.data)

        fout.write(outstr)
        fout.close()
        fin.close()
        PAout.write(PAoutStr)
        PAout.close()
        t = Thread(target=run_sim,args=[data.id],daemon=True)
        t.start()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PreviewViewSet(viewsets.ModelViewSet):
    
    serializer_class = SimulationSerializer
    queryset = Simulation.objects.order_by("-id").all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        filename=datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
        print(filename)
        serializer.is_valid(raise_exception=True)
        data = serializer.data
        headers = self.get_success_headers(serializer.data)
        print(os.getcwd())
        fin = open("./main/bmsim-codes/initializer.py", "rt")
        fout = open("./main/preview/"+filename+".py", "wt")
        outstr = fin.read()
    

        if(len(request.data["nodes"]) > 0):
            request.data["hasNode"] = True
            nodesX="["
            nodesY="["
            for i in request.data["nodes"]:
                print("here",i)
                nodesX+=str(i["x"])+","
                nodesY+=str(i["y"])+","
            nodesX = nodesX[:-1]
            nodesY = nodesY[:-1]
            nodesX+="]"
            nodesY+="]"
            request.data["nodesX"] = nodesX
            request.data["nodesY"] = nodesY
        else:
            request.data["hasNode"] = False
        print(request.data)
        
        outstr = chevron.render(outstr, request.data)

        fout.write(outstr)
        fout.close()
        fin.close()
        
        initout = subprocess.run(["py",filename+".py"],stdout=subprocess.PIPE,cwd="./main/preview/")
        
        with open("./main/preview/topology.png", "rb") as f:
            file= f.read()
            request.data["preview-image"]=base64.b64encode(file)
        os.remove("./main/preview/topology.png")
        os.remove("./main/preview/"+filename+".py")
        nx=[]
        ny= []
        with open("./main/preview/nodes.txt") as f:
            file = f.read()
            obj=json.loads(file)
            nx=obj['x']
            ny=obj['y']
        os.remove("./main/preview/nodes.txt")

        nodes=[]
        for i in range(len(nx)):
            nodes.append({'x':nx[i],'y':ny[i]})


        request.data['nodes'] = nodes
        print("data",request.data)
        return Response(request.data, status=status.HTTP_201_CREATED, headers=headers)


def run_sim(id):
    print("here")
    #os.system("cd ./main/simulations/"+str(id)+" && py event_driven.py")
    #os.system("cd ./main/simulations/"+str(id) +" && py performance_analyzer.py")
    main_out = subprocess.run(["py","event_driven.py"],stdout=subprocess.PIPE,cwd="./main/simulations/"+str(id))

    performance_out = subprocess.run(["py", "performance_analyzer.py"],stdout=subprocess.PIPE,cwd="./main/simulations/"+str(id))
    print(main_out.stdout.decode("utf-8"))
    os.system("dir")
    
    os.system("cd ./main/simulations/"+str(id)+" &&  tar -a -c -f "+str(id)+".zip *.log *.png *.pdf")
    os.system("move  .\main\simulations\\"+str(id)+"\*.zip .\static")
    os.system("move .\main\simulations\\"+str(id)+"\\topology.png .\static\\"+str(id)+".png")

    #os.system("cp *.zip *.png ../")
    Simulation.objects.filter(id=id).update(done=1,run_log=performance_out.stdout.decode("utf-8"))
    print("done",id)




def index(request):
    return render(request, "index.html")

    
def manifest(request):
    return render(request, "manifest.json")
