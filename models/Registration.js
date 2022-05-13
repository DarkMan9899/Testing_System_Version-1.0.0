mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true
});
const hash = crypto.createHash('sha256').update(req.body.pswd1).digest('hex');
var secure_code = uuid(req.body.email);
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
        email: req.body.email
    }));
});