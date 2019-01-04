from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'core/basic.html')


def upload(request):
    return render(request, 'core/upload.html')


def process(request):
    print(request.body)
    return HttpResponse('hello world')
