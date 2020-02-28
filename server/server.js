const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', function (req, res) {
    res.send('Hello from server')
})

app.post('/register', function(req, res, next){

    setTimeout(
        () => {
            console.log(req.body)
    res.status(200).send({"message": "Data received"});
        }, 3000
    );    
})

app.listen(PORT, function () {
    console.log("Server running on localhost:" + PORT);
});
