import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase'; // Ensure you import auth from your firebase setup
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast, toastContainer } from "../toastmsg";
import '../index.css'

const Register = () => {
    const navigate = useNavigate();

    const initialFormData = {
        name: '',
        email: '',
        mobile: '',
        date: '',
        productName: '',
        serialNo: '',
        address: '',
        state: '',
        district: '',
        password: '',
        productId: '' // Add productId to the initialFormData
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let user;
            try {
                // Try to create user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                user = userCredential.user;
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email already in use, proceeding to store user data.');
                } else {
                    throw error;
                }
            }

            // Store user data in Firestore using productId as the document name
            const docRef = doc(collection(db, 'users'), formData.productId);
            await setDoc(docRef, {
                ...formData,
                uid: user ? user.uid : null // Include uid only if user was created
            });
            toast.success('Registration successful!');
            setTimeout(() => {
                navigate('/AdminFeatures');
            }, 2000);
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error('Registration failed. Please try again.');
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <div className="Reg-container">
            {toastContainer}
            <div className="BackToHome">
                <button onClick={() => navigate('/AdminFeatures')} className="link-btn">Back to Home</button>
            </div>
            <form autoComplete="off" className='reg-form' onSubmit={handleSubmit}>
                <header>Registration</header>
                <div className="fields">
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="reg-input"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="reg-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="number"
                            placeholder="Enter mobile number"
                            className="reg-input"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="date"
                            placeholder="Enter date"
                            className="reg-input"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter Product Name"
                            className="reg-input"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter Serial No"
                            className="reg-input"
                            name="serialNo"
                            value={formData.serialNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter Address"
                            className="reg-input"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter your state"
                            className="reg-input"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter your district"
                            className="reg-input"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="reg-input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Enter Product ID"
                            className="reg-input"
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='btn-field'>
                    <button type="submit" className="btn-sub">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
