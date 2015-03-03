from comm.models import User, Room, Message
from rest_framework import routers, serializers, viewsets

# Get list of online users
# Get last 100 messages

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('name', 'online')

class RoomSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Room
		fields = ('name', 'description', 'public')

class MessageSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Message
		fields = ('text', 'time', 'at_message', 'room', 'user')

class MessageDataSerializer(serializers.HyperlinkedModelSerializer):
	room = RoomSerializer()
	user = UserSerializer()
	class Meta:
		model = Message
		fields = ('text', 'time', 'at_message', 'room', 'user')

# class PaginatedMessageSerializer(serializers.PaginationSerializer):
# 	class Meta:
# 		object_serializer_class = MessageSerializer