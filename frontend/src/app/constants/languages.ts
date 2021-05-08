import { dictionary } from './dictionary';
import { LanguageLevels } from './language-levels.enum';
import { Languages } from './languages.enum';

export const LANGUAGE_OPTIONS = [
  { value: Languages.Be, label: dictionary[Languages.Be] },
  { value: Languages.Ch, label: dictionary[Languages.Ch] },
  { value: Languages.En, label: dictionary[Languages.En] },
  { value: Languages.Fr, label: dictionary[Languages.Fr] },
  { value: Languages.Ge, label: dictionary[Languages.Ge] },
  { value: Languages.It, label: dictionary[Languages.It] },
  { value: Languages.Ru, label: dictionary[Languages.Ru] },
  { value: Languages.Sp, label: dictionary[Languages.Sp] },
  { value: Languages.Sw, label: dictionary[Languages.Sw] },
];

export const LANGUAGE_LEVEL_OPTIONS = [
  { value: LanguageLevels.A0, label: LanguageLevels.A0 },
  { value: LanguageLevels.A1, label: LanguageLevels.A1 },
  { value: LanguageLevels.A2, label: LanguageLevels.A2 },
  { value: LanguageLevels.B1, label: LanguageLevels.B1 },
  { value: LanguageLevels.B2, label: LanguageLevels.B2 },
  { value: LanguageLevels.C1, label: LanguageLevels.C1 },
  { value: LanguageLevels.C2, label: LanguageLevels.C2 },
];
