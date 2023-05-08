import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, order, product } from './data-type';
import { query } from '@angular/animations';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  dataCart = new EventEmitter<product[] | []>()

  constructor(private http:HttpClient, private router:Router) { }

  addProduct(data:product)
  {
  return this.http.post('http://localhost:3000/products',data);
  }
  listProduct()
  {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id:number)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProductById(id:string)
  {
     return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:product)
  {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
  }
  fewProductAdd()
  {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  latestProducts()
  {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=12');
  }

  searchProduct(query:string)
  {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data:product)
  {
    let cartData=[];
    let localCart=localStorage.getItem('localCart');


    if(!localCart)
    {
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.dataCart.emit([data])
    }
    else
    {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
    this.dataCart.emit(cartData)
  }
  removeItemFromCart(productId:number)
  {
    let cartData=localStorage.getItem('localCart');
    if(cartData)
    {
      let items:product[] = JSON.parse(cartData);
      items = items.filter((item:product)=>productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.dataCart.emit(items)
    }
  }
  addCart(cartData:Cart)
  {
    return this.http.post(`http://localhost:3000/cart`,cartData)
  }
  getCartList(userId:number)
  {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=`+userId,
    {observe:'response'}).subscribe((res)=>{
    console.log(res)
      if(res && res.body)
      {
         this.dataCart.emit(res.body)
      }
    })
  }
  removeToCart(cartId:number)
  {
    return this.http.delete(`http://localhost:3000/cart/`+cartId)
  }

  currentCart()
  {
    let storeUserValue=localStorage.getItem('user');
    let setUserValue=storeUserValue && JSON.parse(storeUserValue)
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=`+setUserValue.id)
  }

  orderNow(data:order)
  {
    return this.http.post(`http://localhost:3000/orders`,data)
  }

  orderList()
  {
    let storeUserValue=localStorage.getItem('user');
    let setUserValue=storeUserValue && JSON.parse(storeUserValue)
    return this.http.get<order[]>(`http://localhost:3000/orders?=userId`+setUserValue.id)
  }

  deleteCartItems(cartId:number)
  {
    return this.http.delete(`http://localhost:3000/cart/`+cartId,{observe:"response"}).subscribe((res)=>{
      if(res)
      {
        this.dataCart.emit([])
      }
    })
  }
  cancelOrder(orderId:number)
  {
     return this.http.delete(`http://localhost:3000/orders/`+orderId)
  }
}

