from django.contrib import admin
from .models import Framework, TestRequest, Reports, RandomElement, RandomTest


# Register your models here.


class FrameworkAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name'
    )


admin.site.register(Framework, FrameworkAdmin)


class TestRequestAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'framework',
        'createdAt',
        'testScript'
    )
    list_filter = ['framework']


admin.site.register(TestRequest, TestRequestAdmin)


class ReportsAdmin(admin.ModelAdmin):
    list_display = (
        'testResults',
        'test',
        'createdAt',
    )
    list_filter = ['test__framework']


admin.site.register(Reports, ReportsAdmin)


class RandomElementAdmin(admin.ModelAdmin):
    list_display = (
        'key',
        'value'
    )
    list_filter = ['key']


admin.site.register(RandomElement, RandomElementAdmin)


class RandomTestAdmin(admin.ModelAdmin):
    list_display = (
        'createdAt',
        'name',
        'appUrl',
        'eventsNumber',
    )
    list_filter = ['appUrl']


admin.site.register(RandomTest, RandomTestAdmin)
