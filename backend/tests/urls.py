from django.conf.urls import url

from tests.views import ReportsViewSet

urlpatterns = [
    url(r'^reports', ReportsViewSet.as_view(), name='reports'),
]