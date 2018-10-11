import { Deserializable } from "./deserializable.model";

export class Player implements Deserializable{
id: number;
name: string;

deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}