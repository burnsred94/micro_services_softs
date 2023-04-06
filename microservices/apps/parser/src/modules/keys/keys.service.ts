import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keys } from './schemas/keys.schema';
import { Model, Types } from 'mongoose';
import { Key } from './interfaces/key.interface';

@Injectable()
export class KeysService {

    constructor(@InjectModel(Keys.name) private readonly keysModel: Model<Keys>) { }

    async create(keys: Array<Key>, article: number) {
        return await this.keysModel.create({
            article: article,
            keys: [...keys]
        });
    }
    async remove(article: number) {
        await this.keysModel.deleteMany({
            article: article
        })
    }


}
