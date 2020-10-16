from django.contrib import admin
from .models import Framework, RandomTest, TestStrategy, End2End, Browser, Reports, BDDTest, \
    AndroidVersion, MobileTest, MobileRandomTest


# Register your models here.

class FrameworkAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name'
    )


admin.site.register(Framework, FrameworkAdmin)


class TestStrategyAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'createdAt',
    )


admin.site.register(TestStrategy, TestStrategyAdmin)


class ReportsAdmin(admin.ModelAdmin):
    list_display = (
        'testResults',
        'test',
        'createdAt',
    )
    list_filter = ['test__name']


admin.site.register(Reports, ReportsAdmin)


class End2EndAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'appUrl',
        'framework',
        'testScript',
        'createdAt'
    )
    list_filter = ['framework']


admin.site.register(End2End, End2EndAdmin)


class RandomTestAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'appUrl',
        'eventsNumber',
        'createdAt',
    )
    list_filter = ['appUrl']


admin.site.register(RandomTest, RandomTestAdmin)


class BddTestAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'appUrl',
        'features',
        'stepsScript',
        'createdAt'
    )


admin.site.register(BDDTest, BddTestAdmin)


class MobileTestAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'appApk',
        'scripts',
        'androidVersion',
        'createdAt'
    )


admin.site.register(MobileTest, MobileTestAdmin)


class VRTTestAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'url1',
        'url2',
        'sripts',
        'createdAt'
    )


admin.site.register(VRTTest, VRTTestAdmin)


class MobileRandomTestAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'appApk',
        'eventsNumber',
        'androidVersion',
        'packageName'
    )


admin.site.register(MobileRandomTest, MobileRandomTestAdmin)
models = [Browser, AndroidVersion]
admin.site.register(models)
