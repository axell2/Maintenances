import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);   
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/cars?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setCars(response.data);
        setTotalPages(response.data.total_pages);
        setError('');
      } catch (err) {
        setError('Error fetching cars. Please try again later.');
      }
    };

    fetchCars();
  }, [currentPage]); 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h2>Cars List</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/cars/new">
        <button>Create New Car</button>
      </Link>
      <ul>
        {cars.map((car) => (

          <li key={car.id}>
          <Link to={`/cars/${car.id}`}>
            {car.plate_number} - {car.model} ({car.year})
          </Link>
          </li>
        ))}
      </ul>

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span> Page {currentPage} of {totalPages} </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarsList;
