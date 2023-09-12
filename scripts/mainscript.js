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
  //Dropdown menu (open-close)
  //https://stackoverflow.com/questions/5066925/javascript-only-sort-a-bunch-of-divs
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


  //Dropdown menu (selection)
  function dropMenuSorting(oldSortValue, newSortValue) {

    //Identify which button was pressed. Was it the same?
    if (oldSortValue !== newSortValue) {         
      //Get nodeList of items to sort
      let toSort = document.getElementById('items').children;
      let toSortArray = Array.from(toSort);

      //Remove actual DOM tree
      document.getElementById('items').replaceChildren();

      switch (newSortValue) {
        case "Featured":
          //Paste sorted DOM tree
          sectionItems.replaceChildren(...featuredArray);

          break;
  
        case "Price: Low to High":
          let sortedArray = toSortArray.sort((a, b) => {
            let innerValueA = a.children[2].innerHTML; //Get value
            innerValueA = innerValueA.split("");
            innerValueA.shift();
            innerValueA = 1 * innerValueA.join(""); //Get price from card 'number format'
          
            let innerValueB = b.children[2].innerHTML;
            innerValueB = innerValueB.split("");
            innerValueB.shift();
            innerValueB = 1 * innerValueB.join("");
          
            return innerValueA - innerValueB;
          });

          sectionItems.replaceChildren(...sortedArray);
          
          break;
  
        case "Price: High to Low":
          let sortedArray2 = toSortArray.sort((a, b) => {
            let innerValueA = a.children[2].innerHTML; //Get value
            innerValueA = innerValueA.split("");
            innerValueA.shift();
            innerValueA = 1 * innerValueA.join(""); //Get price from card 'number format'
          
            let innerValueB = b.children[2].innerHTML;
            innerValueB = innerValueB.split("");
            innerValueB.shift();
            innerValueB = 1 * innerValueB.join("");
          
            return innerValueB - innerValueA;
          });

          sectionItems.replaceChildren(...sortedArray2);
          
          break;
      }
    }
  }

  function dropMenuSelect() {
    const dropMenuButtons = document.querySelectorAll('.sort-dropdown > li');
    dropMenuButtons.forEach( (button) => button.classList.remove('selected'));

    this.classList.add('selected');

    const sortValueDiv = document.querySelector('.sort-selection');
    let oldSortValue = sortValueDiv.innerHTML;

    sortValueDiv.innerHTML = this.innerHTML;
    let newSortValue = this.innerHTML;

    dropMenuSorting(oldSortValue, newSortValue);
  }

  //Get registryItems from DOM tree
  const sectionItems = document.getElementById('items');
  //Get snapshot of featured
  const featuredArray = Array.from(document.getElementById('items').children);

  //Add event to detect user selection
  const dropMenuButtons = document.querySelectorAll('.sort-dropdown > li');
  dropMenuButtons.forEach( (button) => button.addEventListener('click', dropMenuSelect));


  // Filter
  function filterPrice() {

    //Check if some filter is already checked
    let price = document.querySelectorAll("[name='price']");
    let priceCheckCount = Array.from(price).filter(x => x.checked === true).length;

    switch (true) {
      case priceCheckCount == 0:
        let cards = document.querySelectorAll('div.card');
        cards.forEach((card) => card.classList.remove('hidden'));
        break;

      case this.value === '0-99':
        if (priceCheckCount > 1 || (priceCheckCount == 1 && !this.checked)) {
          let is99 = document.querySelectorAll('.card.upto99');
          is99.forEach((card) => card.classList.toggle('hidden'));
        } else {
          let not99 = document.querySelectorAll('.card:not(.upto99)');
          not99.forEach((card) => card.classList.toggle('hidden'));
        }
        break;

      case this.value === '100-199':
        if (priceCheckCount > 1 || (priceCheckCount == 1 && !this.checked)) {
          let is199 = document.querySelectorAll('.card.upto199');
          is199.forEach((card) => card.classList.toggle('hidden'));
        } else {
          let not199 = document.querySelectorAll('.card:not(.upto199)');
          not199.forEach((card) => card.classList.toggle('hidden'));
        }
        break;

      case this.value === '200':
        if (priceCheckCount > 1 || (priceCheckCount == 1 && !this.checked)) {
          let is200 = document.querySelectorAll('.card.upto200');
          is200.forEach((card) => card.classList.toggle('hidden'));
        } else {
          let not200 = document.querySelectorAll('.card:not(.upto200)');
          not200.forEach((card) => card.classList.toggle('hidden'));
        }
        break;
    }
  }

  const inputPrice = document.querySelectorAll("[name='price']");
  inputPrice.forEach( (button) => button.addEventListener('click', filterPrice));

  function filterStatus() {

    //Check if some status is already checked
    let status = document.querySelectorAll("[name='status']");
    let statusCheckCount = Array.from(status).filter(x => x.checked === true).length;

    switch (true) {
      case statusCheckCount == 0 || statusCheckCount == 2:
        let cards = document.querySelectorAll('div.card');
        cards.forEach((card) => card.classList.remove('hidden2'));
        break;

      case this.value === 'Available':
        if (!this.checked) {
          let isAvailable = document.querySelectorAll('.card.available');
          isAvailable.forEach((card) => card.classList.add('hidden2'));
        } else {
          let isAvailable = document.querySelectorAll('.card.purchased');
          isAvailable.forEach((card) => card.classList.add('hidden2'));
        }
        break;

      case this.value === 'Purchased':
        if (!this.checked) {
          let notAvailable = document.querySelectorAll('.card.purchased');
          notAvailable.forEach((card) => card.classList.add('hidden2'));
        } else {
          let notAvailable = document.querySelectorAll('.card.available');
          notAvailable.forEach((card) => card.classList.add('hidden2'));
        }
        break;
    }
  }

  const inputStatus = document.querySelectorAll("[name='status']");
  inputStatus.forEach( (button) => button.addEventListener('click', filterStatus));
  
}

// Rsvp.html section
if (document.URL.includes('rsvp')) { 
  //Yes or No check
  function filterAttendance() {

    const guestSection = document.querySelector('.guests');
    
    if (this.value === "no") {
      guestSection.classList.add('hidden');
    } else {
      guestSection.classList.remove('hidden');
    }
  }

  const inputAttendance = document.querySelectorAll("[name='attendance']");
  inputAttendance.forEach( (button) => button.addEventListener('click', filterAttendance));


  // Plus - Minus button
  function plusMinusClick() {

    //Get value
    let value = document.querySelector('.value');
    const guestsContainer2 = document.querySelector('.guests>.container-2');
    const guests = guestsContainer2.parentElement;

    switch (true) {
      case (this.className === "minus"):
        if (value.innerHTML == 0) {
          break;

        } else if ((value.innerHTML == 1)) {
          guests.lastElementChild.classList.add('remove');
          guests.lastElementChild.addEventListener('animationend', function afterHiding() {
            this.parentElement.lastElementChild.classList.remove('remove');
            this.parentElement.lastElementChild.classList.add('hidden');
          }, {once: true});
          value.innerHTML = (1 * value.innerHTML) - 1;
          break;

        } else {
          guests.lastElementChild.addEventListener('animationend', function afterRemoving() {
            this.parentElement.lastElementChild.remove();
          }, {once: true});
          guests.lastElementChild.classList.add('remove');
          value.innerHTML = (1 * value.innerHTML) - 1;
          break;
        }

      case (this.className === "plus"):
        if (value.innerHTML == 0) {          
          guests.lastElementChild.classList.remove('hidden');

        } else {
          guests.append(guests.lastElementChild.cloneNode(true));
        } 
        value.innerHTML = (1 * value.innerHTML) + 1;
        break;
    }

  }

  const plusMinusButton = document.querySelectorAll("#minus-plus");
  plusMinusButton.forEach( (button) => button.addEventListener('click', plusMinusClick));

  }