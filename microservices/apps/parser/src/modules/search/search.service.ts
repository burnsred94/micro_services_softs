import { Injectable } from '@nestjs/common';
import { GotService } from '@t00nday/nestjs-got';
import { Article } from '../get-product-service/interfaces/product.interface';

@Injectable()
export class SearchService {

    constructor(private readonly gotService: GotService) { }


    public async fetchPage(page: number, article: Article, code: string): Promise<{
        page: number,
        count: number,
        result: number | null
    }> {
        try {
            const searchUrl = `https://search.wb.ru/exactmatch/sng/common/v4/search?query=${code}&resultset=catalog&limit=100&sort=popular&page=${page}&appType=128&curr=byn&locale=by&lang=ru&dest=-59208&regions=1,4,22,30,31,33,40,48,66,68,69,70,80,83,111,114,115&reg=1&spp=0`
            const { body: product } = await this.gotService.gotRef(searchUrl)

            const payloadProduct = JSON.parse(product)
            const result = payloadProduct.data.products.findIndex(product => product.id === article)

            return {
                page,
                count: payloadProduct.data.products.length,
                result: result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async fetchCountProducts(code: string): Promise<number> {
        const searchTotalProducts = `https://search.wb.ru/exactmatch/sng/common/v4/search?query=${code}&resultset=filters&appType=128&curr=byn&locale=by&lang=ru&dest=-59208&regions=1,4,22,30,31,33,40,48,66,68,69,70,80,83,111,114,115&reg=1&spp=0`
        const { body: totalProducts } = await this.gotService.gotRef(searchTotalProducts);
        const payload = JSON.parse(totalProducts)
        return payload.data.total
    }


    async search(keys, article: Article) {
        const arr = [];
        if (typeof keys === 'undefined') return arr
        for (const item of keys) {
            try {
                const code = encodeURIComponent(item.key)

                const data =
                    [
                        this.fetchPage(1, article, code),
                        this.fetchPage(2, article, code),
                        this.fetchPage(3, article, code),
                    ]


                const result = await Promise.all(data)


                const check = result.find(item => item?.result !== undefined && item?.result !== -1)
                if (check !== undefined) {
                    const positionResult = check.page === 1 ? check.result + 1 : (((check.page * 100) - 100) + check.count + 1)
                    const totalProducts = await this.fetchCountProducts(code)

                    arr.push({ key: item.key, totalProducts: totalProducts, frequency: item.count, position: positionResult })
                }

            } catch (error) {
                continue
            }
        }
        return arr
    }


}

