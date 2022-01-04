import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { searchByName } from "../acctions";
import style from './Styles/SearchBar.module.css';
export default function SearchBar(){
    const dispatch =useDispatch();
    const [name,setName]=useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        if (name !== ""){
            console.log("entre al handle")
            document.getElementById("inputSearch").value="";
            dispatch(searchByName(name));
            setName("");
          } else {
            alert("Enter the name of the countries to search");
        } 
    }
    return(
        <div>
            <form action="" onSubmit= {e=> handleSubmit(e)} className={style.searchForm}>
                <input  id= "inputSearch" type = 'text' placeholder = "Buscar..." onChange= {e=>handleInputChange(e)} ></input>
                <button type = 'submit' className={style.searchButton}>Buscar</button>

            </form>
            
        </div>
    )
}