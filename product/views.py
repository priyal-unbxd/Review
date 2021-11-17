from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Product, ProductRating
import json

# Create your views here.
def index(request):
    allProds = Product.objects.all()
    allProds1 = []
    for r in allProds:
        rdict = {'id':r.id,'name':r.name,'avgRating':r.calculateAvgRating}
        allProds1.append(rdict)

    return render(request,'index.html',context={'allProds':allProds1})


def detail(request,pk):
    prod = Product.objects.get(id=pk)
    prodRatings = ProductRating.objects.filter(product=prod)
    return render(request,'detail.html',context={'prod':prod,'prodRatings':prodRatings})


def savedetail(request,pk):
    if request.is_ajax():
        data = request.POST
        data_ = dict(data.lists())
        data_.pop('csrfmiddlewaretoken')
        print(data_)
        
        product = Product.objects.get(pk=pk)
        rating = request.POST.get('rating')
        comment = request.POST.get('comment')
        ProductRating.objects.create(product=product,rating=rating,comment=comment)

    
        return JsonResponse({"text":"works"})
