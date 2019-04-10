var a = "Hello";
var b = "5.5";
var c = "10";
d = b + c;

//보이는 곳
document.write("Hello");
document.write("World");

//디버깅
console.log("World");

//prompt
var name = prompt("Enter your name");

//팝업
alert("Game Over : " + name);

//Functions - 2 ways
fun();
function fun() {
    console.log("having fun in game dev webinar!");
}
//funtoo();
//보이지 않아
//var apple = 10;
var funtoo = function() {
    apple = 50;
    console.log("TOO MUCH FUN!!!!");
    return 5;
}
funtoo();

a = ["apple", "mango", "guava", 10, 20.5];
console.log(apple);

for (var i=0; i <a.length; i++) {
    console.log(i + " = "+a[i]);
}

a.forEach(function(fruit) {
    console.log(fruit);
});

//Operations over the arrays
//Push = End of arrays

// div
myDiv = document.getElementById("mydiv");
console.log(myDiv);

// ClickListener
function mousePressed(someInfo) {
    console.log("You pressed the mouse!");
    console.log(someInfo.clientX + ", "+ someInfo.clientY);
}
myDiv.addEventListener('mousedown',mousePressed);

// mouseup, keypressed, keydown, keyup - events

var bird = {
    x : 10,
    y : 30,
    color : "green",
    eggs : [1,2,3,4,5],

    fly : function() {
        console.log("bird is flying");
        console.log(this.x);
        console.log(this.color);
    }
};

console.log(bird.x);