const axios = require('axios').default;

const getApiInfo=async()=>{
    const apiUrl= await axios.get('https://restcountries.com/v3/all');
    const apiInfo= await apiUrl.data.map(el =>{
        return {
            id: el.cca3,
            name: el.name.common,
            image: el.flags.find((e)=>e.includes('svg')),  
            continente: el.region,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population,
            
        };
    });
    
    return apiInfo;
}

module.exports={getApiInfo};