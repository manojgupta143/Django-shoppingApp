import json
from math import ceil
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from .models import Product,Contact,OrderUpdate,Order

#home page view 
def home(request):
    cake=Product.objects.filter(cetegory='cake')
    icecream=Product.objects.filter(cetegory='ice cream')
    punjabi=Product.objects.filter(cetegory='punjabiSweet')
    bengoli=Product.objects.filter(cetegory='bengali sweet')
    sauth=Product.objects.filter(cetegory='sauthindianSweet')
    indian=Product.objects.filter(cetegory='indianSweet')
    gujrati=Product.objects.filter(cetegory='gujratisweet')
    international=Product.objects.filter(cetegory='internationalSweet')
    params={'cake':cake,'ic':icecream,'pb':punjabi,'bs':bengoli,'sauth':sauth,'ind':indian,'gj':gujrati,'inter':international}
    return render(request,'myproj/home.html',params)

#about page 
@login_required
def about(request):
    return render(request,'myproj/aboutus.html')

#contact Page
@login_required
def contact(request):
    if request.method=="POST":
        name=request.POST.get('name', '')
        email=request.POST.get('email', '')
        phone=request.POST.get('phone', '')
        desc=request.POST.get('desc', '')
        contact =Contact(name=name, email=email, phone=phone, detail=desc)
        contact.save()
        return HttpResponseRedirect(request,'myroj/contacttq.html')
    return render(request,'myproj/contactus.html')

#tracker Order Update
@login_required

def tracker(request):
    if request.method=="POST":
        orderId = request.POST.get('orderId', '')
        email = request.POST.get('email', '')
        item = Order.objects.filter(order_id=orderId)
        items = []
        for item in item:
            items.append({"item": item.items_json})
            item = json.dumps(items)
        try:
            order = Order.objects.filter(order_id=orderId, email=email,)
            if len(order)>0:
                update = OrderUpdate.objects.filter(order_id=orderId)
                updates = []
                for item in update:
                    updates.append({'text': item.update_desc, 'time': item.timestamp})
                    response = json.dumps(updates, default=str)
                    l=len(response)
                    text=response[11:l-25]
                    date=response[len(text)+23:l-3]
                
                return render(request, 'myproj/tracker.html',{'text':text,'date':date,'item':items})
            else:
                return HttpResponse('invalid Id Or Email Please Enter A Valid Email')
        except Exception as e:
            return HttpResponse('Some Error Accur Please Try some Time later !...')
    return render(request, 'myproj/tracker.html')

#search view
@login_required
def search(request):
    if request.method=="POST":
        thank=False
        Error="No Search Found Please Search Some Valid Keyword By Categary Or name "
        quiry= request.POST.get('search')
        result = Product.objects.all()   
        for item in result:
           if quiry in item.prodname:
            result=Product.objects.filter(prodname__icontains=quiry)
            thank=True
           elif quiry in item.cetegory:
            result=Product.objects.filter(cetegory__icontains=quiry)
            thank=True   
        return render(request,'myproj/search.html',{'searchlList':result,'thank':thank,'error':Error})
    return render(request,'myproj/search.html')

#product Detail View 
def productView(request, id):
    product=Product.objects.filter(id=id)
    return render(request, "myproj/prodView.html",{'product':product})
from.forms import feedbackform
from.models import Feadback

#feedback Form view 
def feedback(request): 
    comments=Feadback.objects.filter(active=True) 
    csubmit=False 
    if request.method=='POST': 
        form=feedbackform(data=request.POST) 
        if form.is_valid(): 
            new_comment=form.save(commit=False) 
            new_comment.save() 
            csubmit=True 
    else:
        form=feedbackform() 
    return render(request,'myproj/feedback.html',{'comments':comments,'csubmit':csubmit,'form':form}) 

#product section start here =============

#  indian sweet view
@login_required
def indianSweet(request):
    products= Product.objects.filter(cetegory='indianSweet')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products,}
    return render(request,'myproj/indian.html',params)

#  Punjabi sweet view
@login_required
def punjabiSweet(request):
    products= Product.objects.filter(cetegory='punjabiSweet')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products}
    return render(request,'myproj/punjabi.html',params)

#  Sauth Indian sweet view
@login_required
def sauthIndianSweet(request):
    products= Product.objects.filter(cetegory='sauthindiansweet')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products}
    return render(request,'myproj/sauthindian.html',params)

#  bengali sweet view
@login_required
def bengaliSweet(request):
    products= Product.objects.filter(cetegory='bengali sweet')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products}
    return render(request,'myproj/bengali.html',params)

#  International sweet view
@login_required
def internationalsweet(request):
    products= Product.objects.filter(cetegory='internationalSweet')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products}
    return render(request,'myproj/international.html',params)

#  icecream sweet view
@login_required
def icecream(request):
    products= Product.objects.filter(cetegory='ice cream')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products}
    return render(request,'myproj/icecream.html',params)

#  cake sweet view
@login_required
def cake(request):
    products= Product.objects.filter(cetegory='cake')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products}
    return render(request,'myproj/cake.html',params)

#  Gujrati sweet view
@login_required
def gujratisweet(request):
    products= Product.objects.filter(cetegory='gujratiSweet')
    n= len(products)
    nSlides= n//4 + ceil((n/4) + (n//4))
    params={'no_of_slides':nSlides, 'range':range(1,nSlides), 'product': products}
    return render(request,'myproj/cake.html',params)


#  Register Form
from .forms import SignupForm
from django.http import HttpResponseRedirect
def signup_form(request): 
    form=SignupForm() 
    if request.method=='POST': 
       form=SignupForm(request.POST)
       if form.is_valid(): 
          user=form.save() 
          user.set_password(user.password) 
          user.save() 
       return HttpResponseRedirect('/accounts/login/') 
    else:
        return render(request,'myproj/signup.html',{'form':form})
def logout_view(request): 
    return render(request,'myproj/logout.html') 

#order checkout View
@login_required
def checkout(request):
    if request.method=="POST":
        items_json= request.POST.get('itemsJson')
        name=request.POST.get('name', '')
        email=request.POST.get('email', '')
        address=request.POST.get('address1', '') + " " + request.POST.get('address2', '')
        city=request.POST.get('city', '')
        state=request.POST.get('state', '')
        zip_code=request.POST.get('zip_code', '')
        phone=request.POST.get('phone', '')
        order = Order(items_json=items_json, name=name, email=email, address= address, city=city, state=state, zip_code=zip_code, phone=phone)
        order.save()
        update=OrderUpdate(order_id=order.order_id,update_desc='Your Order Has Been Placed')
        update.save()
        thank=True
        id=order.order_id  
        return render(request, 'myproj/order.html', {'thank':thank, 'id':id})
    return render(request, 'myproj/checkout.html')

