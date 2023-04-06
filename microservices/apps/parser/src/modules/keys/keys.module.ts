import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Keys, KeysSchema } from './schemas/keys.schema';
import { KeysService } from './keys.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Keys.name, schema: KeysSchema }])],
    providers: [KeysService],
    exports: [KeysService]
})
export class KeysModule {

}
