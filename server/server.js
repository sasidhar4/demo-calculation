const express = require('express');
const app = express();
const PORT = 9000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoConfig = {
    "uri": "mongodb://localhost/calculator",
    "password": "calculator@test"
}
const calData = new Schema({
    name: String,
    number1: {
        type: Number,
        required: true
    },
    number2: {
        type: Number,
        required: true
    },
    result: {
        type: Number,
        required: true
    }
});
app.use(bodyParser.json());
app.use(express.static('public'))
var CalData = mongoose.model('CalData', calData);
mongoose.connect(mongoConfig.uri);

app.post('/saveData', (req, res) => {
    var calDataObj = new CalData({
        number1: req.body.number1,
        number2: req.body.number2,
        result: req.body.result
    })
    calDataObj.save(function (err, result) {
        if (err) {
            return res.json({
                status: 0,
                message: 'Data insertion failed',
                data: []
            });
        } else {
            var result = {
                status: 1,
                message: 'Data insertion successfully'
            }
            CalData.find({},function (err, doc) {
                if (err) {
                    return res.json({
                        status: 0,
                        message: 'Data fetch failed',
                        data: []
                    });
                } else {
                    result.data = doc;
                    return res.json(result);
                }
            })
        }
    })
})

app.get('/getData', (req, res) => {
    CalData.findOne({
        _id: req.query.id
    },function (err, result) {
        if (err) {
            return res.json({
                status: 0,
                message: 'Data fetch failed',
                data: {}
            });
        } else {
            return res.json({
                status: 1,
                message: 'Data fetched successfully',
                data: result
            });
        }
    })
})

app.listen(PORT);
console.log(`Server russing on ${PORT}`);