import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keys } from './schemas/keys.schema';
import { Model, Types } from 'mongoose';
import { Key } from './interfaces/key.interface';

@Injectable()
export class KeysService {

    constructor(@InjectModel(Keys.name) private readonly keysModel: Model<Keys>) { }

    async create(keys: Array<Key>) {
        return await this.keysModel.create({
            keys: [...keys]
        });
    }
    async remove(ObjectId: Types.ObjectId) {
        await this.keysModel.deleteMany({
            _id: ObjectId
        })
    }


}
