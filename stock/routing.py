from django.urls import path
from .consumers import GraphConsumer

ws_urlpatterns = [
    path('ws/stock/', GraphConsumer.as_asgi())
]