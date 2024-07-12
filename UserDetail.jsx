// UserDetail.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import '../index.css';

const UserDetail = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = email ? query(collection(db, 'users'), where('email', '==', email)) : collection(db, 'users');
                const querySnapshot = await getDocs(q);
                const userData = [];
                querySnapshot.forEach((doc) => {
                    userData.push({ id: doc.id, ...doc.data() });
                });
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [email]);

    return (
        <div className="ud-body">
             <div className="BackToHome">
                <button onClick={() => navigate('/AdminFeatures')} className="link-btn">Back to Home</button>
            </div>
            <div className="user-detail-container">
                <h1>User Details</h1>
                <div className="filter-container">
                    <label>Filter by Email:</label>
                    <input
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {users.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Mobile No</th>
                                <th>Date</th>
                                <th>Address</th>
                                <th>District</th>
                                <th>Password</th>
                                <th>Product ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.date}</td>
                                    <td>{user.address}</td>
                                    <td>{user.district}</td>
                                    <td>{user.password}</td>
                                    <td>{user.productId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetail;
