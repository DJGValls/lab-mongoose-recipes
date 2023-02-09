const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Fideua",
    level: "Amateur Chef",
    ingredients: [
      "fideos finos",
      "1 pimiento verde",
      "3 ajos",
      "1 calabacin",
      "2 zanahorias",
      "1 calamar",
      "15 langostinos",
      "caldo de verdura",
    ],
    cuisine: "Catalana",
    dishType: "main_course",
    image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimag.bonviveur.com%2Ffideua-de-pescado-y-marisco.jpg&imgrefurl=https%3A%2F%2Fwww.bonviveur.es%2Frecetas%2Ffideua-de-pescado-y-marisco&tbnid=56dciHYAwpUOuM&vet=12ahUKEwjFwejU8oj9AhWsvycCHQRXBHAQMygCegUIARCMAg..i&docid=rosmmrCJdO5NdM&w=1200&h=797&q=fideua&ved=2ahUKEwjFwejU8oj9AhWsvycCHQRXBHAQMygCegUIARCMAg",
    duration: 40,
    creator: "Chef Dani - Pilar"
    })
  })
  // .then((response)=>{
  //   //console.log(response);
  //   // return Recipe.deleteOne({title: "Asian Glazed Chicken Thighs" })
  // })
  .then(()=>{
    return Recipe.insertMany(data)
  })
  .then((response)=>{
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100} , {new:true})
  })
  .then((response)=>{
    console.log("Receta modificada correctamente")
  })
  .then(()=>{
    return Recipe.deleteOne({title:"Carrot Cake"})
  })
  .then((response)=>{
    console.log("Carrot Cake eliminado")
    mongoose.connection.close(()=>{
      console.log("Conexion cerrada")
    })
    
  })
  // .then(()=>{
  //   mongoose.connection.close(()=>{
  //     console.log("Conexion cerrada")
  //   })
  // })
 
 
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



