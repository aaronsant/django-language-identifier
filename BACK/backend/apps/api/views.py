import json
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, mixins
from .serializers import UserSerializer, TextSampleSerializer, EndpointSerializer, MLAlgorithmSerializer, MLAlgorithmStatusSerializer, MLRequestSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import TextSample, Endpoint, MLAlgorithm, MLAlgorithmStatus, MLRequest
from apps.ml.registry import MLRegistry
from backend.wsgi import registry

# Create your views here.
class TextSampleListCreate(generics.ListCreateAPIView):
    serializer_class = TextSampleSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return TextSample.objects.filter(author=user)
        else:
            return TextSample.objects.none()   

    def perform_create(self, serializer):
        '''
        if serializer.is_valid():
            languageDetected = "NO LANG"
            if self.request.user.is_authenticated:
                serializer.save(author=self.request.user, language_detected=languageDetected)
            else:
                serializer.save(language_detected=languageDetected)   
        else:
            print(serializer.errors)
        '''
        if serializer.is_valid():
            text_data = serializer.validated_data.get('content')
            endpoint_name = self.request.data.get('endpoint_name', None)
            
            algorithm_status = self.request.query_params.get("status", "production")
            algorithm_version = self.request.query_params.get("version")

            algs = MLAlgorithm.objects.filter(parent_endpoint__name = endpoint_name, status__status = algorithm_status, status__active=True)
        
            if algorithm_version is not None:
                algs = algs.filter(version = algorithm_version)

            if len(algs) == 0:
                print('NO ALGOS')
            
            registered_algos = list(registry.endpoints.keys())
            alg_id = 0
            alg_index = 0
            for idx, alg in enumerate(algs):
                if alg.id in registered_algos and alg.id > alg_id:
                    alg_id = alg.id
                    alg_index = idx
                    
            algorithm_object = registry.endpoints[alg_id]
            
            prediction = algorithm_object.compute_prediction(text_data)
            lang_detected = prediction["label"] if "label" in prediction else "error"
            
            ml_request = MLRequest.objects.create(
                input_data=json.dumps(self.request.data),
                full_response=prediction,
                response=lang_detected,
                feedback="",
                parent_mlalgorithm=algs[alg_index],
            )
            
            if self.request.user.is_authenticated:
                serializer.save(author=self.request.user, language_detected=lang_detected, mlrequest_id=ml_request.id)
            else:
                serializer.save(language_detected=lang_detected, mlrequest_id=ml_request.id)   
                
        else:
            print(serializer.errors)
            
            

class TextSampleDelete(generics.DestroyAPIView):
    serializer_class = TextSampleSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return TextSample.objects.filter(author=user)
        else:
            return TextSample.objects.none()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class UserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        return user


# ML VIEWS ----> deploymachinelearning.com
class EndpointViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = EndpointSerializer
    queryset = Endpoint.objects.all()
    permission_classes = [AllowAny]


class MLAlgorithmViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = MLAlgorithmSerializer
    queryset = MLAlgorithm.objects.all()
    permission_classes = [AllowAny]


def deactivate_other_statuses(instance):
    old_statuses = MLAlgorithmStatus.objects.filter(parent_mlalgorithm = instance.parent_mlalgorithm,
                                                        created_at__lt=instance.created_at,
                                                        active=True)
    for i in range(len(old_statuses)):
        old_statuses[i].active = False
    MLAlgorithmStatus.objects.bulk_update(old_statuses, ["active"])

class MLAlgorithmStatusViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = MLAlgorithmStatusSerializer
    queryset = MLAlgorithmStatus.objects.all()
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        try:
            with transaction.atomic():
                instance = serializer.save(active=True)
                # set active=False for other statuses
                deactivate_other_statuses(instance)



        except Exception as e:
            raise APIException(str(e))

class MLRequestViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.UpdateModelMixin):
    serializer_class = MLRequestSerializer
    queryset = MLRequest.objects.all()
    permission_classes = [AllowAny]

     
