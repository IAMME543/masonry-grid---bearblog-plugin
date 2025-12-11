
  const owner = "IAMME543"; // replace with your GitHub username
  const repo = "photography"; // replace with repo name
  const folder = "firstroll"; // replace with folder containing images

  const container = document.getElementById('imageGrid');

  async function fetchImages() {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;
    
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      // filter for image files
      const urls = data
        .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
        .map(file => file.download_url);

      // inject images
      urls.forEach(url => {
        const cell = document.createElement('div');
        cell.classList.add('gridcell');

        const img = document.createElement('img');
        img.src = url;
        img.loading = 'lazy'; // native lazy loading
        img.alt = url; // optional
        // fade-in effect when image loads
        img.addEventListener('load', () => img.classList.add('loaded'));
        cell.appendChild(img);
        container.appendChild(cell);
      });
    } catch (err) {
      console.error("Error fetching images:", err);
      container.innerHTML = "<p>Failed to load images.</p>";
    }
  }

  fetchImages();
