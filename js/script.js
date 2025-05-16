const pathName = window.location.pathname;
const categoryWrappers = document.querySelectorAll('.watchSuggestions__wrapper');
const seriesGenreWrapper = document.querySelectorAll('.genre__wrapper');
const API_KEY = 'cc687401dafd56a04490baaaa29e1329';
const API_URL = 'https://api.themoviedb.org/3/';

function initApp() {
  if (pathName === '/' || pathName === '/index.html'  ) {
    renderAll();
  }
  else if(pathName === '/series.html'){
    renderAllSeries()
  }
  else if(pathName === '/films.html'){
    renderAllMovies()
  }
}

const getData = function(endpoint, swiperContainer) {
  fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const {results} = data
      // console.log(results)
      renderSwiper(results, swiperContainer);
    }).catch(err => console.log(err));
};

// get data with genre
const getGenre = function(type,genreId,swiperContainer){
  fetch(`${API_URL}discover/${type}?api_key=${API_KEY}&with_genres=${genreId}`)
  .then(response=>response.json())
  .then(data=>{
    const {results} = data
    // console.log(results)
      renderSwiper(results, swiperContainer);
  }).catch(err => console.log(err))
}

function renderSwiper(data, swiperContainer) {
  const swiperWrapper = document.querySelector(`${swiperContainer} .swiper-wrapper`);
  let html = '';
  data.forEach(item => {
    html += `
      <div class="swiper-slide">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="Movie poster" />
      </div>
    `;
  });

  swiperWrapper.innerHTML = html;

  initializeSwiper();
}

function initializeSwiper() {
  new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 10,
    loop: true,
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      375: { slidesPerView: 3 },
      500: { slidesPerView: 4 },
      700: { slidesPerView: 6 },
      1200: { slidesPerView: 9 },
    }
  });
}

function renderAll() {
  categoryWrappers.forEach((wrapper, index) => {
    // create a unique class for each swiper
    const swiperClass = `swiper-${index}`;
    wrapper.innerHTML = `
      <div class="swiper ${swiperClass}">
        <div class="swiper-wrapper"></div>
        <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
      </div>
    `;

      const endpoints = [
      'trending/all/day',
      'movie/top_rated',
      'trending/tv/day',
      'discover/movie'
    ];
    getData( endpoints[index] , `.${swiperClass}`);

   
  });
}

function renderAllSeries(){
  seriesGenreWrapper.forEach((wrapper, index) => {
    // create a unique class for each swiper
    const swiperClass = `swiper-${index}`;
    wrapper.innerHTML = `
      <div class="swiper ${swiperClass}">
        <div class="swiper-wrapper"></div>
        <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
      </div>
    `;

    const genreIds = [80,10759,18,10768,9648];

   getGenre( 'tv' ,genreIds[index] ,`.${swiperClass}`);

  });
}

function renderAllMovies(){
  seriesGenreWrapper.forEach((wrapper, index) => {
    // create a unique class for each swiper
    const swiperClass = `swiper-${index}`;
    wrapper.innerHTML = `
      <div class="swiper ${swiperClass}">
        <div class="swiper-wrapper"></div>
        <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
      </div>
    `;

    const genreIds = [10752,53,18,80,14];

   getGenre( 'movie' ,genreIds[index] ,`.${swiperClass}`);

  });
}



document.addEventListener('DOMContentLoaded', initApp);
