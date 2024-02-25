export interface ILanguage {
  title: string;
  code: Languages;
  region: Regions;
  isMain?: boolean;
}

export enum Languages {
  Ukrainian = 'uk',
  English = 'en',
}

export enum Regions {
  Ukraine = 'UA',
  USA = 'US',
}

export const LANGUAGES: Array<ILanguage> = [
  {
    title: 'Українська',
    code: Languages.Ukrainian,
    region: Regions.Ukraine,
  },
  {
    title: 'English',
    code: Languages.English,
    region: Regions.USA,
    isMain: true,
  },
];
