# Generated by Django 3.2.8 on 2022-09-06 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sweetvillaApp', '0008_order_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feadback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('email', models.EmailField(max_length=254)),
                ('body', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
    ]
