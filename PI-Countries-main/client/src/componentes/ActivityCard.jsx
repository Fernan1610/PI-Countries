import React from "react";


export default function Card({ name,dificultad,duration,season}){
    return (
                <div >
                     <h3> {name} </h3>
                    
                    <h3> {dificultad} </h3>
                    <h3>{duration}</h3>
                    <h3>{season}</h3>
                    
                </div>
        
        
    );
}