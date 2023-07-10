/* import React, { useState } from "react";
import { register } from "../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import Style from '../styles/Register.module.css';

const Register = () => {
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();


    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log(user);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register(user);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.log(error.response.data.msg);
            alert(error.response.data.msg)
        }
    };




    return (
        <div className={Style.mainContainer}>
            <div className={Style.navBar}>
                <h2>Registro</h2>
                <Link to="/">
                    <button className={Style.addBtn}>Volver</button>
                </Link>
            </div>

            <form onSubmit={handleRegister} className={Style.container}>
                <div className={Style.leftBox}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Nombre"
                        onChange={onchangeHandler}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={onchangeHandler}
                    />
                </div>
                <div className={Style.rightBox}>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={onchangeHandler}
                    />
                    <label>Confirmar contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        onChange={onchangeHandler}
                    />
                    <div >
                        <button type="submit" className={Style.addBtn}>Registrarse</button>
                    </div>
                </div>


            </form>

        </div>
    )
}

export default Register; */

//Validaciones 

import React, { useState } from "react";
import { register } from "../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Style from "../styles/Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
    email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("La confirmación de la contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.log(error.response.data.msg);
        alert(error.response.data.msg);
      }
    },
  });

  return (
    <div className={Style.mainContainer}>
      <div className={Style.navBar}>
        <h2>Registro</h2>
        <Link to="/">
          <button className={Style.addBtn}>Volver</button>
        </Link>
      </div>

      <form onSubmit={formik.handleSubmit} className={Style.container}>
        <div className={Style.leftBox}>
          <label>Nombre</label>
          <input
            type="text"
            name="fullname"
            placeholder="Nombre"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.fullname}
          />
          {formik.touched.fullname && formik.errors.fullname ? (
            <div className={Style.validation}>{formik.errors.fullname}</div>
          ) : null}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={Style.validation}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={Style.rightBox}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={Style.validation}>{formik.errors.password}</div>
          ) : null}
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className={Style.validation}>{formik.errors.confirmPassword}</div>
          ) : null}
          <div>
            <button type="submit" className={Style.addBtn}>
              Registrarse
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
