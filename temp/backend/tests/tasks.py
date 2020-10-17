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
        test = TestRequest.objects.get(pk=test_id)
        command_list = ["npx", "cypress", "run", "--spec", 'cypress/integration/' + file_name.split('/')[-1],
                        "--reporter", "mochawesome"]
        return execute_test(command_list, test)
    except Exception as e:
        raise e


@app.task()
def run_bdd_test(feature_file_name: str, steps_file_name: str, test_id):
    subprocess.run(["cp", "medias/" + feature_file_name, "../cypress_feature/cypress/integration"])
    subprocess.run(["cp", "medias/" + steps_file_name, "../cypress_feature/cypress/integration" + steps_file_name])
    command_list = ["npx", "cypress", "run", "--spec",
                    'cypress/integration/' + feature_file_name.split('/')[-1], "--reporter", "mochawesome"]
    test = TestRequest.objects.get(pk=test_id)
    return execute_test(command_list, test, 'cypress_feature')


@app.task()
def run_random_test(event_number: int, url: str, test_id):
    test = TestRequest.objects.get(pk=test_id)
    command_list = ["npx", "cypress", "run", "--spec", "cypress/integration/ripper/cypressRandomTesting.spec.js",
                    "--reporter", "mochawesome", "--env", "url={},events={}".format(url, event_number)]
    return execute_test(command_list, test)


def execute_test(command_list, test, cypress_type:str = 'cypress'):
    if not test.headless:
        command_list.append("--headed")
    command_list.append("-b")
    command_list.append(test.browser.name)
    os.chdir('/srv/www/backend/{}'.format(cypress_type))
    print(command_list)
    run_test = subprocess.run(command_list, capture_output=True)
    json_response = open('/srv/www/backend/{}/cypress/results/mochawesome.json'.format(cypress_type), 'r')
    Reports.objects.create(test=test, testResults=json_response.read())
    subprocess.run(["rm", "-rf", "../cypress/cypress/results"])
    return run_test
