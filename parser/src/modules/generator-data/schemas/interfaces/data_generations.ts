import { Types } from "mongoose";
import { Keys } from "src/modules/keys/schemas/keys.schema";

export interface Data {
    _id: Types.ObjectId;
    keys?: Array<Keys>;
}