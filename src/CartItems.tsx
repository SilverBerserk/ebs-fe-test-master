import React, { useContext } from 'react'
import 'css/table.css'
import { CartContext } from 'app.context'


import { CartItem, Product } from 'app.interfaces'
import { Link } from 'react-router-dom'

interface ProductsTableProps {
    data: CartItem[]
    addItem?: (item: Product) => void
    remItem?: (item: Product) => void
    removeItem?: (id: number) => void
}


const ProductsTable = ({ data, addItem, remItem, removeItem }: ProductsTableProps) =>
    <table>
        <thead><tr>
            <th>Category</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th></tr></thead>
        <tbody>
            {data.map(e => <tr key={e.id}>
                <td>{e.category.name}</td>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>{'$' + (e.price * e.quantity).toLocaleString('en-US')}</td>
                <td style={{ textAlign: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => remItem && remItem({ id: e.id, category: e.category, name: e.name, price: e.price })}>(-)</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => removeItem && removeItem(e.id)}>Remove</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => addItem && addItem({ id: e.id, category: e.category, name: e.name, price: e.price })}>(+)</span>
                </td>
            </tr>)}
        </tbody>
    </table>


const CartItems = () => {
    const context = useContext(CartContext)
    return <>
        <Link to='/'>{'<== go back'}</Link>
        {context.cartItems.length === 0 ? <div>no items in your card</div> :
            <ProductsTable data={context.cartItems} addItem={context.addToCart} remItem={context.remFromCart} removeItem={context.removeItem} />}
    </>
}


export default CartItems