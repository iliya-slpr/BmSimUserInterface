# Generated by Django 4.1.7 on 2023-02-15 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Simulation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('nodes_number', models.IntegerField()),
                ('environment', models.IntegerField()),
                ('node_range', models.IntegerField()),
                ('execution_time', models.IntegerField()),
                ('r_h', models.IntegerField()),
                ('mobility_flag', models.IntegerField()),
                ('update_flag', models.IntegerField()),
                ('buffer_size', models.IntegerField()),
                ('update_mobility_interval', models.IntegerField()),
                ('receive_delay', models.IntegerField()),
                ('sleep_time', models.IntegerField()),
                ('receive_window', models.IntegerField()),
                ('lowpower_poll_interval', models.IntegerField()),
                ('percent', models.IntegerField()),
                ('done', models.BooleanField()),
            ],
        ),
    ]