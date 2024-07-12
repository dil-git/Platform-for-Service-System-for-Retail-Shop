import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../index.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userProfiles, setUserProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const usersRef = collection(db, 'users');
                    const q = query(usersRef, where('email', '==', user.email));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const profiles = querySnapshot.docs.map(doc => doc.data());
                        setUserProfiles(profiles);
                    } else {
                        console.log("No such document!");
                        navigate('/Features');
                    }
                } catch (error) {
                    console.error("Error fetching document: ", error);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (

        <div className="up-body">
            <div className="BackToHome">
                <button onClick={() => navigate('/UserFeatures')} className="link-btn">Back to Features</button>
            </div>
            <div className="profile-container">
                {userProfiles.length > 0 ? (
                    userProfiles.map((userData, index) => (
                        <div key={index} className="profile-card">
                            <div className="profile-details">
                                <p><strong>Name:</strong> {userData.name}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>Mobile:</strong> {userData.mobile}</p>
                                <p><strong>Date:</strong> {userData.date}</p>
                                <p><strong>Product Name:</strong> {userData.productName}</p>
                                <p><strong>Serial No:</strong> {userData.serialNo}</p>
                                <p><strong>District:</strong> {userData.district}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No user data found</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
