var lecturer = [];
$(document).ready(function () {

    $.ajax({
        url: "http://localhost:3000/admin_data",
        type: 'post',
        dataType: 'json',
        data: 'true',
        success: function (result) {
            for (var index = 0; index < result.result.length; index++) {
                $('#table').append(" <tbody><tr>" + " <td><input type='text' class='input' id='fname" + result.result[index]._id + "' value=" + JSON.stringify(result.result[index].firstname) + " name='question'></td>" +
                    " <td><input type='text' class='input' id='lname" + result.result[index]._id + "' value=" + JSON.stringify(result.result[index].lastname) + " name='answer1'></td>" +
                    " <td><input type='text' class='input' id='patr" + result.result[index]._id + "' value=" + JSON.stringify(result.result[index].patronymic) + " name='answer2'></td>" +
                    " <td><input type='text' class='input' id='gnum" + result.result[index]._id + "' value=" + JSON.stringify(result.result[index].group_number) + " name='answer3'></td>" +
                    " <td><input type='text' class='input' id='email" + result.result[index]._id + "' value=" + JSON.stringify(result.result[index].email) + " name='answer4'></td>" +
                    " <td><input type='text' class='input' id='pass" + result.result[index]._id + "' value=" + JSON.stringify(result.result[index].password) + " name='correct'></td>" +
                    " <td><input type='text' class='input' id='secode" + result.result[index]._id + "' value=" + JSON.stringify(result.result[index].secure_code1) + " name='correct'></td>" +
                    " <td><span class='glyphicon glyphicon-ok' id=" + result.result[index]._id + "></span>" +
                  
                    " </td>" + "</tr></tbody>")
            }
        }
    });
});

$(document).on('click', '#save', function (e) {
    $.ajax({
        url: 'http://localhost:3000/lecturer_registration',
        method: 'post',
        type: 'json',
        data: {
            type: 1,
            fname: $('input[id=fname]').val(),
            lname: $('input[id=lname]').val(),
            patr: $('input[id=patr]').val(),
            gnum: $('input[id=article]').val(),
            email: $('input[id=username]').val(),
            pass: $('input[id=password]').val(),
        },
    });


});

$(document).on('click', '.glyphicon.glyphicon-ok', function (e) {
    $.ajax({
        url: 'http://localhost:3000/lecturer_registration',
        method: 'post',
        type: 'json',
        data: {
            type: 1,
            id: e.target.id,
            fname: $('input[id=fname' + e.target.id + ']').val(),
            lname: $('input[id=lname' + e.target.id + ']').val(),
            patr: $('input[id=patr' + e.target.id + ']').val(),
            gnum: $('input[id=gnum' + e.target.id + ']').val(),
            email: $('input[id=email' + e.target.id + ']').val(),
            pass: $('input[id=pass' + e.target.id + ']').val(),
        },
    });

});



$(document).on('click', '#save_send', function () {
    console.log(lecturer);
    $.ajax({
        url: 'http://localhost:3000/lecturer_registration',
        method: 'post',
        type: 'json',
        data: { d1: lecturer },
    });
});

$(document).on('click', '#logout', function () {
    $('form').submit();
});
