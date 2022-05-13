

$(document).ready(function () {
    var question = [];
    var questionnaire = {};
    var point = 0;



    $.ajax({
        url: "http://localhost:3000/get_question",
        type: 'post',
        dataType: 'json',
        data: 'true',
        success: function (result) {
            for (var index = 0; index < result.result.length; index++) {
                /*  $('#table').append(" <tbody><tr>" + " <td><input type='text' class='input' id='question" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].question) + " name='question'></td>" +
                      " <td><input type='text' class='input' id='answer_1_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer1) + " name='answer1'></td>" +
                      " <td><input type='text' class='input' id='answer_2_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer2) + " name='answer2'></td>" +
                      " <td><input type='text' class='input' id='answer_3_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer3) + " name='answer3'></td>" +
                      //" <td><input type='text' class='input' id='answer_4_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer4) + " name='answer4'></td>" +
                      " <td><input type='text' class='input' id='correct_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].correct) + " name='correct'></td>" +
                      " <td><input type='text' class='input' id='point_" + result.result[index]._id + "' disabled value=" + result.result[index].point + " name='point' style='width:75px'></td>" +
                      " <td><input type='checkbox' class='input' id='" + result.result[index]._id + "'value=" + result.result[index].point + " name='point' style='width:75px'></td>" +
                      " <td><span class='glyphicon glyphicon-edit' id=" + result.result[index]._id + "></span>" +
                      "  <span class='glyphicon glyphicon-ok' id=" + result.result[index]._id + "></span>" +
                      "  <span class='glyphicon glyphicon-remove' id=" + result.result[index]._id + "></span>" +
  
                      " </td>" + "</tr></tbody>")*/
                $('#accordion').append('<h3>' + "<input type='text' class='input ' id='question" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].question) + " name='question' style='width:80%'>" +
                    "<span class='glyphicon glyphicon-edit' id=" + result.result[index]._id + "></span>" +
                    "  <span class='glyphicon glyphicon-ok' id=" + result.result[index]._id + "></span>" +
                    "  <span class='glyphicon glyphicon-remove' id=" + result.result[index]._id + "></span>" +
                    '</h3>' +
                    '<div>' +
                    "<span >Պատասխան 1<span><input type='text' class='input form-control' id='answer_1_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer1) + " name='answer1' ><br>" +
                    "<span>Պատասխան 2<span><input type='text' class='input form-control' id='answer_2_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer2) + " name='answer1' ><br>" +
                    "<span>Պատասխան 3<span><input type='text' class='input form-control' id='answer_3_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer3) + " name='answer1' ><br>" +
                    //"<span>Պատասխան 4<span><input type='text' class='input form-control' id='answer_4_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].answer4) + " name='answer1' ><br>" +
                    "<span>Ճիշտ Պատասխան<span><input type='text' class='input form-control' id='correct_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].correct) + " name='correct' ><br>" +
                    "<span>Թեմա<span><input type='text' class='input form-control' id='theme_" + result.result[index]._id + "' disabled value=" + JSON.stringify(result.result[index].theme) + " name='correct' ><br>" +
                    "<span>Հատկացվող Միավոր<span><input type='number' class='input form-control' id='point_" + result.result[index]._id + "' disabled value=" + result.result[index].point + " name='point' style='width:75px'></input><br>" +
                    '</div>'
                );

                $(function () {
                    $('#accordion').accordion({
                        active: false,
                        collapsible: true,
                        navigation: true,
                    });

                });

            }
        }
    });

    $('#accordion').click(function () {
        $('html, body').animate({
            scrollTop: $("#tbl").offset().top
        }, 1000)
    });


    $(document).on('click', '#add_questionnaire', function (e) {
        $('#insert').dialog('open');

    })

    $(document).on('click', '#close', function (e) {
        $('#insert').dialog('close');
    })
    $(document).on('click', '#allow', function (e) {
        $('#tbl').css('display', 'none');

        $('#tbl_2').css('display', 'block');
        //if ($("#tbl_2").html() != '') $("#tbl_2").html("");
        $.ajax({
            url: "http://localhost:3000/allow_test",
            type: 'post',
            dataType: 'json',
            data: { gr: $('#gr').val() },
            success: function (result) {

                for (var index = 0; index < result.result.length; index++) {
                    $('#table_2').append(" <tbody><tr>" + " <td><input type='text' class='input' value=" + JSON.stringify(result.result[index].firstname) + " name='fname' ></td>" +
                        " <td><input type='text' class='input' value=" + JSON.stringify(result.result[index].lastname) + " name='lname' ></td>" +
                        " <td><input type='text' class='input' value=" + JSON.stringify(result.result[index].patronymic) + " name='patr' ></td>" +
                        " <td><input type='checkbox' class='allow' id='" + result.result[index]._id + "' style='margin-left:50%'>" +
                        " </td>" + "</tr></tbody>");
                }
            },
        });
    })
    var a = 5;
    $(document).on('click', '#add', function (e) {

        $('#list').append(

            '<div style="height:98%"><select class="form-control c2" id="c2" style="width:55%;">' +
            '<option>Հարցատոմսում ներառվող թեմանները</option>' +
            '<option value="Համաչափ համակարգեր">Համաչափ համակարգեր</option>' +
            '<option value="Հիմնական սահմանումներ">Հիմնական սահմանումներ</option>' +
            '<option value="Գաղտնագրային համակարգերի տեսակները">Գաղտնագրային համակարգերի տեսակները</option>' +
            '<option value="Անհամաչափ համակարգեր">Անհամաչափ համակարգեր</option>' +
            '<option value="Հեշ ֆունկցիաներ">Հեշ ֆունկցիաներ</option>' +
            '</select><div><br>');
    })
    $(document).on('click', '#allow_st', function (e) {
        var student = [];
        $.each($("#tbl_2 input[type='checkbox']:checked"), function () {
            student.push($(this).attr("id"));
        });

        $.ajax({
            url: "http://localhost:3000/allow",
            type: 'post',
            dataType: 'json',
            data: { student: student },
            success: function (result) {

            },
        });
    })


    $(document).on('click', '.glyphicon.glyphicon-edit', function (e) {

        $('.input').prop('disabled', 'disabled');
        $('input[id=question' + e.target.id + ']').prop('disabled', '');
        $('input[id=answer_1_' + e.target.id + ']').prop('disabled', '');
        $('input[id=answer_2_' + e.target.id + ']').prop('disabled', '');
        $('input[id=answer_3_' + e.target.id + ']').prop('disabled', '');
        $('input[id=correct_' + e.target.id + ']').prop('disabled', '');
        $('input[id=theme_' + e.target.id + ']').prop('disabled', '');
        $('input[id=point_' + e.target.id + ']').prop('disabled', '');
    });

    $(document).on('click', '.glyphicon.glyphicon-ok', function (e) {
        question.push({
            type: 1,
            id: e.target.id,
            question: $('input[id=question' + e.target.id + ']').val(),
            answer1: $('input[id=answer_1_' + e.target.id + ']').val(),
            answer2: $('input[id=answer_2_' + e.target.id + ']').val(),
            answer3: $('input[id=answer_3_' + e.target.id + ']').val(),

            correct: $('input[id=correct_' + e.target.id + ']').val(),
            theme: $('input[id=theme_' + e.target.id + ']').val(),
            point: $('input[id=point_' + e.target.id + ']').val(),
        });
    });

    $(document).on('click', '.glyphicon.glyphicon-remove', function (e) {
        question.push({
            type: 2,
            id: e.target.id,
        });
    });


    $('#dialog1').dialog('open');
    $(document).on('click', '#savequestion', function () {

        question.push({
            type: 3,
            question: $('#question').val(),
            answer1: $('#answer1').val(),
            answer2: $('#answer2').val(),
            answer3: $('#answer3').val(),
            correct: $('#correct').val(),
            theme: $('#theme').val(),
            point: $('#point').val(),
        });
        $('#question').val('');
        $('#answer1').val('');
        $('#answer2').val('');
        $('#answer3').val('');
        $('#correct').val('');
        $('#theme').val('');
        $('#point').val('');
    });

    $(document).on('click', '#allow_st', function () {
        $('.allow').each(function () {
            if (this.checked) {
                question.push({
                    type: 5,
                    id: $(this).attr('id'),
                })
            }
        });
    })

    $(document).on('click', '#save_send', function () {
        $.ajax({
            url: 'http://localhost:3000/example',
            method: 'post',
            type: 'json',
            data: { d1: question, len: question.length },
        });
    });

    $(document).on('click', '#allow', function () {
        $.ajax({
            url: 'http://localhost:3000/allow',
            method: 'post',
            type: 'json',
            data: { gr: $('#gr').val(), },
        });
    });

    $(document).on('click', '#logout', function () {
        $('form').submit();
    });

    $(document).on('click', '#log1', function () {
        $.get({
            url: 'http://localhost:3000/get_code',
            dataType: 'JSON',
            data: { data: true },
            success: function (params) {
                console.log(params);
            },
        })
    })

    //////////////////////////////////////////////////////////

    $(document).on('click', '#create_questionnaire', function (e) {
        if ($('#point').val() == '' || $('#point').val() == 0) {
            $('#dialog').dialog('open');
            $('#dialog').css('display', 'block');
        }
        else {
            var favorite = [];
            $.each($("input[type='checkbox']:checked"), function (e) {
                favorite.push($(this).attr("id"));

            });
            $.each($("input[type='checkbox']:checked"), function (e) {
                $("input[type='checkbox']:checked").prop('checked', false);

            });
            // point -= parseInt($('#point_' + e.target.id).val());
            // 
            //alert("Checked: " + favorite.join(", "));
            question.push({
                type: 4,
                questionnaire: favorite,
            });
            point = 0;
            $('#point').val(parseInt('0'));
        }
        $(document).on('change', 'input[type="checkbox"]', function (e) {

            if ($(this).is(':checked')) point += parseInt($('#point_' + e.target.id).val());
            else point -= parseInt($('#point_' + e.target.id).val());

            $('#point').val(point);
            if (point == 20) $('#create_questionnaire').attr('disabled', false);
            else $('#create_questionnaire').attr('disabled', true);
        })
    });


})




$(document).on('click', '#create', function () {
    $("#tbl").html("");
    $('#tbl').append("<table id='table' style='width:100%'>" +
        "<thead>" +
        "<tr>" +
        "<th>Հարց</th>" +
        "<th style='padding-left:20%;'>Միավոր</th>" +
        "<th style='padding-left:20%;'></th>" +
        "</tr>" +
        "</thead>" +
        "</table>");
    var theme = [];

    $.each($(".t2 option:selected"), function () {
        theme.push($(this).val());
    });

    // console.log(theme);
    $.ajax({
        url: '/gen_question',
        dataType: 'JSON',
        type: 'POST',
        data: {
            c1: $('#c1').val(),
            c2: $('#c2').val(),
            t1: $('#t1').val(),
            t2: theme,
        },
        success: function (data) {
            for (var index = 0; index < data.result.length; index++) {
                $('#table').append(" <tbody><tr>" + " <td><input type='text' class='input' id='question" + data.result[index]._id + "' disabled value=" + JSON.stringify(data.result[index].question) + " name='question' style='width:200%; text-align:left;'></td>" +

                    " <td><input type='text' class='input' id='point_" + data.result[index]._id + "' disabled value=" + data.result[index].point + " name='point' style='width:10%; margin-left:70%;'></td>" +
                    " <td><input type='checkbox' class='input' id='" + data.result[index]._id + "'value=" + data.result[index].point + " name='point' style='width:75px'></td>" +
                    " </td>" + "</tr></tbody>")
            }
        }
    });
    $('#dialog').dialog('close');
    //$('#dialog').css('display', 'none');
});
//})
//})



$(function open_dialog() {
    $('#dialog').dialog({
        autoOpen: false,
        resizable: false,
        title: 'Ստեղծել հարցատոմս',
        width: 800,
        maxWidth: 800,
        height: 500,
        maxHeight: 500,

    });

    $('#insert').dialog({
        autoOpen: false,
        resizable: false,
        title: 'Ավելացնել հարց',
        width: 700,
        maxWidth: 700,
        height: 500,
        maxHeight: 500,

    });

});