import { Format, FormatName } from '~/app/entities/format';

export class FormatsMapper {
  static toDomain(formats: string | null): Format[] {
    if (formats) {
      return formats.split(',').map(
        (format) =>
          new Format({
            format: FormatName[format as keyof typeof FormatName],
          }),
      );
    }

    return [];
  }

  static toDatabase(formats: Format[]) {
    return formats
      .filter((format) => format.isLegal)
      .map((format) => format.value)
      .toString();
  }
}
