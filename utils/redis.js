import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.error('Redis Client Error', err));
        this.client.connect();
    }

    isAlive() {
        return this.client.isReady;
    }

    async get(key) {
        return this.client.get(key);
    }

    async set(key, value, duration) {
        await this.client.setEx(key, duration, value);
    }

    async del(key) {
        await this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;
