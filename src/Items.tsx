import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import 'css/table.css'
import { CartContext } from 'app.context'

import { Product, CartItem, SorterArrowProps, Sorter } from 'app.interfaces'
import { Link } from 'react-router-dom'


interface ProductsTableProps {
    data: Product[],
    cartData: CartItem[],
    addItem?: (item: Product) => void,
    remItem?: (item: Product) => void
}

const SorterArrow = ({ sort }: SorterArrowProps) => {
    return sort === undefined ? <></> : sort ? <span>^</span> : <span>v</span>
}

const ProductsTable = ({ data, cartData, addItem, remItem }: ProductsTableProps) => {
    const [sorter, setSorter] = useState<Sorter>({ category: true, price: undefined })

    const sortedData = sorter.category === undefined ?
        data.sort((a, b) => sorter.price ? a.price - b.price : b.price - a.price) :
        data.sort((a, b) => sorter.category ? a.id - b.id : b.id - a.id)

    const onChangeCategory = (sortBy: string) => {
        if (sortBy === 'cat')
            setSorter({ category: sorter.category === true ? false : true, price: undefined })
        else
            setSorter({ category: undefined, price: sorter.price === true ? false : true })
    }

    return (<table>
        <thead><tr>
            <th onClick={() => onChangeCategory('cat')} style={{ cursor: 'pointer' }}>
                <span>Category</span>
                <SorterArrow sort={sorter.category} />
            </th>
            <th>Name</th>
            <th onClick={() => onChangeCategory('price')} style={{ cursor: 'pointer' }}>
                <span>Price</span>
                <SorterArrow sort={sorter.price} /></th>
            <th>Actions</th></tr></thead>
        <tbody>
            {sortedData.map(e => <tr key={e.id}>
                <td>{e.category.name}</td>
                <td>{e.name}</td>
                <td>{'$' + e.price}</td>
                <td style={{ textAlign: 'center' }} >
                    {cartData.find(c => c.id === e.id) && <span onClick={() => remItem && remItem(e)}>(-)</span>}
                    <span>{cartData.find(c => c.id === e.id) ? cartData.find(c => c.id === e.id)?.quantity : 'Select'}</span>
                    <span onClick={() => addItem && addItem(e)}>(+)</span>
                </td>
            </tr>)}
        </tbody>
    </table>)
}

const Items = () => {

    const [load, setLoad] = useState<Boolean>(true)
    const [error, setError] = useState<String>('')
    const [data, setData] = useState<Product[]>([])

    const context = useContext(CartContext)

    useEffect(() => {
        setLoad(true)
        axios.get('http://localhost:3001/api/products/')
            .then(res => {
                setLoad(false)
                setData(res.data)
            })
            .catch(err => {
                setLoad(false)
                setError(err.message)
            })
    }, [])


    return load ? <div>loading...</div> : error ? <div>{error}</div> :
        <>
            <Link to='/cart'>Cart ({context.cartItems.length})</Link>
            <ProductsTable data={data} addItem={context.addToCart} remItem={context.remFromCart} cartData={context.cartItems} /></>
}


export default Items