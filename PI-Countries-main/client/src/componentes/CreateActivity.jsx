import React,{useState,useEffect} from "react";
import { Link  } from "react-router-dom";
import {postActividad, getCountries ,getActivities} from '../acctions/index'
import { useDispatch,useSelector } from "react-redux";
import style from "./Styles/CrearActividad.module.css"

function validate(input) {
    let Error={};
    if(!input.name){ console.log(input.name)
        Error.name="Se requiere un nombre";
    }else if(!input.dificultad){
       
        Error.dificultad="Se requiere poner una dificultad";
    }else if(!input.duration){
       
       Error.duration="Poner hora o dias (ej: 9 horas)";
    }else if(!input.season){
       
       Error.season="Se requiere una temporada";
    }
    return Error;

};
export default function CreateActivity(){
    const dispatch= useDispatch();
    const [Error, setError] = useState({});
    const country= useSelector((state)=>state.countries)
    
    const [input,setInput]=useState({
        name: "",
        dificultad:"",
        duration: "",
        season:[],
        countries:[]
    })

    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivities())
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        console.log(input)
    }
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }
    function handleSeason(e){
        setInput({
            ...input,
            season:[...input.season,e.target.value]
        })
    }
    function handleSelect(e){
        setInput({
            ...input,
            countries:[...input.countries,e.target.value]
        })
    }

    function handleSubmit(e){

        e.preventDefault();
        if(input.name){

            console.log(input)
            dispatch(postActividad(input))
            alert("Actividad Creada con exito!")
            setInput({
                name: "",
                dificultad:"",
                duration: "",
                season:[],
                countries:[]
            })
        }else{
            alert("No se completaron los campos")
        }
      
    }

   function handleDelete(e){
       setInput({
           ...input,
           countries: input.countries.filter(el => el !== e)
       })
   }
    return (
        <div className = {style.all}>
        <div >
            <div className= {style.alignHomeButton}>

                <Link to='/home'>
                    <button className= {style.homeButton}>Volver</button>
                </Link>
            </div>
            <div className= {style.body}>

                <h1>Crear Actividades</h1>

                <form  onSubmit= {e=> handleSubmit(e)} className = {style.form}>
                    <div className= {style.inputname}>
                        <label>Nombre:</label>
                        <input type = "text" value = {input.name} name="name" onChange ={e=>handleChange(e)}></input>
                        {
                            Error.name && ( <p className={style.error}>{Error.name}</p>)
                        }

                    </div>
                    <div >
                        <label>Dificultad: </label>
                                <label>
                                <input type="checkbox" value="1" name='dificultad' onChange ={e=>handleCheck(e)}/>
                                1</label>
                                <label>
                                <input type="checkbox" value="2" name='dificultad'onChange ={e=>handleCheck(e)}/>
                                2</label>
                                <label>
                                <input type="checkbox" value="3" name='dificultad'onChange ={e=>handleCheck(e)}/>
                                3</label>
                                <label>
                                <input type="checkbox" value="4" name='dificultad'onChange ={e=>handleCheck(e)}/>
                                4
                                <input type="checkbox" value="5" name='dificultad'onChange ={e=>handleCheck(e)}/>
                                5</label>
                                {
                            Error.dificultad && ( <p className={style.error}>{Error.dificultad}</p>)
                        }

                    </div>
                    <div className= {style.inputname}>
                        <label>Duracion:</label>
                        <input type = "text" value = {input.duration} name="duration" onChange ={e=>handleChange(e)}></input>
                        {
                            Error.duration && ( <p className={style.error}>{Error.duration}</p>)
                        }

                    </div>
                    <div>
                        <label>Temporada: </label>
                            <label>
                            <input type="checkbox" value="Summer" name='season' onChange ={e=>handleSeason(e)}/>
                            Verano</label>
                            <label>
                            <input type="checkbox" value="Spring" name='season' onChange ={e=>handleSeason(e)}/>
                            Primavera</label>
                            <label>
                            <input type="checkbox" value="Autumn" name='season' onChange ={e=>handleSeason(e)}/>
                            Otoño</label>
                            <label>
                            <input type="checkbox" value="Winter" name='season' onChange ={e=>handleSeason(e)}/>
                            Invierno</label>
                            {
                            Error.season && ( <p className={style.error}>{Error.season}</p>)
                        }
                    </div>
                    <div className ={style.inputCountry}>
                        <label >Paises:</label>

                        <select onChange ={e=>handleSelect(e)}>
                        {
                            country.map((el) => {
                                return (
                                    <option key={el.id} value={el.id}>
                                    {el.name}
                                    </option>
                                );
                            })
                        }
                        </select>
                    </div>
                    {/* <li>{
                    input.countries.map(el =>el+",")}</li> */}
                    <div className ={style.divButtonCrear}>
                        <button type = 'submit ' className= {style.buttonCrear} > Crear Actividad </button>

                    </div>
                </form>
                {
                    input.countries.map( el=>
                        <div className={style.divCountry}>
                            <p>{el}</p>
                            <button className={style.buttonCountry} onClick={()=>handleDelete(el)}>x</button>
                        </div>)
                }
            </div>
        </div>
    </div>
    )
}
