import {ProductType} from "./productType";

export type CartItemType = ProductType & {
    quantity:number
    selectedSize: string
    selectedColor: string,
}

export type CartStoreType =  {
    cart:CartItemType[]
}

export type cartstoreActionsType = {
    addToCart: (product: CartItemType)=>void,
    removeFromCart: (product: CartItemType)=>void,
    clearCart:()=>void
}