import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Article } from './modules/get-product-service/interfaces/product.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/search')
  getSearchKey(@Body() dto: Article) {
    return this.appService.search(dto)
  }


}

