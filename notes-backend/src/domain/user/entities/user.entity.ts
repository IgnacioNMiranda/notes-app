import { DocumentType, prop } from '@typegoose/typegoose';

export class User {
  @prop({ type: String, unique: true })
  public email!: string;

  @prop({
    type: String,
    default: function (this: DocumentType<User>) {
      const emailLeftSide = this.email.split('@')[0];
      const username = emailLeftSide.replace(/_|\.|-/g, '');
      return username;
    },
  })
  public username?: string;

  @prop({ type: String, select: false })
  public password!: string;
}
