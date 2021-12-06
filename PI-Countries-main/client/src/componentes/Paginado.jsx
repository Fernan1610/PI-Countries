import React from "react";
import style from "./Styles/Paginado.module.css"
export default function Paginado ({pages,countriesPages,allCountries,paginado}){


    const pagesNumber =[];

    for(let i=1; i<Math.ceil(allCountries/countriesPages) ; i++){
        pagesNumber.push(i);

    }

    return (
        <nav>
            <ul className = {style.pages}>
                {
                    pagesNumber && pagesNumber.map((number) =>
                       (   
                           <li className = {number==pages?style.actualPage:style.items} key ={number} >
                             <a onClick= {()=>paginado(number)}>{number}</a>
                                {/* <li className = 'number' key ={number}>
                                </li> */}
                               
                           </li>
                        )
                    )

                }
            </ul>
        </nav>
    )
}