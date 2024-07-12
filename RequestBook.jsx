import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { toast, toastContainer } from "../toastmsg";
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import '../index.css';

const RequestBook = () => {

    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let q;
                if (filter === 'All') {
                    q = query(collection(db, 'service'));
                } else {
                    q = query(collection(db, 'service'), where('status', '==', filter));
                }
                const querySnapshot = await getDocs(q);
                const serviceList = [];
                querySnapshot.forEach((doc) => {
                    serviceList.push({ id: doc.id, ...doc.data() });
                });
                setServices(serviceList);
            } catch (error) {
                toast.error(`Error fetching services: ${error}`);
            }
        };

        fetchData();
    }, [filter]);

    const handlePick = async (serviceId) => {
        try {
            const serviceDocRef = doc(db, 'service', serviceId);
            await updateDoc(serviceDocRef, {
                status: 'InProgress'
            });
            toast.success('Service request picked successfully!');
            setFilter('All'); // Refresh the data
        } catch (error) {
            toast.error(`Error updating document: ${error}`);
        }
    };

    const handleClose = async (serviceId) => {
        try {
            const serviceDocRef = doc(db, 'service', serviceId);
            await updateDoc(serviceDocRef, {
                status: 'Closed'
            });
            toast.success('Service request closed successfully!');
            setFilter('All'); // Refresh the data
        } catch (error) {
            toast.error(`Error updating document: ${error}`);
        }
    };

    return (
        <div className="rb-body">
            {toastContainer}
            <div className="BackToHome">
                <button onClick={() => navigate('/AdminFeatures')} className="link-btn">Back to Home</button>
            </div>
            <div className="request-book-container">
                <h1>Request Book</h1>
                <div className="filter-container">
                    <label>Filter by Status:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Raised">Raised</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Product Name</th>
                            <th>Product ID</th>
                            <th>Issue</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Pick</th>
                            <th>Close</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.name}</td>
                                <td>{service.productName}</td>
                                <td>{service.productID}</td>
                                <td>{service.issue}</td>
                                <td>{service.description}</td>
                                <td>{service.status}</td>
                                <td>
                                    {service.status === 'Raised' && (
                                        <button className="pick-btn" onClick={() => handlePick(service.id)}>Pick</button>
                                    )}
                                </td>
                                <td>
                                    {(service.status === 'Raised' || service.status === 'InProgress') && (
                                        <button className="close-btn" onClick={() => handleClose(service.id)}>Close</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestBook;
