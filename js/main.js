/* global $ */

const $leftArrow = document.querySelector('.left-arrow');
const $rightArrow = document.querySelector('.right-arrow');
const $sideMemuBar = document.querySelector('.menu-bar');
const $menuHome = document.querySelector('.menu-home');
const $menuAddCity = document.querySelector('.menu-add-city');

const $sideMemu = document.querySelector('.side-menu');
const $home = document.querySelector('.home');
const $searchingPage = document.querySelector('.searching-page-container');
const $unfollowConfirmation = document.querySelector('.unfollow-confirmation-container');
const $followConfirmation = document.querySelector('.follow-confirmation-container');

const $form = document.querySelector('form');
const $result = document.querySelector('.result');

const $body = document.querySelector('body');
const $switch = document.querySelector('.switch');

const $popularList = document.querySelector('.popular-city-container');

const $searchResult = document.querySelector('.result-city-weather-card');
const $searchResultContent = document.querySelector('.search-result-content');
const $cardContainer = document.querySelector('.card-container');
let currentPage = $home;

const myFav = ['Seoul', 'Los Angeles'];
let myFavObjGloval = [];
let searchResult = {};
let formSearchValue = '';
let lastPage = null;
let currentCardPage = 1;

function callCurrentWeather(myFav) {
  const myFavObj = [];
  let name = '';
  let url = '';
  const key = 'b5bfe54bf1ce3df908b8b2d4d18bb194';
  const address = 'https://api.openweathermap.org/data/2.5/weather?';

  const appConfig = {
    type: 'GET',
    success: function (data) {
      const obj = {
        city: data.name,
        weather: data.weather[0].main,
        icon: data.weather[0].main,
        degree: changeTemp(data.main.temp),
        max: changeTemp(data.main.temp_max),
        min: changeTemp(data.main.temp_min)
      };
      myFavObj.push(obj);
      myFavObjGloval = myFavObj;
      if (myFav.length === myFavObj.length) {
        displayCard(myFavObj);
      }

    },
    error: function () {
      alert('Sorry. We cannot get this city information. Please try other name.');
    }
  };
  if (myFav.length === 0) {
    const add = cardAddCard();
    $cardContainer.appendChild(add);
  } else {

    for (let i = 0; i < myFav.length; i++) {
      name = myFav[i];
      url = `${address}q=${name}&appid=${key}`;
      $.ajax(url, appConfig);
    }
  }
}

function createCard(obj) {

  const city = obj.city;
  let cityNoSpace = '';
  for (let i = 0; i < city.length; i++) {
    if (city[i] === ' ') {
      cityNoSpace += '-';
    } else {
      cityNoSpace += city[i];
    }
  }

  const cardDiv = document.createElement('div');
  const content = document.createElement('div');
  const closeBtn = document.createElement('div');
  const iEle = document.createElement('div');
  const cityName = document.createElement('div');
  const weather = document.createElement('div');
  const img = document.createElement('img');
  const degree = document.createElement('div');
  const degreeMaxMin = document.createElement('div');
  const max = document.createElement('div');
  const min = document.createElement('div');
  cardDiv.className = 'card';
  content.className = 'card-content';
  closeBtn.className = 'close-btn';
  iEle.className = `close ${cityNoSpace} far fa-times-circle`;
  cityName.className = 'city-name';
  cityName.textContent = obj.city;
  weather.className = 'weather';
  weather.textContent = obj.weather;
  img.className = 'weather-img';
  img.setAttribute('src', `images/${obj.icon}.png`);
  img.setAttribute('alt', obj.icon);
  degree.className = 'degree';
  degree.textContent = obj.degree + '°';
  degreeMaxMin.className = 'degree-max-min';
  max.className = 'max';
  max.textContent = 'Max: ' + obj.max + '°';
  min.className = 'min';
  min.textContent = 'Min: ' + obj.min + '°';

  closeBtn.append(iEle);
  degreeMaxMin.append(max, min);

  content.append(closeBtn, cityName, weather, img, degree, degreeMaxMin);

  cardDiv.appendChild(content);
  return cardDiv;
}
function createSearchedCard(obj) {
  const content = document.createElement('div');
  const closeBtn = document.createElement('div');
  const i = document.createElement('div');
  const cityName = document.createElement('div');
  const weather = document.createElement('div');
  const img = document.createElement('img');
  const degree = document.createElement('div');
  const degreeMaxMin = document.createElement('div');
  const max = document.createElement('div');
  const min = document.createElement('div');
  const follow = document.createElement('button');
  content.className = 'card-content';
  closeBtn.className = 'close-btn';
  i.className = 'close far fa-times-circle';
  cityName.className = 'city-name';
  cityName.textContent = obj.city;
  weather.className = 'weather';
  weather.textContent = obj.weather;
  img.className = 'weather-img';
  img.setAttribute('src', `images/${obj.icon}.png`);
  img.setAttribute('alt', obj.icon);
  degree.className = 'degree';
  degree.textContent = obj.degree + '°';
  degreeMaxMin.className = 'degree-max-min';
  max.className = 'max';
  max.textContent = 'Max: ' + obj.max + '°';
  min.className = 'min';
  min.textContent = 'Min: ' + obj.min + '°';
  follow.className = 'follow';
  follow.textContent = 'Follow';

  closeBtn.append(i);
  degreeMaxMin.append(max, min);

  content.append(closeBtn, cityName, weather, img, degree, degreeMaxMin, follow);

  return content;
}
function changeTemp(temp) {
  return parseInt((temp - 273.15) * 9 / 5 + 32);
}

function cardAddCard() {
  const cardDiv = document.createElement('div');
  const add = document.createElement('div');
  const i = document.createElement('i');
  cardDiv.className = 'card add';
  add.className = 'add-card';
  i.className = 'add-card fas fa-plus-circle';
  add.appendChild(i);
  cardDiv.appendChild(add);

  return cardDiv;
}

function deleteElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayCard(myFavObj) {
  lastPage = Math.ceil((myFav.length + 1) / 3);
  let myCard;

  if (currentCardPage !== lastPage) {
    for (let i = 3 * (currentCardPage - 1); i < 3 * (currentCardPage - 1) + 3; i++) {
      myCard = createCard(myFavObj[i]);
      $cardContainer.appendChild(myCard);
    }
  } else {
    for (let i = 3 * (currentCardPage - 1); i < myFav.length; i++) {
      myCard = createCard(myFavObj[i]);
      $cardContainer.appendChild(myCard);
    }
    const add = cardAddCard();
    $cardContainer.appendChild(add);
  }

}

function createFollowMsg() {
  const followContainer = document.createElement('div');
  const closeBtn = document.createElement('div');
  const iEle = document.createElement('div');
  const followMsg = document.createElement('h2');
  const followBtnContainer = document.createElement('div');
  const followBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  followContainer.className = 'follow-confirmation';
  closeBtn.className = 'close-btn';
  iEle.className = 'close far fa-times-circle';
  followMsg.className = 'follow-msg';
  followMsg.textContent = `Do you want to follow ${searchResult.city} weather?`;
  followBtnContainer.className = 'follow-btn-container';
  followBtn.className = 'follow-btn';
  followBtn.textContent = 'Follow';
  cancelBtn.className = 'cancel-btn';
  cancelBtn.textContent = 'Cancel';

  closeBtn.append(iEle);
  followBtnContainer.append(followBtn, cancelBtn);

  followContainer.append(closeBtn, followMsg, followBtnContainer);

  return followContainer;

}

function createUnfollowMsg(cityName) {
  const unFollowContainer = document.createElement('div');
  const closeBtn = document.createElement('div');
  const iEle = document.createElement('div');
  const unfollowMsg = document.createElement('h2');
  const unfollowBtnContainer = document.createElement('div');
  const unfollowBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  unFollowContainer.className = 'unfollow-confirmation';
  closeBtn.className = 'close-btn';
  iEle.className = 'close far fa-times-circle';
  unfollowMsg.className = 'unfollow-msg';
  unfollowMsg.textContent = `Do you want to unfollow ${cityName} weather?`;
  unfollowBtnContainer.className = 'unfollow-btn-container';
  unfollowBtn.className = 'unfollow-btn';
  unfollowBtn.textContent = 'Unfollow';
  cancelBtn.className = 'cancel-btn';
  cancelBtn.textContent = 'Cancel';

  closeBtn.append(iEle);
  unfollowBtnContainer.append(unfollowBtn, cancelBtn);

  unFollowContainer.append(closeBtn, unfollowMsg, unfollowBtnContainer);

  return unFollowContainer;

}

window.addEventListener('load', event => {
  callCurrentWeather(myFav);
});

if (lastPage !== 1) {

  $rightArrow.addEventListener('click', () => {
    deleteElement($cardContainer);
    if (currentCardPage === lastPage) {
      currentCardPage = 1;
    } else {
      currentCardPage += 1;
    }

    displayCard(myFavObjGloval);

  });
  $leftArrow.addEventListener('click', () => {
    deleteElement($cardContainer);

    if (currentCardPage === 1) {
      currentCardPage = lastPage;
    } else {
      currentCardPage -= 1;
    }
    displayCard(myFavObjGloval);

  });
}

$sideMemuBar.addEventListener('click', () => {
  if ($sideMemu.classList.length === 2) {
    $sideMemu.classList.remove('hidden');
  } else {
    $sideMemu.classList.add('hidden');
  }
});

$menuHome.addEventListener('click', () => {
  $sideMemu.classList.add('hidden');
  if (!$unfollowConfirmation.classList[1]) {
    $unfollowConfirmation.classList.add('hidden');
  }

  if (!$followConfirmation.classList[1]) {
    $followConfirmation.classList.add('hidden');
  }

  if (currentPage !== $home) {
    currentPage.classList.add('hidden');
    $home.classList.remove('hidden');
    currentPage = $home;
    currentCardPage = 1;
  }
  if ($searchResult.classList.length === 1) {
    $searchResult.classList.add('hidden');
    deleteElement($searchResultContent);

  }

});

$menuAddCity.addEventListener('click', () => {
  $sideMemu.classList.add('hidden');
  deleteElement($result);

  if (!$unfollowConfirmation.classList[1]) {
    $unfollowConfirmation.classList.add('hidden');
  }

  if (!$followConfirmation.classList[1]) {
    $followConfirmation.classList.add('hidden');
  }

  if (currentPage !== $searchingPage) {
    currentPage.classList.add('hidden');
    $searchingPage.classList.remove('hidden');
    currentPage = $searchingPage;
  }
  if ($searchResult.classList.length === 1) {
    $searchResult.classList.add('hidden');
    deleteElement($searchResultContent);
  }

});

$form.addEventListener('submit', event => {

  event.preventDefault();

  deleteElement($result);

  const searchValue = event.target.elements.search.value;
  let searchValueWithUpperCase = '';
  if (searchValue.length !== 0) {

    for (let i = 0; i < searchValue.length; i++) {
      if (i === 0) {
        searchValueWithUpperCase = searchValue[i].toUpperCase();
      } else {
        searchValueWithUpperCase += searchValue[i];
      }
    }

    const key = 'b5bfe54bf1ce3df908b8b2d4d18bb194';
    const address = 'https://api.openweathermap.org/data/2.5/weather?';
    const url = `${address}q=${searchValueWithUpperCase}&appid=${key}`;

    const appConfig = {
      type: 'GET',
      success: function (data) {
        const div = document.createElement('div');
        div.setAttribute('class', 'popular-city');
        div.textContent = data.name;
        $result.append(div);

        $form.reset();
        formSearchValue = data.name;
      },
      error: function () {
        alert('There is no matching value');
        $form.reset();

      }
    };
    $.ajax(url, appConfig);

  }
});

if (!$result.firstElementChild) {
  $result.addEventListener('click', () => {
    const cityName = formSearchValue;

    const key = 'b5bfe54bf1ce3df908b8b2d4d18bb194';
    const address = 'https://api.openweathermap.org/data/2.5/weather?';
    const url = `${address}q=${cityName}&appid=${key}`;

    const appConfig = {
      type: 'GET',
      success: function (data) {
        const obj = {
          city: data.name,
          weather: data.weather[0].main,
          icon: data.weather[0].main,
          degree: changeTemp(data.main.temp),
          max: changeTemp(data.main.temp_max),
          min: changeTemp(data.main.temp_min)
        };
        const cardElement = createSearchedCard(obj);
        $searchResultContent.appendChild(cardElement);
        searchResult = obj;
        deleteElement($result);
      },
      error: function () {
        alert('Sorry. We cannot get this city information. Please try other name.');
      }
    };
    $.ajax(url, appConfig);

    $searchResult.classList.remove('hidden');
    $searchingPage.classList.add('hidden');
    currentPage = $searchResult;
  });
}

$switch.addEventListener('change', () => {
  $body.classList.toggle('dark-mode');
});

$popularList.addEventListener('click', event => {

  if (event.target.classList[0] === 'popular-city') {
    const cityName = event.target.textContent;
    const key = 'b5bfe54bf1ce3df908b8b2d4d18bb194';
    const address = 'https://api.openweathermap.org/data/2.5/weather?';
    const url = `${address}q=${cityName}&appid=${key}`;

    const appConfig = {
      type: 'GET',
      success: function (data) {
        deleteElement($searchResultContent);
        const obj = {
          city: data.name,
          weather: data.weather[0].main,
          icon: data.weather[0].main,
          degree: changeTemp(data.main.temp),
          max: changeTemp(data.main.temp_max),
          min: changeTemp(data.main.temp_min)
        };
        const cardElement = createSearchedCard(obj);
        $searchResultContent.appendChild(cardElement);
        searchResult = obj;
      },
      error: function () {
        alert('Sorry. We cannot get this city information. Please try other name.');
      }
    };
    $.ajax(url, appConfig);
    $searchResult.classList.remove('hidden');
    $searchingPage.classList.add('hidden');
    currentPage = $searchResult;

  }
});

$searchingPage.addEventListener('click', event => {
  if (!$sideMemu.classList[1]) {
    $sideMemu.classList.add('hidden');
  }

});

let clickedWeatherLocationInArray;

$home.addEventListener('click', event => {
  if (!$sideMemu.classList[1]) {
    $sideMemu.classList.add('hidden');
  }

  if (event.target.classList[0] === 'close') {
    const clickedCityNotchanged = event.target.classList[1];
    let clickedCity = '';
    for (let i = 0; i < clickedCityNotchanged.length; i++) {
      if (clickedCityNotchanged[i] === '-') {
        clickedCity += ' ';
      } else {
        clickedCity += clickedCityNotchanged[i];
      }
    }

    for (let n = 0; n < myFav.length; n++) {
      if (myFav[n] === clickedCity) {
        clickedWeatherLocationInArray = n;
      }
    }
    const msg = createUnfollowMsg(clickedCity);
    deleteElement($unfollowConfirmation);

    $unfollowConfirmation.appendChild(msg);

    $unfollowConfirmation.classList.remove('hidden');
  } else if (event.target.classList[0] === 'add-card') {
    currentPage.classList.add('hidden');
    $searchingPage.classList.remove('hidden');
    currentPage = $searchingPage;
  }

});

$searchResult.addEventListener('click', event => {

  if (event.target.classList[0] === 'close') {
    $searchResult.classList.add('hidden');
    deleteElement($searchResultContent);
    currentPage = $searchingPage;
    $searchingPage.classList.remove('hidden');
  } else if (event.target.className === 'follow') {
    for (let i = 0; i < myFav.length; i++) {
      if (searchResult.city === myFav[i]) {
        alert('You are already following this weather');
        return;
      }
    }
    const followMsg = createFollowMsg();
    deleteElement($followConfirmation);

    $followConfirmation.appendChild(followMsg);
    $followConfirmation.classList.remove('hidden');
  }

});

$unfollowConfirmation.addEventListener('click', event => {
  if (event.target.classList[0] === 'unfollow-btn') {
    myFav.splice(clickedWeatherLocationInArray, 1);
    deleteElement($cardContainer);
    callCurrentWeather(myFav);
    $unfollowConfirmation.classList.add('hidden');
  } else if (event.target.classList[0] === 'cancel-btn' || event.target.classList[0] === 'close') {
    $unfollowConfirmation.classList.add('hidden');
  }
});
$followConfirmation.addEventListener('click', event => {
  if (event.target.classList[0] === 'follow-btn') {
    myFav.push(searchResult.city);
    deleteElement($cardContainer);
    callCurrentWeather(myFav);
    searchResult = {};
    $searchResult.classList.add('hidden');
    deleteElement($searchResultContent);
    currentPage = $home;
    currentCardPage = 1;
    $followConfirmation.classList.add('hidden');
    $home.classList.remove('hidden');

  } else if (event.target.classList[0] === 'cancel-btn' || event.target.classList[0] === 'close') {

    $followConfirmation.classList.add('hidden');

  }
});
