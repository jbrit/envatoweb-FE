const button = document.querySelector('.navbar-toggler'),
      close = document.querySelector('.close'),
      sidebar = document.querySelector('.sidebar');
  button.addEventListener('click', (e) => {
    sidebar.classList.toggle('show');
  })
  close.addEventListener('click', (e) => {
    sidebar.classList.toggle('show');
  })