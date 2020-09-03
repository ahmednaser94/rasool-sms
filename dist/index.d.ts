export interface sendOptions {
    from?: string;
    to: string;
    body: string;
}
export interface constructorOptions {
    username: string;
    password: string;
    from?: string;
}
export default class RasoolSMS {
    private options;
    private uri;
    /**
     * configure class options
     *
     * @param options constructorOptions
     */
    constructor(options: constructorOptions);
    /**
     * Send a SMS content to specific number
     *
     * @method
     * @public
     * @param options sendOptions
     * @returns object
     */
    send(options: sendOptions): Promise<unknown>;
}
