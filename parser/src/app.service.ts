import { Injectable } from '@nestjs/common';
import { KeysGeneratorService } from './modules/keys-generator/keys-generator.service';
import { uniqWith, chunk } from 'lodash'
import { GeneratorDataService } from './modules/generator-data/generator-data.service';
import { Article } from './modules/get-product-service/interfaces/product.interface';
import { GetProductServiceService } from './modules/get-product-service/get-product-service.service';
import { KeysService } from './modules/keys/keys.service';

@Injectable()
export class AppService {

  constructor(
    private readonly keyGeneratorService: KeysGeneratorService,
    private readonly generatorDataInDb: GeneratorDataService,
    private readonly productService: GetProductServiceService,
    private readonly keyService: KeysService
  ) { }


  async search(dto: Article) {

    const product = await this.productService.getProduct(String(dto.article))

    const find = await this.generatorDataInDb.findOne({ article: Number(dto.article) });

    console.log

    if (find) {
      const { instance } = find;
      return { product, instance };

    } else {
      const keys = await this.keyGeneratorService.generatorKeys(product.data.imt_name);
      const rmDuplicates = uniqWith(keys)
      const chunks = chunk(rmDuplicates, 200)

      const chunkId = chunks.map(async (el) => {
        const objectKeys = await this.keyService.create(el)
        return objectKeys._id
      });

      const result = await Promise.all(chunkId);

      const dataG = await this.generatorDataInDb.create(
        {
          article: Number(dto.article),
          data_generation: result,
          instance: chunks.length,
          product: { title: product.data.imt_name, image: product.image }
        })

      return { product: { title: product.data.imt_name, image: product.image }, instance: dataG.instance };
    }
  }

}