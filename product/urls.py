from django.contrib import admin
from django.urls import path ,include
from . import views


urlpatterns = [
    path('', views.index,name="index"),
    path('search/', views.search,name="search"),
    path('<int:pk>/', views.detail,name="detail"),
    path('<int:pk>/save/', views.savedetail,name="save-detail"),
]