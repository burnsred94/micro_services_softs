import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Keys, KeysSchema } from './schemas/keys.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Keys.name, schema: KeysSchema }])],
})
export class KeysModule {

}
