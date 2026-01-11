const express=require('express');
const cookieParser = require('cookie-parser');
const cors=require("cors");
const app = express();

app.use(cookieParser());
app.use(cors({
  origin:'https://prime-4fht.onrender.com/api/v1',credentials:true}
));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

const dbconnect=require('./configuration/database');
dbconnect();
const userroutes=require('./Routes/Route');
app.use('/api/v1',userroutes);