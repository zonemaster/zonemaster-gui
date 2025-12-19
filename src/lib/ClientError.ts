export class ClientError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly data?: any,
    ) {
        super(message);

        this.name = this.constructor.name;
    }
}
