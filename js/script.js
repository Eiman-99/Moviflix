const pathName = window.location.pathname
const swiper = document.querySelector('.swiper-wrapper')

function initApp(){
  if(pathName==='/'){
    renderAll()
  }
}


const getData = function(endpoint) {
  const API_KEY = 'cc687401dafd56a04490baaaa29e1329';
  const API_URL = 'https://api.themoviedb.org/3/';

  fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const {results} = data
      console.log(results);
      renderSwiper(results);
    }).catch(err=>console.log(err));

};

// getData('discover/movie');


function renderSwiper(data) {
  let html = ` `;

  data.forEach(item => {
    html += `
      <div class="swiper-slide">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="Movie poster" />
      </div>
    `;
  });
  swiper.innerHTML = html;  
  initializeSwiper();    
}


function initializeSwiper(){
const swiper = new Swiper('.swiper', {
  // Optional parameters
  speed: 400,
  spaceBetween: 10,
  direction: 'horizontal',
  loop: true,

 
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
   breakpoints: {
      375: {
        slidesPerView: 3,
      },
      500: {
        slidesPerView: 4,
      },
      700: {
        slidesPerView: 6,
      },
      1200: {
        slidesPerView: 9,
      },
    }

 
});
}

// render all suggestions on home page
function renderAll(){
  getData('discover/movie')
}

document.addEventListener('DOMContentLoaded', initApp);
