import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

const materialComponent=[
  MatFormFieldModule
]

@NgModule({
  declarations: [],
  imports: [
    materialComponent
  ],
  exports:[
    materialComponent
  ]
})
export class MaterialModule { }
