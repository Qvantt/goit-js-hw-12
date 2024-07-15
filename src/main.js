import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let query = '';
let page = 1;
const perPage = 15;
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(query, page, perPage);
    const markup = renderImages(data.hits);
    gallery.innerHTML = markup;
    new SimpleLightbox('.gallery a').refresh();

    if (data.totalHits > perPage) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);
    const markup = renderImages(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    new SimpleLightbox('.gallery a').refresh();

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      alert("We're sorry, but you've reached the end of search results.");
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
    console.error('Error fetching images:', error);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadMoreBtn.classList.add('hidden');
});
