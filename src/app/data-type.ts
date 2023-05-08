export interface SignUp
{
    name:string,
    password:string,
    email:string
}

export default interface login{
    email:string,
    password:string
}

export interface product
{
    productId:undefined | number;
    productName:string,
    productPrice:number,
    productColor:string,
    productCategory:string,
    productDescription:string,
    image:string,
    id:number,
    quantity:undefined | number
}

export interface Cart
{
    productName:string,
    productPrice:number,
    productColor:string,
    productCategory:string,
    productDescription:string,
    image:string,
    id:number | undefined,
    quantity:undefined | number,
    userId:undefined |number,
    productId:number
}

export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order
{
    email:string,
    adress:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number | undefined
}