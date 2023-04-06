import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneratorDataService } from './generator-data.service';
import { GeneratorData, GeneratorDataSchema } from './schemas/schema.chunk';
import { KeysModule } from '../keys/keys.module';

@Module({
    exports: [GeneratorDataService],
    imports: [
        MongooseModule.forFeature([{ name: GeneratorData.name, schema: GeneratorDataSchema }]),
        KeysModule
    ],
    providers: [GeneratorDataService],

})
export class GeneratorDataModule { }
