export function renderImages(images) {
  return images
    .map(
      image => `
      <a href="${image.largeImageURL}" class="gallery__item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
    `
    )
    .join('');
}
