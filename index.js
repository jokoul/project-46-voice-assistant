require("dotenv").config();
// api_key = process.env.API_KEY;
// // console.log(api_key);

// let domain = "sandbox722569e5e003474da2195b3747c254e8.mailgun.org";
// var mailgun = require("mailgun-js")({apiKey:api_key,domain:domain})

// var data = {
//   from: "Joan test application speech to text send by email <me@sample.mailgun.org>",
//   to: "joankouloumba90@gmail.com",
//   subject: "test application speech to text send by email",
//   text:'Testing some Mailgun message feature'
// };

const express = require("express");
const cors = require("cors");
const path = require("path");

const sendRoute = require("./routes/sendRoute");

//create express application
const app = express();

//creating the middleware
app.use(express.json());
app.use(cors());

//send route
app.use("/", sendRoute);
// app.use('/', (req,res)=>{
//   console.log(req)
//   return res.status(200).json({msg:"received!"})
// });

//Deployment with Heroku
//const __dirname = path.resolve(); //get the current file path
// app.use(express.static(path.join(__dirname, "/voice-assistant/build"))); //serve all files in build folder
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "frontend/build/index.html"))
// );//everything is gonna be serve on index.html file

if (process.env.NODE_ENV === "production") {
  //we create a "build" folder in "client"
  app.use(express.static("voice-assistant/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "voice-assistant", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
