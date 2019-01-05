from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage

from django import forms


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()


def index(request):
    return render(request, 'core/basic.html')


def upload(request):
    return render(request, 'core/upload.html')


def process(request):  # THAT WORKS
    if request.method == 'POST':
        uploaded_image = request.FILES['avatar']
        fs = FileSystemStorage()
        fs.save(uploaded_image.name, uploaded_image)
    return HttpResponse('hello world')
