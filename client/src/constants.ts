export interface ILanguage {
  title: string;
  code: Languages;
}

export enum Languages {
  Ukrainian = 'uk',
  Russian = 'ru',
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
