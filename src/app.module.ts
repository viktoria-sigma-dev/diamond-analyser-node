import { Module } from '@nestjs/common';
import { DiamondModule } from './diamond/diamond.module';

@Module({
  imports: [DiamondModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
