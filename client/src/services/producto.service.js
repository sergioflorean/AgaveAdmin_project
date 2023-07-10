import axios from "axios";

export const getAllProductos = () => axios.get('http://localhost:8000/api/productos', { withCredentials: true })
export const getOneProducto = (id) => axios.get(`http://localhost:8000/api/productos/${id}`, { withCredentials: true })
export const createProducto = (Productos) => axios.post('http://localhost:8000/api/productos/new', Productos, { withCredentials: true })
export const deleteProducto = (id) => axios.delete(`http://localhost:8000/api/productos/${id}`, { withCredentials: true })
export const updateProducto = (id, Productos) => axios.put(`http://localhost:8000/api/productos/${id}`, Productos, { withCredentials: true })
