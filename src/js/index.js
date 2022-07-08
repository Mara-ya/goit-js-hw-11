import '../css/styles.css';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ImagesApiService from './fetch-images';

let lightbox;

const refs ={
    searchForm: document.querySelector('.search-form'),
    imagesList: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}
const imagesApiService = new ImagesApiService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
window.addEventListener('scroll', infiniteScroll);

function infiniteScroll() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        onLoadMore();
    }
}

function onSearch(e) {
    e.preventDefault();
    imagesApiService.query = e.currentTarget.elements.searchQuery.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages()
    .then(response => {
        cleanMarkup();
        if (response.total == 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return
        }
            appendMarkup(response.hits);
            lightbox = new SimpleLightbox('.gallery a').refresh();       
            Notify.info(`Hooray! We found ${response.totalHits} images.`);
        });

}

function onLoadMore(e) {
    imagesApiService.incrementPage();
    imagesApiService.fetchImages()
    .then(response => {
        if(!response){
            return
        }
        appendMarkup(response.hits);
        lightbox = new SimpleLightbox('.gallery a').refresh();
        smothScroll();
    });
}

function smothScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function appendMarkup(hits) {
    refs.imagesList.insertAdjacentHTML('beforeend', createMarkup(hits).join(''));
}

function cleanMarkup() {
    refs.imagesList.innerHTML = '';  
}

function createMarkup(data) {
    return data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
            <a href="${largeImageURL}">
                <img class="card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                </p>
            </div>
        </div>`});
}