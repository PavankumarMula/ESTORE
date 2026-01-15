import {ProductType} from "./productType";

export type CartItemType = ProductType & {
    quantity:number
    selectedSize: string
    selectedColor: string,
}