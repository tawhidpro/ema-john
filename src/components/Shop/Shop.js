import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
// import DisplayCartItems from '.. /DisplayCartItem/DisplayCartItems';
// import { library } from '@fortawesome/fontawesome-svg-core';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKey',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
                },
                body: JSON.stringify(productKeys)
            })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                    {
                       products.map(product =>  <Product
                         showAddToCart={true} 
                         key={product.key} handleAddProduct={handleAddProduct} 
                         product={product}  >
                         </Product> )
                    }       
            </div>
            <div className="cart-container">
                <h3>Your selected products list</h3>
                {/* {
                    cart.map(element =>  <DisplayCartItems  data={element} ></DisplayCartItems> )
                } */}
                 <Cart cart={cart}>
                    <Link to="/review"><button className="checkOutBtn" >Review Products</button></Link>
                </Cart> 
            </div>
        </div>
    );
};

export default Shop;