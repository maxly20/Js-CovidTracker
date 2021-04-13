const countries = document.querySelector('datalist');
const search = document.querySelector('#srch');
const date = document.querySelector('#date');
const nameCountry = document.querySelector('#name-country');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const recovered = document.querySelector('.recovered');
const chart = document.querySelector('.chart');

let dataChart = [];

const API_URL = 'https://api.covid19api.com/summary';

const covid = async country => {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);

  if (res.status === 4 || res.status === 200) {
    date.textContent = new Date(data.Date).toDateString();

    if (country === '' || country === 'World') {
      const {
        TotalConfirmed,
        TotalDeaths,
        TotalRecovered,
        NewConfirmed,
        NewDeaths,
        NewRecovered,
      } = data.Global;
      // TOTAL NEW CASE
      confirmed.children[1].textContent = TotalConfirmed;
      confirmed.children[2].textContent = NewConfirmed;
      // TOTAL DEATHS
      deaths.children[1].textContent = TotalDeaths;
      deaths.children[2].textContent = NewDeaths;
      // TOTAL RECOVERED
      recovered.children[1].textContent = TotalRecovered;
      recovered.children[2].textContent = NewRecovered;

      nameCountry.textContent = 'The World';
    }

    data.Countries.forEach(item => {
      const option = document.createElement('option');
      option.value = item.Country;
      option.textContent = item.Country;
      countries.appendChild(option);
      if (country === item.Country) {
        // TOTAL NEW CASE
        confirmed.children[1].textContent = item.TotalConfirmed;
        confirmed.children[2].textContent = item.NewConfirmed;
        // TOTAL DEATHS
        deaths.children[1].textContent = item.TotalDeaths;
        deaths.children[2].textContent = item.NewDeaths;
        // TOTAL RECOVERED
        recovered.children[1].textContent = item.TotalRecovered;
        recovered.children[2].textContent = item.NewRecovered;

        nameCountry.textContent = item.Country;
      }
    });
  } else {
    chart.innerHTML = `<h2>Loading......</h2>`;
  }
};
covid(search.value);

const btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', e => {
  e.preventDefault();
  covid(search.value);
  search.value = '';
});
