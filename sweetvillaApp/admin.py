from django.contrib import admin
from.models import Product,Contact
from .models import Order
from.models import Feadback
from.models import OrderUpdate
class productadmin(admin.ModelAdmin):
   readonly_fields = ('id',)

# Register your models here.
class contactAdmin(admin.ModelAdmin):
   pass
class orderadmin(admin.ModelAdmin):
   pass
class feedbackadmin(admin.ModelAdmin):
   pass
class orderUpdateadmin(admin.ModelAdmin):
   fields=('order_id', 'update_desc', )
   readonly_fields = ('update_id',)
admin.site.register(Product,productadmin)
admin.site.register(Contact,contactAdmin)
admin.site.register(Order,orderadmin)
admin.site.register(Feadback,orderadmin)
admin.site.register(OrderUpdate,orderUpdateadmin)
# Register your models here.
