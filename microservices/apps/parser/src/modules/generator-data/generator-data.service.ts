import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeneratorData, GeneratorDataDocument } from './schemas/schema.chunk';
import { KeysService } from '../keys/keys.service';

@Injectable()
export class GeneratorDataService {

    constructor(
        @InjectModel(GeneratorData.name) private readonly _generatorData: Model<GeneratorDataDocument>
    ) { }

    async findOne(data: Partial<GeneratorData>): Promise<GeneratorData> {
        return await this._generatorData.findOne({ article: data.article })
            .populate('data_generation')
            .exec();
    }

    async create(data: GeneratorData): Promise<GeneratorData> {
        const find = await this.findOne({ article: data.article });
        if (find) {
            return find;
        } else {
            return await this._generatorData.create(data);
        }
    }

    async delete(data: Partial<GeneratorData>): Promise<void> {
        await this._generatorData.findOneAndDelete({ article: data.article })
    }

}
