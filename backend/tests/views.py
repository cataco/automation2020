from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, ListCreateAPIView
from tests.models import Reports, TestStrategy, End2End, RandomTest, BDDTest, MobileTest, VRTTest, Framework,\
    Browser, AndroidVersion, MobileRandomTest
from tests.serializers import ReportsSerializer, TestStrategySerializer, End2EndSerializer, RandomTestSerializer, BDDTestSerializer,\
    MobileTestSerializer, VRTSerializer, FrameworkSerializer, BrowserSerializer, AndroidVersionSerializer, MobileRandomTestSerializer

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

class MobileTestView(ListCreateAPIView):
    queryset = MobileTest.objects.all()
    serializer_class = MobileTestSerializer

class VRTTestView(ListCreateAPIView):
    queryset = VRTTest.objects.all()
    serializer_class = VRTSerializer

class FrameworkView(ListAPIView):
    queryset = Framework.objects.all()
    serializer_class = FrameworkSerializer

class BrowserView(ListAPIView):
    queryset = Browser.objects.all()
    serializer_class = BrowserSerializer

class AndroidVersionView(ListAPIView):
    queryset = AndroidVersion.objects.all()
    serializer_class = AndroidVersionSerializer

class MobileRandomTestView(ListCreateAPIView):
    queryset = MobileRandomTest.objects.all()
    serializer_class = MobileRandomTestSerializer