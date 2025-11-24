def get_bot_response(user_id: str) -> str:   
  if user_id == 'user_a':
    return f'Agradecemos pelo seu contato, {user_id}! Responderemos o mais breve possível.'

  return f'Seu ticket foi registrado {user_id}! Obrigado pelo envio da sua mensagem.'