const pathName = window.location.pathname;
const categoryWrappers = document.querySelectorAll('.watchSuggestions__wrapper');
const seriesGenreWrapper = document.querySelectorAll('.genre__wrapper');
const API_KEY = 'cc687401dafd56a04490baaaa29e1329';
const API_URL = 'https://api.themoviedb.org/3/';
const body = document.body;

let reviews = []

function initApp() {
  if (pathName === '/' || pathName === '/index.html'  ) {
    renderAll();
    renderMovieOrSeriesDetails()
  }
  else if(pathName === '/series.html'){
    renderAllSeries()
    renderMovieOrSeriesDetails()    
  }
  else if(pathName === '/films.html'){
    renderAllMovies()
    renderMovieOrSeriesDetails()
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

//get movie or series details by id
const getDetails = function(type, id){
  fetch(`${API_URL}${type}/${id}?api_key=${API_KEY}`)
  .then(response=>response.json())
  .then(data=>{
    console.log(data)
    // fetch tv or movie cast
    fetch(`${API_URL}${type}/${id}/credits?api_key=${API_KEY}`)
    .then(response=>response.json())
    .then(credit=>{
      // console.log(credit.cast)
      createDetailsSection(data, credit.cast)
    })
  }).catch(err => console.log(err))
}

function renderSwiper(data, swiperContainer) {
  const swiperWrapper = document.querySelector(`${swiperContainer} .swiper-wrapper`);
  let html = '';
  data.forEach(item => {
    const type = item.first_air_date ? 'tv' : 'movie';
    html += `
      <div class="swiper-slide">
        <a href="?id=${item.id}&type=${type}">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="Movie poster" />
        </a>
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

// display movie or series details
function renderMovieOrSeriesDetails(){
  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")
  const type = params.get("type")
  if (!id || !type) return;

  console.log(id,type)

  getDetails(type,id)

}

function createDetailsSection(data,cast){
  const detailsPopUp = document.createElement('section')
  detailsPopUp.classList='details'
  body.append(detailsPopUp)
  const detailsContent = document.createElement('div')
  detailsContent.classList='details__content'
  detailsPopUp.append(detailsContent)

  let duration = '';

  if (data.seasons) {
    duration = `${data.number_of_seasons} Seasons`;
  } else if (data.runtime) {
    const hours = Math.floor(data.runtime / 60);
    const mins = data.runtime % 60;
    duration = `${hours}h ${mins}m`;
  }
  
  detailsContent.innerHTML=`
         <div class="hero">
         <div class="close-btn" onclick=closeDetailsPopup()><img src='assets/close.png' alt=''></div>
        <div class="hero__wrapper">
        <h2 class="hero__title">${data.name || data.title}</h2>
      <div class="hero__btns">
      <a href="" class="hero__btn-play btn-primary btn">
        <img src="assets/play.png" alt="">
        <span>Play</span>
        </a>
      <a href="" class="hero__btn-add">
        <img src="assets/Plus.png" alt="">
        </a>
      </div>
    </div>
  </div>
  <div class="media-info">
    <div class="media__container flex">
    <div class="media-info__left">
    <div class="media-info__wrapper">
    <span class="media-info__year">${data.last_air_date?.split('-')[0] || data.release_date?.split('-')[0]}</span>
    <span class="media-info__duration">${duration}</span>
    <span class="media-info__badge"><img src="assets/hd.png" alt=""></span>
    <span class="media-info__badge"><img src="assets/AD.png" alt=""></span>
    <span class="media-info__badge"><img src="assets/subtitles.png" alt=""></span>
    </div>
    <p class="media-info__description">${data.overview.slice(0,250)}... <a class='view-more'>More</a></p>
  </div>

  <div class="media-info__right">
  ${cast.length ? `
      <p class="media-info__cast">
        <span class="white">Cast:</span>
        ${cast.slice(0, 4).map(person => `<span>${person.name}</span>`)}
      </p>` : ''}    
  <p class="media-info__genre"><span class="white">Genre:</span> ${data.genres.map(genre=>`<span>${genre.name}</span>`)}</p>
  </div>
</div>
</div>
      <div class="media__reviews">
      <div class="media__container">
  <h3 class="review__title">Leave a review</h3>
  <form onsubmit="addReview(event, ${data.id})">
    <textarea  class="review__textarea" id="review__text" placeholder="Write your review..." required></textarea>
    <button type="submit" class="btn-submit btn">Submit</button>
  </form>
  <div class="reviews__container"></div>
</div>
</div>
`
  document.querySelector('.details').style.display='block'
  body.style.overflow='hidden'
  document.querySelector('.hero').style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280${data.backdrop_path}")`;

  // close when clicking on the overlay 
  detailsPopUp.addEventListener('click', (e) => {
  if (e.target === detailsPopUp) {
    closeDetailsPopup();
  }
});
  // get the reviews from loacal storage based on media ID
  if (localStorage.getItem(data.id) !== null) {
    reviews = JSON.parse(localStorage.getItem(data.id));
    renderReviews(reviews);
  }

}

// close details popup
function closeDetailsPopup(){
  document.querySelector('.details').style.display='none'
  body.style.overflow='auto'
  window.history.back()
}

//add reviews
function addReview(e,id){
  e.preventDefault()
  const reviewContent = document.querySelector('.review__textarea')
  console.log(reviewContent.value)
  reviews.push({userName:'eman',review:reviewContent.value})
  renderReviews(reviews)
  reviewContent.value=''
  setToLocalStorage(id)
}

function renderReviews(reviews){
  let reviewsLists = ''
  const reviewsContainer = document.querySelector('.reviews__container')
  reviews.forEach(review=>{
  reviewsLists += `<li>
                   <h4>${review.userName}</h4>
                   <p>${review.review}</p>
                   </li>`
  })

  reviewsContainer.innerHTML = reviewsLists
  console.log(reviewsContainer)
}

function setToLocalStorage(id){
  localStorage.setItem(id, JSON.stringify(reviews))
}

document.addEventListener('DOMContentLoaded', initApp);



