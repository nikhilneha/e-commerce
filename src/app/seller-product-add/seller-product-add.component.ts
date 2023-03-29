import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-seller-product-add',
  templateUrl: './seller-product-add.component.html',
  styleUrls: ['./seller-product-add.component.css']
})
export class SellerProductAddComponent {
 
  constructor(private prodServ:ProductService,private router:Router){}

  product:FormGroup=new FormGroup({
    productName:new FormControl(),
    productPrice:new FormControl(),
    productColor:new FormControl(),
    productCategory:new FormControl(),
    productDescription:new FormControl(),
    image:new FormControl()
  })

  submit(data:product)
  {
    this.prodServ.addProduct(this.product.value).subscribe((res)=>{
      alert("Product Added Successfully")
      this.router.navigate(['seller-home'])

    })
  }

}
