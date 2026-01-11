const express=require('express');
const cookieParser = require('cookie-parser');
const cors=require("cors");
const app = express();

app.use(cookieParser());
app.use(cors({
  origin:'https://prime-4fht.onrender.com',credentials:true}
));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});
app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000`);
});
const dbconnect=require('./configuration/database');
dbconnect();
const userroutes=require('./Routes/Route');
app.use('/api/v1',userroutes);