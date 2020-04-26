import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AppService {
    constructor() {}

    public static apiEndpoint(): string {
        return environment.apiEndpoint;
    }

    public static getContactAddress(): string {
        return environment.contactAddress;
    }

    public static getLogoUrl(): string {
        return environment.logoUrl;
    }

    public static getClientInfo(): object {
        return environment.clientInfo;
    }
}
