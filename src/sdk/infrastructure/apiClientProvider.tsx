import fetch from 'node-fetch';
import Authentication from '../../authentication/authentication';

type body = string | ArrayBuffer | ArrayBufferView | NodeJS.ReadableStream | URLSearchParams | FormData | undefined;
export type headersType = {
    'Content-Type'?: string;
    Authorization?: string;
};
export const contentTypes = {
    urlencoded: 'application/x-www-form-urlencoded',
    json: 'application/json'
};
type bodyType = 'JSON' | 'FORM-DATA';

export class ApiClient implements IApiClient {
    private static instance: ApiClient;
    private _baseUrl: string;
    private bodyType: bodyType = 'JSON';
    headers: headersType = {};
    private constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }
    public static getInstance(baseUrl: string): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient(baseUrl);
        }
        return ApiClient.instance;
    }
    public setBodyType(bodyType: bodyType) {
        this.bodyType = bodyType;
    }
    private setAuthorization() {
        if (Authentication.GetToken() && !this.headers.Authorization) this.headers.Authorization = 'Bearer ' + Authentication.GetToken();
    }
    get baseUrl() {
        return this._baseUrl;
    }
    async get(url: string, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'GET' }, resBuffer);
    }

    async post(url: string, body?: body, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'POST', body }, resBuffer);
    }

    async put(url: string, body?: body, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'PUT', body }, resBuffer);
    }

    async delete(url: string, body?: body, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'DELETE', body }, resBuffer);
    }
    async callRequest(url: string, options?: any, resBuffer?: boolean) {
        this.setAuthorization();
        const headers = { ...this.headers };
        if (this.bodyType === 'JSON') headers['Content-Type'] = contentTypes.json;
        const requestOptions = { ...options, headers, credentials: 'include' };
        const response = await fetch(this.mergeUrl(url), requestOptions);
        this.bodyType = 'JSON';
        if (!response.ok) {
            const message = await response.text();
            console.log(message);

            if (response.status !== 401) {
                // Modal.error({
                //     title: 'Oops, something went wrong',
                //     content: 'Brace yourself till we get the error fixed. You may also refresh the page or try again later.',
                //     zIndex: 1011
                // });
            }

            throw {
                message,
                status: response.status
            };
        }
        if (response.url.indexOf('files/download') !== -1 || resBuffer) return response;
        return await response.json();
    }

    //utils

    mergeUrl(url: string) {
        return this._baseUrl + url;
    }
    toFormData(body?: { [key: string]: any }): FormData {
        const formData = new FormData();
        if (!body) return formData;
        Object.keys(body).forEach((key) => formData.append(key, body[key]));
        return formData;
    }
    toURLSearchParams(body?: { [key: string]: any }): URLSearchParams {
        const searchParams = new URLSearchParams();
        if (!body) return searchParams;
        Object.keys(body).forEach((key) => searchParams.append(key, body[key]));
        return searchParams;
    }
}

export interface IApiClient {
    baseUrl: string;
    headers: headersType;
    get: (url: string, resBuffer?: boolean) => Promise<any>;
    post: (url: string, body?: body, resBuffer?: boolean) => Promise<any>;
    put: (url: string, body?: body, resBuffer?: boolean) => Promise<any>;
    delete: (url: string, body?: body, resBuffer?: boolean) => Promise<any>;
    setBodyType: (bodyType: bodyType) => void;
    callRequest(url: string, options?: any): Promise<any>;
    toURLSearchParams(body?: { [key: string]: any }): URLSearchParams;
    toFormData(body?: { [key: string]: any }): FormData;
}
