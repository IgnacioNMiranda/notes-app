import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
