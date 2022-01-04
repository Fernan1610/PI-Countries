import React from "react";
import {useState,useEffect} from 'react';
import {useDispatch,useSelector}from 'react-redux';
import { Link } from "react-router-dom";
import { getCountries , 
        filterContriesByContinent,
        getActivities,
        filterByActivity,
        filterByPopulation,
        orderByName,
    filterByArea} from "../acctions";
import Card from './Card'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

import style from "./Styles/Home.module.css"

export default function Home(){
    const dispatch=useDispatch();
    const allCountries=useSelector((state)=>state.countries);
    const allActivities=useSelector((state)=>state.activities);
   
    const [order, setOrder] = useState("");
    //para paginado //
    const [currentPage,setCurrentPage]=useState(1);
    const [countriesPage,setCountriesPage]= useState(9);
    const indexOfLastCountry=currentPage*countriesPage;
    const indexOfFirstCountri=indexOfLastCountry-countriesPage;
    const currentCountry=allCountries.slice(indexOfFirstCountri,indexOfLastCountry);

    const paginado = (pagina)=>{
        setCurrentPage(pagina);
    }

    useEffect(()=>{
        dispatch(getCountries());
    },[dispatch])
    
    useEffect(()=>{
        
        dispatch(getActivities());
    },[dispatch])

    {/*Funciones handles*/}
    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterStatus(e){
        
        dispatch(filterContriesByContinent(e.target.value))
        setCurrentPage(1);
        
    }
    function handleFilterActivities(e){
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterPopulation(e){
        e.preventDefault()
        dispatch(filterByPopulation(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered-${e.target.value}`);
    }
    function handleOrderName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered-${e.target.value}`);
    }
    function handleArea(e){
        e.preventDefault();
        dispatch(filterByArea(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordered-${e.target.value}`);


    }
    return (
        <div className= {style.all}>
                    <h1 className = {style.title}>Paises</h1>
                    <Link  className= {style.title} to ='/activity'> Crear Actividad </Link>
            <div className = {style.nav}>
                <div className={style.buttons} >

                    <button onClick={e=>{handleClick(e)}}>
                        Volver a cargar todos los piases
                    </button>

                    <Link to='/'><button> volver al landing</button></Link>

                </div>
                <div className={style.toAlign2}>
                    <SearchBar/>
                </div>
                

            </div>
            <div >
                <select onChange={e=>handleArea(e)}>
                <option value="All">Area</option>
                    <option value="mayor">Menor Area</option>
                    <option value="menor">Mayor Area</option>
                </select>
                {/*ordenar: A-Z Z-A  && poblacion Mayor menor*/}
                <select onChange = {e=>{handleOrderName(e)}}>
                    <option>-Name-</option>
                    <option value= "asc">Ascendente</option>
                    <option value = "desc">Descendente</option>

                </select>
                <select onChange = { e => {handleFilterPopulation(e)}}>
                    <option>-Population-</option>
                    <option value= "mayor">Mayor Poblacion</option>
                    <option value = "menor">Menor Poblacion</option>

                </select>
                {/*filtrar por :*/}
                <select onChange = {e => {handleFilterStatus(e)}}>
                    <option value = "all">-Continente-</option>
                    <option value = "Antarctic">Antarctico</option>
                    <option value = "Americas">Americas</option>
                    <option value = "Africa">Afica</option>
                    <option value = "Oceania">Oceania</option>
                    <option value = "Asia">Asia</option>
                    <option value = "Europe">Europa</option>
                </select>
                {/*filtrar por actividades*/}
                <select onChange = {e=>{handleFilterActivities(e)}}>
                <option value="all">-Activity-</option>
                 {
                    allActivities && allActivities.map((el) =>  <option key={el.id} value={el.name}> {el.name}</option>)
                 }
                
                </select>

                <Paginado 
                page={currentPage}
                countriesPages={countriesPage}
                allCountries={allCountries.length}
                paginado={paginado}
                />
                <div className={style.toAlign}>
                    <div className={style.cards}>
                        {
                            currentCountry?.map( e=>(
                                <Card  id= {e.id} name={e.name} image = {e.image} continente ={e.continente}  population ={e.population} area={e.area} key={e.id} ></Card>
                            ))
                        }

                    </div>
                </div>


            </div>
        </div>
    )
}