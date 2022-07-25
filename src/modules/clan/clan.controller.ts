import { 
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ClanService } from './clan.service';
import { Clan } from '../../schemas/clan.schema';

@Controller('clan')
export class ClanController {
  constructor(private readonly _clanService: ClanService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() body): Promise<Clan>{
    return this._clanService.create(body);
  }
}
