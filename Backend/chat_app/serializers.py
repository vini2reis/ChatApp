from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Message
    fields = ['id', 'user_id', 'message', 'response', 'sent_at']
    read_only_fields = ['sent_at']
