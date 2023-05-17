import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(url,{
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
          setBookings(data)
        }else{
          navigate('/')
        }
      });
  }, [url,navigate]);

  const handleDelete = (id) => {
    const procced = confirm("Are you sure you want to delete");
    if (procced) {
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("delete successful");
            const remaining = bookings.filter(booking => booking._id !== id);
            setBookings(remaining);
          }
        });
    }
  };

  const handleBookingConfirm = id =>{
    fetch(`http://localhost:5000/bookings/${id}`,{
      method: 'PATCH',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({status: 'confirm'})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount>0){
        // update state
        const remaining = bookings.filter(booking => booking._id !== id);
        const updated = bookings.find(booking => booking._id === id);
        updated.status= 'confirm';
        const newBookings = [updated, ...remaining];
        setBookings(newBookings);
      }
    })
  }

  return (
    <div>
      <h2 className="text-5xl">Bookings: {bookings.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((boooking) => (
              <BookingRow key={boooking._id} boooking={boooking} handleDelete={handleDelete}
              handleBookingConfirm={handleBookingConfirm}
              ></BookingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;