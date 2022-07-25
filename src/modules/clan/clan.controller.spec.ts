import { Test, TestingModule } from '@nestjs/testing';
import { ClanController } from './clan.controller';
import { ClanService } from './clan.service';

describe('ClanController', () => {
  let controller: ClanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClanController],
      providers: [ClanService],
    }).compile();

    controller = module.get<ClanController>(ClanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
