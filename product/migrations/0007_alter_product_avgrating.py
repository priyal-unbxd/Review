# Generated by Django 3.2.8 on 2021-11-16 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0006_productrating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='avgRating',
            field=models.FloatField(default=0),
        ),
    ]
