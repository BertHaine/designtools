




// $('#fullpage').fullpage({
//   anchors: ['page1', 'page2', 'page3', 'page4'],
//   // sectionsColor: ['#FFF', '#F68383', '#f8c881', '#f7fa7c', '#D2FC74', '#71FC7B', '#72FDDA', '#70D1FC', '#D2FC74', '#70D1FC','#7570FB','#D871FB'],
//   scrollingSpeed: 900,
//   csss3: true,
//   verticalCentered: false,
//   fadingEffect: true,
//   allowPageScroll: true,
//    paddingBottom: '0',
//    resize: false,
//    scrollOverflow: false,
//    touchSensitivity: 10

// });



window.addEventListener("scroll", function(){
  containers = document.getElementsByClassName('tools');
  Array.prototype.forEach.call(containers, function(tools){
    if(tools.offsetTop < window.pageYOffset + 50 && tools.offsetTop > window.pageYOffset - 50 || tools.offsetTop < window.pageYOffset + 400 && tools.offsetTop > window.pageYOffset - 400){
      console.log(tools.dataset.background);
      document.querySelector('body').style.background = tools.dataset.background;
      $('h4').style.color = tools.dataset.background;
    }
  })
});
