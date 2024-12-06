import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
  const { id } = useParams(); 
  const [services, setServices] = useState([]);
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/v1/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCar(response.data);
        setServices(response.data.maintenance_services || []);
      } catch (err) {
        setError('Error fetching maintenance services. Please try again later.');
      }
    };

    fetchServices();
  }, [id]);

  return (
    
    <div> 
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {car ? (
          <div>
            <h2>Car Details</h2>
            <p><strong>Car id:</strong> {car.id}</p>
            <p><strong>Plate Number:</strong> {car.plate_number}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
          </div>
        ) : (
          <p>Loading car details...</p>
        )}
      </div>
      <h2>Maintenance Services for Car {id}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to={`/cars/${id}/maintenance_services/new`}>
        <button>Create New Service</button>
      </Link>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.id} - {service.date} - {service.description} - {service.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarDetails;
