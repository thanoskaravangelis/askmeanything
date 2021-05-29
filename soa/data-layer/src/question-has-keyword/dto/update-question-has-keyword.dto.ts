import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionHasKeywordDto } from './create-question-has-keyword.dto';

export class UpdateQuestionHasKeywordDto extends PartialType(CreateQuestionHasKeywordDto) {}
