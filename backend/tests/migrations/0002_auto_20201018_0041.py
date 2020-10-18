# Generated by Django 2.1 on 2020-10-18 00:41

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import tests.models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MobileRandomTest',
            fields=[
                ('testrequest_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tests.TestRequest')),
                ('appApk', models.FileField(upload_to=tests.models.seth_apk_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['apk'])])),
                ('eventsNumber', models.IntegerField()),
                ('packageName', models.CharField(max_length=255)),
            ],
            bases=('tests.testrequest',),
        ),
        migrations.CreateModel(
            name='VRTReports',
            fields=[
                ('reports_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tests.Reports')),
                ('image1', models.ImageField(upload_to=tests.models.set_vrt_report_path)),
                ('image2', models.ImageField(upload_to=tests.models.set_vrt_report_path)),
            ],
            bases=('tests.reports',),
        ),
        migrations.AlterField(
            model_name='androidversion',
            name='versionName',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='reports',
            name='testResults',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='vrttest',
            name='sripts',
            field=models.FileField(upload_to=tests.models.set_vrt_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['js', 'zip'])]),
        ),
        migrations.AddField(
            model_name='mobilerandomtest',
            name='androidVersion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='tests.AndroidVersion'),
        ),
    ]
