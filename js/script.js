$(function(){
    if($('.select-2').length > 0) {
        $('.select-2').select2({
            tags: true
        });
    }


    $('#subscribe').click(function(e){
        e.preventDefault();
        var form_status = $('<div class="form_status"></div>');
        var email = $('#sub-email').val();
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if(re.test(email)){
            var button = $(this);
            button.button('loading');
            $.get('/do.php?action=email&email=' + email, function(){
                button.button('reset');
                button.closest('form').prepend(form_status.html('<p class="">Thank you! We will soon get in touch with you.</p>').delay(5000).fadeOut());
            });
        }
        else {
            alert('Please enter valid email address');
        }

    });
    if($('#survey-form').length > 0) {
        $('#survey-form').validate({
            submitHandler : function(form){
                var submit =  $(form).find(':submit');
                submit.button('loading');
                $('#survey-form').ajaxSubmit({
                    success: function (d) {
                        submit.button('reset');
                        $('#alert-box').html('Thank you! We will soon get in touch with you.').fadeIn().delay(5000).fadeOut()
                    }
                });
            }
        });
    }

});