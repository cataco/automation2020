from datetime import datetime
from time import sleep

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.celery import app
import os
import subprocess
import glob
from django.core.files import File

from tests.models import Reports, WebTest, VRTReports
from appium import webdriver


@app.task()
def run_e2e_test(file_name: str, test_id):
    try:
        subprocess.run(['cp', 'medias/' + file_name, '../cypress/cypress/integration'])
        command_list = ['npx', 'cypress', 'run', '--spec']
        test = WebTest.objects.get(pk=test_id)
        test_file = file_name.split('/')[-1]
        if 'zip' in file_name:
            os.chdir('/srv/www/backend/cypress/cypress/integration')
            subprocess.run(['unzip', file_name])
            test_file = 'cypress/integration/' + test_file.split('.')[0] + '/*.js'
        command_list.extend([test_file, '--reporter', 'mochawesome'])
        return execute_test(command_list, test)
    except Exception as e:
        raise e


@app.task()
def run_bdd_test(feature_file_name: str, steps_file_name: str, test_id):
    subprocess.run(['cp', 'medias/' + feature_file_name, '../cypress_feature/cypress/integration'])
    subprocess.run(['cp', 'medias/' + steps_file_name, '../cypress_feature/cypress/integration' + steps_file_name])
    command_list = ['npx', 'cypress', 'run', '--spec',
                    'cypress/integration/' + feature_file_name.split('/')[-1], '--reporter', 'mochawesome']
    test = WebTest.objects.get(pk=test_id)
    return execute_test(command_list, test, 'cypress_feature')


@app.task()
def run_random_test(event_number: int, url: str, test_id):
    test = WebTest.objects.get(pk=test_id)
    command_list = ['npx', 'cypress', 'run', '--spec', 'cypress/integration/ripper/cypressRandomTesting.spec.js',
                    '--reporter', 'mochawesome', '--env', 'url={},events={}'.format(url, event_number)]
    return execute_test(command_list, test)


def execute_test(command_list, test, cypress_type: str = 'cypress'):
    if not test.headless:
        command_list.append('--headed')
    command_list.append('-b')
    command_list.append(test.browser.name)
    os.chdir('/srv/www/backend/{}'.format(cypress_type))
    print(command_list)
    run_test = subprocess.run(command_list, capture_output=True)
    json_response = open('/srv/www/backend/{}/cypress/results/mochawesome.json'.format(cypress_type), 'r')
    Reports.objects.create(test=test, testResults=json_response.read())
    subprocess.run(['rm', '-rf', '../cypress/cypress/results'])
    return run_test


@app.task()
def run_test_e2e_mobile_task(folder_name, apk, scripts, test, device):
    sleep(10)
    os.environ['adv'] = device
    os.environ['app'] = '/root/tmp/medias/mobile/{}/{}'.format(folder_name, apk)
    os.chdir('/srv/www/backend/backend/medias/mobile/{}'.format(folder_name))
    sleep(10)
    if 'zip' in scripts:
        subprocess.run(['unzip', scripts.split('/')[-1]])
        os.system('pytest --json-report')
    else:
        os.system('pytest {} --json-report'.format(scripts.split('/')[-1]))
    json_response = open('.report.json', 'r')
    Reports.objects.create(test_id=test, testResults=json_response.read())


@app.task()
def run_test_random_mobile_task(folder_name, apk, package_name, activity_name,
                                test, device_version, number_of_events, device_name):
    sleep(10)
    os.system('adb connect {}:{}'.format(os.environ.get('environment_id'),
                                         os.environ.get('ANDROID_PORT_{}'.format(device_version))))
    dc = {'platformName': 'android',
          'deviceName': 'Android Emulator',
          'automationName': 'UIAutomator2',
          'avd': device_name,
          'app': '/root/tmp/medias/mobile/{}/{}'.format(folder_name, apk),
          'appPackage': package_name,
          'appActivity': activity_name,
          'appWaitPackage': package_name,
          'appWaitActivity': package_name + '.*'}
    try:
        connected = False
        max_runs = 10
        while not connected and max_runs > 0:
            sleep(10)
            try:
                driver = webdriver.Remote('http://{}/wd/hub'.format('selenium_hub:4444'), dc)
                connected = True
                driver.quit()
            except:
                max_runs -= 1
    except:
        pass
    sleep(10)
    run_test = subprocess.run(['adb', 'shell', 'monkey', '-p', package_name, '-v', number_of_events],
                              capture_output=True)
    Reports.objects.create(test_id=test, testResults=run_test)
    os.system('adb disconnect {}:{}'.format(os.environ.get('environment_id'),
                                            os.environ.get('ANDROID_PORT_{}'.format(device_version))))


@app.task()
def run_vrt_test(file_name: str, test_id):
    try:
        subprocess.run(['cp', 'medias/' + file_name, '../cypress/cypress/integration'])
        os.chdir('/srv/www/backend/cypress/cypress/integration')
        subprocess.run(['unzip', file_name.split('/')[-1]])
        os.chdir('/srv/www/backend/cypress')
        command_list = ['npx', 'cypress', 'run', '--spec', 'cypress/integration/' + file_name.split('/')[-1].split('.')[0] + '/*.js',
                        '--reporter', 'mochawesome']
        test = WebTest.objects.get(id=test_id)
        return execute_vrt_test(command_list, test)
    except Exception as e:
        raise e


def execute_vrt_test(command_list, test, cypress_type:str = 'cypress'):
    if not test.headless:
        command_list.append('--headed')
    command_list.append('-b')
    command_list.append(test.browser.name)
    os.chdir('/srv/www/backend/{}'.format(cypress_type))
    print(command_list)
    run_test = subprocess.run(command_list, capture_output=True)    
    os.chdir('/srv/www/backend/cypress/{}/screenshots'.format(cypress_type))
    images = glob.glob('**/*.png', recursive=True)
    images = [image for image in images if 'screenshot' in image]
    os.system("mv {} image1.png".format(images[0]))
    os.system("mv {} image2.png".format(images[1]))
    image1 = open('/srv/www/backend/{}/cypress/screenshots/image1.png'.format(cypress_type  ), 'rb')
    image2 = open('/srv/www/backend/{}/cypress/screenshots/image2.png'.format(cypress_type), 'rb')
    VRTReports.objects.create(test=test, image1=File(image1), image2=File(image2))
    os.chdir('/srv/www/backend/cypress')
    subprocess.run(['rm', '-rf', '../cypress/cypress/results'])
    subprocess.run(['rm', '-rf', '../cypress/cypress/screenshots'])
    return run_test
