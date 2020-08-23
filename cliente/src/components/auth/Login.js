import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'


const Login = () => {

    //State Para Iniciar sesion
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })
    //extraer el usuario
    const {email,password}= usuario;

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
        //validar campos

        //pasarlo al action
    }

    return (  
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1 className="orange">INICIAR SESION</h1>
                <form
                    onSubmit={onSubmit}
                >
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
                        <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="INICIAR SESION"
                        />

                    </div>
                </form>
                
                <Link className="enlace-cuenta"  to={'/nuevaCuenta'}>
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;