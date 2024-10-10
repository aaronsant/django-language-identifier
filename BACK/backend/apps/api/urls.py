from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter(trailing_slash=False)
router.register(r"endpoints", views.EndpointViewSet, basename="endpoints")
router.register(r"mlalgorithms",views.MLAlgorithmViewSet, basename="mlalgorithms")
router.register(r"mlalgorithmstatuses", views.MLAlgorithmStatusViewSet, basename="mlalgorithmstatuses")
router.register(r"mlrequests", views.MLRequestViewSet, basename="mlrequests")

urlpatterns = [
    path("sample/predict/", views.TextSampleListCreate.as_view(), name="text-sample-list"),
    path("sample/delete/<int:pk>/", views.TextSampleDelete.as_view(),name="text-sample-delete"),
    path('ml/', include(router.urls))
]