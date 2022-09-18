(function () {
  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  // const pauseBtn = container.querySelector('#pause');
  // const prevBtn = container.querySelector('#prev');
  // const nextBtn = container.querySelector('#next');
  // const indicatorsContainer = container.querySelector('#indicators-container');
  // const indicators = indicatorsContainer.querySelectorAll('.indicator');

  const SLIDES_COUNT = slides.length;
  const CODE_LEFT_ARROW = 'ArrowLeft';
  const CODE_RIGHT_ARROW = 'ArrowRight';
  const CODE_SPACE = 'Space';
  const FA_PLAY = '<i class="fa-regular fa-circle-play"></i>';
  const FA_PAUSE = '<i class="fa-regular fa-circle-pause"></i>';
  const FA_PREV = '<i class="fa-solid fa-chevron-left"></i>';
  const FA_NEXT = '<i class="fa-solid fa-chevron-right"></i>';

  let isPlaying = true;
  let timerID = null;
  let currentSlide = 0;
  let swipeStartX = null;
  let swipeEndX = null;

  function gotoNth(n) {
    const indContainer = container.querySelector('.indicators');
    const indicators = indContainer.querySelectorAll('.indicator');
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
    const pauseBtn = container.querySelector('#pause');
    isPlaying = false;
    clearInterval(timerID);
    pauseBtn.innerHTML = FA_PLAY;
  }
  function play() {
    const pauseBtn = container.querySelector('#pause');
    isPlaying = true;
    timerID = setInterval(gotoNext, 2000);
    pauseBtn.innerHTML = FA_PAUSE;
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
    const pauseBtn = container.querySelector('#pause');
    const prevBtn = container.querySelector('#prev');
    const nextBtn = container.querySelector('#next');
    const indicatorsContainer = container.querySelector('.indicators');
    pauseBtn.addEventListener('click', pausePlay);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    indicatorsContainer.addEventListener('click', gotoInd);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown', pressKey);
  }
  function _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span class="control control-pause" id="pause">${FA_PAUSE}</span>`;
    const PREV = `<span class="control control-prev" id="prev">${FA_PREV}</span>`;
    const NEXT = `<span class="control control-next" id="next">${FA_NEXT}</span>`;
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    container.append(controls);
  }
  function _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');
    container.append(indicators);
    for (let i = 0; i < SLIDES_COUNT; i++) {
      const indicator = document.createElement('span');
      indicator.setAttribute(
        'class',
        i === 0 ? 'indicator active' : 'indicator'
      );
      indicator.setAttribute('data-slide-to', i);
      indicators.append(indicator);
    }
    // const indContainer = container.querySelector('.indicators');
    // const indItems = indContainer.querySelectorAll('.indicator');
  }
  function init() {
    _initControls();
    _initIndicators();
    initListeners();
    timerID = setInterval(gotoNext, 2000);
  }
  init();
})();
