import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getDocs, query, collection, where } from 'firebase/firestore';
import '../index.css';

const RequestService = () => {
    const navigate = useNavigate();
    const [currentUserData, setCurrentUserData] = useState(null);

    useEffect(() => {
        const fetchCurrentUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                console.log(user.email);
                
                try {
                    const q = query(collection(db, 'users'), where('email', '==', user.email));
                    const querySnapshot = await getDocs(q);
                    const results = [];
                    querySnapshot.forEach((doc) => {
                        results.push({ id: doc.id, ...doc.data() });
                    });
                    setCurrentUserData(results);
                } catch (error) {
                    console.error('Error fetching current user data:', error);
                }
            } else {
                console.error('No user is logged in');
            }
        };

        fetchCurrentUserData();
    }, []);

    const handleRequestService = (result) => {
        navigate('/Booking', { state: { name: result.name, productName: result.productName, id: result.id } });
    };

    return (
        <div className="rs-body">
            <div className="BackToHome">
                <button onClick={() => navigate('/UserFeatures')} className="link-btn">Back to Features</button>
            </div>
            <div className="RequestService-container">
                <h1>Request Service</h1>
                {currentUserData && currentUserData.length > 0 && (
                    <div>
                        <h2>Your Details</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Product Name</th>
                                    <th>Product ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUserData.map((result) => (
                                    <tr key={result.id}>
                                        <td>{result.name}</td>
                                        <td>{result.productName}</td>
                                        <td>{result.id}</td>
                                        <td>
                                            <button onClick={() => handleRequestService(result)}>Request Service</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestService;
