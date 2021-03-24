'use strict';

// function go(){
//     alert('hi');
// }
// var myList = ['apple','oranges','bananas'];
// myList[3]=go;

// myList.forEach(function(value,index){
//     console.log('I have '+index+' '+value);
// })

// for(let i=0;i<10;i++){
//     console.log(i);
// }

// var i=0
// while(i<10){
//     console.log(i++);
// }

// var i=0
// do {
//     console.log(i++);
// } while (i<10);



// var myInterval =  setInterval(function(){
//     console.log(new Date());
// },1000)


$(function(){

    // configuration
    var currentSlide = 1;
    var animationSpeed = 1000;
    var pause = 2000;
    

    // cache DOM
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');

    var slideInterval;

    function startSlide(){
        slideInterval = setInterval(function(){
            $slideContainer.animate({'margin-left':'-=400px'},animationSpeed,function(){
                ++currentSlide;
                if(currentSlide === $slides.length){
                    currentSlide = 1;
                    $slideContainer.css('margin-left',0);
                }
            });
        },pause);
    }

    function stopSlide(){
        clearInterval(slideInterval);
    }

    $slider.on('mouseover',stopSlide).on('mouseout',startSlide);

    startSlide();

});
