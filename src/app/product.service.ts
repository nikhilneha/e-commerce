import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { product } from './data-type';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private router:Router) { }

  addProduct(data:product)
  {
  return this.http.post('http://localhost:3000/products',data);
  }
  listProduct()
  {
    return this.http.get('http://localhost:3000/products');
  }
  deleteProduct(id:number)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProductById(id:string)
  {
     return this.http.get(`http://localhost:3000/products/${id}`)
  }
  updateProduct(data:product)
  {
    return this.http.put(`http://localhost:3000/products/${data.id}`,data)
  }
  fewProductAdd()
  {
    return this.http.get('http://localhost:3000/products?_limit=3');
  }
  latestProducts()
  {
    return this.http.get('http://localhost:3000/products?_limit=12');
  }

  searchProduct(query:string)
  {
    return this.http.get(`http://localhost:3000/products?q=${query}`)
  }
}
