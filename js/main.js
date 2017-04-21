

var trigger = document.getElementById("trigger");
var trigger2 = document.getElementById("trigger2");

window.addEventListener("scroll", function(){
  containers = document.getElementsByClassName('container');
  Array.prototype.forEach.call(containers, function(container){
    if(container.offsetTop < window.pageYOffset + 100 && container.offsetTop > window.pageYOffset - 100){
      console.log(container.dataset.background);
      document.querySelector('body').style.background = container.dataset.background;
    }
  })
});
