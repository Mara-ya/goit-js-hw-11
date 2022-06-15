import { galleryItems } from './gallery-items.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createImagesMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

function createImagesMarkup(galleryItems) {
    return galleryItems
    .map(({preview, original, description}) => {
        return `
        <li>
        <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
        </li>
        `
    })
    .join('');  
}

var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
})