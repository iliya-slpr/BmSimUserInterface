# Generated by Django 4.1.7 on 2023-02-15 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_delete_simulationserializer_simulation_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='simulation',
            name='done',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='simulation',
            name='percent',
            field=models.IntegerField(default=0),
        ),
    ]
