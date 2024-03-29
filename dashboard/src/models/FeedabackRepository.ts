import httpClient from '@/http';
import apiClient from '@/http/server.json';
import { TFeedback, FeedbackApiClientUrls } from '@/interfaces';

export class FeedbackRepository {
    private readonly url: FeedbackApiClientUrls = apiClient.feedback;

    constructor() {
        this.url;
    }

    async create(type: string, text: string, fingerprint: string, apiKey: string) {
        const params = {
            url: this.url.create,
            payload: {
                data: {
                    type,
                    text,
                    fingerprint,
                    apiKey,
                },
            },
        };
        return httpClient.post(params.url);
    }

    async showFilters(token: string) {
        const params = {
            url: this.url.getFilters,
            payload: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        };
        return httpClient.get(params.url, params.payload).then((response) => response.data);
    }

    async show(token: string, type: TFeedback, limit: number, offset: number) {
        const params = {
            url: this.url.show,
            payload: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    type,
                    limit,
                    offset,
                },
            },
        };
        return httpClient.get(params.url, params.payload).then((response) => response.data);
    }
}
