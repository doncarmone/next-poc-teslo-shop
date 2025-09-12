import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    // Methods

    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updateCartQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce(
                    (subTotal, product) => product.quantity * product.price + subTotal,
                    0
                );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                );

                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart,
                };
            },
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // Check if product is already in cart
                const productInCart = cart.some(
                    (item) => (item.id == product.id && item.size == product.size)
                )

                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return;
                }
                // If product is already in cart, we update the quantity
                const updatedCartProducts = cart.map((item) => {
                    if (item.id == product.id && item.size == product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item;
                })
                set({ cart: updatedCartProducts })
            },
            updateCartQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedCartProducts = cart.map((item) => {
                    if (item.id == product.id && item.size == product.size) {
                        return { ...item, quantity }
                    }
                    return item;
                })
                set({ cart: updatedCartProducts })
            },
            removeProductFromCart: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProducts = cart.filter((item) => {
                    return !(item.id == product.id && item.size == product.size);
                });
                set({ cart: updatedCartProducts });
            },
            clearCart: () => {
                set({ cart: [] });
            }
        })
        , {
            name: "shopping-cart"
        }


    )
)