import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Key } from "../interfaces/key.interface"
import * as mongoose from "mongoose";


export type KeysDocument = mongoose.HydratedDocument<Keys>

@Schema()
export class Keys {

    @Prop({ type: Number })
    article: number;

    @Prop({ type: Array })
    keys: [];

}

export const KeysSchema = SchemaFactory.createForClass(Keys);
