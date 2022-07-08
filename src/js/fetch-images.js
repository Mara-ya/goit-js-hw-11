import axios from 'axios';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const KEY = '28483703-9dd8ef4760e0b74e4f0efe123';
const BASE_URL = `https://pixabay.com/api/?key=${KEY}&`;

export default class ImagesApiService {
  constructor(){
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages(){
    try {
      const response = await axios.get(`${BASE_URL}q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
      return response.data
    } catch (error) {
      Notify.info(`We're sorry, but you've reached the end of search results.`)
    }
  }

  incrementPage() {
    ++this.page;
  }

  resetPage(){
    this.page = 1;
  }

  get query(){
    return this.searchQuery;
  }

  get nowPage(){
    return this.page;
  }

  set query(newQuery){
    this.searchQuery = newQuery;
  }
}
