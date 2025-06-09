import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollToNextGroup,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.elements['search-text'];
const loadMoreBtn = document.querySelector('.load-more-button');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 15; // Кількість зображень на сторінці, згідно з ТЗ

// Приховуємо кнопку "Load more" та лоадер при завантаженні сторінки
hideLoadMoreButton();
hideLoader();

searchForm.addEventListener('submit', async event => {
  event.preventDefault(); // Запобігаємо стандартній відправці форми

  currentQuery = searchInput.value.trim(); // Отримуємо пошуковий запит та видаляємо зайві пробіли
  if (!currentQuery) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
      backgroundColor: 'rgba(255, 193, 7, 0.8)',
      maxWidth: '432px',
      minHeight: '88px',
      padding: '20px',
    });
    searchInput.value = '';
    return;
  }
  currentPage = 1; // Скидаємо номер сторінки для нового пошуку
  totalHits = 0; // Скидаємо загальну кількість знайдених зображень

  clearGallery(); // Очищаємо галерею перед новим пошуком
  hideLoadMoreButton(); // Приховуємо кнопку "Load more"
  showLoader(); // Показуємо лоадер

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      // Якщо бекенд повернув порожній масив
      iziToast.error({
        // title: 'Error',
        message:
          'Sorry, there are no images matching your search query.<br>Please try again!',
        position: 'topRight',
        backgroundColor: 'rgba(239, 64, 64, 0.8)',
        maxWidth: '432px',
        minHeight: '88px',
        padding: '20px',
        html: true,
      });
    } else {
      // Якщо знайдені зображення
      createGallery(data.hits);

      // Перевіряємо, чи є ще зображення для завантаження
      if (totalHits > currentPage * perPage) {
        showLoadMoreButton();
      } else {
        // Якщо колекція закінчилася на першій сторінці
        iziToast.info({
          // title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          backgroundColor: 'rgba(76, 175, 80, 0.8)',
          maxWidth: '432px',
          minHeight: '88px',
          padding: '20px',
          color: '#ffffff',
          html: true,
        });
        hideLoadMoreButton();
      }
    }
  } catch (error) {
    // Обробка помилок HTTP-запиту
    iziToast.error({
      title: 'Error',
      message:
        error.message ||
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
      backgroundColor: 'rgba(239, 64, 64, 0.8)',
      maxWidth: '432px',
      minHeight: '88px',
      padding: '20px',
    });
  } finally {
    hideLoader(); // Приховуємо лоадер незалежно від результату
    searchForm.reset(); // Очищаємо форму після пошуку
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1; // Збільшуємо номер сторінки

  hideLoadMoreButton(); // Приховуємо кнопку "Load more"
  showLoader(); // Показуємо лоадер

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits); // Додаємо нові зображення до існуючої галереї
    scrollToNextGroup(); // Прокручуємо сторінку

    // Перевіряємо, чи є ще зображення для завантаження
    if (totalHits > currentPage * perPage) {
      showLoadMoreButton();
    } else {
      // Якщо колекція закінчилася
      iziToast.info({
        //  title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        maxWidth: '432px',
        minHeight: '88px',
        padding: '20px',
        color: '#ffffff',
        html: true,
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        error.message ||
        'An error occurred while loading more images. Please try again later.',
      position: 'topRight',
      backgroundColor: 'rgba(239, 64, 64, 0.8)',
      maxWidth: '432px',
      minHeight: '88px',
      padding: '20px',
    });
  } finally {
    hideLoader(); // Приховуємо лоадер
  }
});
