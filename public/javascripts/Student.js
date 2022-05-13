var ans = [];
var correct = [];
var po = [];
var sec = 0, min = 0, sec2 = 0;
var secure_code1, secure_code2;
var user = {
    flp: String,
    groupe: String,
    subject: String,
    lecturer: String,
    count1: Number,
    count2: Number,
    count3: Number,
};
$(document).ready(function () {

    $('input[type=radio]').change(function () {
        console.log($(this).val())

    })


    $('#sec_code').keyup(function () {
        if ($('#sec_code').val() == secure_code1) {
            secure_code2 = $('#sec_code').val();
            $('#confirm').dialog('close');
            check();
        }
    })

    $.post('http://localhost:3000/get_question_for_stud', function (data) {
        secure_code1 = data.code;
        user.flp = data.result2.firstname + ' ' + data.result2.lastname + ' ' + data.result2.patronymic;
        user.groupe = data.result2.group_number;
        user.subject = data.result2.name;
        user.lecturer = data.result1[0].lecturer;
        for (var i = 0; i < data.result1.length; i++) {
            $('#side1').append("<div class='row'><button type='submit' class='btn btn-outline-primary' id='check1' name='" + data.result1[i].name + "'' >" + data.result1[i].name + "</button>" +
                "<button class='btn btn-outline-primary' id='check2' onclick='confirm()'>Ավարտել</button>" +
                "</div>");
        }

    });

    $(document).on('click', '#check1', function (e) {
        $('#check1').attr('disabled', 'disabled');
        var point = 0;
        $.post({
            url: 'http://localhost:3000/example1',
            dataType: 'json',
            data: { name: e.target.name },
            success: function (result) {
                user.count1 = result.data.length;
                for (var index = result.data.length - 1; index >= 0; index--) {
                    ans.push(result.data[index].correct);
                    po.push(result.data[index].point);
                    point += parseInt(result.data[index].point);
                    correct.push('<span style="color:red;">Հարց՝ ' + result.data[index].question + ' (' + result.data[index].point + ' միավոր)</span>' +
                        '<br> 1) ' + result.data[index].answer1 +
                        '<br> 2) ' + result.data[index].answer2 +
                        '<br> 3) ' + result.data[index].answer3 +
                        '<br> ճիշտ պատասխան՝ ' + result.data[index].correct + '<br>'
                    );
                    $('#side2').prepend(
                        "<div data-toggle='buttons'>" +
                        "<h6>" + result.data[index].question + "     (" + result.data[index].point + " միավոր)</h6>" +
                        "<label id='a1' style='margin-left:5%;'>" +
                        "<input type='radio' class='radio' name='options" + index + "' value='1'>" + result.data[index].answer1 +
                        "</label><br>" +
                        "<label id='a2' style='margin-left:5%;'>" +
                        "<input type='radio' class='radio' name='options" + index + "'  value='2'>" + result.data[index].answer2 +
                        "</label><br>" +
                        "<label id='a3' style='margin-left:5%;'>" +
                        "<input type='radio'  class='radio' name='options" + index + "' value='3'>" + result.data[index].answer3 +
                        "</label>" +
                        "</div>"
                    );
                    user.count2 = point;
                }
            }
        });

        timer();
    });


    $(document).on('click', '#logout', function () {
        $('#form').submit();
    });
});


function timer() {
    setInterval(function () {
        sec += 1;
        sec2 += 1;
        if (sec == 60) {
            sec = 0;
            min += 1;
            if (min == 1 && secure_code1 != secure_code2) {
                $('#confirm').dialog('open');
                $('#check2').attr('disabled', 'disabled');
                clearInterval();
            }
        }
        if (sec < 10) $('#sec').html(': 0' + sec); else $('#sec').html(': ' + sec);
        if (min < 10) $('#min').html('0' + min); else $('#min').html(min);
    }, 1000);
}

function confirm() {
    $('#confirm').dialog('open');
}


function check() {
    $('#check2').attr('disabled', 'disabled');
    var sum = 0;



    for (var a = 0; a < ans.length; a++) {
        var a2 = ans.length - a;
        if ($('input[name=options' + a + ']:checked').val() == ans[a]) {
            correct[ans.length - 1 - a] += '   Ձեր ընտրած պատասխանը` ' + $('input[name=options' + a + ']:checked').val() + '<br>';
            $('input[name=options' + a + ']:checked').css('background-color', 'green');
            sum += parseInt(po[ans.length - 1 - a]);
        }
    }


    for (var a1 = 0; a1 < ans.length; a1++) {
        $('#for_std #correct').prepend(correct[a1]);
    }

    $('#for_std #correct').append('<div><button id="save_pdf" class="btn btn-primary" style="margin-left:30%;">Պահպանել PDF տարբերակով</button></div>');

    user.count3 = sum;
    $('#flp').html(user.flp);
    $('#groupe').html(user.groupe);
    $('#subject').html(user.subject);
    $('#lecturer').html(user.lecturer);
    $('#count1').html(user.count1);
    $('#count2').html(user.count2);
    $('#count3').html(user.count3);

    $('#for_std').dialog('open');
    var result = [];
    result.push('Subject-' + user.subject);
    result.push('Lecturer-' + user.lecturer);
    result.push('Count of question-' + user.count1);
    result.push('Count of points-' + user.count2);
    result.push('Count of received points-' + user.count3);

    $.ajax({
        url: "http://localhost:3000/save_result",
        type: 'post',
        dataType: 'json',
        data: { res: result, },
        success: function (result) { },
    });
};


$(function open_dialog() {
    $('#for_std').dialog({
        autoOpen: false,
        resizable: false,
        title: 'Քննության արդյունքները',
        width: 1000,
        maxWidth: 1000,
        height: 620,
        maxHeight: 620,
    });

    $('#confirm').dialog({
        autoOpen: false,
        resizable: false,
        title: 'Քննության ավարտի հաստատում',
        width: 700,
        maxWidth: 700,
        height: 80,
        maxHeight: 80,
    });
});