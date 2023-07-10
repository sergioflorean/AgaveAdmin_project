import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { login } from "../services/user.service";
import Style from '../styles/Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    

    const [user, setUser] = useState({
        email: "",
        password: ""
    });


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log(user);

    /* const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(user);
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }; */

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(user);
            console.log(response.data);
            navigate('/predios');
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.msg)
        }
    };


    



    return (
        <div className={Style.mainContainer}>
            <div className={Style.navBar}>
            <h1>Agave Administrador</h1>
            </div>
            
            <form onSubmit={handleLogin}className={Style.container} >
                <label>Usuario</label>
                <input type="email" name="email" placeholder="example@example.com" onChange={onChangeHandler} />
                
                <label>Contraseña</label>
                <input type="password" name="password" placeholder="password" onChange={onChangeHandler} />
                

                <button type="submit" className={Style.addBtn}>Iniciar sesión</button>
              
                <Link to='/predios'>
                    
                </Link>

            </form>
   


            <div className={Style.footer}>
            <p>¿Aún no tienes una cuenta?</p>
            <Link to="/register">
                <button className={Style.addBtn}>Registrate</button>
            </Link>
            </div>


        </div>
    )
}

export default Login;