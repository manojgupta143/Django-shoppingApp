#!/usr/bin/env bash
set -o errexit

python -m pip install --upgrade pip setuptools wheel
python -m pip install --upgrade --force-reinstall setuptools
python -m pip install --force-reinstall -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
