

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
