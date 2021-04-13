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

const covid = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);

  if (res.status === 4 || res.status === 200) {
    date.textContent = new Date(data.Date).toDateString();

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
    confirmed.children[1].textContent = TotalConfirmed;
    confirmed.children[2].textContent = NewConfirmed;
// TOTAL RECOVERED
    confirmed.children[1].textContent = TotalConfirmed;
    confirmed.children[2].textContent = NewConfirmed;



  } else {
    chart.innerHTML = `<h2>Loading......</h2>`;
  }
};
covid();
