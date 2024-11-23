const express = require('express');
const mongoDB = require('./db'); // Adjust path if needed

const app = express();
const PORT = 5000;
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


app.use(express.json());  
app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use('/api', require("./Routes/CreateUser"));

app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData.js"))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
