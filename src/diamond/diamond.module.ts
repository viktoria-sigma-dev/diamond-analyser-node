import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiamondController } from './diamond.controller';
import { DiamondService } from './diamond.service';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';

@Module({
  controllers: [DiamondController],
  providers: [DiamondService],
  imports: [ConfigModule.forRoot(), CacheManagerModule],
})
export class DiamondModule {}
