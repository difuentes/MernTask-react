import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertasContex'
import AuthContext from '../../context/autenticacion/authContex'


const Login = (props) => {

    //extraer los valores del context alerta
    const alertaContext =  useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    //extraer los valores del context Auth
    const authContext =  useContext(AuthContext);
    const {mensaje,autenticado,iniciarSesion } = authContext;

     //State Para Iniciar sesion
     const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    //en caso de que usuario se haya autenticado o registrado o error
    useEffect(()=>{
        
        if(autenticado){
           // console.log("entra a autenticado")
            props.history.push('/proyectos')
        }
        
        if(mensaje){
            console.log("entra en mensaje");
         mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history])

    //extraer el usuario
    const {email,password} = usuario;

    //onchange
    const onchange= e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiere iniciar Sesion
    const onSubmit = e => {
        e.preventDefault(); 
        //validar campos
        if(email.trim() === '' || password.trim() === '' ){
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        }
        //pasarlo al action
        iniciarSesion(usuario);

        
    }

    return (  
        <div className="form-usuario">

        {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>): null }

            <div className="contenedor-form sombra-dark">
                <center><img src="icon.png" width="12%"/></center>
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
                
                <div>
                    <Link className="btn btn-secundario btn-block"  to={'/nuevaCuenta'}>
                        <center>OBTENER CUENTA</center> 
                    </Link>
                </div>
               
            </div>
        </div>
    );
}
 
export default Login;