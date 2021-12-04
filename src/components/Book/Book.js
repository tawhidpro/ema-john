import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack'
import { Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import Bookings from '../Bookings/Bookings';

const Book = () => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext);

  const [value, setValue] = useState({
    startData : new Date(),
    endDate : new Date()
  });
  const handleStartDate = (date)=>{
    // console.log('Start Date');
    const newDate = {...value}
    newDate.startData = date;
    setValue(newDate);
  }
  const handleEndDate = (date)=>{
    const newDate = {...value}
    newDate.endData = date;
    setValue(newDate);  
  }
  const handleBooking = () =>{
    const newBooking = {...loggedInUser,...value }
    fetch('http://localhost:5000/addBooking',{
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(newBooking)
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
    })
  }
  console.log(value);
    return (
        <div>
            <h2>Booking page</h2>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>

        <DesktopDatePicker
          label="Start date"
          value={value.startData}
          minDate={new Date('2017-01-01')}
          onChange={handleStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
         <DesktopDatePicker
          label="End date"
          value={value.endDate} 
          minDate={new Date('2017-01-01')}
          onChange={handleEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button onClick={handleBooking}>Book Now</Button>
      
     
      </Stack>
    </LocalizationProvider>
    <Bookings />
        </div>
    );
};

export default Book;