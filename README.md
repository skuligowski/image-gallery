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

4. Open the browser with url: http://localhost:3000/


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

4. Open the browser with url: http://localhost:4200/


5. Fill missing locales in xls files:

```bash
$ npm run locale
```

## Basic configuration

After the first launch, login to the [administration panel](http://localhost:3000/login).
Configure your gallery name, and library dir - the directory where you store your images.

Now you are ready to manage your photos, compose albums and upload photos to the library!

