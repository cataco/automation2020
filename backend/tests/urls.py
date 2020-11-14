from django.conf.urls import url
from django.urls import path
from rest_framework import routers

from tests.views import ReportsViewSet, TestStrategyView, End2EndView, RandomTestView, BDDTestView,\
    MobileTestView, FrameworkView, BrowserView, AndroidVersionView, MobileRandomTestView,\
        ImageReportsView, get_images

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^reports', ReportsViewSet.as_view(), name='reports'),
    path('strategies', TestStrategyView.as_view(), name='strategies'),
    path('end2end-tests', End2EndView.as_view(), name='end2end-tests'),
    path('random-tests', RandomTestView.as_view(), name='random-tests'),    
    path('bdd-tests', BDDTestView.as_view(), name='bdd-tests'),
    path('mobile-tests', MobileTestView.as_view(), name='mobile-tests'),
    path('mobile-random-tests', MobileRandomTestView.as_view(), name='mobile-random-tests'),
    path('image-reports', ImageReportsView.as_view(), name='image-reports'),
    path('image-reports/report/<int:report_pk>', get_images, name='images-by-reports'),
    path('frameworks', FrameworkView.as_view(), name='framewroks'),
    path('browsers', BrowserView.as_view(), name='browsers'),
    path('android-versions', AndroidVersionView.as_view(), name='android-versions'),
]

urlpatterns += router.urls