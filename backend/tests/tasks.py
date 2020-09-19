from datetime import datetime

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.celery import app
import os
import subprocess

from tests.models import Reports, TestRequest


@app.task()
def run_e2e_test(file_name: str, test_id):
    try:
        subprocess.run(["cp", "medias/" + file_name, "../cypress/cypress/integration"])
        os.chdir('/srv/www/backend/cypress')
        run_test = subprocess.run(["npx", "cypress", "run", "--spec", 'cypress/integration/' + file_name.split('/')[-1], "--reporter", "mochawesome"], capture_output=True)
        json_response = open('/srv/www/backend/cypress/cypress/results/mochawesome.json', 'r')
        Reports.objects.create(test_id=test_id,testResults=json_response.read())
        subprocess.run(["rm", "-rf", "../cypress/cypress/results"])
        return run_test
    except Exception as e:
        raise e



