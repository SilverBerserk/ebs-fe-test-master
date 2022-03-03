import React from 'react'
import Items from "./Items"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartContextProvider } from './app.context'
import CartItems from 'CartItems'

const App = () => {
    return <CartContextProvider>
        <Router>
            <Routes>
                <Route path='/' element={<Items />} />
                <Route path='/cart' element={<CartItems />} />
            </Routes >
        </Router>
    </CartContextProvider>

}

export default App