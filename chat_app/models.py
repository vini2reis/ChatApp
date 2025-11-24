from django.db import models

class Message(models.Model):
    user_id = models.CharField(
      max_length=10, 
      choices=[('user_a', 'Usuário A'), ('user_b', 'Usuário B')],
      verbose_name="ID do Usuário"
    )
    message = models.TextField(verbose_name="Mensagem do Usuário")
    response = models.TextField(verbose_name="Resposta do Bot")
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
      return f"[{self.user_id}] - {self.message[:10]}..."

    class Meta:
      ordering = ['sent_at']