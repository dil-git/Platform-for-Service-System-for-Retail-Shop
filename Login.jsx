import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast, toastContainer } from "../toastmsg";
import '../index.css'


const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const admin = 'gitdilip2@gmail.com';
        const adminpass = '123456'

        if (email === admin && password === adminpass) {
            toast.success('Logged in Successfully...!');
            setTimeout(() => {
                navigate('/AdminFeatures');
            }, 2000);
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success('Logged in Successfully...!');
                setTimeout(() => {
                    navigate('/UserFeatures');
                }, 2000);
            } catch (error) {
                toast.error(`Login Unsuccessful. Error message: ${error.message}`);
                resetForm();
            }
        }
    };

    return (
        <div className='Login-cotainer'>
            {toastContainer}
            <div className="BackToHome">
                <button onClick={() => navigate('/')} className="link-btn">Back to Home</button>
            </div>
            <div className="form-box">
                <h1>Login...!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className='input-field'>
                            <input type="email" className="login-input" placeholder='Enter Email_id' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="password" className="login-input" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='btn-field'>
                            <button type="submit" className="btn-sub">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login