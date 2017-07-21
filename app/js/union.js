/*!
 * Union.js
 * https://tomohitoarakawa.github.io/unionjs/app/
 * Version: 1.0.0
 *
 * Copyright 2017 Toohito Arakawa
 * Released under the MIT license
 * https://github.com/TomohitoArakawa/unionjs/master/LICENSE.md
 */
(function($){

  $.fn.union = function(option) {

    var setting = $.extend({
      'target': $(this),
      'url': 'null',
      'duration': '.5s',
      'easing': 'ease',
      'setTimeout': '1000'
    }, option);

    $.ajax({
      type: 'GET',
      url: setting.url
    }).done(function(data){
      var svg = $(data).find('svg');
      svg.css({
        'overflow': 'visible'
      })
      $.each(svg.find('*'), function(){
        var randomRorate = Math.floor(Math.random() * 361),
        height = $(window).height(),
        width = $(window).width(),
        minY = height * -1,
        maxY = height * 2,
        minX = width * -1,
        maxX = width * 2,
        randomY = Math.floor(Math.random() * maxY) + minY,
        randomX = Math.floor(Math.random() * maxX) + minX;
        $(this).css({
          'oTransitionDuration': setting.duration,
          'webkitTransitionDuration': setting.duration,
          'transitionDuration': setting.duration,
          'oTransitionTimingFunction': setting.easing,
          'webkitTransitionTimingFunction': setting.easing,
          'transitionTimingFunction': setting.easing,
          'msTransform': 'translate(' + randomX + 'px , ' + randomY + 'px)',
          'webkitTransform': 'translate(' + randomX + 'px , ' + randomY + 'px)',
          'transform': 'translate(' + randomX + 'px , ' + randomY + 'px)',
        });
      });
      setting.target.prepend(svg);
    });

    setTimeout(function(){
      setting.target.find('svg *').css({
        'msTransform': 'rotateZ(' + 0 + 'deg) translate(' + 0 + 'px , ' + 0 + 'px)',
        'webkitTransform': 'rotateZ(' + 0 + 'deg) translate(' + 0 + 'px , ' + 0 + 'px)',
        'transform': 'rotateZ(' + 0 + 'deg) translate(' + 0 + 'px , ' + 0 + 'px)',
      })
    },setting.setTimeout);

  };

})(jQuery);
