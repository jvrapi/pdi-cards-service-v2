import { Format, FormatName } from '~/app/entities/format';

export class MessagingFormatsMapper {
  static toDomain(formats: string[]): Format[] {
    if (formats.length) {
      return formats.map(
        (format) =>
          new Format({
            format: FormatName[format as keyof typeof FormatName],
          }),
      );
    }

    return [];
  }
}
