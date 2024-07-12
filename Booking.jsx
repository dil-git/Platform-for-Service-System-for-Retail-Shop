import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc, getDocs, query, collection, where } from 'firebase/firestore';
import '../index.css';

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, productName, id } = location.state || {};

    const [issue, setIssue] = useState('');
    const [description, setDescription] = useState('');

    const handleSend = async () => {
        try {
            // Query to check if the product ID already exists with status 'Raised' or 'InProgress'
            const q = query(collection(db, 'service'), where('productID', '==', id), where('status', 'in', ['Raised', 'InProgress']));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert('Request already present for this product ID . Admin will contact you as soon as..!.');
                return;
            }

            // If no existing document found, proceed to save the new document
            await setDoc(doc(db, 'service', id), {
                name,
                productName,
                productID: id,
                issue,
                description,
                status: 'Raised' // New column with value 'Raised'
            });
            alert('Service request sent successfully!');
            navigate('/RequestService');
        } catch (error) {
            console.error('Error saving document:', error);
            alert('Failed to send service request');
        }
    };

    return (
        <div className="bk-body">
            <div className="booking-container">
                <div className="booking-form">
                    <h1>Service Booking Form</h1>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} readOnly />
                    </div>
                    <div>
                        <label>Product Name:</label>
                        <input type="text" value={productName} readOnly />
                    </div>
                    <div>
                        <label>Product ID:</label>
                        <input type="text" value={id} readOnly />
                    </div>
                    <div>
                        <label>Issue:</label>
                        <select value={issue} onChange={(e) => setIssue(e.target.value)}>
                            <option value="">Select issue</option>
                            <option value="Outer Body damage">Outer Body damage</option>
                            <option value="Inner Circuit Damage">Inner Circuit Damage</option>
                            <option value="Not working suddenly">Not working suddenly</option>
                            <option value="General Service">General Service</option>
                        </select>
                    </div>
                    <div>
                        <label>Description (optional):</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="button-container">
                        <button className="send-btn" onClick={handleSend}>Send</button>
                        <button className="cancel-btn" onClick={() => navigate('/RequestService')}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
