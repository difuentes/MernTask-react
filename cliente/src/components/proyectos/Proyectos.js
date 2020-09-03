import React,{useContext,useEffect} from 'react'
import SideBar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormularioTareas from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'

import contextAuth from '../../context/autenticacion/authContex';

const Proyectos = () => {
    
    //extraer el context de Autenticacion 
    const authContex = useContext(contextAuth);
    const {usuarioAutenticado} = authContex;


    useEffect(()=>{
        usuarioAutenticado();
    },[])

    return (  
       <div className="contenedor-app">
           <SideBar/>

            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormularioTareas/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
       </div>
    );
}
 
export default Proyectos;