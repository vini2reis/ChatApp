from django.contrib import admin
from .models import Message

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
  list_display = ('user_id', 'message', 'response', 'sent_at')
  list_filter = ('user_id',)