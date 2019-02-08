from django.db import models
import json

# Create your models here.

class SiteCounter(models.Model):
    upload_cnt = models.IntegerField(default = 0)
    process_cnt = models.IntegerField(default = 0)

    def cnt_reset(self):
        upload_cnt = 0
        process_cnt = 0
        return
    
    def __str__(self):
        return str(self.upload_cnt)

class Stencil(models.Model):
    stencil_id = models.IntegerField(default = 0)
    creation_date = models.DateTimeField(auto_now_add = True)
    stencil_info = models.CharField(max_length = 1000)
    dir_name = models.CharField(max_length = 100)
    img_name = models.CharField(max_length = 20)
    stencil_name = models.CharField(max_length = 20)
    layers = models.IntegerField(default = 2)
    
    # Fill with input json format
    def fill_info(self, stencil_info = ''):
        self.stencil_info = stencil_info
        info = json.loads(stencil_info)
        self.stencil_id = info['id']
        self.dir_name = info['directory']
        self.img_name = info['img']
        self.stencil_name = info['stencil']
        self.layers = info['layers']
        return

    def __str__(self):
        return str(self.dir_name) + '/' + str(self.img_name) + \
        ' creation_date: ' + str(self.creation_date)