import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  
  orderData: order[] | undefined
  constructor(private prodServe:ProductService){}
  
  ngOnInit(): void {
     
      this.getOrderList()
  }
    
  cancelOrder(orderId:number|undefined)
  {
     orderId && this.prodServe.cancelOrder(orderId).subscribe((res)=>{
      this.getOrderList()
     })
  }
  getOrderList(){
    this.prodServe.orderList().subscribe((res)=>{
      this.orderData=res
   })
  }
}
