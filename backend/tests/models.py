from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Framework(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


def setPath(instance, filename):
    return '{}/{}'.format(instance.framework.name, filename)


class TestRequest(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='creation_date')
    name = models.CharField(max_length=80)
    framework = models.ForeignKey(Framework, on_delete=models.SET_NULL, null=True)
    testScript = models.FileField(upload_to=setPath)

    def __str__(self):
        return str(self.name) + ': ' + self.testScript.name


class Reports(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='creation_date')
    test = models.ForeignKey(TestRequest, on_delete=models.CASCADE, null=True)
    testResults = models.TextField(max_length=1000)


@receiver(post_save, sender=TestRequest)
def run_test_task(sender, instance, **kwargs):
    from tests.tasks import run_e2e_test
    run_e2e_test.delay(instance.testScript.name, instance.id)
