var mongoose = require('mongoose');

var student;
var model1=function model(model, collection_name) {
    student = mongoose.model(model, {
        question: String,
        answer1: String,
        answer2: String,
        answer3: String,
        answer4: String,
        correct: String,
        point: Number,
    }, collection_name);

    return student;
}


module.exports={
    student:student,
    model:model1,
}