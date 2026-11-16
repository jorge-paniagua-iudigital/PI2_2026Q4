import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          Películas & Series
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Media</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/generos">Géneros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/directores">Directores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productoras">Productoras</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tipos">Tipos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
