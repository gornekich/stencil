# Generated by Django 2.1.4 on 2019-02-05 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stencil',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stencil_info', models.CharField(max_length=1000)),
                ('dir_name', models.CharField(max_length=100)),
                ('img_name', models.CharField(max_length=20)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]