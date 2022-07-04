import './css/styles.css';

import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchCountries from './fetchCountries';

var debounce = require('lodash.debounce');

const refs ={
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchCounry, DEBOUNCE_DELAY));

function searchCounry(e){
    const searchQuery = e.target.value.trim();
    if(!searchQuery){
        return;
    }
    fetchCountries(searchQuery)
    .then(response => processingRequest(response))
    .catch(err => {error()});
}

function error(){
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    Notify.failure('Oops, there is no country with that name');
}

function processingRequest(data){
    muchMathes(data);
    outputCountriesList(data);
    outputCountryCard(data);
}

function muchMathes(data){
    if(data.length > 10){
        refs.countryList.innerHTML = '';
        Notify.info('Too many matches found. Please enter a more specific name.');
    }
}

function outputCountriesList(data) {
    if(data.length <= 10 && data.length > 1){
        const markup = markupCountryList(data).join('');
        refs.countryList.innerHTML = markup;
        refs.countryInfo.innerHTML = '';
    }
}

function outputCountryCard(data){
    if (data.length === 1){
        const markup = markupCountryCard(data).join('');
        refs.countryInfo.innerHTML = markup;
        refs.countryList.innerHTML = '';
    }
}

const markupCountryList = countries => {
    return countries
    .map(({ name, flags }) =>
    `<li><img src="${flags.svg}" alt="${name.official}" width="20">${name.official}</li>`
    );
};

const markupCountryCard = country => {
    return country
    .map(({ name, capital, population, flags, languages }) =>
    `<h1><img src="${flags.svg}" alt="${name.official}" width="30">${name.official}</h1>
    <p><span>Capital:</span> ${capital}</p>
    <p><span>Population:</span> ${population}</p>
    <p><span>Languages:</span> ${Object.values(languages)}</p>`
    );
};