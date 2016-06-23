(function($) {

    // Start

    function initIsotope() {
        var $container = $('.ngg-galleryoverview');
        $container.isotope({
          itemSelector : '.ngg-gallery-thumbnail-box'
        });
        $('.filters a').click(function(){
          var selector = $(this).attr('data-filter');
          $container.isotope({ filter: selector });
          return false;
        });
    };

    function initFancybox() {
        $('.fancybox').fancybox({
            beforeShow: function() {
                var alt = this.element.find('img').attr('alt');
                this.inner.find('img').attr('alt', alt);
                this.title = alt;
            },
            padding: 0,
            closeBtn: false,
            margin: [20, 60, 20, 60], // Increase left/right margin
            helpers: {
                title: {
                    type : 'outside'
                },
                thumbs: {
                    width   : 50,
                    height  : 50
                }
            }
        });
    };

    function burgerAnimation() {

        var Menu = {

            el: {
                ham: $('.handle'),
                menuTop: $('.line1'),
                menuMiddle: $('.line2'),
                menuBottom: $('.line3')
            },

            init: function() {
                Menu.bindUIactions();
            },

            bindUIactions: function() {
                Menu.el.ham
                .on('click', function(event) {
                    Menu.activateMenu(event);
                    event.preventDefault();
                });
                },

                activateMenu: function() {
                    Menu.el.menuTop.toggleClass('line1-click');
                    Menu.el.menuMiddle.toggleClass('line2-click');
                    Menu.el.menuBottom.toggleClass('line3-click');
            }
        };

        Menu.init();

    };

    function subMenu() {
        $('.sub-menu').hide();

        $('.menu-item-has-children > a').click(function(e){
            e.preventDefault();
            $('.sub-menu').slideToggle();
        });
    }

    function scrollTop() {
        $('.scroll-top').on('click',function(){
            $('html, body').animate({
                scrollTop:0
            }, $(window).scrollTop() / 3);
            return false;
        });
    }

    function findImages() {
        // Find and replace the header image with a bg image
        var $images = $( '#home-image' );

        $images.each( function( i, e ) {

            var img = $( e ).find( 'img' ),
                src = 0;

            $('.loading').show();

            $images.waitForImages(function() {

                if( img[0] ) {

                    src = img.attr( 'src' );
                    $images.css( { 'background-image': 'url( "' + src + '" )' } );
                    $images.addClass( 'image-reveal' ).find( 'img' ).remove();
                    $('.loading').hide();

                }

            });

        } );

    };

    function contentInfo() {

        var $content = $('#content');

        $('.loading').show();

        $content.css('opacity', 0);

        $content.waitForImages(function() {

            $('.loading').hide();
            $content.addClass('animated fadeInRight').css('opacity', 1);

        });

    }

    subMenu();
    findImages();
    contentInfo();
    burgerAnimation();
    scrollTop();
    initFancybox();

    $(window).on("load resize", function() {
        var homeHeight = ($(window).outerHeight() - $('#footer').outerHeight());

        // if ($('.handle').is(':visible')) {
        //     $('.menu').hide();
        //     $('.sub-menu').show();
        //     $('.menu-item-has-children > a').click(function(e){
        //         e.preventDefault();
        //     });
        //     $('.handle').click(function() {
        //         $('.menu').slideToggle();
        //     });
        // } else {
        //     $('.menu').show();
        //     $('.sub-menu').hide();

        //     $('.menu-item-has-children > a').click(function(e){
        //         e.preventDefault();
        //         $('.sub-menu').slideToggle();
        //     });
        // }

        $('#home-image').css('height', homeHeight);

        initIsotope();
    });

    // End

})(jQuery);

// MailChip
var fnames = new Array();var ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';
try {
    var jqueryLoaded=jQuery;
    jqueryLoaded=true;
} catch(err) {
    var jqueryLoaded=false;
}
var head= document.getElementsByTagName('head')[0];
if (!jqueryLoaded) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
    head.appendChild(script);
    if (script.readyState && script.onload!==null){
        script.onreadystatechange= function () {
              if (this.readyState == 'complete') mce_preload_check();
        }
    }
}

var err_style = '';
try{
    err_style = mc_custom_error_style;
} catch(e){
    err_style = '#mc_embed_signup input.mce_inline_error{border-color:#de6363;} #mc_embed_signup div.mce_inline_error{margin: 0 0 10px 0; background-color:#de6363; z-index: 1; color:#fff;}';
}
var head= document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type= 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = err_style;
} else {
  style.appendChild(document.createTextNode(err_style));
}
head.appendChild(style);
setTimeout('mce_preload_check();', 250);

var mce_preload_checks = 0;
function mce_preload_check(){
    if (mce_preload_checks>40) return;
    mce_preload_checks++;
    try {
        var jqueryLoaded=jQuery;
    } catch(err) {
        setTimeout('mce_preload_check();', 250);
        return;
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://downloads.mailchimp.com/js/jquery.form-n-validate.js';
    head.appendChild(script);
    try {
        var validatorLoaded=jQuery("#fake-form").validate({});
    } catch(err) {
        setTimeout('mce_preload_check();', 250);
        return;
    }
    mce_init_form();
}
function mce_init_form(){
    jQuery(document).ready( function($) {
      var options = { errorClass: 'mce_inline_error', errorElement: 'div', onkeyup: function(){}, onfocusout:function(){}, onblur:function(){}  };
      var mce_validator = $("#mc-embedded-subscribe-form").validate(options);
      $("#mc-embedded-subscribe-form").unbind('submit');//remove the validator so we can get into beforeSubmit on the ajaxform, which then calls the validator
      options = { url: 'http://rob-tucker.us3.list-manage.com/subscribe/post-json?u=5a93e34ede6d31fab71af77ff&id=2bb7dfbbc9&c=?', type: 'GET', dataType: 'json', contentType: "application/json; charset=utf-8",
                    beforeSubmit: function(){
                        $('#mce_tmp_error_msg').remove();
                        $('.datefield','#mc_embed_signup').each(
                            function(){
                                var txt = 'filled';
                                var fields = new Array();
                                var i = 0;
                                $(':text', this).each(
                                    function(){
                                        fields[i] = this;
                                        i++;
                                    });
                                $(':hidden', this).each(
                                    function(){
                                        var bday = false;
                                        if (fields.length == 2){
                                            bday = true;
                                            fields[2] = {'value':1970};//trick birthdays into having years
                                        }
                                        if ( fields[0].value=='MM' && fields[1].value=='DD' && (fields[2].value=='YYYY' || (bday && fields[2].value==1970) ) ){
                                            this.value = '';
                                        } else if ( fields[0].value=='' && fields[1].value=='' && (fields[2].value=='' || (bday && fields[2].value==1970) ) ){
                                            this.value = '';
                                        } else {
                                            if (/\[day\]/.test(fields[0].name)){
                                                this.value = fields[1].value+'/'+fields[0].value+'/'+fields[2].value;
                                            } else {
                                                this.value = fields[0].value+'/'+fields[1].value+'/'+fields[2].value;
                                            }
                                        }
                                    });
                            });
                        $('.phonefield-us','#mc_embed_signup').each(
                            function(){
                                var fields = new Array();
                                var i = 0;
                                $(':text', this).each(
                                    function(){
                                        fields[i] = this;
                                        i++;
                                    });
                                $(':hidden', this).each(
                                    function(){
                                        if ( fields[0].value.length != 3 || fields[1].value.length!=3 || fields[2].value.length!=4 ){
                                            this.value = '';
                                        } else {
                                            this.value = 'filled';
                                        }
                                    });
                            });
                        return mce_validator.form();
                    },
                    success: mce_success_cb
                };
      $('#mc-embedded-subscribe-form').ajaxForm(options);


    });
}
function mce_success_cb(resp){
    $('#mce-success-response').hide();
    $('#mce-error-response').hide();
    if (resp.result=="success"){
        $('#mce-'+resp.result+'-response').show();
        $('#mce-'+resp.result+'-response').html(resp.msg);
        $('#mc-embedded-subscribe-form').each(function(){
            this.reset();
        });
    } else {
        var index = -1;
        var msg;
        try {
            var parts = resp.msg.split(' - ',2);
            if (parts[1]==undefined){
                msg = resp.msg;
            } else {
                i = parseInt(parts[0]);
                if (i.toString() == parts[0]){
                    index = parts[0];
                    msg = parts[1];
                } else {
                    index = -1;
                    msg = resp.msg;
                }
            }
        } catch(e){
            index = -1;
            msg = resp.msg;
        }
        try{
            if (index== -1){
                $('#mce-'+resp.result+'-response').show();
                $('#mce-'+resp.result+'-response').html(msg);
            } else {
                err_id = 'mce_tmp_error_msg';
                html = '<div id="'+err_id+'" style="'+err_style+'"> '+msg+'</div>';

                var input_id = '#mc_embed_signup';
                var f = $(input_id);
                if (ftypes[index]=='address'){
                    input_id = '#mce-'+fnames[index]+'-addr1';
                    f = $(input_id).parent().parent().get(0);
                } else if (ftypes[index]=='date'){
                    input_id = '#mce-'+fnames[index]+'-month';
                    f = $(input_id).parent().parent().get(0);
                } else {
                    input_id = '#mce-'+fnames[index];
                    f = $().parent(input_id).get(0);
                }
                if (f){
                    $(f).append(html);
                    $(input_id).focus();
                } else {
                    $('#mce-'+resp.result+'-response').show();
                    $('#mce-'+resp.result+'-response').html(msg);
                }
            }
        } catch(e){
            $('#mce-'+resp.result+'-response').show();
            $('#mce-'+resp.result+'-response').html(msg);
        }
    }
}