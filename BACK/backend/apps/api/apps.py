from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.api" # name = "api" causes ERROR!!! -> must add "apps." before "api" as shown
