import React, { useEffect, useState } from "react";
import { Form, Link, useParams, useNavigate } from "react-router-dom";
import { getOneProducto, updateProducto } from "../services/producto.service";
import Styles from "../styles/EditProducto.module.css";

const EditPoducto = () => {
    const [producto, setProducto] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();



    const getProducto = async () => {
        try {
            const res = await getOneProducto(id);
            setProducto(res.data.producto);
        }
        catch (error) {
            console.log(error);
        }

    }
    console.log(producto);
    console.log(producto.tipoproceso);
    useEffect(() => {
        getProducto();
    }, [id]);

    const sendNewProducto = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProducto(id, producto);
            console.log(response);
            navigate("/inventario");
        }
        catch (error) {
            console.log(error);
        }
    }




    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.navBar}>
                <h1 className={Styles.onePredioTitle}>Editar Producto</h1>
                <Link to="/inventario" >
                    <button className={Styles.btn}>Volver</button>
                </Link>
            </div>
            <div className={Styles.container}>
                <h3>Tipo de proceso: {producto.tipoproceso}</h3>
                <h3>Nombre: {producto.nombreproducto}</h3>
                <form onSubmit={sendNewProducto} className={Styles.formContainer}>
                    <label>Agregar {producto.nombreproducto}</label>
                    <br />
                    <input type="number" name="cantidad" value={producto.cantidad} onChange={handleChange} />
                    <button type="submit" className={Styles.btn}>Actualizar cantidad de {producto.nombreproducto}</button>
                </form>
            </div>





        </div>
    )
}

export default EditPoducto;

