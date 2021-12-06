import React from "react";
import style from './Styles/Card.module.css'

export default function Card({name,image,continente, population}){
    return (
        <div className={style.Card}>
            <img src={image} alt="img not found" width="200px" height= "148px"/>
            <h3> {name} </h3>
            <h3> {continente} </h3>
            <h3>{population}</h3>
            
        </div>
    );
}