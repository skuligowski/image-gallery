# Image Gallery

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

Image Gallery does not require any database or native graphic modules (eg. ImageMagick).
It simply works after the installation.

## Prerequisites

[NodeJS](https://nodejs.org/en/download/)

## Installation

1. Download the latest version of the gallery: [v0.4.0](https://github.com/skuligowski/image-gallery/releases/download/v0.4.0/v0.4.0.zip)

2. Unzip it somewhere and type:

```bash
$ npm install
```

3. Finally run the gallery:

```bash
$ node server
```

6. Open url http://localhost:3000/login in your browser and log in as an administrator using login: `admin`, pass: `1234`.

Configure your gallery name, and library dir - the directory where you store your images.
Now you are ready to manage your photos, compose albums and upload photos to the library!

## Contribution

1. Clone the repository of Image Gallery:

```bash
$ git clone git@github.com:skuligowski/image-gallery.git
```

2. Install dependencies:

```bash
$ npm install
```

3. Run

```bash
$ npm start
```

4. Open url http://localhost:4200/ in your browser.


5. Generate empty i18n transaltions using the command below and fill them in manually.

```bash
$ npm run locale
```

## Manual production build

1. Build the gallery for production use:

```bash
$ npm run build
```

2. Prepare a distribution pacakge:

```bash
$ npm run dist:make
```

The distribution package will be created in `dist` directory.

3. Go to `dist` and install all npm packages

```bash
$ npm install
```

4. Run the gallery:

```bash
$ node server.js
```

## Release notes

### 1.0.0 (not released yet)
- Angular upgrade to 13.x
- PrimeNg upgrade to 13.x
- NodeJs min version: 12+
- IE11 support dropped: ([read it here](https://github.com/angular/angular/issues/41840))
- bug fixes