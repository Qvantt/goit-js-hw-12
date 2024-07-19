import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
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
      loader.classList.add('hidden');

      if (data.hits.length === 0) {
        iziToast.info({
          title: 'No images found',
          message: 'Try searching for something else.',
        });
        return;
      }

      const markup = renderImages(data.hits);
      gallery.innerHTML = markup;
      lightbox.refresh();

      if (data.totalHits > perPage) {
        loadMoreBtn.classList.remove('hidden');
      }
    } catch (error) {
      loader.classList.add('hidden');
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    loader.classList.remove('hidden');

    try {
      const data = await fetchImages(query, page, perPage);
      loader.classList.add('hidden');

      const markup = renderImages(data.hits);
      gallery.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();

      if (page * perPage >= data.totalHits) {
        loadMoreBtn.classList.add('hidden');
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        window.scrollBy({
          top:
            document
              .querySelector('.gallery')
              .lastElementChild.getBoundingClientRect().bottom * 2,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      loader.classList.add('hidden');
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  });

  loadMoreBtn.classList.add('hidden');
  loader.classList.add('hidden');
});
