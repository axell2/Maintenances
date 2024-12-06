import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceServiceList = () => {
  const [maintenanceServices, setMaintenanceServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [error, setError] = useState('');

  const resultsPerPage = 5; // Número de servicios por página

  // Realizar la solicitud de servicios de mantenimiento con parámetros de búsqueda y paginación
  useEffect(() => {
    const fetchMaintenanceServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/v1/maintenance_services', {
          params: {
            page: currentPage,
            per_page: resultsPerPage,
            status: status, // Filtro por status
            plate_number: plateNumber, // Filtro por plate_number
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        setMaintenanceServices(response.data);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError('Error fetching maintenance services.');
      }
    };

    fetchMaintenanceServices();
  }, [currentPage, status, plateNumber]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Restablecer la página a la 1 cuando se realice una nueva búsqueda
  };

  return (
    <div>
      <h2>Maintenance Services</h2>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch}>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Search by status"
          />
        </div>
        <div>
          <label>Plate Number:</label>
          <input
            type="text"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            placeholder="Search by plate number"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {maintenanceServices.length > 0 ? (
          maintenanceServices.map((service) => (
            <li key={service.id}>
              <p>
              <strong>Plate number:</strong> {service.plate_number}
              <strong>Date:</strong> {service.date}
              <strong>status:</strong> {service.status}
              <strong>Description:</strong> {service.description}</p>
            </li>
          ))
        ) : (
          <p>No maintenance services available.</p>
        )}
      </ul>

      {/* Paginación */}
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {' '}
          Page {currentPage} of {totalPages}{' '}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MaintenanceServiceList;
