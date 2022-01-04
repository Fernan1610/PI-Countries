const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Op } = require("sequelize");
const axios =require('axios').default;
const {Country ,Activity  }= require ("../db.js");

const router = Router();
const {getApiInfo}=require("./controler.js")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// const getApiInfo=async()=>{
//     const apiUrl= await axios.get('https://restcountries.com/v3/all');
//     const apiInfo= await apiUrl.data.map(el =>{
//         return {
//             id: el.cca3,
//             name: el.name.common,
//             image: el.flags.find((e)=>e.includes('svg')),  
//             continente: el.region,
//             capital: el.capital,
//             subregion: el.subregion,
//             area: el.area,
//             population: el.population,
            
//         };
//     });
    
//     return apiInfo;
// }


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

router.get('/countries', async (req,res,next)=>{
    const name= req.query.name;
    //let countriesTotal = await getAllCountry();
    if(name){
     // const countryName = await countriesTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
      //const contriesActivities=countryName.concat(getDbInfo)
      // const countryName = await countriesTotal.findAll({
      //   include: Activity,
      //   where:{
      //     name:{

      //          [Op.iLike]: '%'+name+'%'
      //     }
      //   }
      // })
      
      // countryName.length
      //   ? res.status(200).send(countryName)
      //   : res.status(404).send("The country with that name was not found");
      try{
        let countriQuery = await Country.findAll({
          include: Activity,
          where:{
              name:{
                  [Op.iLike]: '%' + name +'%'}}})
        if(!countriQuery.length){
          return res.status(404).json('No se encontro el pais buscado')
        }else{
          return res.send(countriQuery)
        }

      }catch(error){
        next(error)
      }
      

    }else{
        try{
          const paisesEnDB =await Country.findAll({
            include:{model:Activity}
          })
          return res.json(paisesEnDB)
        }catch(error){
          next(error)
        }
    }
});

// router.get("/countries/:id", async (req, res) => {
//     const { id } = req.params;
    
//     try {
//       let countryById = await getAllCountry();
//       let resultById =countryById.filter(el => el.id.toLowerCase()===(id.toLowerCase()));
      
//       resultById.length?
//         res.status(200).send(resultById):
//         res.status(404).send("error");
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   });
  router.get('/countries/:id', async (req,res) => {
    // Obtener el detalle de un país en particular
    // Debe traer solo los datos pedidos en la ruta de detalle de país
    // Incluir los datos de las actividades turísticas correspondientes

    const countryId = req.params.id

    let countryById = await Country.findByPk(countryId, {
        include : {
            model : Activity
        }
    })

    res.status(200).send(countryById)
})
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
  console.log(req.body)
  try{
    if(name && dificultad&& duration && season){

      let activityAdd = await Activity.create({

         name,
         dificultad,
         duration,
         season,
       })
  
       try{
          
         let countriesBody = await Country.findAll({
           where:{id: countries,
           }
         })
         console.log(countriesBody)
      
         activityAdd.addCountry(countriesBody)
         console.log(activityAdd)
         res.status(200).send("Se creo la Actividad con exito")
       }catch(error){
         console.log(error)
        res.status(404).send("Entre a cargar pero no encontre country")
       };
  
    }else{
      res.status(404).send("Error no ingresaste los campos correctamente")
    }

  }catch (error){
    next(error)
  };
  
});
 

router.get('/activities', async(req, res, next) => {
  return Activity.findAll({})
  .then((actividadesCreadas) => {
      res.json(actividadesCreadas)
  })
  .catch((error) => {
      next(error)
  }) 
  // const tuReturn=await Activity.findAll({})
  // res.send(tuReturn)
})
  
  
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