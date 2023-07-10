import axios from "axios";


//servicios para predios
export const getAllPredios = () => axios.get('http://localhost:8000/api/predios', { withCredentials: true })
export const getOnePredio = (id) => axios.get(`http://localhost:8000/api/predios/${id}`, { withCredentials: true })
export const createPredio = (Predios) => axios.post('http://localhost:8000/api/predios/new', Predios, { withCredentials: true })
export const deletePredio = (id) => axios.delete(`http://localhost:8000/api/predios/${id}`, { withCredentials: true })
export const updatePredio = (id, Predios) => axios.put(`http://localhost:8000/api/predios/${id}`, Predios, { withCredentials: true })


