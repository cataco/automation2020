from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver
from tests.tasks import *


class Framework(models.Model):
    name = models.CharField(max_length=50)


def setPath(instance, filename):
    return '{}/{}'.format(instance.framework.name, filename)


class TestRequest(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='creation_date')
    name = models.CharField(max_length=80)
    framework = models.ForeignKey(Framework, on_delete=models.SET_NULL, null=True)
    testScript = models.FileField(upload_to=setPath)


@receiver(post_save, sender=TestRequest)
def run_test_task(sender, instance, **kwargs):
    run_test.delay(instance.testScript.name)