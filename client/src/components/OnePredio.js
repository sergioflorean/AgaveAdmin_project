import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOnePredio, updatePredio } from "../services/predio.service";
import Styles from "../styles/OnePredio.module.css";
import moment from "moment";


const OnePredio = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [predio, setPredio] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);




    // obtener un solo predio por id
    const getPredio = async () => {
        try {
            const response = await getOnePredio(id);
            setPredio(response.data.predio);
            console.log(response.data.predio);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(predio.abonostatus);



    useEffect(() => {
        getPredio();
    }, [id]);

    // usar el hook useEffect para actualizar el tiempo transcurrido de ka fecha de plantacion
    useEffect(() => {
        const interval = setInterval(() => {
            const timeDiff = Date.now() - new Date(predio.fechaplantacion).getTime();
            setTimeElapsed(timeDiff);
        }, 1000);

        return () => clearInterval(interval);
    }, [predio.fechaplantacion]);



    // actualizar el estado de abono, foleo y sello
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPredio((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log(predio);
    console.log(predio.abonostatus);


    // formatear el tiempo transcurrido
    const formatTime = (timeInSeconds) => {
        const duration = moment.duration(timeInSeconds, "seconds");

        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    };



    // enviar el estado actualizado a la base de datos

    const sendNewPredio = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePredio(id, predio);
            console.log(response);
            navigate(`/predios/process/${id}`);
            //navigate(`/predios/process/${id}`, { predio: predio });
            console.log(predio);

        } catch (error) {
            console.log(error);
        }
    };

    // setea la proxima fecha de abono
    const getNextAbonoDate = () => {
        if (predio.abonostatus === "Completado") {
            const abonoDate = new Date(predio.updatedAt);
            abonoDate.setFullYear(abonoDate.getFullYear() + 1);
            return abonoDate.toLocaleDateString();
        }
        return "";
    };

    const nextAbonoDate = getNextAbonoDate();



    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.navBar}>
               
                <h1 className={Styles.onePredioTitle}>{predio.nombrepredio}</h1>
                <Link to="/predios">
                        <button className={Styles.btn}>Regresar</button>
                    </Link>
            </div>
            <div className={Styles.predioContainer}>
            <form action="">
                <p>Hectareas plantadas: {predio.cantidadhectareas}</p>
                <p>Numero de Plantas: {predio.cantidadplantas}</p>
                <p>Ubicacion: {predio.ubicacion}</p>
                <p>Fecha de plantacion: {new Date(predio.fechaplantacion).toLocaleDateString()}</p>

                <p>Tiempo transcurrido: {formatTime(Math.floor(timeElapsed / 1000))}</p>

                <label>Abono</label>
                <select name="abonostatus" id="abonostatus" onChange={onChangeHandler} value={predio.abonostatus}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Enproceso">En proceso</option>
                    <option value="Completado">Completado</option>
                </select>
                <label>Foleo</label>
                <select name="foleostatus" id="foleostatus" onChange={onChangeHandler} value={predio.foleostatus}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Enproceso">En proceso</option>
                    <option value="Completado">Completado</option>
                </select>
                <label>Sello</label>
                <select name="sellostatus" id="sellostatus" onChange={onChangeHandler} value={predio.sellostatus}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Enproceso">En proceso</option>
                    <option value="Completado">Completado</option>
                </select>
                {/* {predio.abonostatus === "Completado" && (
                    <p style={{ color: "green" }} >Abono aplicado el: {new Date(predio.updatedAt).toLocaleDateString()}</p>
                )}
                {nextAbonoDate && (
                    <p style={{ color: "blue" }}>Próxima fecha de abono: {nextAbonoDate}</p>
                )}
                {predio.foleostatus === "Completado" && (
                    <p style={{ color: "green" }} >Foleo aplicado el: {new Date(predio.updatedAt).toLocaleDateString()}</p>
                )}
                {predio.sellostatus === "Completado" && (
                    <p style={{ color: "green" }} >Sello aplicado el: {new Date(predio.updatedAt).toLocaleDateString()}</p>
                )} */}
                <div>
                    <button onClick={sendNewPredio} className={Styles.btn}>Actualizar</button>
                    <Link to={`/predios/process/${id}`}>
                        <button className={Styles.btn}>Procesos</button>
                    </Link>
                    
                </div>


                {/* <p>Abono: {predio.abonostatus}</p>
                <p>Foleo: {predio.foleostatus}</p>
                <p>Sello: {predio.sellostatus}</p> */}


            </form>
            </div>


        </div>
    )
}

export default OnePredio;