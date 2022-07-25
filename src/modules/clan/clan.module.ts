import { Module } from '@nestjs/common';
import { ClanService } from './clan.service';
import { ClanController } from './clan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clan, ClanSchema } from '../../schemas/clan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clan.name, schema: ClanSchema }])
  ],
  controllers: [ClanController],
  providers: [ClanService]
})
export class ClanModule {}
