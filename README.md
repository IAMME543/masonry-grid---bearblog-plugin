# Image Masonry - bearblog-plugin

A very much in development attempt of mine to make myself use bearblog for a photography portfolio by making it easier to mass display images in a nicely spaced grid. 

<hr>

## How does it work? (currently)
I fetch an array of images from a seperate github repository via the api. I then split this array into columns and display everything in a masonry grid.

## Why use bearblog and not litteraly anything else?
Because I can, and I already pay for it.

# How to use it on your own blog
You will need a github repository setup with all of the images you want in the grid in a single folder but not the root.

It is designed for bearblog however it might work on other providers or a self hosting system, test it yourself.

For bearblog however, implementation is quite simple. Just copy and paste the below script into your post or page where you want the masonry grid to be, and replace OWNER, REPO and FOLDER with your github details. By default the script has 3 columns of images but you can change that if you want. 

  <script src="https://cdn.jsdelivr.net/gh/IAMME543/masonry-grid---bearblog-plugin@main/image-masonry.js" data-owner="OWNER" data-repo="REPO" data-folder="FOLDER" data-columns="3"></script>

If anything doesnt work then email me: mirabito.mason@gmail.com
