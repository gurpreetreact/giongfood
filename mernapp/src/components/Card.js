import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let priceOption = Object.keys(props.options);
    const priceRef = useRef();

    // Log qty whenever it changes
    useEffect(() => {
        console.log("Quantity changed to:", qty);
    }, [qty]);

    const handleAddToCart = async () => {






        console.log("Adding to cart with qty:", qty); // Confirm qty here
        await dispatch({
            type: "ADD",
            id: props.foodItem.id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.foodItem.img
        });
        console.log("Item added to cart:", { id: props.foodItem.id, name: props.foodItem.name });
    };

    let finalPrice = qty * parseInt(props.options[size] || 0);

    // Set initial size based on the first option available
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div className="card mt-3 bg-dark text-light" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="Food item" style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select
                            className="m-2 h-100 bg-success rounded"
                            onChange={(e) => setQty(Number(e.target.value))} // Convert to number
                        >
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select
                            className="m-2 h-100 bg-success rounded"
                            ref={priceRef}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOption.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                        <hr />
                        <button className="btn btn-success justify-content ms-2" onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
