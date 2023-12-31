export interface ILanguage {
  title: string;
  code: Languages;
}

export enum Languages {
  Ukrainian = 'uk',
  English = 'en',
}

export const LANGUAGES: Array<ILanguage> = [
  {
    title: 'Українська',
    code: Languages.Ukrainian,
  },
  {
    title: 'English',
    code: Languages.English,
  },
];
