var mongoose=require('mongoose');


var question_schema={
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    correct: String,
    point: Number,
    theme:String,
    id: Number,
  };

module.exports=question_schema;