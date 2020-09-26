from django.db import models
from django.core.validators import FileExtensionValidator
import os
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Framework(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class Browser(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

# -------- TEST STRATEGY --------
class TestStrategy(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='creation_date')
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name + ' -- ' + str(self.createdAt)

class TestRequest(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='creation_date')
    name = models.CharField(max_length=80)
    browser = models.ForeignKey(Browser, on_delete=models.SET_NULL, verbose_name='testing_browser', null=True)
    appName = models.CharField(max_length=100)
    appUrl = models.CharField(max_length=255)
    appVersion = models.CharField(max_length=10)
    strategy = models.ForeignKey(TestStrategy, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + ' - ' + self.appName + ' -- ' + str(self.createdAt)


class Reports(models.Model):
    createdAt = models.DateTimeField(
        auto_now_add=True, verbose_name='creation_date')
    test = models.ForeignKey(TestRequest, on_delete=models.CASCADE, null=True)
    testResults = models.TextField(max_length=1000)
    
# -------- E2E --------
def setPath(instance, filename):
    return '{}/{}'.format(instance.framework.name.lower(), filename)

class End2End(TestRequest):
    framework = models.ForeignKey(
        Framework, on_delete=models.SET_NULL, null=True)
    testScript = models.FileField(upload_to=setPath, validators=[FileExtensionValidator(allowed_extensions=['js'])])

@receiver(post_save, sender=End2End)
def run_test_task(sender, instance, **kwargs):
    from tests.tasks import run_e2e_test
    run_e2e_test.delay(instance.testScript.name, instance.pk)

# -------- RANDOM TEST --------

class RandomTest(TestRequest):    
    eventsNumber = models.IntegerField()
    

# ----------- BDD TEST -----------
def setJsBDDPath(instance, filename):
    directory = os.path.basename(instance.features.name).split('.feature')[0]
    return 'cypress/integration/{}/{}'.format(directory, filename)

def setFeatureBDDPath(instance, filename):
    return 'cypress/integration/{}'.format(filename)

class BDDTest(TestRequest):    
    features = models.FileField(upload_to=setFeatureBDDPath, validators=[FileExtensionValidator(allowed_extensions=['feature'])])
    stepsScript = models.FileField(upload_to=setJsBDDPath, validators=[FileExtensionValidator(allowed_extensions=['js'])])

    

