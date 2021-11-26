import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1> ¡Bienvenidos al Himalaya! ¿Helado?</h1>
            <link to= '/home'>
                <button>Ingresar</button>
            </link>
        </div>
    )
}
