import throttle from "lodash.throttle";
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const player = new Player(document.querySelector('iframe'));

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate (evt) {
        localStorage.setItem(STORAGE_KEY, evt.seconds);
};

if (localStorage.getItem(STORAGE_KEY)){
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
}