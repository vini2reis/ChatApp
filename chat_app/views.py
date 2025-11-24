
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MessageSerializer
from .services import get_bot_response

class ChatView(APIView):
  def post(self, request):
    user_id = request.data.get('user_id')
    message = request.data.get('message')

    response = get_bot_response(user_id)

    message_data = {
      'user_id': user_id,
      'message': message,
      'response': response
    }

    serializer = MessageSerializer(data=message_data)
    if serializer.is_valid():
      serializer.save()
    
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
