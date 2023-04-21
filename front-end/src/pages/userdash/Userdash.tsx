import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { personalDetailType } from '../../model/types/user';

import userimg from '../../assets/selfie.jpg';
import SidebarUser from './SidebarUser';

import './userdash.css';


interface DataType {
    data : {
        msg:string,
        data:personalDetailType[]
    },
    status:number
}
const Userdash: React.FC = () => {

    const [users, setUsers] = useState<personalDetailType[]>([]);

    useEffect(() => {
            axios.get<personalDetailType[]>('http://localhost:4000/user/get_all_user')
            .then((res) => {
                console.log(res)
                const { data,status }= res as unknown as DataType
                if (status === 200){
                    setUsers(data.data)
                }
            });
        },[]);
        const renderUser = (usersList:any) => {

        if (Array.isArray(usersList)){
            console.log(usersList)
            return users?.map((user) => {
                return (
                    <article className='user-list'>
                <input type="checkbox" id="feature1"/>
                <div>
                <img src={userimg} alt="user-img" />
                <span>{user.personalDetail.firstName} {user.personalDetail.surName}<br/>{user.work.roles[0]}</span>
                </div>
            </article>  
           
            );
        })
    }
    }
    return (
        <>
        <SidebarUser />
        <div className='dash-wrapper'>
            <h2>Welcome User</h2>
            <h3>Request feedback</h3>
            <p>Choose five people to give you feedback.</p>

        <div className='users'>
            {renderUser(users)}    
        </div>
    

        <button>Submit</button>
            
        </div>
        </>
    );
};

export default Userdash;