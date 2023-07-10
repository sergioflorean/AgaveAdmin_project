import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOnePredio } from '../services/predio.service';
import Styles from '../styles/Process.module.css';

const ProcessTrack = () => {
    const { id } = useParams();
    const [predio, setPredio] = useState({});
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

    // setea la proxima fecha de abono
    const getNextAbonoDate = () => {
        if (predio.abonostatus === "Completado") {
            const abonoDate = new Date(predio.updatedAt);
            abonoDate.setFullYear(abonoDate.getFullYear() + 1);
            return abonoDate.toLocaleDateString();
        }
        return predio.abonostatus;
    };

    const nextAbonoDate = getNextAbonoDate();

    // sete la proxima fecha de foleo
    const getNextFoleoDate = () => {
        if (predio.foleostatus === "Completado") {
            const foleoDate = new Date(predio.updatedAt);
            foleoDate.setMonth(foleoDate.getMonth() + 2);
            return foleoDate.toLocaleDateString();
        }
        return predio.foleostatus;
    };

    const nextFoleoDate = getNextFoleoDate();

    // setea la proxima fecha de sello
    const getNextSelloDate = () => {
        if (predio.sellostatus === "Completado") {
            const selloDate = new Date(predio.updatedAt);
            selloDate.setMonth(selloDate.getMonth() + 4);
            return selloDate.toLocaleDateString();
        }
        return predio.sellostatus;
    };

    const nextSelloDate = getNextSelloDate();



    return (
        <div className={Styles.container}>
            <div className={Styles.navBar}>
                <h1>Proceso de tu predio</h1>
            </div>
            <div className={Styles.processContainer}>
                <p>Abono: </p>
                {predio.abonostatus === "Completado" && (
                    <p className={Styles.alCorriente} >Abono aplicado el: {predio.updatedAt}</p>
                )}
                {nextAbonoDate && (
                    <p className={Styles.enProceso}>Próxima fecha de abono: {nextAbonoDate}</p>
                )}
                <p>Foleo: </p>
                {predio.foleostatus === "Completado" && (
                    <p className={Styles.alCorriente} >Foleo aplicado el: {new Date(predio.updatedAt).toLocaleDateString()}</p>
                )}
                {nextFoleoDate && (
                    <p className={Styles.enProceso}>Próxima fecha de foleo: {nextFoleoDate}</p>
                )}
                <p>Sello: </p>
                {predio.sellostatus === "Completado" && (
                    <p className={Styles.alCorriente} >Sello aplicado el: {new Date(predio.updatedAt).toLocaleDateString()}</p>
                )}
                {nextSelloDate && (
                    <p className={Styles.enProceso}>Próxima fecha de sello: {nextSelloDate}</p>
                )}
                <div>
                    <Link to='/predios'>
                        <button className={Styles.btn}>Regresar a tus predios</button>
                    </Link>
                    <Link to={-1}>
                        <button className={Styles.btn}>Atrás</button>
                    </Link>
                </div>

            </div>

        </div>

    )
}


export default ProcessTrack;