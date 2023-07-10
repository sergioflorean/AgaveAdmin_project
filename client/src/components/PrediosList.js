import React, { useState, useEffect } from "react";
import { getAllPredios, deletePredio } from "../services/predio.service";
import { logout } from "../services/user.service";
import { Link } from "react-router-dom";
import Styles from "../styles/Predios.module.css";
import emailjs from 'emailjs-com';


const PrediosList = () => {
    const [predios, setPredios] = useState([]);
    

    const getPredios = async () => {
        try {
            const response = await getAllPredios();
            setPredios(response.data.predios);
            console.log(response.data);
            
            
        } catch (error) {
            console.log(error);

        }
    };
   

    useEffect(() => {
        getPredios();
    }, []);


    
   

    const RemovePredio = async (id) => {
        try {
            const response = await deletePredio(id);
            console.log(response.data);
            getPredios();
        } catch (error) {
            console.log(error);
        }
    };

    const Logout = async () => {
        try {
            const response = await logout();
            console.log(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    // EmailJS
    const sendEmail = (nombrePredio,proceso, estado) => {
        const templateParams = {
            // Aquí puedes definir los parámetros del correo, como el destinatario, el asunto, etc.
            to_email: 'sergio_floreanch@live.com', // Cambia 'user.email' con la propiedad correcta que almacena el correo del usuario
            to_name: "Sergio", // Cambia 'user.name' con la propiedad correcta que almacena el nombre del usuario
            from_name: 'Agave Administración',
            subject: 'Tienes Predios con procesos Pendientes',
            message: `El status del ${proceso} en el predio ${nombrePredio} ha cambiado a ${estado}, favor de checar fecha de aplicación ya que se venció`,
        };

        emailjs.send('service_tjv18fo', 'template_gtscz5b', templateParams, '9f82KknK3P_f7nqeb'/* 'YOUR_USER_ID' */)
            .then((response) => {
                console.log('Correo enviado correctamente', response.status, response.text);
            })
            .catch((error) => {
                console.error('Error al enviar el correo', error);
            });
    };






    // Ordenar los predios para mostrar los pendientes primero y luego por fecha de plantación
    const sortedPredios = [...predios].sort((a, b) => {
        if (
            (a.abonostatus === "Pendiente" || a.foleostatus === "Pendiente" || a.sellostatus === "Pendiente") &&
            !(b.abonostatus === "Pendiente" || b.foleostatus === "Pendiente" || b.sellostatus === "Pendiente")
        ) {
            return -1;
        } else if (
            !(a.abonostatus === "Pendiente" || a.foleostatus === "Pendiente" || a.sellostatus === "Pendiente") &&
            (b.abonostatus === "Pendiente" || b.foleostatus === "Pendiente" || b.sellostatus === "Pendiente")
        ) {
            return 1;
        } else if (
            !(a.abonostatus === "Pendiente" || a.foleostatus === "Pendiente" || a.sellostatus === "Pendiente") &&
            !(b.abonostatus === "Pendiente" || b.foleostatus === "Pendiente" || b.sellostatus === "Pendiente")
        ) {
            const dateA = new Date(a.fechaplantacion);
            const dateB = new Date(b.fechaplantacion);
            return dateB - dateA;
        }
        return 0;
    });



    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.navBar}>
                <h1 className={Styles.titulo}>Mis Predios</h1>
                <div>
                    <Link to="/predios/create" >
                        <button className={Styles.addBtn}>Agregar Predio</button>
                    </Link>
                    <Link to="/">
                        <button className={Styles.addBtn} onClick={Logout}>Logout</button>
                    </Link>
                </div>

            </div>
            <div className={Styles.container}>
                <div>
                    <Link to="/inventario">
                    <button className={Styles.addBtn}>
                        Inventario De Producto
                    </button>
                    </Link>
                </div>
                <ul>
                    {sortedPredios.map((predio) => (

                        <li key={predio._id} className={Styles.predioBox}>
                            <span>
                                <Link to={`/predios/${predio._id}`} className={Styles.predioName}>
                                    <h2>{predio.nombrepredio}</h2>
                                </Link>

                                {predio.abonostatus === 'Pendiente' && (
                                    <div>
                                        <p className={Styles.pendiente}>Abono: {predio.abonostatus}</p>
                                        {/* {sendEmail(predio.nombrepredio,'Abono', 'Pendiente')}  */}
                                    </div>
                                )}

                                {predio.foleostatus === "Pendiente" && (
                                    <div>
                                    <p className={Styles.pendiente} > Foleo: {predio.foleostatus} </p>
                                   {/*  {sendEmail(predio.nombrepredio,'Foleo', 'Pendiente')}  */}
                                    </div>
                                )}
                                {predio.sellostatus === "Pendiente" && (
                                    <div>
                                    <p className={Styles.pendiente} > Sello: {predio.sellostatus} </p>
                                    {/* {sendEmail(predio.nombrepredio,'Sello', 'Pendiente')} */}
                                    </div>
                                )}
                                {predio.abonostatus === "Completado" && predio.foleostatus === "Completado" && predio.sellostatus === "Completado" && (
                                    <p className={Styles.alCorriente}>Estás al corriente</p>
                                )}
                                {predio.abonostatus === "Enproceso" || predio.foleostatus === "Enproceso" || predio.sellostatus === "Enproceso" ? (
                                    <p className={Styles.enProceso}>Aplicación(es) en proceso</p>
                                ) : null}



                                <button className={Styles.dltBtn} onClick={() => RemovePredio(predio._id)}>Eliminar</button>
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default PrediosList;