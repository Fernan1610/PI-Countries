import React from 'react';
import {Link} from 'react-router-dom';
import style from "./Styles/LandingPage.module.css"
export default function LandingPage(){
    return(
        <div className= {style.all}>
        <div >
            <h1 className= {style.title}> ¡Bienvenidos a mi Proyecto! ¿Entramos?</h1>
            
            <Link to = '/home'>
                <button className= {style.homeButton}>Ingresar</button>
            </Link>
        </div>

        </div>
    )
}
