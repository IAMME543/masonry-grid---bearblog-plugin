
  const owner = "IAMME543"; // replace with your GitHub username
  const repo = "photography"; // replace with repo name
  const folder = "firstroll"; // replace with folder containing images

  const columncount = 3; // or replace with how many columns you want
  const columns = [];

  const container = document.getElementById('imageMasonry');

  

  Array.from({ length: columncount }).forEach(col => {
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
