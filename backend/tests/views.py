from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, ListCreateAPIView
from tests.models import Reports, TestStrategy, End2End, RandomTest, BDDTest
from tests.serializers import ReportsSerializer, TestStrategySerializer, End2EndSerializer, RandomTestSerializer, BDDTestSerializer

class ReportsViewSet(ListAPIView):
    serializer_class = ReportsSerializer
    queryset = Reports.objects.all()


class TestStrategyView(ListCreateAPIView):
    queryset = TestStrategy.objects.all()
    serializer_class = TestStrategySerializer

class End2EndView(ListCreateAPIView):
    queryset = End2End.objects.all()
    serializer_class = End2EndSerializer

class RandomTestView(ListCreateAPIView):
    queryset = RandomTest.objects.all()
    serializer_class = RandomTestSerializer

class BDDTestView(ListCreateAPIView):
    queryset = BDDTest.objects.all()
    serializer_class = BDDTestSerializer
