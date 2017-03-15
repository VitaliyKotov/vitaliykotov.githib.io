$( document ).ready(function() {
    $(".add-dlg-button").on('click', function () {
        let newName = $(".add-dlg-button").prev().val();
        $(".message-list").prepend("<li><a href="+"><img class="+
            "avatar"+" src="+"./img/default-avatar.png"+" alt="+
            "Profile photo"+"></a><h3>" + newName + "</h3><p class="+
            "message"+">Strat your dialog</p></li>")
        $(".add-dlg-button").prev().val("");
    });

    $(".login-block").keyup(function() {
        let emailChecked;
        let passChecked;
        let emailValue = $("#email").val();
        let emailCheck = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/g;
        if (emailCheck.test(emailValue)) {
            $(".email-block").css("border-left", "4px solid #4cd9c0" );
            emailChecked = true;
        } else {
           $(".email-block").css("border-left", "");
           emailChecked = false; 
        }

        let passValue =$("#password").val();
        let passCheck = /^[A-Za-z\d]{8,}$/;
        if (passCheck.test(passValue)) {
            $(".password-block").css("border-left", "4px solid #4cd9c0");
            passChecked = true;
        } else {
            $(".password-block").css("border-left", "");
            passChecked = false;   
        }

        if (passChecked && emailChecked) {
            $(".login-block > button").css("color", "#fff").prop('disabled', false);
            // $(".signin-button").css("color", "#fff").prop('disabled', false);
        } else {
            $(".login-block > button").css("color", "").prop('disabled', true);
            // $(".signin-button").css("color", "").prop('disabled', true);
        }
    });

    $.extend($.datepicker,{_checkOffset:function(inst,offset,isFixed){return offset}});

    $( function() {
        $(".valid-input").datepicker({
            minDate: 0,
            showAnim: "fadeIn"
        })
        $(".login-block > button").on({
            "click": function(e) {
                let text;
                e.target.className === "signup-button" ? text = "Signed Up" : text = "Signed In" 
                $(this).tooltip({ 
                    items: "button",
                    content: text
                });
                $(this).tooltip("open");
            },
            "mouseout": function() {      
                $(this).tooltip("disable");   
            }
        })
    });


    $(".currency-list").keyup(function(event) {
        let gbrHasFocus;
        let bynHasFocus;
        if (event.target.id === "gbr") {
            gbrHasFocus = true;
        }
        if (event.target.id === "byn") {
            bynHasFocus = true;
        }

        let usdValue;
        let gbrValue;
        let bynValue;
        if (gbrHasFocus) {
            input = $("#gbr").val();
            usdValue = $ + parseFloat(Math.round((input/ $("#gbr").data("rate")) * 100) / 100).toFixed(2);
            bynValue = parseFloat(Math.round( $("#byn").data("rate") * usdValue * 100) / 100).toFixed(2);
            $("#byn").val(bynValue);
            $("#usd").val(usdValue);
        } else if (bynHasFocus) {
            input = $("#byn").val();
            usdValue = parseFloat(Math.round((input/ $("#byn").data("rate")) * 100) / 100).toFixed(2);
            gbrValue = parseFloat(Math.round( $("#gbr").data("rate") * usdValue * 100) / 100).toFixed(2);
            $("#gbr").val(gbrValue);
            $("#usd").val(usdValue);
        } else {
            input = $("#usd").val();
            usdValue = parseFloat(Math.round(input * 100) / 100).toFixed(2);
            gbrValue = parseFloat(Math.round( $("#gbr").data("rate") * usdValue * 100) / 100).toFixed(2);
            bynValue = parseFloat(Math.round( $("#byn").data("rate") * usdValue * 100) / 100).toFixed(2);
            $("#gbr").val(gbrValue);
            $("#byn").val(bynValue);
        }
    });
    
    $(".add-currency").on("click", function () {
        $(".currency-list li:last-child").toggleClass("hidden");
        $(".add-currency > span").toggleClass("minus");
    });

    $(".scale-button").on("click", function(e) {
        if(e.target.innerText === "C") {
            $(".temperature").each(function (index, value) {
                let f = $(this).text();
                let c = parseFloat(Math.round(((f - 32) * 5 / 9) * 100) / 100).toFixed(0);
                $(this).text(c);
            });
            $(".selected-scale").prop('disabled', false);
            $(".scale-button").removeClass("selected-scale");
            $(this).addClass("selected-scale").prop('disabled', true);
        } else {
            $(".temperature").each(function (index, value) {
                let c = $(this).text();
                let f = parseFloat(Math.round((c * 9 / 5 + 32) * 100) / 100).toFixed(0);
                $(this).text(f);
            });
            $(".selected-scale").prop('disabled', false);
            $(".scale-button").removeClass("selected-scale");
            $(this).addClass("selected-scale").prop('disabled', true);
        }
    });
    $("input[type='radio']").on("click", function (e) {
        let numberOfSlide = e.target.id.slice(10);
        $(".weather-info > div").addClass("hidden");
        $(".weather-info > div:nth-child(" + numberOfSlide+ ")").removeClass("hidden");
        $("input[type='radio']").removeAttr("checked");
        $(this).attr("checked", true);
    });
    $(".list-view-button").on("click", function () {
        $(".weather-board div p:nth-child(2)").each(function (index, value){
            $(".weather-board > div > ul").append("<li class='slide-"+ (index + 1) +"'>" + $(this).html() + "</li>");
        });
        $(".weather-board > div").addClass("hidden");
        $(".weather-board div:last-child").removeClass("hidden");
        $(this).addClass("selected-scale");
    });
    $(".weather-board > div > ul").on("click", function (e){
            let slideToShow = e.target.className.slice(6);
            $(".weather-board > div").toggleClass("hidden");
            $(".weather-info > div").addClass("hidden");
            $(".weather-info > div:nth-child(" + slideToShow + ")").removeClass("hidden");
            $("input[type='radio']").removeAttr("checked");
            $(".weather-board #slide-dot-" +slideToShow ).attr("checked", true);
            $(".list-view-button").removeClass("selected-scale");
            $(".weather-board > div > ul").empty();
    });
})