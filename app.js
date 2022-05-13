const express = require('express');
const crypto = require('crypto');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const secret = require('uid');
const body = require('body-parser');
const uuid = require('uuid/v4');
const app = express();
const mongoose = require('mongoose');
const id = require('mongodb').ObjectId('5c7a73e48779230ef8d0dec6');
const port = 3000;
var fs = require('fs');
var binary = require('mongodb').Binary;



app.use(body.urlencoded({
  extended: true
}));
app.use(body.json());
app.set('view engine', 'hbs');
app.use(
  session({
    secret: secret(10),
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/public', express.static(path.join(__dirname, 'public')));
var User = require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());



app.get('/', function (req, res) {
  res.render('Home');

  if (req.isAuthenticated() && req.user.type == 'lecturer') res.redirect('/lecturer');
  if (req.isAuthenticated() && req.user.type == 'student') res.redirect('/student');
  if (req.isAuthenticated() && req.user.type == 'admin') res.redirect('/admin');
});

app.get('/user_error', function (req, res) {
  res.render('Home', { error: 'Սխալ մուտքանուն և/կամ գաղտնաբառ' });
});


var question = require('./models/question');
var lecturer, lecturer1;
app.post('/', passport.authenticate('login', { failureRedirect: '/user_error' }), function (req, res) {

  if (req.isAuthenticated()) {
    if (req.user.type == 'lecturer') {
      lecturer = mongoose.model(req.user.group_number, question);
      lecturer1 = mongoose.model(req.user.group_number + '_temp', question);
      //     for(var i=0;i<20;i++){
      //     var r = Math.floor(Math.random() * Math.floor(3));
      //      question.insertMany({question:i,answer1:i,answer2:i,answer3:i,answer3:i,answer4:i,correct:i,point:r},function(){})
      //    }
      res.redirect('/lecturer');
    }
    if (req.user.type == 'student') res.redirect('/student');
    if (req.user.type == 'admin') res.redirect('/admin');
  }

});

/////////////////////////Lecturer Page
app.get('/lecturer', function (req, res) {
  if (req.isAuthenticated()) res.redirect('/lecturer/' + req.user._id);
  else res.redirect('/');

});


app.get('/lecturer/:id', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('Lecturer', { firstname: req.user.firstname, lastname: req.user.lastname, code: req.user._id });

  } else res.redirect('/');
});

//////////////////////////Student Page
app.get('/student', function (req, res) {
  if (req.isAuthenticated()) res.redirect('/student/' + req.user._id);
  else res.redirect('/');
});


app.get('/student/:id', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('Student', { firstname: req.user.firstname, lastname: req.user.lastname, code: req.user._id });
  } else res.redirect('/');
});

////////////////////////Admin Page
app.get('/admin', function (req, res) {
  if (req.isAuthenticated()) res.render('Admin');
  else res.redirect('/');
});
///////////////////////////
app.post('/correct', function (req, res) {
  mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
  });

  User.updateOne({
    secure_code1: req.body.secure_code
  }, {
      secure_code2: req.body.secure_code
    }, function (err, result) {
      if (result) res.json({ close: true });
    })

});
/////////////regist. for student
app.post('/student_registration', function (req, res) {
  mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
  });


  User.collection.findOne({ email: req.body.email }, function (err,result) {
    if (result!==null) res.json({ valid: false});
    else {
      const hash = crypto.createHash('sha256').update(req.body.pswd1).digest('hex');
      var secure_code = uuid(req.body.email + 'student');
      User.collection.insertOne({
        firstname: req.body.fname,
        lastname: req.body.lname,
        patronymic: req.body.patr,
        birthday: req.body.bday,
        type: 'student',
        group_number: req.body.gnum,
        email: req.body.email,
        password: hash,
        secure_code1: secure_code,
        secure_code2: '-',
        allow: false,
      }, function (err, result) {
        res.send(JSON.stringify({
          secure_code: secure_code,
          email: req.body.email,
          valid: true,
        }));
      });
    }


  });

});


/////////////registr. for lecturer
app.post('/lecturer_registration', function (req, res) {
  mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
  });
  console.log(req.body);
  if (req.body.type == 1) {
    const hash = crypto.createHash('sha256').update(req.body.pass).digest('hex');
    var secure_code = uuid(req.body.email + 'lecturer');
    User.collection.insertOne({
      firstname: req.body.fname,
      lastname: req.body.lname,
      patronymic: req.body.patr,
      birthday: '-',
      type: 'lecturer',
      group_number: req.body.gnum,
      email: req.body.email,
      password: hash,
      secure_code1: secure_code,
      secure_code2: '-',
      allow: true,
    }, function (err, result) { });
  } else {
    const hash2 = crypto.createHash('sha256').update(req.body.pass).digest('hex');
    User.findByIdAndUpdate(req.body.id, {
      firstname: req.body.fname,
      lastname: req.body.lname,
      patronymic: req.body.patr,
      email: req.body.email,
      password: hash2
    }, function (err, res) { });
  }
});

/////////////////////////////

app.post('/logout', function (req, res) {
  if (req.user.type == 'lecturer') mongoose.connection.deleteModel(req.user.group_number);
  //if (req.user.type == 'student') mongoose.connection.deleteModel('user');
  mongoose.connection.close();
  req.logOut();
  res.redirect('/');
});



app.post('/get_question', function (req, res) {
  lecturer.find(function (err, result) {

    res.json({
      result: result
    })
  });
});

var gen = mongoose.model('Checked', {
  name: String,
  allow:
  {
    type: String,
  },
  groupe: {
    type: Array,
    unique: true,
  },
  questionnaire: [],
}, 'Checked');

app.post('/gen_question', function (req, res) {
  mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
  });


  //var queue = new Array(parseInt(req.body.c1) * parseInt(req.body.c2));
  var queue1 = new Object();
  var queue;
  var theme = req.body.t;
  var random;
  var k1 = 0,k2 = 0;


  for (var i3 = 0; i3 < theme.length; i3++) {
    lecturer.find({ point: theme[i3] }).select('_id').select('point').exec(function (err, doc) {
      lecturer1.insertMany(doc, function (err, doc) { })
    });

  }

//while(k2<2){
  //if(k2==1){
    var quest = new Array;
    //  quest.push(data[index].questionnaire);
    //  gen.findOneAndUpdate({ name: req.user.group_number }, { $addToSet: { questionnaire: quest } }, function (err, doc) { console.log(doc) });
      
    for (var i = 0; i < parseInt(req.body.c1); i++) {
      
      for (var j = 0; j < parseInt(req.body.c2); j++) {
        lecturer1.findOneAndRemove({ point: theme[k1] }, function (err, doc) {
         // console.log(doc+(i*j).toString());
         quest.push(doc);
        });
        k1++;
        if (k1 == theme.length) k1 = 0;
      }
      gen.findOneAndUpdate({ name: req.user.group_number }, { $addToSet: { questionnaire: quest } }, function (err, doc) { console.log(doc) });
      quest.pop();
    }
  //}
  //k2++;
  //}
 // gen.insertMany({$push:questionnaire})
});

app.post('/update', function (req, res) {
  console.log(req.body.id);
  lecturer.findByIdAndUpdate(req.body.id, {
    question: req.body.question,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
    correct: req.body.correct,
    point: req.body.point,
  }, function (err, res) { });
});

app.post('/remove', function (req, res) {
  lecturer.findByIdAndDelete(req.body.id, function (err, res) { });
});

app.post('/insert', function (req, res) {
  lecturer.collection.insertOne({
    question: req.body.question,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
    correct: req.body.correct,
    point: req.body.point,
  }, function (err, doc) { });
});

app.post('/example', function (req, res) {
  var data = req.body.d1;
  //console.log(data[0].id);

  for (var index = 0; index < req.body.len; index++) {
    if (data[index].type == 1) {
      lecturer.findByIdAndUpdate(data[index].id, {
        question: data[index].question,
        answer1: data[index].answer1,
        answer2: data[index].answer2,
        answer3: data[index].answer3,
        answer4: data[index].answer4,
        correct: data[index].correct,
        point: data[index].point
      }, {
          upsert: true,
          new: true,
          overwrite: true
        }, function (err, res) { console.log('updated') });

    }
    else if (data[index].type == 2) lecturer.findByIdAndDelete(data[index].id, function (err) { console.log('removed') })
    else if (data[index].type == 3) {
      let start;
      lecturer.collection.countDocuments(function (err, result) {
        start = result;
      });


      lecturer.collection.insertOne({
        question: data[index].question,
        answer1: data[index].answer1,
        answer2: data[index].answer2,
        answer3: data[index].answer3,
        answer4: data[index].answer4,
        correct: data[index].correct,
        point: data[index].point,
      }, function (err, doc) { console.log('inserted') });
    }

    else if (data[index].type == 4) {
      var quest = new Array;
      quest.push(data[index].questionnaire);
      gen.findOneAndUpdate({ name: req.user.group_number }, { $addToSet: { questionnaire: quest } }, function (err, doc) { console.log(doc) });
      quest.pop();
    }


  }
});

app.post('/example1', function (req, res) {
  console.log(req.body.name);
  var question_for_stud = mongoose.model(req.body.name, {
    lecturer: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    correct: String,
    point: Number,
    id: Number,
  });
  gen.find({ name: req.body.name }, function (err, result) {
    var rnd = Math.floor(Math.random() * Math.floor(result[0].questionnaire.length));
    // console.log(rnd);
    // console.log(result[0].questionnaire[rnd]);

    // var arr = []
    // var a;
    console.log(result[0].questionnaire[rnd]);
    question_for_stud.find({ '_id': result[0].questionnaire[rnd] }, function (err, doc) {
      res.json({ data: doc });
    })

    mongoose.connection.deleteModel(req.body.name);
  });
});






app.post('/allow', function (req, res) {
  console.log(req.body.gr);
  gen.findOne({ name: req.user.group_number }, function (err, result) {
    // if(result) console.log(true);else console.log(false);
    if (!result)
      gen.insertMany({
        name: req.user.group_number,
        allow: true,
        groupe: req.body.gr,
      });
    else gen.findOneAndUpdate({ name: req.user.group_number }, { $push: { groupe: req.body.gr } }, function (err, res) { });

  })

});

app.post('/get_question_for_stud', function (req, res) {

  gen.find({ groupe: req.user.group_number, allow: 'true' }, function (err, result) {
    res.json({ result: result });
  })
});

app.post('/admin_data', function (req, res) {

  User.find({ type: 'lecturer' }, function (err, result) {
    res.json({ result: result });
  })
});

app.post('/allow_test', function (req, res) {
  User.find({ group_number: req.body.gr }, function (err, result) {
    res.json({ result: result });
  });

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


/*
for(var i=0;i<100;i++)
{
  question.collection.deleteOne({question:i},function(){});
}

for(var i=0;i<20;i++){
  question.insertOne({question:i,answer1:i,answer2:i,answer3:i,answer3:i,answer4:i,correct:i,point:3},function(){})
}*/