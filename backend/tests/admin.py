from django.contrib import admin
from .models import Framework, TestRequest
# Register your models here.
models = [Framework, TestRequest,]
admin.site.register(models)