#!/usr/bin/env bash
set -o errexit

python -m pip install --upgrade pip setuptools==82.0.0 wheel==0.42.0
python -m pip install --force-reinstall setuptools==82.0.0 wheel==0.42.0
python -m pip install --force-reinstall -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
