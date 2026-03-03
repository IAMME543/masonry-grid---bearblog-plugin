/* 
    Image masonry plugin for bearblog: to display a collection of images hosted in a github repository in a fake masonry grid

    Put all images in a single folder in your repository and ensure that it is public. 

    Made by Mason. mason.bearblog.dev

*/
(function () {

    const style = document.createElement('style');
    style.textContent = `
    :root {
    --totalImages: 24;
    }

    .masonry {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    max-height: calc(var(--totalImages, 24) / 2.5 * 200px);
    max-width: 33vw;
    }

  .masonry img {
    width: 50%;
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

    const main = document.querySelector('main');

    const container = document.createElement('div');
    container.classList.add('masonry');
    main.appendChild(container);


    async function fetchImages() {
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

        try {
            const res = await fetch(apiUrl);
            if (!res.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await res.json();


            // filter for image files
            const urls = data
                .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
                .map(file => file.download_url);
            
            document.documentElement.style.setProperty("--totalImages", urls.length)
            console.log("Total Images: " + urls.length)
                urls.forEach(url => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.loading = 'lazy';
                    img.alt = url;
                    // fade-in effect when image loads
                    img.addEventListener('load', () => img.classList.add('loaded'));
                    container.appendChild(img);

                });
        } catch (err) {
            container.innerHTML = "<p>Failed to load images.</p>";
            throw new Error(`Error fetching images: ${err}`);
        }
    }

    fetchImages();
})();
