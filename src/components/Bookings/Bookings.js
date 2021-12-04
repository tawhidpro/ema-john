import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    
    return (
        <div>
            {
                useEffect(() => {
                    fetch('http://localhost:5000/bookings?email='+loggedInUser.userEmail,{
                        method : 'GET',
                        headers : {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${sessionStorage.getItem('token')}`,

                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        setBookings(data);
                    })
                }, [])
            }
            <h2> you have total {bookings.length} booking</h2>
            {
                bookings.map(book =>{
                    return <li>name: {book.displayName} startDate: {book.startData} endDate :{book.endDate}</li>
                })
            }
        </div>
    );
};

export default Bookings;