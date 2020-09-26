from django.conf.urls import url
from django.urls import path

from tests.views import ReportsViewSet, TestStrategyView, End2EndView, RandomTestView, BDDTestView

urlpatterns = [
    url(r'^reports', ReportsViewSet.as_view(), name='reports'),
    path('strategies', TestStrategyView.as_view(), name='strategies'),
    path('end2end-tests', End2EndView.as_view(), name='end2end-tests'),
    path('random-tests', RandomTestView.as_view(), name='random-tests'),
    path('bdd-tests', BDDTestView.as_view(), name='bdd-tests')
]
