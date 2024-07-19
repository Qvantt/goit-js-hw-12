export function renderImages(images) {
  return images
    .map(
      image => `
        <div class="gallery__item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
        </div>
      `
    )
    .join('');
}
