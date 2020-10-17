from django.conf.urls import url
from django.urls import path
from rest_framework import routers

from tests.views import ReportsViewSet, TestStrategyView, End2EndView, RandomTestView, BDDTestView,\
    MobileTestView, VRTTestView, FrameworkView, BrowserView, AndroidVersionView


urlpatterns = [
    url(r'^reports', ReportsViewSet.as_view(), name='reports'),
    path('strategies', TestStrategyView.as_view(), name='strategies'),
    path('end2end-tests', End2EndView.as_view(), name='end2end-tests'),
    path('random-tests', RandomTestView.as_view(), name='random-tests'),    
    path('bdd-tests', BDDTestView.as_view(), name='bdd-tests'),
    path('mobile-tests', MobileTestView.as_view(), name='mobile-tests'),
    path('vrt-tests', VRTTestView.as_view(), name='vrt-tests'),
    path('frameworks', FrameworkView.as_view(), name='framewroks'),
    path('browsers', BrowserView.as_view(), name='browsers'),
    path('android-versions', AndroidVersionView.as_view(), name='android-versions'),
]
