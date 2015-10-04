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

    $("#home-search-box").select2({
        ajax: {
            url: "http://api.e2e.local/api/tags/all.json",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, page) {
                // parse the results into the format expected by Select2.
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data
                return {
                    //results: data.tags
                    results: data.items
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 1,
        language: {
            inputTooShort: function () { return ''; }
        },
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });

});

function formatRepo (tag) {
    if (tag.loading) return tag.text;
    var markup =
        '<div class="clearfix">'+
        '<div class="col-md-12"><i class="fa '+tag.icon+'"></i> '+tag.name+' <span class="label label-default pull-right">'+tag.type+'</span></div>'+
        '</div>';
    markup += '</div></div>';

    return markup;
}

function formatRepoSelection (tag) {
    if(tag.id != ''){
        return '<div class="col-md-12"><i class="fa '+tag.icon+'"></i> '+tag.name+' <span class="label label-default">'+tag.type+'</span></div>';
    }
    else {
        return '';
    }
}
