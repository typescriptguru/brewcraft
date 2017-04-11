import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Image } from './image';
import { User } from './user';
import { CONFIG } from '../common/config';
import { contentHeaders } from '../common/headers';

import { IMAGES } from './mockup-image';


@Injectable()
export class ImageService {

    constructor(public http: Http) {

    }

    handleError(error: any) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getImages(): Promise<Image[]> {
        var url = CONFIG.SERVER_URL + `/images/get`;
        return this.http.get(url)
            .toPromise().then(res => { return res.json().data });
    }

    getImagesByUser(userID: String): Promise<Image[]> {
        var url = CONFIG.SERVER_URL + `/images/get-by-user/${userID}`;
        return this.http.get(url)
            .toPromise().then(res => { return res.json().data });
    }

    saveImage(imageId: String, user: User, image: any, caption: String): Promise<any> {
        var url = CONFIG.SERVER_URL + '/images/save';
        return this.http.post(url, {
            imageId: imageId,
            image: image,
            caption: caption,
            owner: user._id
        }).toPromise().then(res => { return res.json() });
    }

    removeImage(imageId: String): Promise<any> {
        var url = CONFIG.SERVER_URL + '/images/remove/' + imageId;
        return this.http.delete(url, {
            }).toPromise().then(res => { return res.json() });
    }
}
