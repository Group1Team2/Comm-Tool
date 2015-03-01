from django.shortcuts import render
from django.http import HttpResponse
from comm.models import User, Room, Message
from rest_framework import viewsets
from comm.serializers import UserSerializer, RoomSerializer, MessageSerializer

# Return the main chat room
def index(request):
    return render(request, 'comm/index.html')

## Django REST framework classes...
class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer

class RoomViewSet(viewsets.ModelViewSet):
	queryset = Room.objects.all()
	serializer_class = RoomSerializer

class MessageViewSet(viewsets.ModelViewSet):
	queryset = Message.objects.all().order_by('time')
	serializer_class = MessageSerializer