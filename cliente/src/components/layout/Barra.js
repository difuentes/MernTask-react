import React,{useContext,useEffect} from 'react'

import contextAuth from '../../context/autenticacion/authContex';

const Barra = () => {

     //extraer el context de Autenticacion 
     const authContex = useContext(contextAuth);
     const {usuario,usuarioAutenticado,cerrarSesion} = authContex;
 
 
     useEffect(()=>{
         usuarioAutenticado();
     },[])


    return ( 
        <header>
            <div className="app-header">
                {usuario ?  <p className="nombre-usuario"> HOLA :<span>{usuario.nombre}</span></p>
 : null }
               
                <nav className="nav-principal">
                 <button  
                    className="btn btn-secundario"
                    onClick={()=>cerrarSesion()}
                  >Cerrar Sesion</button>
                 </nav>
            </div>

            
        </header>
     );
}
 
export default Barra;