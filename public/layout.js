  // config
  var options = {
    editor: document.querySelector('[data-toggle="pen"]'),
    debug: true
  };

  // create editor
  var pen = window.pen = new Pen(options);

  // setTimeout(function () {
    pen.focus();
  // }, 100);


  // toggle editor mode
  document.querySelector('#mode').addEventListener('click', function() {
    var text = this.textContent;

    if(this.classList.contains('disabled')) {
      this.classList.remove('disabled');
      pen.rebuild();
    } else {
      this.classList.add('disabled');
      pen.destroy();
    }
  });

  // toggle editor mode
  document.querySelector('#hinted').addEventListener('click', function() {
    var pen = document.querySelector('.pen')

    if(pen.classList.contains('hinted')) {
      pen.classList.remove('hinted');
      this.classList.add('disabled');
    } else {
      pen.classList.add('hinted');
      this.classList.remove('disabled');
    }
  });
