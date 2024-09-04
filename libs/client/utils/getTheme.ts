import { getThemeSSR, lightTheme, themeAtom } from '@frontend/components/ThemeToggler';
import { isClient } from '@libs/shared/ssr';
import { useAtom } from 'jotai';

export default function getTheme() {
  if (!isClient()) return getThemeSSR() === lightTheme ? 'light' : 'dark';
  const [theme, _] = useAtom(themeAtom);
  return theme === lightTheme ? 'light' : 'dark';
}
