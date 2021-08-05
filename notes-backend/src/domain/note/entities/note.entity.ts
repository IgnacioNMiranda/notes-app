import { prop } from '@typegoose/typegoose';

export class Note {
  @prop({ type: String, unique: true })
  public title: string;

  @prop({ type: String })
  public content: string;

  @prop({ type: Date, default: new Date() })
  public date: Date;

  @prop({ type: Boolean })
  public important: boolean;
}
