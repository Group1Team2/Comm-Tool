from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers
from comm import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'rooms', views.RoomViewSet)
router.register(r'messages', views.MessageViewSet)

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', include('comm.urls')),
    url(r'^api/', include(router.urls)),
    
) +static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
