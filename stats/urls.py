from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('ws/<slug:slug>/', views.dashbord, name='dashboard'),
    path('ws/<slug:slug>/chart', views.chart_data, name='chart_data'),
]

