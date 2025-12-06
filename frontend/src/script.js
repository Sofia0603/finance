document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById('burger');
  const commonSidebars = document.querySelectorAll('.common-sidebar');
  const overlay = document.getElementById('overlay');

  burger.addEventListener('click', () => {
    commonSidebars.forEach(item => item.classList.toggle('active'));
    overlay.classList.toggle('active');
    document.body.classList.toggle('noscroll');
  });

  overlay.addEventListener('click', () => {
    commonSidebars.forEach(item => item.classList.remove('active'));
    overlay.classList.remove('active');
    document.body.classList.remove('noscroll');
  });
});
