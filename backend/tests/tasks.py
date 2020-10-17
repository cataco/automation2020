from datetime import datetime

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.celery import app
import os
import subprocess

from tests.models import Reports, TestRequest
from appium import webdriver

@app.task()
def run_e2e_test(file_name: str, test_id):
    try:
        subprocess.run(["cp", "medias/" + file_name, "../cypress/cypress/integration"])
        os.chdir('/srv/www/backend/cypress')
        command_list = ["npx", "cypress", "run", "--spec"]
        test = TestRequest.objects.get(pk=test_id)
        test_file = file_name.split("/")[-1]
        if "zip" in file_name:
            subprocess.run(["unzip", file_name])
            test_file = test_file.split(".")[0]
        command_list.extend([test_file, "--reporter", "mochawesome"])
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


def execute_test(command_list, test, cypress_type: str = 'cypress'):
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

@app.task()
def run_test_e2e_mobile_task(folder_name, apk, scripts, test):
    os.environ["apk"] = apk.split("/")[-1]
    os.chdir('/srv/www/backend/backend/medias/mobile/{}'.format(folder_name))
    if "zip" in scripts:
        subprocess.run(["unzip", scripts.split("/")[-1]])
        os.system("pytest --html=report.html")
    else:
        os.system("pytest {} --html=report.html".format(scripts.split("/")[-1]))
    json_response = open('report.html', 'r')
    Reports.objects.create(test_id=test, testResults=json_response.read())

@app.task()
def run_test_e2e_mobile_task(folder_name, apk, scripts, test, device):
    os.environ["apk"] = apk.split("/")[-1]
    os.environ["adv"] = device

    os.chdir('/srv/www/backend/backend/medias/mobile/{}'.format(folder_name))

    if "zip" in scripts:
        subprocess.run(["unzip", scripts.split("/")[-1]])
        os.system("pytest --html=report.html")
    else:
        os.system("pytest {} --html=report.html".format(scripts.split("/")[-1]))
    json_response = open('report.html', 'r')
    Reports.objects.create(test_id=test, testResults=json_response.read())

@app.task()
def run_test_random_mobile_task(folder_name, apk, package, instance_id, device_version, number_of_events, device_name):
    os.system("adb connect {}:{}".format(os.environ.get('environment_id'),
                                         os.environ.get('ANDROID_PORT_{}'.format(device_version))))
    dc = {
        'platformName': 'Android',
        'deviceName': 'Android Emulator',
        'automationName': 'UIAutomator2',
        'browserName': 'android',
        'avd': device_name,
        "app": "/root/tmp/medias/mobile/{}/{}".format(folder_name, apk)
    }
    driver = webdriver.Remote('http://{}:{}/wd/hub'.format(os.environ.get('environment_id'),
                                                           os.environ.get('SELENIUM_PORT')), dc)
    driver.quit()
    os.system("adb shell monkey -p {} -v {}".format(package, number_of_events))
    os.system("adb disconnect {}:{}".format(os.environ.get('environment_id'),
                                         os.environ.get('ANDROID_PORT_{}'.format(device_version))))

@app.task()
def run_vrt_test(file_name: str, test_id):
    try:
        subprocess.run(["cp", "medias/vrt/" + file_name, "../cypress/cypress/integration"])
        os.chdir('/srv/www/backend/cypress')
        test = TestRequest.objects.get(pk=test_id)
        command_list = ["npx", "cypress", "run", "--spec", 'cypress/integration/' + file_name.split('/')[-1],
                        "--reporter", "mochawesome"]
        return execute_vrt_test(command_list, test)
    except Exception as e:
        raise e

def execute_vrt_test(command_list, test, cypress_type:str = 'cypress'):
    if not test.headless:
        command_list.append("--headed")
    command_list.append("-b")
    command_list.append(test.browser.name)
    os.chdir('/srv/www/backend/{}'.format(cypress_type))
    print(command_list)
    run_test = subprocess.run(command_list, capture_output=True)
    json_response = open('/srv/www/backend/{}/cypress/results/mochawesome.json'.format(cypress_type), 'r')
    VRTReports.objects.create(test=test, image1='', image2='')
    subprocess.run(["rm", "-rf", "../cypress/cypress/results"])
    return run_test