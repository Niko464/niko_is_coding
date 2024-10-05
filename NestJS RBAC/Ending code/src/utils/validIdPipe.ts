import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsValidIdPipe implements PipeTransform {
  transform(value: any) {
    // Check if the value is a valid integer and greater than 0
    const id = parseInt(value, 10);

    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }

    return id; // Return the validated ID as a number
  }
}
