from datetime import datetime

from django.conf import settings
from backend.celery import app
import os
import subprocess


@app.task()
def run_test(fileName):
    try:
        subprocess.run(["cp", "medias/" + fileName, "../cypress/cypress/integration"])
        os.chdir('/srv/www/backend/cypress')
        run_test = subprocess.run(["npx", "cypress", "run", "--spec", 'cypress/integration/' + fileName.split('/')[-1], "--reporter", "mochawesome"], capture_output=True)
        return run_test
    except Exception as e:
        raise e



