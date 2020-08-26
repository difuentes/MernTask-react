import React,{Fragment,useState,useContext} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';

 

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectoContext = useContext(ProyectoContext);
    const { formulario ,errorFormulario, mostrarFormulario ,agregarProyecto,mostrarError} = proyectoContext;

    //state para Proyecto
    const[proyecto, guardarProyecto] = useState({
        id:'',
        nombre:''
    })
    //extrar nombre del proyecto
    const {nombre} = proyecto;
    //onchance proyecto
    const onChangeProyecto = e => {
        e.preventDefault();
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //cuando usuario envia un proyecto
    const onSubmitProyecto = e =>{   
        e.preventDefault();
        //validar
        if(nombre === ''){
            
            mostrarError();
            return;
        }
        //agregar State
        agregarProyecto(proyecto)

        //reiniciar el form
        guardarProyecto({
            nombre:''
        })

    }

   

    return (  
        <Fragment>
            <button 
                type="button"
                className="btn btn-primario btn-block"
                onClick={()=>mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>

            { formulario ? 
            (
                 <form
                 className="formulario-nuevo-proyecto"
                 onSubmit={onSubmitProyecto}
                 >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto" 
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
        
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Crear Proyecto"
                    /> 

                </form>
            ) : null }
              {
                  errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio!</p>:null
              }
        </Fragment>
    );
}
 
export default NuevoProyecto;