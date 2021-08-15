import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('clear-testing-database')
  @HttpCode(HttpStatus.OK)
  clearTestingDatabase() {
    return this.testService.clearTestingDatabase();
  }

  @Post('generate-testing-entities')
  @HttpCode(HttpStatus.OK)
  generateTestingEntities() {
    return this.testService.generateTestingEntities();
  }
}
