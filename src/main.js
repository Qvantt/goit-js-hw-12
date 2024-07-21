import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
const perPage = 15;
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page, perPage);
    const markup = renderImages(data.hits);
    gallery.innerHTML = markup;
    lightbox.refresh();

    if (data.totalHits > perPage) {
      loadMoreBtn.classList.remove('hidden');
    }
    loader.classList.add('hidden');
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page, perPage);
    const markup = renderImages(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
    loader.classList.add('hidden');
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
    loader.classList.add('hidden');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadMoreBtn.classList.add('hidden');
  loader.classList.add('hidden');
});
