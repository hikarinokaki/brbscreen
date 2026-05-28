import tmi from 'tmi.js';

export class ChatReader {
    #client;

    constructor(channel, onCommand) {
        if (!channel) return;
        this.#client = new tmi.Client({ channels: [channel] });
        this.#client.connect();
        this.#client.on('message', (channel, tags, message, self) => {
            if (message.toLowerCase().startsWith('!throw')) {
                onCommand(message);
            }
        });
    }

    disconnect() {
        if (this.#client) {
            this.#client.disconnect();
        }
    }
}
