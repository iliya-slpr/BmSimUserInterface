# Generated by Django 4.1.7 on 2023-05-04 10:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_simulation_done_alter_simulation_percent'),
    ]

    operations = [
        migrations.RenameField(
            model_name='simulation',
            old_name='r_h',
            new_name='total_log',
        ),
    ]
