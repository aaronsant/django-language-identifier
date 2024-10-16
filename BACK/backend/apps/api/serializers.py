from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TextSample, Endpoint, MLAlgorithm, MLAlgorithmStatus, MLRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password", "date_joined"]
        extra_kwargs= {
            "password": {"write_only": True},
            "date_joined": {"read_only": True},}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class TextSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextSample
        fields = ["id", "content", "endpoint_name", "language_detected", "created_at", "author", "mlrequest"]
        extra_kwargs = {
            "author": {"read_only": True},
            "language_detected" : {"read_only": True},
            "mlrequest": {"read_only": True},
        }
        
class EndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endpoint
        read_only_fields = ("id", "name", "owner", "created_at")
        fields = read_only_fields


class MLAlgorithmSerializer(serializers.ModelSerializer):

    current_status = serializers.SerializerMethodField(read_only=True)

    def get_current_status(self, mlalgorithm):
        return MLAlgorithmStatus.objects.filter(parent_mlalgorithm=mlalgorithm).latest('created_at').status

    class Meta:
        model = MLAlgorithm
        read_only_fields = ("id", "name", "description", "code",
                            "version", "owner", "created_at",
                            "parent_endpoint", "current_status")
        fields = read_only_fields

class MLAlgorithmStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLAlgorithmStatus
        read_only_fields = ("id", "active")
        fields = ("id", "active", "status", "created_by", "created_at",
                            "parent_mlalgorithm")

class MLRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLRequest
        read_only_fields = (
            "id",
            "input_data",
            "full_response",
            "response",
            "created_at",
            "parent_mlalgorithm",
        )
        fields =  (
            "id",
            "input_data",
            "full_response",
            "response",
            "feedback",
            "created_at",
            "parent_mlalgorithm",
        )