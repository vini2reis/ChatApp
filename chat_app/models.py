from django.db import models

class Message(models.Model):
    user_id = models.CharField(
      max_length=10, 
      choices=[('user_a', 'user_a'), ('user_b', 'user_b')]
    )
    message = models.TextField()
    response = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
      return f"[{self.user_id}] - {self.message[:10]}..."

    class Meta:
      ordering = ['sent_at']