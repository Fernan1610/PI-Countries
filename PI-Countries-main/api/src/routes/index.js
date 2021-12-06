const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require("sequelize");
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
    return await Country.findAll({
        include :{
            model: Activity,
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
    const {name}= req.query;
    let countriesTotal = await getAllCountry();
    if(name){
      const countryName = await countriesTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
      //const contriesActivities=countryName.concat(getDbInfo)
      // const countryName = await countriesTotal.findAll({
      //   include: Activity,
      //   where:{
      //     name:{

      //          [Op.iLike]: '%'+name+'%'
      //     }
      //   }
      // })
      
      countryName.length
        ? res.status(200).send(countryName)
        : res.status(404).send("The country with that name was not found");
    
      

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


router.post("/activities", async (req, res ,next) => {
  let { name, dificultad, duration, season, countries } = req.body;
  try{
    if(name && dificultad&& duration && season){

      let activityAdd = await Activity.create({

         name,
         dificultad,
         duration,
         season,
       })
  
       try{
          
         let countriesBody =await Country.findAll({
           where:{name: countries}
         })
      
         activityAdd.addCountry(countriesBody)
         res.status(200).send("Se creo la Actividad con exito")
       }catch(error){
         
        res.status(404).send("Entre a cargar pero no encontre country")
       }
  
    }else{
      res.status(404).send("Error no ingresaste los campos correctamente")
    }

  }catch (error){
    next(error)
  }
});
  // try {
  
  //   for (const i of countries) {
  //     const country = await Country.findOne({
  //       where: {
  //         i: i,
  //       },
  //     });
  //   }
  //   // countries.forEach(async(el) => {
  //   //   let activityCountry= await Country.findOne({
  //   //     where: {
  //   //       name : countries
  //   //     }
  //   //   })
  //   //   await activityAdd.addCountry(activityCountry);
  //   // });
  
  
  //   res.status(200).send("se Creo Actividad")
  // } catch (error) {
    
  //   console.log(error);
  //   res.status(500).json({ message: "Error" });
  // }



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
  
  // router.post('/activities', async (req, res, next) => {
  //   const {name,dificultad,duration,season,country} = req.body
  //   try {
  //       if(name && dificultad && duration && season){
  //           let activityCreated = await Activity.create({
  //                   name,
  //                   dificultad ,
  //                   duration ,
  //                   season,
  //               })
  //   try {
  //       let countryDB = await Country.findAll({
  //           where:{
  //               name : country
  //           }})
  //           await activityCreated.addCountries(countryDB)
  //           res.send(countryDB)
  //   }
  //   catch (error) {
  //           next(error)
  //       }
  //   }
  //   else{
  //       res.status(404).send("Error no ingresaste los campos correctamente")
  //       }
  //   }
  //   catch (error) {
  //       next(error)
  //       }
  //   });