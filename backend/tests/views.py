from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView

from tests.models import Reports
from tests.serializers import ReportsSerializer


class ReportsViewSet(ListAPIView):
    serializer_class = ReportsSerializer
    queryset = Reports.objects.all()