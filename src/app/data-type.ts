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
    productName:string,
    productPrice:number,
    productColor:string,
    productCategory:string,
    productDescription:string,
    image:string,
    id:number
}