import { prop, Ref } from '@typegoose/typegoose';
import { User } from '../../user/entities/user.entity';

export class Note {
  @prop({ type: String, unique: true })
  public title: string;

  @prop({ type: String })
  public content: string;

  @prop({ type: Date, default: new Date() })
  public date: Date;

  @prop({ type: Boolean })
  public important: boolean;

  @prop({ required: true, ref: () => User })
  public user: Ref<User>;
}
