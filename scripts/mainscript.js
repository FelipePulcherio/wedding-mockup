// Header section
function menuClick() {
  const menuButtons = document.querySelectorAll('a.title');
  menuButtons.forEach((button) => button.classList.remove('clicked'));

  this.classList.add('clicked');
}

const buttons = document.querySelectorAll('a.title');
buttons.forEach( (button) => button.addEventListener('click', menuClick));

// SplideJS section
/*import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';*/

if (document.URL.includes('index')) {
  const Splide = window.Splide;

  const splide = new Splide('.splide', {
    type   : 'loop',
    drag   : 'free',
    focus  : 'center',
    perPage: 3,
    breakpoints: {
      500: {
        perPage: 2,
      },
    },
    autoScroll: {
      speed: 0.4,
    },
  } );

  splide.mount(window.splide.Extensions);
}

// Place.html section
if (document.URL.includes('place')) {
  function routeButton() {
    let place_input = document.getElementById('route');
    console.log(place_input.value);
    const input_array = place_input.value.split(" ");
    let new_array = [];

    for (let i = 0; i < input_array.length; i++) {
      new_array.push(input_array[i]);
      new_array.push("%20");
    }
    new_array.pop();
    new_array = new_array.join("");

    if (place_input.validity.valid && (input_array.length != 0)) {
      window.open(`https://www.google.com/maps?saddr=${new_array}&daddr=49.21523537499222,-122.90742482946524`);   
    }
  }

  let placeButton = document.getElementById("placeButton");
  placeButton.addEventListener("click", routeButton);
}

// Registry.html section
if (document.URL.includes('registry')) { 

  function dropMenuClick() {
    this.classList.toggle('clicked');
    const dropMenu = document.querySelector('.sort-dropdown');
    dropMenu.classList.toggle('clicked');

    const dropDownExit = document.querySelector('.sort-exit');
    dropDownExit.style.visibility = "visible";
    dropDownExit.addEventListener('click', dropMenuExit);
  }

  function dropMenuExit(a, b, c) {
    const dropButton = document.querySelector('.sort-img');
    dropButton.classList.remove('clicked');

    const dropMenu = document.querySelector('.sort-dropdown');
    dropMenu.classList.remove('clicked');

    this.style.visibility = "hidden";
  }

  const dropButton = document.querySelector('.sort-img');
  dropButton.addEventListener('click', dropMenuClick);

  function dropMenuSelect() {
    const dropMenuButtons = document.querySelectorAll('.sort-dropdown > li');
    dropMenuButtons.forEach( (button) => button.classList.remove('selected'));

    this.classList.add('selected');

    const sortValue = document.querySelector('.sort-selection');
    sortValue.innerHTML = this.innerHTML;
  }

  const dropMenuButtons = document.querySelectorAll('.sort-dropdown > li');
  dropMenuButtons.forEach( (button) => button.addEventListener('click', dropMenuSelect));
}