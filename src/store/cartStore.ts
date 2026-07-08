import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product, ProductPresentation } from "../data/mockProducts";

export type CartItem = {
    product: Product;
    presentation: ProductPresentation;
    quantity: number;
    discountPercent: number;
};

type CartState = {
    cart: CartItem[];
    amountReceived: number;
    addProduct: (product: Product) => void;
    updateQuantity: (index: number, quantity: number) => void;
    changeQuantity: (index: number, delta: number) => void;
    updateDiscount: (index: number, value: string) => void;
    updatePresentation: (index: number, presentationId: number) => void;
    removeItem: (index: number) => void;
    clearCart: () => void;
    setAmountReceived: (amount: number) => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            amountReceived: 0,
            addProduct: (product) => {
                const defaultPresentation = product.presentations[0];

                set((state) => {
                    const existingItemIndex = state.cart.findIndex(
                        (item) => 
                            item.product.id === product.id &&
                            item.presentation.id === defaultPresentation.id
                    );

                    if (existingItemIndex >=0) {
                        return {
                            cart: state.cart.map((item, index) => 
                                index === existingItemIndex
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1,
                                }
                                : item
                            ),
                        };
                    }

                    return {
                        cart: [
                            ...state.cart,
                            {
                                product,
                                presentation: defaultPresentation,
                                quantity: 1,
                                discountPercent: 0
                            },
                        ],
                    };
                });
            },

            updateQuantity: (index, quantity) => {
                if (Number.isNaN(quantity)) return;

                set((state) => ({
                    cart: state.cart.map((item, itemIndex) => 
                    itemIndex === index
                        ? {
                            ...item,
                            quantity: quantity <= 0 ? 1 : quantity,
                        }
                        : item
                    ),
                }));
            },

            changeQuantity: (index, delta) => {
                set((state) => ({
                    cart: state.cart.map((item, itemIndex) => {
                        if (itemIndex !== index) return item;
                        const newQuantity = item.quantity + delta;

                        return {
                        ...item,
                        quantity: newQuantity <= 0 ? 1 : newQuantity,
                        };
                    }),
                }));
            },

            updateDiscount: (index, value) => {
                if (value === "") {
                    set((state) => ({
                        cart: state.cart.map((item, itemIndex) => 
                            itemIndex === index ? { ...item, discountPercent: 0 } : item
                        ),
                    }));

                    return;
                }

                const discountPercent = Number(value);
                if (Number.isNaN(discountPercent)) return;

                const normalizedDiscount = Math.min(100, Math.max(0, discountPercent));

                set((state) => ({
                    cart: state.cart.map((item, itemIndex) =>
                        itemIndex === index
                            ? { ...item, discountPercent: normalizedDiscount }
                            : item
                    ),
                }));
            },

            updatePresentation: (index, presentationId) => {
                set((state) => ({
                    cart: state.cart.map((item, itemIndex) => { 
                        if (itemIndex !== index) return item;
                        const selectedPresentation = item.product.presentations.find(
                            (presentation) => presentation.id === presentationId
                        );

                        if (!selectedPresentation) return item;
                        
                        return {
                            ...item,
                            presentation: selectedPresentation
                        };
                    }),
                }));
            },

            removeItem: (index) => {
                set((state) => ({
                    cart: state.cart.filter((_, itemIndex) => itemIndex !== index),
                }));
            },

            clearCart: () => {
                set({
                    cart: [],
                    amountReceived: 0,
                });
            },

            setAmountReceived: (amount) => {
                set({
                    amountReceived: Number.isNaN(amount) ? 0 : amount,
                });
            },
        }),
        {
            name: "store-pos-cart"
        }
    )
);