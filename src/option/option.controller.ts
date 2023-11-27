import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Member } from 'src/user/decorator/user.decorator';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('api/option')
@ApiTags('옵션 API')
export class OptionController {

  constructor(private readonly optionService: OptionService) {}

  /**
   * 옵션 전체 조회
   */
  @Get('all')
  @ApiOperation({ summary: '옵션 전체 조회 API', description: '옵션 전체를 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  getOptions() {
    return this.optionService.getOptions();
  }
  
  /**
   * 특정 옵션 조회
   */
  @Get(':optionId')
  @ApiOperation({ summary: '특정 옵션 조회 API', description: '특정 옵션을 조회한다.' })
  @ApiOkResponse({description: 'Success',})
  @ApiParam({ name: 'optionId', description: '옵션의 id' })
  getOption(
    @Param('optionId', ParseIntPipe) optionId: number
  ) {
    return this.optionService.getOption(optionId);
  }

  /**
   * 옵션 생성
   */
  @Post()
  @ApiOperation({ summary: '옵션 생성 API', description: '옵션을 생성한다.' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  postOption(
    @Body() body: CreateOptionDto,
  ) {
    return this.optionService.postOption(body);
  }

  /**
   * 특정 옵션 수정
   */
  @Patch(':optionId')
  @ApiOperation({ summary: '특정 옵션 수정 API', description: '특정 옵션을 수정한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'optionId', description: '옵션의 id' })
  @UseGuards(AccessTokenGuard)
  patchOption(
    @Member('id') userId: number,
    @Param('optionId', ParseIntPipe) optionId: number, 
    @Body() body: UpdateOptionDto,
  ) {
    return this.optionService.patchOption(optionId, body);
  }

  /**
   * 특정 옵션 삭제
   */
  @Delete(':optionId')
  @ApiOperation({ summary: '특정 옵션 삭제 API', description: '특정 옵션을 삭제한다.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'optionId', description: '옵션의 id' })
  @UseGuards(AccessTokenGuard)
  deleteOption(
    @Member('id') userId: number,
    @Param('optionId', ParseIntPipe) optionId: number
  ) {
    return this.optionService.deleteOption(optionId);
  }
}