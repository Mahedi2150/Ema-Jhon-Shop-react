import React from 'react';
import { useForm } from 'react-hook-form';
import "./Shipping.css"
import useAuth from './../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
const Shipping = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth()
    const onSubmit = data => {
        const savesCart = getStoredCart()
        data.order = savesCart

        fetch('http://localhost:5000/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert("order processed seccessfully");
                    clearTheCart()
                    reset()
                }
            })
    };
    return (
        <div>
            <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue={user.displayName} {...register("name")} />

                <input defaultValue={user.email} {...register("email", { required: true })} />
                <input defaultValue="" placeholder="Address" {...register("address")} />
                <input defaultValue="" placeholder="Phone number" {...register("phone")} />
                {errors.email && <span className="error">This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;