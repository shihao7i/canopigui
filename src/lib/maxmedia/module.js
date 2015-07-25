//
//// ===== Sidebar ===== //
//function toggleMainSideBar(){
//    $('#sidebar').toggleClass('sidebar_active');
//    $('.sidebar_container').toggleClass('sidebar_active');
//    $('.body_container').toggleClass('sidebar_active');
//}
//if ($(document).width() > 767){
//    toggleMainSideBar();
//}
//
//// PLUS/MINUS TOGGLE
//$('.submenu-toggle').on('click', function(e){
//    e.preventDefault();
//    if($(this).parent().hasClass('active'))
//        $(this).parent().removeClass('active');
//    else
//        $(this).parent().addClass('active');
//});
//$('.sidenav_icontoggle').on('click', function(e){
//    $(this).parent().siblings('.submenu-toggle').trigger('click');
//})
//
//$(function() {
//    $('.nav-container ul li.hover').children('ul').css("display","block");
//});
//
//// SIDEBAR TOGGLE
//$(function() {
//    $('[data-toggle=offcanvas]').on('click', function() {
//        toggleMainSideBar();
//    });
//});
//
//var resizeSwitch = false;
//$(window).resize(function(){
//    if($(document).width() < 768 && !resifzeSwitch){
//        if($('#sidebar').hasClass('sidebar_active')){
//            toggleMainSideBar();
//        }
//        resizeSwitch = true;
//    }
//    if($(document).width() > 767){
//        resizeSwitch = false;
//    }
//});
//
//$('.sidebar-nav li a').not('.submenu-toggle').on('click', function (event) {
//    var ourElement = $('.body_container').find($(this).attr('href'));
//    if(!ourElement.offset())
//        return;
//
//    var scrollPos = (ourElement.offset().top - 17) ; //Scrollspy Offset is 67
//    $('body,html').animate({
//        scrollTop: scrollPos
//    }, 500);
//
//    return false;
//});
//
//
//// ===== END Sidebar ===== //
//
//
//// ===== Code Container ===== //
//$(function() {
//    var toggleable = function(id){
//
//        $('.open'+id).on('click', function(event){
//            event.preventDefault();
//            if(!$(this).hasClass('open')) {
//                $('#code-'+id).slideDown('fast', function(){
//                    $('#copy-btn'+id).fadeIn('fast');
//                });
//                $(this).addClass('open');
//            } else {
//                $('#copy-btn'+id).fadeOut('fast', function(){
//                    $('#code-'+id).slideUp('fast');
//                });
//                $(this).removeClass('open');
//            }
//        });
//    };
//    for(var i = 1; i < 200; i++) {
//        toggleable(i);
//    }
//});
//// ===== END Code Container ===== //
//
//
//// ===== Radio, List, and Dropdown ===== //
//$(function() {
////    $('.checkbox-container').on('click', function(){
////        $(this).toggleClass('active');
////        var ourCheckbox = $(this).children('input');
////        ourCheckbox.prop('checked', !ourCheckbox.prop('checked'));
////    });
////    $('.radio-container').on('click', function(){
////        $(this).toggleClass('active');
////        $(this).siblings().children('input').prop('checked', false);
////        $(this).siblings().removeClass('active');
////        var ourRadio = $(this).children('input');
////        ourRadio.prop('checked', !ourRadio.prop('checked'));
////    });
////    $('.list-selection label').on('click', function(){
////        $(this).toggleClass('active');
////        var ourCheckbox = $(this).children('input');
////        ourCheckbox.prop('checked', !ourCheckbox.prop('checked'));
////    });
//    $('.dropdown-group .dropdown-menu label').on('click', function(e){
//        var clickedText = $(this).children().attr('value');
//        $(this).parent().siblings('button').children('.dropdown-toggle-text').text(clickedText);
//        $(this).children().prop('checked', true);
//        $(this).siblings().children().prop('checked',false);
//    });
//});
//// ===== END List and Dropdown ===== //
//
//// ===== Radio Custom Input ====== //
////$(function(){
////    $('input.radio-input').each(function(){
////        $(this).addClass('sr-only');
////        var parent = $(this).parent();
////        parent.append('<span class="radio-button"></span><span class="radio-text">'+$(this).attr("value")+'</span>');
////    });
////});
//// ===== END Radio Custom Input ====== //
//
//// ===== Checkbox Custom Input ====== //
////$(function(){
////    $('input.checkbox-input').each(function(){
////        $(this).addClass('sr-only');
////        var parent = $(this).parent();
////        parent.append('<span class="checkbox-button"></span><span class="checkbox-text">'+$(this).attr("value")+'</span>');
////    });
////});
//// ===== END Checkbox Custom Input ====== //
//
//// ===== Tree Navigation ===== //
//$(function() {
//    $('.tree-nav-arrow').on('click', function(){
//        var list = $(this).siblings('.tree-nav-branch');
//        if(list.hasClass('active')){
//            list.removeClass('active');
//            list.fadeOut('fast');
//        } else {
//            list.addClass('active');
//            list.fadeIn('fast');
//        }
//    })
//});
//// ===== END List and Dropdown ===== //
//
//
//// ===== Accordion ===== //
//$(function(){
//
//    $('.accordion-title.active').siblings('.accordion-content').show();
//
//    $('.accordion-title').on('click', function(){
//        $(this).toggleClass('active').siblings('.accordion-content').slideToggle('fast');
//    });
//})
//// ===== ENDAccordion ===== //
//
//
//
//// ===== Tree Table Nav ===== //
////$(function(){
////    $('.tree-table-nav').on('click', function(){
////        var id = $(this).attr('id');
////        var $this = $(this);
////        var reset = $(this).parent().parent().siblings('thead').children().children('.tree-table-nav-reset');
////        if($(this).hasClass('active')){
////            $("."+id).removeClass('active').fadeOut(300, function(){
////                $this.removeClass('active');
////            });
////        } else {
////            $(this).addClass('active');
////            $("."+id).addClass('active').fadeIn(300);
////            reset.removeClass('active');
////        }
////    });
////    $('.tree-table-nav-reset').on('click', function(){
////        var ourTable = '#' + $(this).parent().parent().parent().attr('id');
////        var ourReset = $(this);
////        if(!ourReset.hasClass('active')){
////            $(ourTable +' .tree-table-content').removeClass('active').fadeOut(300, function(){
////                setTimeout(function(){
////                    $(ourTable +' .tree-table-nav').removeClass('active');
////                },300);
////            })
////            ourReset.addClass('active');
////        } else {
////            $(ourTable +' .tree-table-content').addClass('active').fadeIn(300);
////            $(ourTable +' .tree-table-nav').addClass('active');
////            ourReset.removeClass('active');
////        }
////    })
////})
//// ===== ENDTree Table Nav ===== //
//
//
//// ===== Popover functionality ===== //
///*
//$(function(){
//    $('.global-popover-right').popover({
//        html: true,
//        placement: 'right'
//    });
//    $('.global-popover-left').popover({
//        html: true,
//        placement: 'left'
//    });
//    $('.global-popover-top').popover({
//        html: true,
//        placement: 'top'
//    });
//    $('.global-popover-bottom').popover({
//        html: true,
//        placement: 'bottom'
//    });
//});
//*/
//
//
//// ===== END Popover functionality ===== //
//
//
//// ===== Adds Search Icon to Inputs with search class ====== //
//$(function(){
//    $('input.form-control.search').each(function(){
//        var parent = $(this).parent();
//        parent.append('<div class="form-search-container"><span class="glyphicon glyphicon-search"></span></div>');
//        parent.children('.form-search-container').append($(this));
//    });
//});
//// ===== END Adds Search Icon to Inputs with search clas ====== //
//
//// ===== Combo Spinner Outer Buttons ====== //
//$(function(){
//    $('.input-group.combo-spinner-outside').each(function(){
//        var min = 0;
//        var max = 9999;
//        var step = 1;
//
//        if($(this).find('input.form-control.combo-spinner-outside').length > 0) {
//            input = $(this).find('input.form-control.combo-spinner-outside');
//            if($.isNumeric(input.data('min'))) {
//                min = input.data('min');
//            }
//
//            if($.isNumeric(input.data('max'))) {
//                max = parseInt(input.data('max'));
//            }
//
//            if($.isNumeric(input.data('step'))) {
//                step = parseInt(input.data('step'));
//            }
//
//            up = $(this).find('.up');
//            down = $(this).find('.down');
//
//            up.on('click', function(e) {
//                val = 0;
//                console.log('~~~'+input.val()+'~~~');
//                if(input.val() != '') {
//                    val = parseInt(input.val());
//                }
//                newVal = val + step;
//
//                if(newVal <= max) {
//                    input.val(newVal);
//                }
//
//            });
//
//            down.on('click', function(e) {
//                val = input.val();
//                newVal = val - step;
//
//                if(newVal >= min) {
//                    input.val(newVal);
//                }
//            });
//
//
//        }
//
//
//
//
//    });
//});
//// ===== END Combo Spinner Outer Buttons ====== //
//
//
//
//
//
//
//// ===== AutoComplete ===== //
///*
//$(function() {
//    var availableTags = [
//        "ActionScript",
//        "AppleScript",
//        "Asp",
//        "BASIC",
//        "C",
//        "C++",
//        "Clojure",
//        "COBOL",
//        "ColdFusion",
//        "Erlang",
//        "Fortran",
//        "Groovy",
//        "Haskell",
//        "Java",
//        "JavaScript",
//        "Lisp",
//        "Perl",
//        "PHP",
//        "Python",
//        "Ruby",
//        "Scala",
//        "Scheme"
//    ];
//    $( "#tags" ).autocomplete({
//        source: availableTags
//    });
//});
//*/
//// ===== END AutoComplete ===== //
//
//// ===== Tooltip ===== //
//$("[data-toggle=tooltip]").tooltip();
//// ===== END Tooltip ===== //
//
//// ===== Local Navigation ==== //
//$('.local-menu-primary-item a').on('click', function(e){
//    if ($(document).width() > 767){
//        e.preventDefault();
//    }
//    if($(this).parent().hasClass('active')){
//        $(this).parent().removeClass('active');
//    } else {
//        $(this).parent().addClass('active').siblings().removeClass('active');
//        $('.local-menu-secondary-item, .local-menu-tertiary-item').removeClass('active');
//    }
//})
//$('.local-menu-secondary-item, .local-menu-tertiary-item, .local-sidebar-menu-secondary-item').on('click', function(e){
//    if($(this).hasClass('active')){
//        $(this).removeClass('active');
//    } else {
//        $(this).addClass('active').siblings().removeClass('active');
//    }
//})
//$('.local-nav-mobile-toggle').on('click', function(e){
//    e.preventDefault();
//    $(this).next('.local-menu-primary').toggleClass('active');
//});
//
//$('html').on('click', function() {
//    $('.local-menu-primary, .local-menu-primary-item, .local-menu-secondary-item, .local-menu-tertiary-item').removeClass('active');
//});
//$('.local-menu-primary, .local-nav-mobile-toggle, .local-menu-primary-item, .local-menu-secondary-item, .local-menu-tertiary-item').on('click', function(e){e.stopPropagation();})
//
//$('.has-menu').append('<span class="icon-ICON_FOLDER"></span><span class="icon-ICON_ARROW_NODE_RIGHT"></span><span class="icon-ICON_ARROW_NODE_DOWN"></span>');
//$('.has-menu-vertical-accordian').append('<span class="icon-ICON_FOLDER"></span><span class="glyphicon glyphicon-plus-sign"></span><span class="glyphicon glyphicon-minus-sign"></span>');
//// ===== END Local Navigation ==== //
//
//$('.sidebar-style-mobile-toggle').on('click', function(e){
//    $(this).siblings('.sidebar-style').toggleClass('active');
//})
//
//// ===== Local Navigation ==== //
//$('.task-table td').on('click', function(e){
//    $(this).toggleClass('active').siblings().toggleClass('active');
//})
//// ===== Local Navigation ==== //
//
//// ===== Scrollspy ===== //
//$( document ).ready(function() {
//    $('body').scrollspy({ target: '.sidebar-navbar', offset: 50 });
//});
//// ===== END Scrollspy ===== //
//
//
//
////$( document ).ready(function() {
////
////    $('#datetimepicker1').datetimepicker({
////        language: 'en',
////        pick12HourFormat: true
////    });
////
////    //Prevent User from Typing in DatePicker Field
////    $('.datetimepicker input').on('keypress', function(e) {
////        e.preventDefault();
////    });
////
////    //Make Date Picker Calendar show on focus of input field.
////    $('.datetimepicker input').on('focus', function(e) {
////        $(this).siblings('.add-on').click();
////    });
////
//});
