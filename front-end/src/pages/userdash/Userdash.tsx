import React from 'react';

import userimg from '../../assets/selfie.jpg';
import SidebarUser from './SidebarUser';

import './userdash.css';

const Userdash: React.FC = () => {

    return (
        <>
        <SidebarUser />
        <div className='dash-wrapper'>
            <h2>Welcome User</h2>
            <h3>Request feedback</h3>
            <p>Choose five people to give you feedback.</p>

        <div className='users'>
            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>

            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>

            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>

            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>

            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>

            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>

            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>

            <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                    <img src={userimg} alt="user-img" />
                <span>Jenni Alanko<br/>Developer</span>
                </div>
            </article>
        </div>

        <button>Submit</button>
            
        </div>
        </>
    );
};

export default Userdash;