import React from "react";
import style from './Styles/Card.module.css'
import { Link } from "react-router-dom";

export default function Card({ id, name,image,continente, population ,area}){
    return (
        
                <div className={style.Card}>
                    <img src={image} alt="img not found" width="200px" height= "148px"/>
                    <Link to={'/home/'+id}>
                     <h3> {name} </h3>
                    </Link>
                    <h3> {continente} </h3>
                    <h3>{population}</h3>
                    <h3>{area}</h3>
                    
                </div>
        
        
    );
}