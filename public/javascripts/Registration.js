

function registration() {
    $.ajax({
        method: 'post',
        dataType: 'json',
        url: 'http://localhost:3000/student_registration',
        data: {
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            patr: $('#patr').val(),
            bday: $('#bday').val(),
            gnum: $('#gnum').val(),
            email: $('#email').val(),
            pswd1: $('#pswd1').val(),
        },
        success: function (data) {
            $('#code').css('visibility', 'visible');
            $('#text').html('');
            $('#text').append("Մուտքագրեք այն ծածկագիրը, որը ստացել եք ձեր էլ. փոստին, այդ ծածկագրի միջոցով " +
                "դուք կարող եք հետագայում վերականգնել մուտքանունն ու գաղտնաբառը, այն մոռանալու կամ կորցնելու դեպքում: " +
                "Էլ. փոստ՝ <span id='valid_email' style='color:red'></span><br>");
            $('#valid_email').text(data.email);
            if (data.valid==true) {
                $('#dialog').dialog('open');
                var poss = 3;
                $('#poss').text(poss);
                console.log(data.secure_code);
                $('#send').click(function () {
                    if ($('#code').val() === data.secure_code) {
                        $.post({
                            url: 'http://localhost:3000/correct',
                            dataType: 'json',
                            data: {
                                secure_code: $('#code').val(),
                            },
                            success: function (correct) {
                                if (correct.close) $('#dialog').dialog('close');
                            }
                        });
                    } else {
                        poss--;
                        style('code', 'red');
                    }
                })
            }
            else{
                $('#text2').html('');
                $('#text2').append("Հարգելի ուսանող, գրանցումը համակարգում չի կատարվել, քանի որ այսպիսի անձ արդեն գրանցված է համակարգում:");
                $('#dialog2').dialog('open');
                $('#close').click(function(){
                    $('#dialog2').dialog('close');
                });
            }
        }
    });
};



$(function open_dialog() {
    $('#dialog').dialog({
        autoOpen: false,
        resizable: false,
        title: 'Էլ. փոստի հաստատում',
        width: 550,
        maxWidth: 550,
        height: 310,
        maxHeight: 310,

    });
    $('#dialog2').dialog({
        autoOpen: false,
        resizable: false,
        title: 'Գրանցման չեղարկում',
        width: 550,
        maxWidth: 550,
        height: 180,
        maxHeight: 180,

    });
});