from django.db import models

# Create your models here.
class User(models.Model):
	name = models.CharField(max_length=50)
	online = models.BooleanField(default=False)

class Room(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=500)
	public = models.BooleanField(default=True)

class Message(models.Model):
	text = models.TextField()
	time = models.TimeField(auto_now=True)
	room = models.ForeignKey(Room)
	user = models.ForeignKey(User)
	at_message = models.BooleanField(default=False)