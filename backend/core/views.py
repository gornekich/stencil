from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
import json
import os

from django import forms
from .models import ID_Manager
from .stencil import *

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()

def index(request):
    return render(request, 'core/basic.html')


def upload(request):
    return render(request, 'core/upload.html')


def process(request):
    if request.method == 'POST' :
        cur_id = ID_Manager.objects.get(id=0)
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        MEDIA_DIR = os.path.join(BASE_DIR, "media")
        FILE_DIR = os.path.join(MEDIA_DIR, str(cur_id.current_id))
        OUTPUT_DIR = os.path.join(FILE_DIR, "output")
        # Processing file upload
        if request.GET.get("param") == 'file':
            uploaded_image = request.FILES['avatar']
            fs = FileSystemStorage(FILE_DIR)
            fs.save('input.jpg', uploaded_image)
            return HttpResponse(str(cur_id.current_id))

        #Processing colors and start algorythm
        if request.GET.get("param") == 'colors':
            
            #Parse json file
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            content = body['id']
            print(body['colors'])

            #Open input file
            im = Image.open(FILE_DIR + '/input.jpg')
            os.mkdir(OUTPUT_DIR)
            
            #Start algorythm and save output
            edges, merged_colors, merged_colors_smooth, separate_clrs_pics = find_color_edges(im, target_colors)
            for i in range(len(edges)):
                edges[i].save(OUTPUT_DIR + '/' + str(i) + '.jpg', "JPEG")
            merged_colors_smooth.save(OUTPUT_DIR + '/' + 'result.jpg')

            cur_id.current_id += 1
            cur_id.save()
            return HttpResponse('Everything is fine, I will just process it')
    return HttpResponse('Wrong parameter')
