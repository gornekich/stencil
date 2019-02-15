from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.core.files.storage import FileSystemStorage
import json
import os

from django import forms
from .models import SiteCounter, Stencil
from .stencil_algorythm import *
from .tasks import find_color_edges

def index(request):
    return render(request, 'core/basic.html')


def upload(request):
    # Increment upload counter and save to database
    cnt = SiteCounter.objects.get(id=0)
    cnt.upload_cnt += 1
    cnt.save()
    return render(request, 'core/upload.html')


def process(request):
    if request.method == 'POST' :
        # Increment process counter and save to database
        cnt = SiteCounter.objects.get(id=0)
        stencil_id = cnt.process_cnt
        cnt.process_cnt += 1
        cnt.save()
        # Creating dictionary for database
        stencil_info = {'id': stencil_id}

        # Assign new directories for input/output files
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        MEDIA_DIR = os.path.join(BASE_DIR, "media")
        FILE_DIR = os.path.join(MEDIA_DIR, str(stencil_id))
        stencil_info['directory'] = FILE_DIR
        
        # Processing upload file
        uploaded_image = request.FILES['image']
        fs = FileSystemStorage(FILE_DIR)
        fs.save(uploaded_image.name, uploaded_image)
        stencil_info['img'] = uploaded_image.name
        stencil_info['stencil'] = 'stencil.jpg'

        #Processing colors and start algorythm

        #Parse input colors json file
        inp_clrs = json.loads(request.POST['colors'])
        colors = []
        for i in range(len(inp_clrs)):
            colors.append((inp_clrs[i]['r'], inp_clrs[i]['g'],
                           inp_clrs[i]['b']))
        stencil_info['colors'] = colors
        print(colors)
        stencil_info['layers'] = len(colors)

        # Pack stencil information into json format
        stencil_json = json.dumps(stencil_info)

        # Create new Stencil object in database
        sten = Stencil()
        sten.fill_info(stencil_json)
        sten.save()

        # Start algorythm
        task_id = find_color_edges.delay(stencil_info)
        info['task_id'] = task_id
        info['stencil_id'] = stencil_id
        info_json = json.dumps(info)
        print(info_json)

        return HttpResponse(info_json)
    return HttpResponse('Wrong parameter')


def result(request, stencil_id):
    if request.method == 'POST' :
        context = {}
        print(stencil_id)
        try:
            sten = Stencil.objects.get(stencil_id=stencil_id)
        except Stencil.DoesNotExist:
            raise Http404("Stencil does not exist")

        task_id = request.POST['task_id']
        state = AsyncResult(task_id);
        if state.ready():
            sten.ready = 1
            sten.save()
            media_url = 'media/' + str(sten.stencil_id) + '/'
            context['orig_url'] = media_url + sten.img_name
            context['stencil_url'] = media_url + sten.stencil_name
            edges_url = []
            for i in range(sten.layers):
                edges_url.append(media_url + str(i) + '.jpg')
            context['edges_url'] = edges_url
            print(context)
            return render(request, 'core/result.html', context)
        else:
            return HttpResponse(0)
    
    if request.method == 'GET':
        try:
            sten = Stencil.objects.get(stencil_id=stencil_id)
        except Stencil.DoesNotExist:
            raise Http404("Stencil does not exist")

        if sten.ready == 1:
            for i in range(sten.layers):
                    edges_url.append(media_url + str(i) + '.jpg')
            context['edges_url'] = edges_url
            print(context)
            return render(request, 'core/result.html', context)
        else:
            return Http404("Stencil does not exist")
    return HttpResponse('Wrong parameter')
