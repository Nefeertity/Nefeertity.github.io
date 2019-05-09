$(document).ready(function() {
    var cotadoresEjecutado = false;

    var typed = $(".typed");
    $(function() {
        typed.typed({
          strings: ["Web.", "Móvil.", "Full-Stack."],
          typeSpeed: 100,
          loop: true,
        });
    });

    skrollr.init({forceHeight: false});
    $('#arriba').click(function(e){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    $('#educacionLink').click(function(e){
        var position = $("#educacion").offset().top;
        $("html, body").animate({ scrollTop: position }, 600);
        return false;
    });

    $('#conocimientosLink').click(function(e){
        var position = $("#conocimientos").offset().top;
        $("html, body").animate({ scrollTop: position }, 600);
        return false;
    });

    $('#trabajosLink').click(function(e){
        var position = $("#trabajos").offset().top;
        $("html, body").animate({ scrollTop: position }, 600);
        return false;
    });

    $('#inicioLink').click(function(e){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    $(window).scroll(function(){
        // var windowHeight = $(window).scrollTop();
        // var contenido2 = $("#contadores").offset();
        // contenido2 = contenido2.top -400;
        // console.log("scrrol" +windowHeight);
        // console.log("contador "+ contenido2);
        // console.log("cotadoresEjecutado "+ !cotadoresEjecutado);
        // if(windowHeight >= contenido2 && !cotadoresEjecutado){

        //     cotadoresEjecutado = true;
        //     $('.Count').each(function () { $(this).prop('Counter',0).animate({ Counter: $(this).text() }, { duration: 3000, easing: 'swing', step: function (now) { $(this).text(Math.ceil(now)); } }); });
        // }
    });

    
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    $(document).on('click', '.yamm .dropdown-menu', function(e) {
      e.stopPropagation()
    })


	// Maneja la Respuesta del json Para el formulario de contactanos
	$('.contact-form form').submit(function() {
        var postdata = $('.contact-form form').serialize();
        $.ajax({
            type: 'POST',
            url: 'sendmail.php',
            data: postdata,
            dataType: 'json',
            beforeSend:function() {
                $(".contact-form form").addClass("hidden");
                $("#cargando").removeClass("hidden");
            },
            success: function(json) {
                console.log(json);
                if(json.nameMessage != '') {
                    $('.contact-form form #name').attr('placeholder', json.nameMessage ).css( "background-color", "#CECECE" );
                }
                if(json.emailMessage != '') {
                     $('.contact-form form #email').attr('placeholder', json.emailMessage ).css( "background-color", "#CECECE" );
                }
                if(json.messageMessage != '') {
                    $('.contact-form form #message').attr('placeholder', json.messageMessage ).css( "background-color", "#CECECE" );
                }
                if(json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
                    $('.contact-form form').fadeOut('fast', function() {
                        $(".contact-form form").addClass("hidden");
                        $("#cargando").addClass("hidden");
                        $('.contact-form').append('<p><span class="violet">&iexcl;Gracias Por Contactarnos!</span> pronto Nos comunicaremos con usted.</p>');
                    });
                }else{
                    $('.contact-form form').fadeOut('fast', function() {
                        $(".contact-form form").addClass("hidden");
                        $("#cargando").addClass("hidden");
                        $('.contact-form').append('<p><span class="violet">Lo sentimos, ha ocurrido un error.</p>');
                    });
                }
            },
            error: function() {
                $('.contact-form form').fadeOut('fast', function() {
                    $(".contact-form form").addClass("hidden");
                    $("#cargando").addClass("hidden");
                    $('.contact-form').append('<p><span class="violet">Lo sentimos, ha ocurrido un error.</p>');
                });
            }
        });
        return false;
    });
    
    // Maneja la Respuesta del json Para el formulario de contactanos
    $('#basico').submit(function() {
        var postdata = $('#basico').serialize();
        console.log(postdata)
        $.ajax({
            type: 'POST',
            url: 'sendmail.php',
            data: postdata,
            dataType: 'json',
            beforeSend: function(){
                $('#basico').fadeOut('fast', function() {
                    $('#mensaje').append('<br><br><img src="img/wait.gif" height="235" width="235" alt="">').addClass('text-center');
                });
            },
            success: function(json) {
                console.log(json.respuesta)
                if(json.respuesta == 'WS001') {
                    $('#basico').fadeOut('fast', function() {
                        $('#mensaje').children().remove()
                        $('#mensaje').append('<br><br><br><br><h1 class="glyphicon glyphicon-ok"></h1><br><p><span class="violet">&iexcl;Gracias Por Contactarnos!</span> pronto Nos comunicaremos con usted.</p>');
                    });
                }else{
                    $('#basico').fadeOut('fast', function() {
                        $('#mensaje').children().remove()
                        $('#mensaje').append('<br><br><br><br><h1 class="glyphicon glyphicon-remove"></h1><br><p><span class="violet">Lo Sentimos su mensaje no ha sido enviado</span></p>');
                    });
                }
            }
        });
        return false;
    });
    // Maneja la Respuesta del json Para el formulario de contactanos
    $('#premiun').submit(function() {
        var postdata = $('#premiun').serialize();
        console.log(postdata)
        $.ajax({
            type: 'POST',
            url: 'sendmail.php',
            data: postdata,
            dataType: 'json',
            beforeSend: function(){
                $('#premiun').fadeOut('fast', function() {
                    $('#mensaje').append('<br><br><img src="img/wait.gif" height="235" width="235" alt="">').addClass('text-center');
                });
            },
            success: function(json) {
                console.log(json.respuesta)
                if(json.respuesta == 'WS001') {
                    $('#premiun').fadeOut('fast', function() {
                        $('#mensaje').children().remove()
                        $('#mensaje').append('<br><br><br><br><h1 class="glyphicon glyphicon-ok"></h1><br><p><span class="violet">&iexcl;Gracias Por Contactarnos!</span> pronto Nos comunicaremos con usted.</p>');
                    });
                }else{
                    $('#premiun').fadeOut('fast', function() {
                        $('#mensaje').children().remove()
                        $('#mensaje').append('<br><br><br><br><h1 class="glyphicon glyphicon-remove"></h1><br><p><span class="violet">Lo Sentimos su mensaje no ha sido enviado</span></p>');
                    });
                }
            }
        });
        return false;
    });
	// Maneja la Respuesta del json Para el formulario de contactanos
    $('#pro').submit(function() {
        var postdata = $('#pro').serialize();
        console.log(postdata)
        $.ajax({
            type: 'POST',
            url: 'sendmail.php',
            data: postdata,
            dataType: 'json',
            beforeSend: function(){
                $('#pro').fadeOut('fast', function() {
                    $('#mensaje').append('<br><br><img src="img/wait.gif" height="235" width="235" alt="">').addClass('text-center');
                });
            },
            success: function(json) {
                console.log(json.respuesta)
                if(json.respuesta == 'WS001') {
                    $('#pro').fadeOut('fast', function() {
                        $('#mensaje').children().remove()
                        $('#mensaje').append('<br><br><br><br><h1 class="glyphicon glyphicon-ok"></h1><br><p><span class="violet">&iexcl;Gracias Por Contactarnos!</span> pronto Nos comunicaremos con usted.</p>');
                    });
                }else{
                    $('#pro').fadeOut('fast', function() {
                        $('#mensaje').children().remove()
                        $('#mensaje').append('<br><br><br><br><h1 class="glyphicon glyphicon-remove"></h1><br><p><span class="violet">Lo Sentimos su mensaje no ha sido enviado</span></p>');
                    });
                }
            }
        });
        return false;
    });
    // // Maneja el mapa
    //  var position = new google.maps.LatLng(10.503108, -66.909721);
    // $('.map').gmap({'center': position,'zoom': 15, 'disableDefaultUI':true, 'callback': function() {
    //         var self = this;
    //         self.addMarker({'position': this.get('map').getCenter() }); 
    //     }
    // }); 


    // Hero word switcher

    var switcher = $('#hero-word-switcher');
    var delay = 2000;
    var count = switcher.find('strong').length;

    function calculateWidths() {
        switcher.find('strong').each(function(index) {
            $(this).attr('data-width', $(this).width());
        });
        switcher.width(switcher.find('.active').attr('data-width'));
    }
    calculateWidths();

    $(window).resize(function() {
        calculateWidths();
    });
 
    function doChange() {
        var nextItem;
        var currentItem = parseInt(switcher.find('.active').attr('data-oid'));

        if (currentItem == count - 1) {
            nextItem = 0;
        } else {
            nextItem = currentItem + 1;
        }

        switcher.addClass('in');

        switcher.find('[data-oid="' + currentItem + '"]').removeClass('active');
        switcher.find('[data-oid="' + nextItem + '"]').addClass('active');

        switcher.width(switcher.find('[data-oid="' + nextItem + '"]').attr('data-width'));
        setTimeout(doChange, delay);
    }

    setTimeout(doChange, delay);
});

