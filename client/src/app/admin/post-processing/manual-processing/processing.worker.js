importScripts('jimp.js');


const resizeModesMapping = {
    'RESIZE_NEAREST_NEIGHBOR': Jimp.RESIZE_NEAREST_NEIGHBOR,
    'RESIZE_BILINEAR': Jimp.RESIZE_BILINEAR,
    'RESIZE_BICUBIC': Jimp.RESIZE_BICUBIC,
    'RESIZE_HERMITE': Jimp.RESIZE_HERMITE,
    'RESIZE_BEZIER': Jimp.RESIZE_BEZIER,
}

function doResize(image, {width, height, mode}) {
    const resizeMode = resizeModesMapping[mode] || Jimp.RESIZE_BILINEAR;
    if (image.bitmap.width > image.bitmap.height) {
        image.resize(width, Jimp.AUTO, resizeMode);
    } else {
        image.resize(Jimp.AUTO, height, resizeMode);
    }
}

function process(image, params) {
    if (params.adjust.exposure !== 0) {
        image.brightness(params.adjust.exposure / 100);
    }
    if (params.adjust.contrast !== 0) {
        image.contrast(params.adjust.contrast / 100);
    }
    if (params.sharpen) {
        const amount = params.sharpen.amount || 0;
        image.convolute(
            [
                [-1*amount, -1*amount, -1*amount], 
                [-1*amount, 8*amount+1, -1*amount], 
                [-1*amount, -1*amount, -1*amount]
            ]
        );
    }
    image.quality(params.export.quality);
}

let resizedImage = undefined;

onmessage=function(event) {
    const params = event.data.params;
    if (!resizedImage 
        || resizedImage.url !== event.data.imageUrl 
        || params.resize && params.resize.mode !== resizedImage.mode) {
        Jimp.read(event.data.imageUrl)
            .then(image => {
                const mode = params.resize?.mode || 'RESIZE_BEZIER';
                doResize(image, {width: 1024, height: 768, mode});
                resizedImage = { url: event.data.imageUrl, image, mode };
                const newImage = image.clone();
                process(newImage, params);
                newImage.getBase64(newImage.getMIME(), (err, src) => {
                    this.postMessage(src);
                })
            })
    } else {
        const image = resizedImage.image.clone();
        process(image, params);
        image.getBase64(image.getMIME(), (err, src) => {
            this.postMessage(src);
        })
    }    
}
