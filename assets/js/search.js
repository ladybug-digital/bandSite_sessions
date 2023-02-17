import Fuse from 'fuse.js';
import * as params from '@params';

const searchBox = document.querySelector('#search input');
const searchResults = document.getElementById('searchResults');
const RESULTS_NUM = 5;

const search = async () => {
    try {
        let response = await window.fetch(params.MUSIC_URL + 'index.json');
            if (!response.ok) {
                return;
            }
            let data = await response.json();
            
            const options = {
                threshold: 0.3,
                ignoreLocation: true,
                keys: ['title', 'url', 'content', 'cover']
            }

            const fuseIndex = Fuse.createIndex(options.keys, data);
            index = new Fuse(data, options, fuseIndex);

            document.querySelector('#search input')?.addEventListener('input', showResult);
            document.addEventListener('keydown', searchBoxFocus);

    } catch (error) {
        console.log(error);
    }
}

const showResult = (event) => {
    const results = index.search(searchBox.value).slice(0, RESULTS_NUM);
    if (results.length > 0) {
        searchResults.innerHTML = results.map((el) => {
            if (el.item.cover) {
                return `<div>
                            <a href="${el.item.url}">
                            <b>${el.item.title}</b>
                            <img src="${el.item.cover}" width="40" height="40">
                            </a>
                        </div>`
            } else {
                return `<div>
                            <a href="${el.item.url}">
                            <b>${el.item.title}</b>
                            </a>
                        </div>`
            }
        }).join('');
    } else {
        searchResults.innerHTML = '';
    }
}

const searchBoxFocus = (event) => {
    const removeAllResults = (parent) => {
        while (parent.firstElementChild) {
            parent.removeChild(parent.firstElementChild);
        }
    }
    if (event.ctrlKey && event.key === '/') {
        searchBox?.focus();
    } else if (event.key == 'Escape' && searchBox) {
        searchBox.value = '';
        removeAllResults(searchResults);
        searchBox?.blur();
    }
}

search();