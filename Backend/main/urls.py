from cgitb import lookup
from django.urls.conf import include
from .views import *
from rest_framework.routers import DefaultRouter

from django.urls import path


router = DefaultRouter()
router.register(r'simulations', SimulationViewSet, basename="simulations")
router.register(r'preview', PreviewViewSet, basename="preview")



urlpatterns = [
    path("", include(router.urls)),
    path("test", index, name="test"),
    path("manifest.json", manifest, name="manifest")

]
