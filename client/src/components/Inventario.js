/* import React,{useEffect, useState} from "react";
import { getAllProductos, deleteProducto, updateProducto} from "../services/producto.service";

const Inventario = () => {
    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        try {
            const response = await getAllProductos();
            setProductos(response.data.productos);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getProductos();
    }, []);

    const RemoveProducto = async (id) => {
        try {
            const response = await deleteProducto(id);
            console.log(response.data);
            getProductos();
        } catch (error) {
            console.log(error);
        }
    };


    return (    
        <div>
            <h1>Inventario</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tipo de Proceso</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                {productos.map((producto) => (
                    <tr key={producto._id}>
                        <td>{producto.tipoproceso}</td>
                        <td>{producto.nombreproducto}</td>
                        <td>{producto.cantidad}</td>

                        <td>
                            <button onClick={() => RemoveProducto(producto._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    );
};

export default Inventario;


 */
import React, { useEffect, useState } from "react";
import { getAllProductos, deleteProducto, updateProducto } from "../services/producto.service";
import { Link } from "react-router-dom";
import Styles from "../styles/Inventario.module.css";

const Inventario = () => {
    const [productos, setProductos] = useState([]);
    const [abonos, setAbonos] = useState([]);
    const [foleos, setFoleos] = useState([]);
    const [sellos, setSellos] = useState([]);

    const getProductos = async () => {
        try {
            const response = await getAllProductos();
            setProductos(response.data.productos);
            categorizeProductos(response.data.productos);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const categorizeProductos = (productos) => {
        const abonosArray = productos.filter(
            (producto) => producto.tipoproceso === "Abono"
        );
        setAbonos(abonosArray);

        const foleosArray = productos.filter(
            (producto) => producto.tipoproceso === "Foleo"
        );
        setFoleos(foleosArray);

        const sellosArray = productos.filter(
            (producto) => producto.tipoproceso === "Sello"
        );
        setSellos(sellosArray);
    };

    useEffect(() => {
        getProductos();
    }, []);

    const RemoveProducto = async (id) => {
        try {
            const response = await deleteProducto(id);
            console.log(response.data);
            getProductos();
        } catch (error) {
            console.log(error);
        }
    };

    const renderTable = (productosArray) => {
        const nombresProductos = {};

        productosArray.forEach((producto) => {
            if (nombresProductos[producto.nombreproducto]) {
                nombresProductos[producto.nombreproducto] += producto.cantidad;
            } else {
                nombresProductos[producto.nombreproducto] = producto.cantidad;
            }
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Tipo de Proceso</th>
                        <th>Nombre Producto</th>
                        <th>Cantidad</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(nombresProductos).map((nombre) => {
                        const producto = productosArray.find(
                            (p) => p.nombreproducto === nombre
                        );

                        return (
                            <tr key={nombre}>
                                <td>{producto.tipoproceso}</td>
                                <td>{nombre}</td>
                                <td>{nombresProductos[nombre]}</td>
                                <td>
                                    <Link to={`/inventario/editproducto/${producto._id}`}>
                                        <button className={Styles.addBtn}>
                                            Agregar/Quitar
                                        </button>
                                    </Link>
                                </td>
                               <td>
                                    <button 
                                    onClick={() => RemoveProducto(producto._id)}
                                    className={Styles.dltBtn}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.navBar}>
                <h1>Inventario</h1>
                <Link to="/predios">
                    <button className={Styles.addBtn}>Predios</button>
                </Link>
            </div>        
            <div className={Styles.container}>
                <h2>Abono</h2>
                {renderTable(abonos)}
                <h2>Foleo</h2>
                {renderTable(foleos)}
                <h2>Sello</h2>
                {renderTable(sellos)}
            </div>
            <Link to="/inventario/addproducto">
                <button className={Styles.dltBtn}>Agregar Producto</button>
            </Link>

        </div>
    );
};

export default Inventario;
