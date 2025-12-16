  const totalImages = 100;

const style = document.createElement('style');
  style.textContent=`.masonry {
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

  const columncount = script.dataset.columns;
  const columns = [];

  const main = document.querySelector('main');

  const container = document.createElement('div');
  container.classList.add('masonry');
  main.appendChild(container);
  

  Array.from({ length: columncount }).forEach(col => {
    const column = document.createElement('div');
    column.classList.add('column');
    columns.push(column);
    container.appendChild(column);
  });

  /* async function fetchImages() {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;
    
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      
      // filter for image files
      const urls = data
        .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
        .map(file => file.download_url);  */

      const urls = [];

      for(let i = 0; i < totalImages; i++) {
        let w = Math.floor(Math.random() * 1000);
        let h = Math.floor(Math.random() * 1000);
        urls.push(`https://picsum.photos/${w}/${h}`);
      }


      // split url array into columns
      const columnlength = Math.ceil(urls.length / columncount);
      for (let i = 0; i < columncount; i++) {
        const start = i * columnlength;
        const end = start + columnlength;

        // inject images
        urls.slice(start, end).forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.loading = 'lazy'; // native lazy loading
          img.alt = url; // optional
          // fade-in effect when image loads
          img.addEventListener('load', () => img.classList.add('loaded'));
          columns[i].appendChild(img);

        });
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      container.innerHTML = "<p>Failed to load images.</p>";
    }
  }


  fetchImages();
