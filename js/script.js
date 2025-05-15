
const getData = function(endpoint) {
  const API_KEY = 'cc687401dafd56a04490baaaa29e1329';
  const API_URL = 'https://api.themoviedb.org/3/';

  fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    }).catch(err=>console.log(err));
};

getData('discover/movie');


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
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 6,
      },
    }

 
});