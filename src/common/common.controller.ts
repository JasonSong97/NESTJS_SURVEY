import { Controller } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('common')
@ApiTags('공통 API')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
}
