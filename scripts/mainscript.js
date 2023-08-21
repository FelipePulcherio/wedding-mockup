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

const Splide = window.Splide;

const splide = new Splide('.splide', {
  type   : 'loop',
  drag   : 'free',
  focus  : 'center',
  perPage: 3,
  autoScroll: {
    speed: 0.4,
  },
} );

splide.mount(window.splide.Extensions);

