export function renderImages(images) {
  return images
    .map(
      image => `
        <div class="photo-card">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          </a>
          <div class="stats">
            <p class="stats-item">
              <b>Likes:</b> ${image.likes}
            </p>
            <p class="stats-item">
              <b>Views:</b> ${image.views}
            </p>
            <p class="stats-item">
              <b>Comments:</b> ${image.comments}
            </p>
            <p class="stats-item">
              <b>Downloads:</b> ${image.downloads}
            </p>
          </div>
        </div>`
    )
    .join('');
}
