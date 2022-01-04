const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    
   
    dificultad: {
      type:DataTypes.ENUM("1","2","3","4","5"),
     // type: DataTypes.STRING,
      allowNull: true
    },
    
    duration: {
        type: DataTypes.STRING,
        allowNull: true,        
      },
      season: {
        type:DataTypes.ARRAY(DataTypes.ENUM('Summer', 'Autumn', 'Spring', 'Winter')),
        
        allowNull: true,
      },      
    
   
  },
    {
      timestamps: false 
    },
    {freezeTableName: true,}
  );
};