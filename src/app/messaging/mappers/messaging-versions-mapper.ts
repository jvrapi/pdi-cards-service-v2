import { Version, VersionName } from '~/app/entities/version';

export class MessagingVersionsMapper {
  static toDomain(versions: string[]): Version[] {
    if (versions.length) {
      return versions.map(
        (version) =>
          new Version(VersionName[version as keyof typeof VersionName]),
      );
    }

    return [];
  }
}
