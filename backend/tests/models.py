from django.db import models

# Create your models here.
class Framework(models.Model):
    name = models.CharField(max_length=50)

def setPath(instance, filename):
    return '{}/{}'.format(instance.framework.name, filename)

class TestRequest(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='creation_date')
    name = models.CharField(max_length=80)
    framework = models.ForeignKey(Framework, on_delete=models.SET_NULL, null=True)
    testScript = models.FileField(upload_to=setPath)