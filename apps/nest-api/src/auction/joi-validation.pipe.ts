import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

export class JoiValidationPipe implements PipeTransform {
  private logger = new Logger('AuctionController');

  constructor(private schema: ObjectSchema) {
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const validation = this.schema.validate(value, {
      convert: false,
      abortEarly: false,
    });
    if (validation.error) {
      const message = validation.error.details.map(err => err.message).join(',');
      this.logger.error(validation, 'Failed JOI Validation' );
      throw new BadRequestException(`Validation failed: ${message}`);
    }
    return value;
  }
}
