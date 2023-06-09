import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Service = () => {
    const [services,setServices] = useState([]);
    const [asc,setAsc] = useState(true);

    useEffect(() =>{
        fetch(`http://localhost:5000/services?sort=${asc ? 'asc' : 'des'}`)
        .then(res => res.json())
        .then(data => setServices(data))
    },[])

    return (
        <div className='text-center'>
            <p className='font-semibold text-orange-700'>Service</p>
            <h2 className='text-4xl font-bold'>Our Service Area</h2>
            <p className='text-xl'>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
            <button className='btn' onClick={()=> setAsc(!asc)}>{asc ? 'High to Low' : 'Low to High'}</button>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    services.map(service => <ServiceCard
                    key={service._id}
                    service={service}
                    ></ServiceCard> )
                }
            </div>
        </div>
    );
};

export default Service;