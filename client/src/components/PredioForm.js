import React, { useState } from "react";
import { createPredio } from "../services/predio.service";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/Form.module.css";

const PredioForm = () => {
    const [predios, setPredios] = useState({
        nombrepredio: "",
        cantidadhectareas: "",
        cantidadplantas: "",
        ubicacion: "",
        fechaplantacion: "",
        abonostatus: "Pendiente",
        foleostatus: "Pendiente",
        sellostatus: "Pendiente",
    });
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPredios((prevState) => ({
            ...prevState,
            [name]: value
        }));

    };
    console.log(predios);


    const sendPredio = async (e) => {
        e.preventDefault();
        try {
            const response = await createPredio(predios/* {
                nombrepredio: predios.nombrepredio,
                cantidadhectareas: predios.cantidadhectareas,
                cantidadplantas: predios.cantidadplantas,
                ubicacion: predios.ubicacion,
                abonostatus: predios.abonostatus,
                foleostatus: predios.foleostatus,
                sellostatus: predios.sellostatus,        
            } */);
            navigate("/predios");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.navBar}>
                <h3>Crear predio</h3>
                <h1>Agave Administrador</h1>
                <button onClick={() => navigate("/predios")} className={Styles.addBtn}>Regresar</button>
            </div>

            <form onSubmit={sendPredio} className={Styles.form_container}>
                <div className={Styles.leftBox}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombrepredio"
                        placeholder="Nombre"
                        onChange={onChangeHandler}
                    />
                    <label>Superficie</label>
                    <input
                        type="number"
                        name="cantidadhectareas"
                        placeholder="Superficie en Hectareas"
                        onChange={onChangeHandler}
                    />
                    <label >Numero de plantas</label>
                    <input
                        type='number'
                        name="cantidadplantas"
                        placeholder="Numero de plantas"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className={Styles.rightBox}>
                    <label>Ubicación</label>
                    <input
                        type="text"
                        name="ubicacion"
                        placeholder="Ubicación"
                        onChange={onChangeHandler}
                    />
                    <label>Fecha de Plantación</label>
                    <input
                        type="date"
                        name="fechaplantacion"
                        placeholder="Fecha de Plantación"
                        onChange={onChangeHandler}
                    />
                    <div className={Styles.selectContainer}>

                        <label>Abono</label>
                        <select name="abonostatus" id="abonostatus" onChange={onChangeHandler} defaultValue={predios.abonostatus}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Enproceso">En proceso</option>
                            <option value="Completado">Completado</option>

                        </select>

                        <label>Foleo</label>
                        <select name="foleostatus" id="foleostatus" onChange={onChangeHandler} defaultValue={predios.foleostatus}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Enproceso">En proceso</option>
                            <option value="Completado">Completado</option>
                        </select>

                        <label>Sello</label>
                        <select name="sellostatus" id="sellostatus" onChange={onChangeHandler} defaultValue={predios.sellostatus}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Enproceso">En proceso</option>
                            <option value="Completado">Completado</option>
                        </select>
                    </div>
                    <button type="submit" className={Styles.addBtn}>Crear predio</button>
                </div>
                <div />

            </form>


        </div>
    )
}


export default PredioForm;
