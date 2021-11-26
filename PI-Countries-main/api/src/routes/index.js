const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios =require('axios').default;
const {Country ,Activity  }= require ("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
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


const getDbInfo =async()=>{
    return await Activity.findAll({
        include :{
            model: Country,
            atributes: ["name"],
            trough: {
                atributes: [],
            }
        }
    })
}

const getAllCountry = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo= await getDbInfo();
    const infoTotal=apiInfo.concat(dbInfo);
    return infoTotal;
} 

router.get('/countries', async (req,res)=>{
    const name= req.query.name;
    let countriesTotal = await getAllCountry();
    if(name){
        let countriesName= await countriesTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()));

        countriesName.length?
        res.status(200).send(countriesName):
        res.status(404).send("error");

    }else{
        res.status(200).send(countriesTotal);
    }
});

router.get("/countries/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
      let countryById = await getApiInfo();
      let resultById =countryById.filter(el => el.id.toLowerCase()===(id.toLowerCase()));
      
      resultById.length?
        res.status(200).send(resultById):
        res.status(404).send("error");
    } catch (error) {
      res.status(400).send(error);
    }
  });

//   router.get("/countries/name", async (req, res) => {
//     const { name } = req.query.name;
    
//     let countryByname = await getApiInfo();
//     let resultByname =countryByname.filter(el => el.name.toLowerCase()===(name.toLowerCase()));
    
//     resultByname.length?
//       res.status(200).send(resultByname):
//       res.status(404).send("Error");
    
//   });


router.post("/activities", async (req, res) => {
    try {
   const { name, difficulty, duration, season, countries } = req.body;
   const activityAdd = await Activity.create({
      
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });
  
    for (const i of countries) {
      const country = await Country.findOne({
        where: {
          id: i,
        },
      });
  
    country.addActivity(activityAdd);
  }
    res.json(activityAdd);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }});
  
  
  router.get("/activities", async (req, res) => {
    try {
      const activities = await Activity.findAll({
        include: {
          model: Country,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.json(activities);
    } catch (error) {
      res.status(400).send("Something went wrong");
    }
  });


module.exports = router;
