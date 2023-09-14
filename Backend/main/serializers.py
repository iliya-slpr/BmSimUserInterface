
from django.db import models

from .models import Simulation,Node
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer

class NodeSerializer(serializers.ModelSerializer):
    x = models.IntegerField()
    y = models.IntegerField()
    class Meta:
        model = Node
        fields = ["id","x","y"]


class SimulationSerializer(WritableNestedModelSerializer,serializers.ModelSerializer):
    name = models.TextField()
    nodes_number = models.IntegerField()
    environment = models.IntegerField()
    node_range = models.FloatField()
    execution_time = models.IntegerField()
    total_log = models.IntegerField()
    mobility_flag = models.IntegerField()
    update_flag = models.IntegerField()
    buffer_size = models.IntegerField()
    update_mobility_interval = models.IntegerField()
    receive_delay = models.IntegerField()
    sleep_time = models.IntegerField()
    receive_window = models.IntegerField()
    lowpower_poll_interval = models.IntegerField()

    random_nodes = models.IntegerField()
    center_node_number = models.IntegerField()
    heartbeat_period = models.IntegerField()
    scan_interval = models.IntegerField()
    scan_window = models.IntegerField()
    relay_retransmit_count = models.IntegerField()
    network_transmit_count = models.IntegerField()
    rris = models.IntegerField()
    ntis = models.IntegerField()
    advertise_interval = models.IntegerField()
    generation_interval = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = serializers.SerializerMethodField()
    file = serializers.SerializerMethodField()
    run_log = models.TextField()

    nodes = NodeSerializer(many=True)
    preview = models.TextField()

    def get_image(self,instance):
     
        if( hasattr(instance, "id")):
            return "static/"+str(instance.id)+".png"
        return ""
    def get_file(self,instance):
        if(hasattr(instance, "id")):
            return "static/"+str(instance.id)+".zip"
        return ""
    
    class Meta:
        model = Simulation
        fields = ["id","name", "nodes_number","nodes", "environment", "node_range", "execution_time", "total_log", "mobility_flag", "update_flag",
                  "buffer_size","preview", "update_mobility_interval", "receive_delay", "sleep_time", "receive_window", "lowpower_poll_interval","random_nodes","center_node_number","heartbeat_period","scan_interval","scan_window","relay_retransmit_count","network_transmit_count","rris","ntis","advertise_interval","generation_interval","image","run_log","file","done"]

