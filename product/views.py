from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Product, ProductRating
import json

# Create your views here.
def index(request):
    allProds = Product.objects.all()
    allProdsList = []
    for r in allProds:
        rdict = {'id':r.id,'name':r.name,'avgRating':r.calculateAvgRating}
        allProdsList.append(rdict)
    return render(request,'index.html',context={'allProds':allProdsList})


def detail(request,pk):
    prod = Product.objects.get(id=pk)
    prodRatings = ProductRating.objects.filter(product=prod)
    prodRatings = prodRatings.order_by('-created')
    return render(request,'detail.html',context={'prod':prod,'prodRatings':prodRatings})


def savedetail(request,pk):
    if request.is_ajax():
        data = request.POST
        data_ = dict(data.lists())
        data_.pop('csrfmiddlewaretoken')
        product = Product.objects.get(pk=pk)
        rating = request.POST.get('rating')
        comment = request.POST.get('comment')
        ProductRating.objects.create(product=product,rating=rating,comment=comment)
        return JsonResponse({"text":"works"})
