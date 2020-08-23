import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'


const NuevaCuenta = () => {

    //State Para Iniciar sesion
    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })
    //extraer el usuario
    const {nombre,email,password,confirmar} = usuario;
    //onchange
    const onchange= e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiere iniciar Sesion
    const onSubmit =e =>{
        e.preventDefault(); 
        //validar campos vacios

        //pass minimo 8 caracteres

        //los 2 password son iguales 

        //pasarlo al action
    }

    return (  
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1 className="orange">OBTENER UNA CUENTA</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa tu nombre"
                            value={nombre}
                            onChange={onchange}
                         />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Correo Electronico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu Correo"
                            value={email}
                            onChange={onchange}
                         />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Ingresa tu password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu password"
                            onChange={onchange}
                            value={password}
                         />

                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirmar password"
                            onChange={onchange}
                            value={confirmar}
                         />

                    </div>

                    <div className="campo-form">
                        <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="REGISTRAR USUARIO"
                        />

                    </div>
                </form>
                <div>
                <Link className="enlace-cuenta btn btn-secundario btn-block"  to={'/'}>
                    <center> VOLVER A INICIO DE SESION</center>
                </Link>
                </div>
               
            </div>
        </div>
    );
}
 
export default NuevaCuenta;