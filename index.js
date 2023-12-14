const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const timestamp = require('time-stamp');


app.get("/",(req,res)=>{
       fs.writeFileSync(`./timeStamps/${timestamp.utc('YYYY-MM-DD-HH-mm-ss')}.txt`,`${timestamp.utc('YYYY/MM/DD:HH:mm:ss')}`);
        res.send(`${timestamp.utc('YYYY-MM-DD-HH-mm-ss')}.txt file is created in timeStamps folder with date-time as its content.\n
                  To read files created till now on timestamps folder,use API endpoint"/read"`);
});


app.get("/read",(req,res)=>{

    fs.readdir("timeStamps",(err,files)=>{
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
         }
        res.json({files});
    });
});



app.listen(4001);

