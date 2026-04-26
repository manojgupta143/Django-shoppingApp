# Django Shopping App Deployment

This project is now prepared for free deployment on Render.

## Local development

1. Create `.env` file (optional for local):

```
SECRET_KEY=django-insecure-local-dev-key
DEBUG=True
USE_DATABASE_URL=False
ALLOWED_HOSTS=127.0.0.1,localhost
```

2. Run locally:

```
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

## Free deployment on Render

1. Push this repository to GitHub.
2. In Render, create a **Blueprint** from the repo (`render.yaml` is included).
3. Keep free plans selected for web service and Postgres.
4. Update these env vars in Render after first deploy:
   - `ALLOWED_HOSTS` (use your real Render domain)
   - `CSRF_TRUSTED_ORIGINS` (full https URL of your Render domain)
5. Deploy.

## Required environment variables

- `SECRET_KEY`
- `DEBUG` (`False` in production)
- `USE_DATABASE_URL` (`True` in production)
- `DATABASE_URL` (provided by Render database)
- `ALLOWED_HOSTS` (comma-separated)
- `CSRF_TRUSTED_ORIGINS` (comma-separated full URLs)
