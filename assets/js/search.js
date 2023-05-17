import Fuse from 'fuse.js';
import * as params from '@params';

const searchBox = document.querySelector('#search input');
const searchResults = document.getElementById('searchResults');
const searchDropdown = document.getElementById('searchResults');
const RESULTS_NUM = 50;

const search = async () => {
    try {
        let response = await window.fetch(params.PATH);
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
            document.addEventListener('keydown', searchHandler);
            document.addEventListener('click', searchHandler);

    } catch (error) {
        console.log(error);
    }
}

const showResult = (event) => {
    const results = index.search(searchBox.value).slice(0, RESULTS_NUM);
    if (results.length > 0) {
        searchResults.innerHTML = results.map((el) => {
            if (el.item.cover) {
                return `<li class="flex flex-col w-full">
                            <a href="${el.item.url}">
                                <div class="grid min-h-[50px] card rounded-box place-items-center"
                                    style="background-image: url(${el.item.cover})">
                                    <p class="md:text-xl text-white font-bold p-2 m-2
                                        bg-black bg-opacity-20 backdrop-blur-3xl rounded-2xl">${el.item.title}</p>
                                </div> 
                            </a>
                        </li>
                        <div class="divider"></div>`
            } else {
                return `<li class="flex flex-col w-full">
                            <a href="${el.item.url}">
                                <div class="grid min-h-[50px] card rounded-box place-items-center bg-primary">
                                    <p class="md:text-xl font-bold p-2 m-2">${el.item.title}</p>
                                </div> 
                            </a>
                            <div class="divider"></div>
                        </li>`
            }
        }).join('');
    } else {
        searchResults.innerHTML = '';
    }
}

const searchHandler = (event) => {
    const removeAllResults = (parent) => {
        while (parent.firstElementChild) {
            parent.removeChild(parent.firstElementChild);
        }
    }
    if (event.type == 'click') {
        if (event.target.id && event.target.id == 'input_search') {
            searchDropdown.setAttribute('style', 'visibility: visible;');
        } else {
            searchBox.value = '';
            removeAllResults(searchResults);
            searchBox?.blur();
            searchDropdown.setAttribute('style', 'visibility: hidden;');
        }
    } else if (event.type == 'keydown') {
        if (event.ctrlKey && event.key === '/') {
            searchBox?.focus();
            searchDropdown.setAttribute('style', 'visibility: visible;');
        } else if (event.key == 'Escape' && searchBox) {
            searchBox.value = '';
            removeAllResults(searchResults);
            searchBox?.blur();
            searchDropdown.setAttribute('style', 'visibility: hidden;');
        }
    }
}

search();