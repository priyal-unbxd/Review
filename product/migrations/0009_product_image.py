# Generated by Django 3.2.8 on 2021-11-24 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_auto_20211116_2135'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(default='D:\\Vini Projects\\projects\\Review\\static\\images\\hoodie.jpg', upload_to='images/'),
            preserve_default=False,
        ),
    ]
