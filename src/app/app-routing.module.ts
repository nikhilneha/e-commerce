import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerProductAddComponent } from './seller-product-add/seller-product-add.component';

const routes: Routes = [
  {
    path:"", component:HomeComponent
  },
  {
    path:"seller-auth", component:SellerAuthComponent
  },
  {
    path:"seller-home", component:SellerHomeComponent,canActivate:[AuthGuard]
  },
  {
    path:'seller-product-add', component:SellerProductAddComponent,canActivate:[AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
