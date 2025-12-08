import {Login} from '../src/components/auth/login.js'




document.addEventListener("DOMContentLoaded", () => {

  new Login()


  const burger = document.getElementById('burger');
  const commonSidebars = document.querySelectorAll('.common-sidebar');
  const overlay = document.getElementById('overlay');

  if (burger) {
    burger.addEventListener('click', () => {
      commonSidebars.forEach(item => item.classList.toggle('active'));
      overlay.classList.toggle('active');
      document.body.classList.toggle('noscroll');
    });
  }
  if(overlay) {
    overlay.addEventListener('click', () => {
      commonSidebars.forEach(item => item.classList.remove('active'));
      overlay.classList.remove('active');
      document.body.classList.remove('noscroll');
    });
  }
});
