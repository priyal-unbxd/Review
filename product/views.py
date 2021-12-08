from django.http.response import JsonResponse,HttpResponse
from django.shortcuts import render
from .models import Product, ProductRating
import json

# Create your views here.
def index(request):
    allProds = Product.objects.all()
    allProdsList = []
    for r in allProds:
        rdict = {'id':r.id,'name':r.name,'image':r.image,'avgRating':r.calculateAvgRating}
        allProdsList.append(rdict)
    print(allProdsList)
    return render(request,'index.html',context={'allProds':allProdsList})


def detail(request,pk):
    prod = Product.objects.get(id=pk)
    print(prod.image)
    prodRatings = ProductRating.objects.filter(product=prod)
    prodRatings = prodRatings.order_by('-created')
    return render(request,'detail.html',context={'prod':prod,"imgLink":prod.image,'prodRatings':prodRatings})


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

def search(request):
    # if request.method == 'POST':
    #     data = request.POST.get('word')
    #     data_ = dict(data.lists())
    #     data_.pop('csrfmiddlewaretoken')
    #     print(data_)
    #     prods = Product.objects.filter(name__contains = searched)
    #     print(prods)
    #     return JsonResponse({"results": prods})
    # else:
        print("No no") 
        return JsonResponse({"text":"works"})

def updateHelpful(request,pk1,pk2):
    prodrating = ProductRating.objects.get(id=pk2)
    prodrating.helpful += 1
    prodrating.save()
    return JsonResponse({"result":"success"})   