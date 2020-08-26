import React,{useContext,useState,useEffect} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareasContext';

const  FormularioTareas = () => {

    //obtener si proyecto esta activo
    const proyectoContext = useContext(ProyectoContext);
    const {  proyecto } = proyectoContext;

    //extraer tarea de state 
    const TareaContex = useContext(tareaContext);
    const { tareaSeleccionada,errorTarea,agregartarea,validarTarea,obtenerTareas,
    actualizarTarea,limpiarTarea} = TareaContex;

    //efectt detecta si se selecciona alguna tarea
    useEffect(()=>{
        if(tareaSeleccionada !==null){
            guardarTarea(tareaSeleccionada);
        }
        else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaSeleccionada])


     //state de formulario
     const [tarea ,guardarTarea] = useState({
         nombre:''
     })

     //extraer el nombre proyecto
     const {nombre} = tarea

     //si no hay proyecto seleccionado
     if(!proyecto) return null

     //array destructuring para extraer el proyecto
     const [proyectoActual] = proyecto;

     //leer los valores del formulario
     const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
     }
     //btn enviar
    const onSubmit = e => {
        e.preventDefault();
        //validar 
        if(nombre.trim() === ''){
            validarTarea();
            return
        }
        //si es edicion o si es una nueva tarea

        if(tareaSeleccionada === null){

            //agregar nueva tarea al state
            tarea.id = proyectoActual.id;
            tarea.estado = false;
            agregartarea(tarea);
        }
        else{
            //update tarea
            actualizarTarea(tarea);
            //Eliminar Tarea Seleccionada del state 
            limpiarTarea();
        }
        //pasar la validacion
        //obtener y filtrar las tareas del proyecto
        console.log(proyectoActual.id)
        obtenerTareas(proyectoActual.id);
        //reiniciar form 
        guardarTarea({
            nombre:''
        })
       
    }

    return ( 
        <div className="formulario">
            <form
            
            >
                 <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario  btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea ' : 'Agregar Tarea'}  
                        onClick={onSubmit}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El Nombre de la tarea es obligatoria</p>:null}
        </div>
     );
}
 
export default FormularioTareas ;