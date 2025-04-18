# Generated by Django 4.2.5 on 2025-02-06 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_chat', '0002_alter_user_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='disease',
        ),
        migrations.RemoveField(
            model_name='user',
            name='disease_level',
        ),
        migrations.RemoveField(
            model_name='user',
            name='parents_email',
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
    ]
