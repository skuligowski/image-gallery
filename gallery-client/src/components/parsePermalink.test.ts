import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { parsePermalink } from './parsePermalink';

describe('parsePermalink', () => {
    test('should return valid album and image permalink', () => {
        expect(parsePermalink('2022/22/my-album/test.jpg')).toStrictEqual({album: '2022/22/my-album', image: 'test.jpg'});
        expect(parsePermalink('2022/my-album/test.jpg')).toStrictEqual({album: '2022/my-album', image: 'test.jpg'});
        expect(parsePermalink('2022/test.jpg')).toStrictEqual({album: '2022', image: 'test.jpg'});
    });
    test('should return valid album without image', () => {
        expect(parsePermalink('2022/22/my-album')).toStrictEqual({album: '2022/22/my-album', image: undefined});
        expect(parsePermalink('2022/22/')).toStrictEqual({album: '2022/22', image: undefined});
        expect(parsePermalink('2022/')).toStrictEqual({album: '2022', image: undefined});
        expect(parsePermalink('2022')).toStrictEqual({album: '2022', image: undefined});
    });
    test('should return valid album without image, stripping slash at the end', () => {
        expect(parsePermalink('2022/22/my-album/')).toStrictEqual({album: '2022/22/my-album', image: undefined});
    });
    test('should return valid album and image permalink for supported formats', () => {
        expect(parsePermalink('2022/22/my-album/test.jpg')).toStrictEqual({album: '2022/22/my-album', image: 'test.jpg'});
        expect(parsePermalink('2022/22/my-album/test.JPG')).toStrictEqual({album: '2022/22/my-album', image: 'test.JPG'});
        expect(parsePermalink('2022/22/my-album/test.jpeg')).toStrictEqual({album: '2022/22/my-album', image: 'test.jpeg'});
        expect(parsePermalink('2022/22/my-album/test.JPEG')).toStrictEqual({album: '2022/22/my-album', image: 'test.JPEG'});
        expect(parsePermalink('2022/22/my-album/test.png')).toStrictEqual({album: '2022/22/my-album', image: 'test.png'});
        expect(parsePermalink('2022/22/my-album/test.PNG')).toStrictEqual({album: '2022/22/my-album', image: 'test.PNG'});
    });
    test('should return undefined when image has wrong format', () => {
        expect(parsePermalink('2022/22/my-album/test.doc')).toStrictEqual({album: undefined, image: undefined});
    });
    test('should return undefined when image has wrong album', () => {
        expect(parsePermalink('test.png')).toStrictEqual({album: undefined, image: undefined});
        expect(parsePermalink('/test.png')).toStrictEqual({album: undefined, image: undefined});
    });
});
