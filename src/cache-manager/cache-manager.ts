import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheManager {
  private readonly defaultTtl = 15 * 60 * 1000; // 15 minutes

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getAsync<T>(key: string): Promise<T | null> {
    const value: string = await this.cacheManager.get(key);

    return value ? (JSON.parse(value) as T) : null;
  }

  async setAsync<T>(
    key: string,
    value: T,
    ttl = this.defaultTtl,
  ): Promise<void> {
    await this.cacheManager.set(key, JSON.stringify(value), ttl);
  }

  async deleteAsync(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
