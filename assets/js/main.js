(function () {
  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const pauseBtn = container.querySelector('#pause');
  const prevBtn = container.querySelector('#prev');
  const nextBtn = container.querySelector('#next');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');

  const SLIDES_COUNT = slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';

  let isPlaying = true;
  let timerID = null;
  let currentSlide = 0;
  let swipeStartX = null;
  let swipeEndX = null;

  function gotoNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }
  function gotoNext() {
    gotoNth(currentSlide + 1);
  }
  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }
  function pause() {
    isPlaying = false;
    clearInterval(timerID);
    pauseBtn.innerHTML = 'Play';
  }
  function play() {
    isPlaying = true;
    timerID = setInterval(gotoNext, 2000);
    pauseBtn.innerHTML = 'Pause';
  }

  function pausePlay() {
    if (isPlaying) pause();
    else play();
  }

  function next() {
    gotoNext();
    pause();
  }
  function prev() {
    gotoPrev();
    pause();
  }
  function gotoInd(event) {
    const target = event.target;
    if (target && target.classList.contains('indicator')) {
      const num = +target.getAttribute('data-slide-to');
      if (isNaN(num)) return;
      gotoNth(num);
      pause();
    }
  }
  function pressKey(event) {
    if (event.code === CODE_LEFT_ARROW) prev();
    if (event.code === CODE_RIGHT_ARROW) next();
    if (event.code === CODE_SPACE) pausePlay();
  }
  function swipeStart(event) {
    swipeStartX = event.changedTouches[0].pageX;
  }
  function swipeEnd(event) {
    swipeEndX = event.changedTouches[0].pageX;
    if (swipeEndX - swipeStartX < -100) prev();
    if (swipeEndX - swipeStartX > 100) next();
  }
  function initListeners() {
    pauseBtn.addEventListener('click', pausePlay);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    indicatorsContainer.addEventListener('click', gotoInd);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }

  function init() {
    initListeners();
    timerID = setInterval(gotoNext, 2000);
  }
  init();
})();
