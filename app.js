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
  countries.innerHTML = `<option value="Worldwide">Worldwide</option>`;
  resetValue(confirmed);
  resetValue(deaths);
  resetValue(recovered);
  const res = await fetch(API_URL);
  const data = await res.json();

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

      total(
        TotalConfirmed.toLocaleString(),
        TotalDeaths.toLocaleString(),
        TotalRecovered.toLocaleString()
      );
      newUpdate(
        NewConfirmed.toLocaleString(),
        NewDeaths.toLocaleString(),
        NewRecovered.toLocaleString()
      );

      nameCountry.textContent = 'Worldwide';
      dataChart = [TotalConfirmed, TotalDeaths, TotalRecovered];
    }

    data.Countries.forEach(item => {
      const option = document.createElement('option');
      option.value = item.Country;
      option.textContent = item.Country;
      countries.appendChild(option);
      if (country === item.Country) {
        total(item.TotalConfirmed, item.TotalDeaths, item.TotalRecovered);
        newUpdate(item.NewConfirmed, item.NewDeaths, item.NewRecovered);

        nameCountry.textContent = item.Country;
        dataChart = [
          item.TotalConfirmed,
          item.TotalDeaths,
          item.TotalRecovered,
        ];
      }
    });
    drawChart(dataChart);
  } else {
    chart.innerHTML = `<h2>Loading......</h2>`;
  }
};

const speed = 100;
const counting = (target, element) => {
  const inc = target / speed;
  const count = +element.textContent;
  if (count < target) {
    element.textContent = Math.ceil(count + inc);
    setTimeout(() => {
      counting(target, element);
    }, 1);
  } else {
    // TOTAL NEW CASE
    element.textContent = target;
  }
};

const total = (Confirmed, Deaths, Recovered) => {
  counting(Confirmed, confirmed.children[1]);
  // TOTAL DEATHS
  counting(Deaths, deaths.children[1]);
  // TOTAL RECOVERED
  counting(Recovered, recovered.children[1]);
};
const newUpdate = (Confirmed, Deaths, Recovered) => {
  // TOTAL NEW CASE
  counting(Confirmed, confirmed.children[2]);
  // TOTAL DEATHS
  counting(Deaths, deaths.children[2]);
  // TOTAL RECOVERED
  counting(Recovered, recovered.children[2]);
};

const resetValue = element => {
  element.children[1].textContent = 0;
  element.children[2].textContent = 0;
};

const drawChart = data => {
  chart.innerHTML = '';
  const ctx = document.createElement('canvas');
  chart.appendChild(ctx);
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Total Confirmed', 'Total Deaths', 'Total Recovered'],
      datasets: [
        {
          label: nameCountry.textContent,
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(0, 0, 0, 0.5)',
            'rgba(1, 128, 3, 0.5)',
          ]
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

covid(search.value);

const btnSearch = document.querySelector('button');
btnSearch.addEventListener('click', e => {
  e.preventDefault();
  covid(search.value);
  search.value = '';
});
