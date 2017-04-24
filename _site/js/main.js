




$('#fullpage').fullpage({
  anchors: ['page1', 'page2', 'page3', 'page4'],
  // sectionsColor: ['#FFF', '#F68383', '#f8c881', '#f7fa7c', '#D2FC74', '#71FC7B', '#72FDDA', '#70D1FC', '#D2FC74', '#70D1FC','#7570FB','#D871FB'],
  scrollingSpeed: 900,
  csss3: true,
  verticalCentered: false,
  fadingEffect: true,
  allowPageScroll: true,
   paddingBottom: '0',
   resize: false,
   scrollOverflow: false,
   touchSensitivity: 10

});


var trigger = document.getElementById("trigger");
var trigger2 = document.getElementById("trigger2");

window.addEventListener("scroll", function(){
  containers = document.getElementsByClassName('container');
  Array.prototype.forEach.call(containers, function(container){
    if(container.offsetTop < window.pageYOffset + 0 && container.offsetTop > window.pageYOffset - 0){
      console.log(container.dataset.background);
      document.querySelector('body').style.background = container.dataset.background;
    }
  })
});
