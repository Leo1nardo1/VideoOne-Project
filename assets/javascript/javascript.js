document.addEventListener('DOMContentLoaded', function () {
  //Seção da direita
  const categoryList = document.getElementById('categoryList');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  //sidebar
  const menuButtons = document.querySelectorAll(".menu-button");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  //Descrição 
  const seeMoreBtn = document.querySelector('.see-more');
  const seeLessBtn = document.querySelector('.see-less');
  const videoDescription = document.querySelector('.video-description');
  const viewsTime = document.querySelector('.views-time');



  // Função para travar o body scroll
  function toggleBodyScroll(preventScroll) {
    //Se a ativação do sidebar for verdadeira, atribui os valores a body tag
    if (preventScroll) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  // Ativa sidebar quando menu é clicado
  menuButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpening = document.body.classList.contains('sidebar-hidden');
      document.body.classList.toggle("sidebar-hidden");

      toggleBodyScroll(isOpening);
    });
  });

  // Fecha sidebar ao clicar no overlay
  overlay.addEventListener("click", () => {
    document.body.classList.add("sidebar-hidden");
    toggleBodyScroll(false);
  });

  // Previne que clicks dentro do sidebar o fechem
  sidebar.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Sidebar inicializa como escondido para desktops
  if (window.innerWidth > 300) {
    document.body.classList.add("sidebar-hidden");
  }

  //Expande descrição e muda a data no titulo da descrição

  const originalText = '3,7 mi de visualizações há 11 anos';
  const expandedText = '3,7 mi de visualizações 13 de jan. de 2014';

  seeMoreBtn.addEventListener('click', () => {
    videoDescription.classList.add('expanded');
    seeMoreBtn.style.display = 'none';
    seeLessBtn.style.display = 'block';
    viewsTime.textContent = expandedText;
  });

  seeLessBtn.addEventListener('click', () => {
    videoDescription.classList.remove('expanded');
    seeMoreBtn.style.display = 'inline';
    seeLessBtn.style.display = 'none';
    viewsTime.textContent = originalText;
  });

  //Quantidade de rolagem nas categorias da seção na direita
  const scrollAmount = 200;

  // Next button click
  nextBtn.addEventListener('click', function () {
    categoryList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Previous button click 
  prevBtn.addEventListener('click', function () {
    categoryList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Mostra ou esconde os botões baseado na posição da rolagem
  function updateButtonVisibility() {
    const isAtStart = categoryList.scrollLeft === 0;
    const isAtEnd = categoryList.scrollLeft + categoryList.clientWidth >= categoryList.scrollWidth - 5;

    prevBtn.style.display = isAtStart ? 'none' : 'block';
    nextBtn.style.display = isAtEnd ? 'none' : 'block';
  }

  // Checa a posição do botão inicialmente e durante scroll
  updateButtonVisibility();
  categoryList.addEventListener('scroll', updateButtonVisibility);

  // Faz com que botões mudem de cor para cada categoria clicada
  const categoryButtons = document.querySelectorAll('.category-button');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

});





