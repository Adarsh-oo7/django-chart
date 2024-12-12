from django.urls import path
from . import views

urlpatterns = [
    path('',views.main,name='main'),
    path('ws/<slug:slug>/',views.dashbord,name='dashboard')
]
