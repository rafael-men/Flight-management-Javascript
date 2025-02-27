import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const FlightCard = ({flight,onDelete}) => {
    const handleDelete = async () => {
        if(window.confirm(`Deseja mesmo excluir o vôo ${flight.flightNumber}?`)) {
            try {
                const token = localStorage.getItem('token')
                await axios.delete(`http://localhost:3008/flightManager/flights/deletar/${flight.id}`, {headers:{Authorization:`Bearer ${token}`}})
                onDelete(flight.id)
            }
            catch(err) {
                console.error('Não foi possível excluir o vôo', err)
            }
        }
    }
  return (
    <div className="col">
        <div className="card shadow-sm rounded-xl">
            <img src={flight.airlineImage} alt="Airline Logo" className='card mg-top' style={{height:'90px'}}/>
            <div className="card-body">
                <h5 className='card-title'><span>{flight.flightNumber}</span></h5>
                <p className="card-text">{flight.origin} → {flight.destination}</p>
                <p className="card-text">Tempo de chegada: {flight.arrivalTime}</p>
                <p className="card-text">Condição: {flight.status}</p>
                <p className="card-text">Assentos Disponíveis: {flight.seatsAvaliable}</p>
                <Link to={`/editar/${flight.id}`} className="btn btn-primary w-100 mb-2">
                        Editar Condições
                </Link>
                <button className="btn btn-danger w-100" onClick={handleDelete}>
                     Excluir do Sistema
               </button>
            </div>
        </div>
    </div>
  )
}

export default FlightCard