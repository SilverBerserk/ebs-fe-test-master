import React, { createContext, ReactNode, useState } from "react";

import { Product, CartItem } from 'app.interfaces'

interface CartItemsProps {
    cartItems: CartItem[]
    addToCart?: (item: Product) => void
    remFromCart?: (item: Product) => void
    removeItem?: (id: number) => void
}

export const CartContext = createContext<CartItemsProps>({ cartItems: [] });


export const CartContextProvider = ({ cartItems, children }: any & { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addToCart = (item: Product) => {
        const isItem = items.findIndex(e => e.id === item.id)
        if (isItem >= 0) {
            let newItems: CartItem[] = [...items]
            ++newItems[isItem].quantity
            setItems(newItems)
        }
        else
            setItems([...items, { ...item, quantity: 1 }])
    }

    const remFromCart = (item: Product) => {
        const isItem = items.findIndex(e => e.id === item.id)
        if (isItem >= 0) {
            let newItems: CartItem[] = [...items]
            if (newItems[isItem].quantity > 1) {
                --newItems[isItem].quantity
            }
            else {
                newItems.splice(isItem, 1)
            }
            setItems(newItems)

        }
    }

    const removeItem = (id: number) => {
        const isItem = items.findIndex(e => e.id === id)
        let newItems: CartItem[] = [...items]
        newItems.splice(isItem, 1)
        setItems(newItems)
    }

    return <CartContext.Provider value={{ cartItems: items, addToCart, remFromCart, removeItem }}>
        {children}
    </CartContext.Provider>
}