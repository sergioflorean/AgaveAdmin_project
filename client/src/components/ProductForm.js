/* import React, { useEffect, useState } from "react";
import { createProducto } from "../services/producto.service";
import { useNavigate } from "react-router-dom";


const ProductForm = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState({
        tipoproceso: "",
        nombreproducto: "",
        cantidad: "",
        
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProducts((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log(products);

    const sendProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await createProducto(products);
            navigate("/inventario");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1>Formulario de Productos</h1>
            <form onSubmit={sendProduct}>
                <div>
                    <label>Tipo de Proceso</label>
                    <select name="tipoproceso" onChange={onChangeHandler}>
                        <option value="Selecciona">Selecciona</option>
                        <option value="Abono">Abono</option>
                        <option value="Foleo">Foleo</option>
                        <option value="Sello">Sello</option>
                    </select>
                    <label>Nombre del Producto</label>
                    <select name="nombreproducto" onChange={onChangeHandler}>
                        <option value="Selecciona">Selecciona</option>
                        <option value="Fertilizante">Fertilizante</option>
                        <option value="Ktionic">Ktionic</option>
                        <option value="Ultrasol">Ultrasol</option>
                        <option value="Raizal">Raizal</option>
                        <option value="Grofol">Grofol</option>
                        <option value="Bromax">Bromax</option>
                        <option value="Diler">Diler</option>
                    </select>
                    <label>Cantidad</label>
                    <input type="number" name="cantidad" onChange={onChangeHandler} />
                <button type="submit">Agregar</button>
                </div>
            </form>


        </div>
    );

};

export default ProductForm; */

// aca nuevo codigo 

import React, { useEffect, useState } from "react";
import { createProducto } from "../services/producto.service";
import { useNavigate, Link } from "react-router-dom";
import Styles from "../styles/ProductForm.module.css";

const ProductForm = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState({
    tipoproceso: "",
    nombreproducto: "",
    cantidad: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setProducts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(products);

  const sendProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await createProducto(products);
      navigate("/inventario");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Actualizar la opción seleccionada en el segundo select según la selección del primero
    if (products.tipoproceso === "Abono") {
      setProducts((prevState) => ({
        ...prevState,
        nombreproducto: "Fertilizante",
      }));
    } else if (products.tipoproceso === "Foleo") {
      setProducts((prevState) => ({
        ...prevState,
        nombreproducto: "Ktionic",
      }));
    } else if (products.tipoproceso === "Sello") {
      setProducts((prevState) => ({
        ...prevState,
        nombreproducto: "Bromax",
      }));
    }
  }, [products.tipoproceso]);

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.navBar}>
        <h1>Formulario de Productos</h1>
        <Link to='/inventario'>
          <button className={Styles.addBtn}>
            regresar
          </button>
        </Link>

      </div>

      <form onSubmit={sendProduct} className={Styles.form_container}>
        <div >
          <div>
            <label>Tipo de Proceso</label>
            <select name="tipoproceso" onChange={onChangeHandler} className={Styles.select}>
              <option value="Selecciona">Selecciona</option>
              <option value="Abono">Abono</option>
              <option value="Foleo">Foleo</option>
              <option value="Sello">Sello</option>
            </select>
          </div>
          <div>
            <label>Nombre del Producto</label>
            <select name="nombreproducto" value={products.nombreproducto} onChange={onChangeHandler} className={Styles.select}>
              <option value="Selecciona">Selecciona</option>
              {products.tipoproceso === "Abono" && (
                <option value="Fertilizante">Fertilizante</option>
              )}
              {products.tipoproceso === "Foleo" && (
                <>
                  <option value="Ktionic">Ktionic</option>
                  <option value="Ultrasol">Ultrasol</option>
                  <option value="Raizal">Raizal</option>
                  <option value="Grofol">Grofol</option>
                </>
              )}
              {products.tipoproceso === "Sello" && (
                <>
                  <option value="Bromax">Bromax</option>
                  <option value="Diler">Diler</option>
                </>
              )}
            </select>
          </div>

          <label>Cantidad</label>
          <input type="number" name="cantidad" onChange={onChangeHandler} />
          <button className={Styles.addBtn} type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
