# Image Gallery


## About

Image Gallery is a free and open source web gallery, that you can very easily install on your Raspberry Pi, any server that supports *NodeJs* or Heroku.

It contains fully featured administration panel that supports:
- library of images
- multiple files upload
- composing albums from library images
- generating thumbnails
- custom gallery name
- authentication
- RWD for any device (mobile, tablet, desktop)
- multi-language support
- dashboard tiles with entry image
- custom permalinks for photos
- date grouping
- allowing to download image
- batch images processing (resize and keep aspect ratio, sharpen, export with quality)

Image Gallery does not require any database or native graphic modules (eg. ImageMagick).
It simply works after the installation.



## Installation (Docker)

The best way to install `image-gallery` on your Raspberry Pi is to use Docker container environment. This setup assumes that you already have an operating system setup and a container runtime installed (like Docker).

Installation with Docker is straightforward.

1\. Create a directory in you home dir for gallery database (`mkdir ~/gallery_db`).

2\. Create a directory for your images (or you may already have it on your external drive attached to Raspberry Pi).

3\. Adjust following command to reflect previously created directories:

```
docker run -d \
    --name gallery \
    --restart=unless-stopped \
    -v /home/pi/gallery_db:/app/resources/db \
    -v /media/hdd/images:/app/resources/library \
    -p 80:3000 \
    skuligowski/image-gallery:1.1.1
```

You may also modify the external port (*80*), to expose library using your favorite one.

4\. Open url http://localhost:3000/login in your browser and log in as an administrator using:

```
login: admin
pass: 1234
```

Configure your gallery name, and library dir - the directory where you store your images.
Now you are ready to manage your photos, compose albums and upload photos to the library!

## Installation (Node)

The other valid approach is to download the latest zip pacakge and manually install the application.
The only requirement is to have [NodeJS 12.x+](https://nodejs.org/en/download/) isntalled in your systemn.

1\. Download the latest released version of the gallery: [v1.1.1](https://github.com/skuligowski/image-gallery/releases/download/v1.1.1/v1.1.1.zip)

2\. Unzip it somewhere and type: `npm install` 

3\. Run gallery with the following command, passing initialization parameters:

```bash
$ node server --dbDir /home/pi/gallery_db --libraryDir /media/hdd/images --port 80
```

4\. Open url http://localhost:3000/login in your browser and log in as an administrator using:

```
login: admin
pass: 1234
```

Configure your gallery name, and library dir - the directory where you store your images.
Now you are ready to manage your photos, compose albums and upload photos to the library!


## Contribution

1\. Clone the repository of Image Gallery:

   ```bash
   $ git clone git@github.com:skuligowski/image-gallery.git
   ```

2\. Install dependencies `npm install`

3\. Run `npm start` to run application in developer mode

4\. Open url http://localhost:4200/ in your browser.

5\. In case you would like to provide new translations to the gallery, generate empty i18n transaltions using the command below and fill them in manually.

```bash
$ npm run locale
```


## Manual production build

1\. Build the gallery for production executing `npm run build`

2\. Prepare a distribution pacakge `npm run dist:make`

The distribution package will be created in `dist` directory.

3\. Go to `dist` and install all npm packages: `npm install`

4\. Run the gallery: `node server.js`


## Release notes

### 1.1.1
- fix: allows to use spaces in library dirs

### 1.1.0
 - feat: Batch image processing (resize, sharpen, export)
 - feat: Progress bars for intensive tasks
 - feat: Library images preview and selector mode
 - fix: many fixes in the admin

### 1.0.0 
 - Angular upgrade to 13.x
 - PrimeNg upgrade to 13.x
 - NodeJs min version: 12+
 - IE11 support dropped: ([read it here](https://github.com/angular/angular/issues/41840))
 - bug fixes
 - Docker installation method
