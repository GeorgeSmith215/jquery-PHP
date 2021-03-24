'use strict';

// var animal=document.getElementById("animal");
// var result = document.getElementById('result');


// animal.addEventListener("click",function(){
//     result.innerHTML="Your favorate animal is "+animal.value;
// })

// var cat = document.getElementById("cat");
// var catPic = document.getElementById("cat-pic");
// var fish = document.getElementById("fish");
// var fishPic = document.getElementById("fish-pic");
// var frog = document.getElementById("frog");
// var frogPic = document.getElementById("frog-pic");

// cat.addEventListener("click",function(){
//     if(catPic.className === "hide"){
//         catPic.classList.remove("hide");
//     }else catPic.classList.add("hide");
// })

// fish.addEventListener("click",function(){
//     if(fishPic.className === "hide"){
//         fishPic.classList.remove("hide");
//     }else fishPic.classList.add("hide");
// })

// frog.addEventListener("click",function(){
//     if(frogPic.className === "hide"){
//         frogPic.classList.remove("hide");
//     }else frogPic.classList.add("hide");
// })



// Select your favorate animal

var cat = document.getElementById("cat");
var fish = document.getElementById("fish");
var frog = document.getElementById("frog");

cat.addEventListener("click",picLink);
fish.addEventListener("click",picLink);
frog.addEventListener("click",picLink);

function picLink(){
    var allImages = document.querySelectorAll("img");
    for(let i=0;i<allImages.length;i++){
        allImages[i].classList.remove("hide");
    }

    let EleId = this.attributes["id"].value;
    document.getElementById("animal").value=EleId;


    let ElePicId = this.attributes["data-img"].value;
    let ElePic = document.getElementById(ElePicId);
    if(ElePic.className === "hide"){
        ElePic.classList.remove("hide");
    }else ElePic.classList.add("hide");
}


// edit frame

var checklist = document.getElementById("checklist");

var items = checklist.querySelectorAll("li");
var inputs = checklist.querySelectorAll("input");

for(let i=0;i<items.length;i++){
    items[i].addEventListener("click",editItem);
    inputs[i].addEventListener("blur",updateItem);
    inputs[i].addEventListener("keypress",itemKeyPress);
}

function editItem(){
    this.className="edit";
    var input = this.querySelector("input");
    // console.log(input.getAttribute("value"));
    input.focus();
    input.setSelectionRange(0,input.value.length);
}

function updateItem(){
    this.previousElementSibling.innerHTML = this.value;
    this.parentNode.classList.remove("edit");
}

function itemKeyPress(event){
    if(event.keyCode===13){
        updateItem.apply(this);
    }
}