var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var USERNAME = "abmin555"; // Replace with your actual MongoDB username
var PASSWORD = "itispassword"; // Replace with your actual MongoDB password
var DATABASE_NAME = "todoappdb";
var database;

var CONNECTION_STRING = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.nvyw2hs.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error('Error connecting to MongoDB:', error);
            return;
        }

        database = client.db(DATABASE_NAME);
        console.log("Mongo DB Connection Successful");
    });
});


app.get('/api/todoapp/GetNotes',(request,response)=>{
    database.collection("todoappcollection").find({}).toArray((error,result)=>{
        response.send(result);
    })
})

app.post('/api/todoapp/AddNotes',multer().none(),(request,response)=>{
    database.collection("todoappcollection").count({},function(error,numofDocs){
        database.collection("todoappcollection").instertOne({
            id:(numofDocs+1).tostring(),
            description:request.body.newNotes
        })
        response.json("Added Succesfully");
    })
})

app.delete('/api/todoapp/DeleteNotes',(request,response)=>{
    database.collection("todoappcollection").deleteOne({
        id:request.query.id
    })
    response.json("Delete Successfully");
})
