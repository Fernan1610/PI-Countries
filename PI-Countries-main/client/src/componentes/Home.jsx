import React from "react";
import {useState,useEffect} from 'react';
import {useDispach,useSelector}from 'react-redux';
import { getCountries } from "../acctions";

export default function Home(){
    const dispach=useDispach();
    const allCountries=useSelector((state)=>state.countries)

    useEffect(()=>{
        dispach(getCountries());
    },[])

    function handleClick(e){
        e.preventDefault();
        dispach(getCountries());
    }
    return (
        <div>
            <link to ='/activities'> Crear Actividad </link>
            <h1>Paises</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los piases
            </button>

            <div>
                <select>
                    <option value= "asc">Ascendente</option>
                    <option value = "desc">Descendente</option>

                </select>
                <select>
                    <option value = "all">Todos</option>
                    <option value = "americaN">America del Norte</option>
                    <option value = "americaS">America del Sur</option>
                    <option value = "afri">Afica</option>
                    <option value = "ocea">Oceania</option>
                    <option value = "asia">Asia</option>
                    <option value = "eur">Europa</option>
                </select>
                <select>
                <option value = "all">Todos</option>
                <option value = "create">Creados</option>
                
                </select>

            </div>
        </div>
    )
}