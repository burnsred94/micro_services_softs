import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Key } from "../interfaces/key.interface"
import * as mongoose from "mongoose";
import { GeneratorData } from "src/modules/generator-data/schemas/schema.chunk";


export type KeysDocument = mongoose.HydratedDocument<Keys>

@Schema()
export class Keys {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "GeneratorData" })
    user: GeneratorData

    @Prop({ type: Array<Key> })
    keys: Array<Key>;

}


export const KeysSchema = SchemaFactory.createForClass(Keys);
