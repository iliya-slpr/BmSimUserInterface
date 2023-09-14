from operator import mod
from os import environ
from statistics import mode
from django.db import models
from sqlalchemy import false

# Create your models here.


class Simulation(models.Model):
    name = models.CharField(max_length=255)
    total_log = models.IntegerField()
    nodes_number = models.IntegerField()
    environment = models.IntegerField()
    node_range = models.FloatField()
    execution_time = models.IntegerField()
    mobility_flag = models.IntegerField()
    update_flag = models.IntegerField()
    buffer_size = models.IntegerField()
    update_mobility_interval = models.IntegerField()
    receive_delay = models.IntegerField()
    sleep_time = models.IntegerField()
    receive_window = models.IntegerField()
    lowpower_poll_interval = models.IntegerField()

    random_nodes = models.IntegerField(null=True)
    center_node_number = models.IntegerField(null=True)
    heartbeat_period = models.IntegerField(null=True)
    scan_interval = models.IntegerField(null=True)
    scan_window = models.IntegerField(null=True)
    relay_retransmit_count = models.IntegerField(null=True)
    network_transmit_count = models.IntegerField(null=True)
    rris = models.IntegerField(null=True)
    ntis = models.IntegerField(null=True)
    advertise_interval = models.IntegerField(null=True)
    generation_interval = models.IntegerField(null=True)

    run_log = models.TextField(null=True)
    image = models.TextField(null=True)
    preview= models.TextField(null=True)

    percent = models.IntegerField(default=0)
    done = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Node(models.Model):
    x=models.IntegerField()
    y=models.IntegerField()
    sim = models.ForeignKey(Simulation,on_delete=models.CASCADE,related_name="nodes")

