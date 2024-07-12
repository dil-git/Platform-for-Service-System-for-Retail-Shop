import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';
import { faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import '../index.css'

const Features = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Logged out successfully!');
            navigate('/');
        } catch (error) {
            alert('Error logging out:', error);
        }
    };

    return (
        <div className="container-ss">
            <div> <button className="btn-lo" onClick={handleLogout}>LogOut</button></div>
            <h1>Solution Suite</h1>
            <div className="row">
                <div className="features" onClick={() => navigate('/UserProfile')}>
                    <FontAwesomeIcon icon={faUser} className="fa-icon" />
                    <h2>View Profile</h2>
                    <p>Access your profile details instantly and securely.</p>
                </div>
                <div className="features" onClick={() => navigate('/RequestService')}>
                    <FontAwesomeIcon icon={faPenToSquare} className="fa-icon" />
                    <h2>Request Service</h2>
                    <p>Submit your service requests effortlessly.</p>
                </div>
                {/*<div className="features" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faBell} className="fa-icon" />
                    <h2>Notification</h2>
                    <p>Stay informed with real-time updates and alerts.</p>
                </div>*/}
            </div>
            <div className="guidelines">
                <p>
                    Welcome to the Service Request Management System. Here, you can easily submit requests for various services, track the status of your requests in real-time, and receive timely notifications about updates. Make sure to provide detailed information when submitting a request to ensure prompt and accurate service. For any issues or assistance, please contact our support team.
                </p>
            </div>
        </div>
    );
};

export default Features;
