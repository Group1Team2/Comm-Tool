from django.shortcuts import render
from django.http import HttpResponse
from comm.models import User, Room, Message
from rest_framework import viewsets, generics
from comm.serializers import UserSerializer, RoomSerializer, MessageSerializer, MessageDataSerializer, UserRoomSerializer

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

class MessageDataViewSet(viewsets.ReadOnlyModelViewSet):
	# This viewset will show all of the messages in the message model 
	# and all of the data associated with those messages.  The data from
	# the models User and Room will be displayed.
	queryset = Message.objects.all().order_by('time')
	serializer_class = MessageDataSerializer

class UserRoomViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = User.objects.all()
        serializer_class = UserRoomSerializer

#class MessageDataViewSet(generics.ListAPIView):
#	queryset = Message.objects.all()
#	serializer_class = MessageDataSerializer
