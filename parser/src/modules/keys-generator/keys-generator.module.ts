import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeysGeneratorService } from './keys-generator.service';

@Module({
    providers: [KeysGeneratorService],
    exports: [KeysGeneratorService],
})
export class KeysGeneratorModule { }
