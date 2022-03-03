export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: number,
    name: string;
    category: Category;
    price: number;
}

export interface CartItem {
    id: number,
    name: string;
    quantity: number;
    category: Category;
    price: number;
}

export interface Sorter {
    category: boolean | undefined;
    price: boolean | undefined
}

export interface SorterArrowProps {
    sort: boolean | undefined
}