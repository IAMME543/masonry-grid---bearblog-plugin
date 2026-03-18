/*
 Plugin name: image-masonry
 Description: A simple hacky masonry grid that pulls photos from a github repository
 Author: Mason
 Author URI: mason.bearblog.dev, github.com/IAMME543
 */

(function () {
    'use strict';
    const main = document.querySelector('main');

    if (!main || !document.body.classList.contains('blog')) { return }

    const style = document.createElement('style');

    style.textContent = `
    .masonry {
  display: flex;
  flex-direction: row;
  gap: 10px;
  }
  .masonry img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  }

  .masonry img.loaded {
    opacity: 1;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
}`;

    document.head.appendChild(style);

    const script = document.currentScript;

    const owner = script.dataset.owner;
    const repo = script.dataset.repo;
    const folder = script.dataset.folder;
    const columnCount = Number(script.dataset.columns);

    const columns = [];

    let columnHeight = new Array(columnCount).fill(1);


    const container = document.createElement('div');

    container.classList.add('masonry');

    main.appendChild(container);


    Array.from({ length: columnCount }).forEach(col => {

        const column = document.createElement('div');

        column.classList.add('column');

        columns.push(column);

        container.appendChild(column);

    });


    async function fetchImages() {

        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

        try {

            const res = await fetch(apiUrl);
            const data = await res.json();


            // filter for image files

            const urls = data
                .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
                .map(file => file.download_url);



            urls.forEach(url => {
                const img = document.createElement('img');
                img.addEventListener('load', () => {

                    let shortest = columnHeight.indexOf(Math.min(...columnHeight));

                    //console.log(columnHeight[0] + ", " + columnHeight[1] + ", " + columnHeight[2])

                    columns[shortest].appendChild(img);
                    columnHeight[shortest] += img.getBoundingClientRect().height;

                    //console.log("url: " + url + " shortest: " + shortest + " height: " + columnHeight[shortest])

                    img.classList.add('loaded');

                });
                img.src = url;
                img.alt = url;
            })

        } catch (err) {

            console.error("Error fetching images:", err);
            container.innerHTML = "<p>Failed to load images.</p>";

        }

    }


    addEventListener("DOMContentLoaded", (event) => fetchImages())


})();
