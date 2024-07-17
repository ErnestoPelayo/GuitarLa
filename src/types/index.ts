
export type guitarItem = {
    id : number,
    name:string,
    image:string,
    description:string,
    price:number
}

export type cartItem  = guitarItem & {
    quantity : number
}