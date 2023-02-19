from django.db import models
from django.urls import reverse

#products Model 

class Product(models.Model):
    prodname=models.CharField(("product Name "), max_length=50)
    cetegory=models.CharField(("Cetegory"), max_length=60,default="")
    price=models.IntegerField(default=0)
    desc=models.CharField(("Description"), max_length=300)
    publish_date=models.DateField(("publishDate"))
    images=models.ImageField(("Images"), upload_to='EcommerceApp/images',default="")
    def __str__(self):
      return self.prodname
    def get_absolute_url(self):
        return reverse("ProductView", kwargs={"id": self.id})

#contact Model 
class Contact(models.Model):
  name=models.CharField(("Name "), max_length=30 ,default="")
  email=models.EmailField(("Email"), max_length=30 ,default="")
  phone = models.CharField(max_length=70, default="")
  detail=models.CharField(("Description"), max_length=500 ,default="")
  def __str__(self):
        return self.name

#order Model
class Order(models.Model):
    order_id= models.AutoField(primary_key=True)
    items_json= models.CharField(max_length=5000)
    name=models.CharField(max_length=90)
    email=models.CharField(max_length=111)
    address=models.CharField(max_length=111)
    city=models.CharField(max_length=111)
    state=models.CharField(max_length=111)
    zip_code=models.CharField(max_length=111)
    phone=models.CharField(max_length=12,default='')
    def __str__(self):
        return self.name
    

#feadback Form
from django.utils import timezone   
class Feadback(models.Model):
    name=models.CharField( max_length=32)
    email=models.EmailField()
    body=models.TextField()
    created=models.DateTimeField( auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)
    active=models.BooleanField(default=True)
    class Meta:
        ordering=('-created',)
    def __str__(self):
        return 'Commented by{} on {}'.format(self.name,self.prodname)

#order tracker Model
class OrderUpdate(models.Model):
    update_id= models.AutoField(primary_key=True)
    order_id= models.IntegerField(default="")
    update_desc= models.CharField(max_length=5000)
    timestamp= models.DateField(auto_now_add= True)

def __str__(self):
    return self.update_desc[0:7] + "..."
# Create your models here.

