import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheManager } from './cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [CacheManager],
  exports: [CacheManager],
})
export class CacheManagerModule {}
