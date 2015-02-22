from django.db import models

class User(models.Model):

	def __repr__(self):
		return 'User: %s' % self.name

	def __str__(self):
		return self.name

	name = models.CharField(max_length=50)
	online = models.BooleanField(default=False)

# Need to add user relationship for second iteration
class Room(models.Model):

	def __repr__(self):
		return 'User: %s' % self.name

	def __str__(self):
		return self.name

	name = models.CharField(max_length=100)
	description = models.CharField(max_length=500)
	public = models.BooleanField(default=True)

class Message(models.Model):

	def __str__(self):
		return '%s - %s' % (self.user, self.name)

	text = models.TextField()
	time = models.DateTimeField(auto_now=True)
	room = models.ForeignKey(Room)
	user = models.ForeignKey(User)
	at_message = models.BooleanField(default=False)