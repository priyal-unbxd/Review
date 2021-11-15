from django.shortcuts import render
from .models import Product
import json

# Create your views here.
def index(request):
    allProds = Product.objects.all()
    print(allProds)
    return render(request,'index.html',context={'allProds':allProds})