import React from 'react'
import { useNavigate } from 'react-router-dom';
import dark_arrow from '../Assets/dark-arrow.png'
import '../index.css'

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="Home-container">
              <h1>Platform for Service System for Retail Shop</h1>
                <ul>
                   
                    <li>Contact Us : gitdilip2@gmail.com</li>
                </ul>
            </nav>
            <div className='Hero Home-container'>
                <div className="Hero-text">
                    <h1>Optimize Your Service Workflow</h1>
                    <p>Streamline your service operations with our comprehensive management system. Enhance efficiency and improve customer satisfaction effortlessly.</p>
                    <button className='Home-btn' onClick={() => navigate('/Login')}>Login Here<img src={dark_arrow} alt="" /></button>
                </div>
            </div>
        </>
    )
}

export default Home