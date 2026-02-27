import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cartstoreActionsType, CartStoreType } from "@/types/cartItemsType";

const useCartStore = create<CartStoreType & cartstoreActionsType>()(
    persist(
        (set) => ({
            cart: [],

            addToCart: (product) =>
                set((state) => {
                    // 1. Check if the exact same variant (ID + Color + Size) already exists in cart
                    const existingItem = state.cart.find(
                        (item) =>
                            item.id === product.id &&
                            item.selectedColor === product.selectedColor &&
                            item.selectedSize === product.selectedSize
                    );

                    if (existingItem) {
                        // 2. If it exists, update the quantity of that specific item
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id &&
                                    item.selectedColor === product.selectedColor &&
                                    item.selectedSize === product.selectedSize
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    // 3. If it's a new item/variant, add it to the array
                    return { cart: [...state.cart, product] };
                }),

            removeFromCart: (product) =>
                set((state) => {
                    // 1. Find the specific variant
                    const existingProduct = state.cart.find(
                        (p) =>
                            p.id === product.id &&
                            p.selectedColor === product.selectedColor &&
                            p.selectedSize === product.selectedSize
                    );

                    if (!existingProduct) return state; // Do nothing if item isn't there

                    if (existingProduct.quantity > 1) {
                        // 2. Decrease quantity if more than 1 exists
                        return {
                            cart: state.cart.map((p) =>
                                p.id === product.id &&
                                    p.selectedColor === product.selectedColor &&
                                    p.selectedSize === product.selectedSize
                                    ? { ...p, quantity: p.quantity - 1 }
                                    : p
                            ),
                        };
                    }

                    // 3. Remove completely if quantity is 1
                    return {
                        cart: state.cart.filter(
                            (p) =>
                                !(p.id === product.id &&
                                    p.selectedColor === product.selectedColor &&
                                    p.selectedSize === product.selectedSize)
                        ),
                    };
                }),


            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart-storage", // key in localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);

console.log("cart in", useCartStore)

export default useCartStore;