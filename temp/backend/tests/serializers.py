from rest_framework import serializers

from tests.models import Reports, TestStrategy, End2End, RandomTest, BDDTest, \
    MobileTest, VRTTest, Framework, Browser, AndroidVersion


class ReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reports
        fields = '__all__'


class TestStrategySerializer(serializers.ModelSerializer):
    class Meta:
        model = TestStrategy
        fields = '__all__'

class End2EndSerializer(serializers.ModelSerializer):
    class Meta:
        model = End2End
        fields = '__all__'

class RandomTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomTest
        fields = '__all__'

class BDDTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BDDTest
        fields = '__all__'

class MobileTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileTest
        fields = '__all__'

class VRTSerializer(serializers.ModelSerializer):
    class Meta:
        model = VRTTest
        fields = '__all__'

class FrameworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Framework
        fields = '__all__'

class BrowserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Browser
        fields = '__all__'

class AndroidVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AndroidVersion
        fields = '__all__'