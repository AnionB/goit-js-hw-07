import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryEl = document.querySelector('.gallery');

createGallery();

function createGallery() {
  const imgsHTML = galleryItems
    .map(
      ({ preview, description, original }) =>
        ` <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`,
    )
    .join('');

  galleryEl.insertAdjacentHTML('afterbegin', imgsHTML);
}
galleryEl.addEventListener('click', onImgClick);
function onImgClick(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  evt.preventDefault();

  openModalImg(evt);

  return;
}
function openModalImg(e) {
  const opt = {
    onShow: () => document.addEventListener('keydown', onEscapePress),
    onClose: () => document.removeEventListener('keydown', onEscapePress),
  };
  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}" width="800" height="600">`,
    opt,
  );

  instance.show();

  function onEscapePress(evt) {
    if (evt.key !== 'Escape') {
      return;
    }
    instance.close();
  }
}
