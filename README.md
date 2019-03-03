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

Image Gallery do not require any database or native graphic modules (eg. ImageMagick).
It simply works after the installation.

## Installation

1. Download the latest version of the gallery: [v0.3.0](https://github.com/skuligowski/image-gallery/releases/download/v0.3.0/v0.3.0.zip)

2. Unzip it somewhere and type:


```bash
$ npm install
```

3. Finally run the gallery:

```bash
$ node server
```

## Basic configuration

After the first launch, login to the [administration panel](http://localhost:3000/login).
Configure your gallery name, and library dir - the directory where you store your images.

Now you are ready to manage your photos, compose albums and upload photos to the library!

