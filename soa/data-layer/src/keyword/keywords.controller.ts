import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';

@Controller('keywords')
export class KeywordsController {
  constructor(private readonly keywordsService: KeywordsService) {}

  @Post()
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordsService.create(createKeywordDto);
  }

  @Get()
  findAll() {
    return this.keywordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keywordsService.findOne(+id);
  }

  @Get('byname/:name')
  findOneByName(@Param('name') name: string) {
    return this.keywordsService.findOneByName(name);
  }

  @Get('questions/:name')
  findQuestionsPerKeyword(@Param('name') name:string, @Query() params:any){
    return this.keywordsService.findQuestionsPerKeyword(params,name);
  }

  @Get('stats/questionsperkeyword')
  findQuestionsPerKeywordStats(@Query() params : any) {
    return this.keywordsService.findQuestionsPerKeywordsStats(params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKeywordDto: UpdateKeywordDto) {
    return this.keywordsService.update(+id, updateKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keywordsService.remove(+id);
  }
}
