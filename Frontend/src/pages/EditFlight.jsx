import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const EditFlight = () => {
    const { id } = useParams() 
    const navigate = useNavigate()

    const [flightData, setFlightData] = useState({
        flightNumber: '',
        airlineImage: '',
        origin: '',
        destination: '',
        arrivalTime: '',
        status: '',
        seatsAvailable: '',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get(`http://localhost:3008/flightManager/flights/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                })
                setFlightData(response.data)  
            } catch (err) {
                console.error('Erro ao carregar dados do voo:', err)
            }
        }

        fetchFlightData()
    }, [id])



    const handleChange = (e) => {
        const { name, value } = e.target
        setFlightData({
            ...flightData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados enviados para atualização:", flightData);
    
        if (!id) {
            console.error("Erro: ID do voo não encontrado!");
            return;
        }
    
        try {
            await axios.put(`http://localhost:3008/flightManager/flights/${id}`, flightData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
    
            window.alert('Voo atualizado com sucesso!');
            setTimeout(() => navigate('/home'), 1000);
        } catch (err) {
            console.error('Erro ao atualizar voo:', err.response?.data || err.message);
        }
    }

    const handleBack = () => {
        navigate('/home')
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" 
             style={{ 
                backgroundImage: "url('https://www.airport-technology.com/wp-content/uploads/sites/14/2022/01/shutterstock_758602234-min-scaled-e1641297696653.jpg')", 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundAttachment: 'fixed'
             }}>
            <div className="card-shadow p-4 bg-light rounded-lg" 
                 style={{ width: '400px', maxHeight: '90vh', overflow: 'auto' }}>
                <h2 className="text-center mb-4">Editar Vôo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Número do vôo</label>
                        <input type="text" className="form-control" name="flightNumber" value={flightData.flightNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Companhia Aérea <span>(link)</span></label>
                        <input type="text" className="form-control" name="airlineImage" value={flightData.airlineImage} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Origem</label>
                        <input type="text" className="form-control" name="origin" value={flightData.origin} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Destino</label>
                        <input type="text" className="form-control" name="destination" value={flightData.destination} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Data e Hora de Chegada</label>
                        <input type="datetime-local" className="form-control" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select className="form-select" name="status" value={flightData.status} onChange={handleChange}>
                            <option value="">Selecione o Status</option>
                            <option value="PREVISTO">PREVISTO</option>
                            <option value="ATRASADO">ATRASADO</option>
                            <option value="CANCELADO">CANCELADO</option>
                            <option value="EMBARQUE INICIADO">EMBARQUE INICIADO</option>
                            <option value="ÚLTIMA CHAMADA">ÚLTIMA CHAMADA</option>
                            <option value="DESEMBARQUE INICIADO">DESEMBARQUE INICIADO</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Assentos Disponíveis</label>
                        <input type="number" className="form-control" name="seatsAvailable" value={flightData.seatsAvailable} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Atualizar Voo
                    </button>
                </form>
                <button 
                    className="btn btn-secondary w-100 mt-3" 
                    onClick={handleBack}
                >
                    Voltar para a Home
                </button>
            </div>
        </div>
    )
}

export default EditFlight
