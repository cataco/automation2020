from rest_framework import serializers

from tests.models import Reports, TestStrategy, End2End, RandomTest, BDDTest


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