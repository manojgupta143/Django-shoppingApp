
from django.contrib import admin
from django.urls import path,include,re_path
from sweetvillaApp import views
from django.conf import settings
from django.views.static import serve
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',include('django.contrib.auth.urls'),name='login'), 
    path('',views.home),
    path('aboutus/',views.about),
    path('contactUs/',views.contact),
    path('tracker/',views.tracker ,name="tracker"),
    path('search/',views.search ,name='search'),
    path('products/<int:id>/',views.productView,name='ProductView'),
    path('checkout/',views.checkout,name='checkout/'),
    path('feadback/',views.feedback,name='Feedback'),
    path('indiansweet/',views.indianSweet,name="indiansweet"),
    path('punjabisweet/',views.punjabiSweet,name="punjabisweet"),
    path('internationalsweet/',views.internationalsweet,name="internationalsweet"),
    path('bengalisweet/',views.bengaliSweet,name="bengalisweet"),
    path('sauth_indian_sweet/',views.sauthIndianSweet,name="sauth_indian_sweet"),
    path('cake/',views.cake,name="cake"),
    path('icecream/',views.icecream,name="icecream"),
    path('gujratisweet/',views.gujratisweet,name="gujratisweet"),
    path('signup/',views.signup_form,name='signup/'), 
    path('logout/', views.logout_view),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT})
]
