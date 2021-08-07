import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IsObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !metadata || !Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${value} is an invalid id`);
    }

    return value;
  }
}
