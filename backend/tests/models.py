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
        return str(self.name) + ' -- ' + str(self.createdAt)


class TestRequest(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name='creation_date')
    name = models.CharField(max_length=80)
    browser = models.ForeignKey(Browser, on_delete=models.SET_NULL, verbose_name='testing_browser', null=True)
    appName = models.CharField(max_length=100)
    appUrl = models.CharField(max_length=255)
    appVersion = models.CharField(max_length=10)
    strategy = models.ForeignKey(TestStrategy, on_delete=models.CASCADE)
    framework = models.ForeignKey(Framework, on_delete=models.SET_NULL, null=True)
    headless = models.BooleanField(default=True)

    def __str__(self):
        return str(self.name) + ' - ' + str(self.appName) + ' -- ' + str(self.createdAt)


class Reports(models.Model):
    createdAt = models.DateTimeField(
        auto_now_add=True, verbose_name='creation_date')
    test = models.ForeignKey(TestRequest, on_delete=models.CASCADE, null=True)
    testResults = models.TextField(max_length=1000)


# -------- E2E --------
def set_path(instance, filename):
    return '{}/{}'.format(instance.framework.name.lower(), filename)


class End2End(TestRequest):
    testScript = models.FileField(upload_to=set_path, validators=[FileExtensionValidator(allowed_extensions=['js'])])


@receiver(post_save, sender=End2End)
def run_test_e2e_task(sender, instance, **kwargs):
    from tests.tasks import run_e2e_test
    run_e2e_test.delay(instance.testScript.name, instance.pk)


# -------- RANDOM TEST --------

class RandomTest(TestRequest):    
    eventsNumber = models.IntegerField()



@receiver(post_save, sender=RandomTest)
def run_test_random_task(sender, instance, **kwargs):
    from tests.tasks import run_random_test
    run_random_test.delay(instance.eventsNumber, instance.appUrl, instance.pk)


# ----------- BDD TEST -----------
def set_js_bdd_path(instance, filename):
    directory = os.path.basename(instance.features.name).split('.feature')[0]
    return '{}/{}'.format(directory, filename)


def set_feature_bdd_path(instance, filename):
    return '{}/{}'.format(instance.framework.name.lower(),filename)


class BDDTest(TestRequest):    
    features = models.FileField(upload_to=set_feature_bdd_path,
                                validators=[FileExtensionValidator(allowed_extensions=['feature'])])
    stepsScript = models.FileField(upload_to=set_js_bdd_path,
                                   validators=[FileExtensionValidator(allowed_extensions=['js'])])


@receiver(post_save, sender=BDDTest)
def run_test_bdd_task(sender, instance, **kwargs):
    from tests.tasks import run_bdd_test
    run_bdd_test.delay(instance.features.name, instance.stepsScript.name, instance.pk)

