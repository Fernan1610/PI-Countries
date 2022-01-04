import React from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {getDetail , getActivities} from "../acctions"
import { useEffect } from "react";
import {useParams} from "react-router"
import ActivityCard from "./ActivityCard"

export default function Detail(){
    const {id} = useParams();
    console.log(id)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDetail(id))
        dispatch(getActivities())
        
    },[dispatch,id]);

    const country = (useSelector((state)=>state.detail));
    //const a=useSelector((state)=>state.activities);
    
    // console.log("CountryActivity tiene algo?")
    // console.log(country.activities,'holaaa')
    return(
        <div>
            <div>
                <Link to ='/home'> <button>Volver</button></Link>
                

            </div>
            
                <img src={country.image} alt="img not found" width="200px" height= "148px"/>
                <div>
                    <p> <strong>Pais:</strong>{country.name} </p>
                    <p><strong>Capital:</strong>{country.capital}</p>
                    <p><strong>Continente:</strong> {country.continente} </p>
                    <p><strong>Area:</strong>{country.area}</p>
                    <p><strong>Poblacion:</strong>{country.population}</p>
                    <p><strong>Sub Region:</strong>{country.subregion}</p>
                    <p><strong>Actividades:</strong></p>
                    <div>
                        {   
                            console.log(country),
                            country.Activities && country.Activities.map((activity)=>
                                <ActivityCard
                                name={activity.name}
                                dificultad= {activity.dificultad}
                                duration={activity.duration}
                                season= {activity.season}>

                                </ActivityCard>
                            )
                        }
                    </div>

                </div>


            
        </div>
    )
}