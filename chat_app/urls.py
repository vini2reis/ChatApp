from django.urls import path
from .views import ChatView, HistoryView

urlpatterns = [
  path('chat/', ChatView.as_view(), name='msg_send'),
  path('history/<str:user_id>/', HistoryView.as_view(), name='history_detail'),
]