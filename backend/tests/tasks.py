from datetime import datetime

from django.conf import settings
from backend.celery import app
import os
import subprocess


@app.task()
def run_test(fileName):
    try:
        os.chdir('/srv/www/backend/cypress')
        run_test = subprocess.run(["npx", "cypress", "run", "--spec", fileName, "--reporter", "mochawesome"], capture_output=True)
    except Exception as e:
        raise e



