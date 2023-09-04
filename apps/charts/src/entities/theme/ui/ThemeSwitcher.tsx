import { useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { LS_THEME_KEY } from '@/shared/config';
import Button from '@/shared/ui/Button';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
const checkCurrentThemeIsDark = () => {
  return (
    localStorage.theme === Theme.DARK ||
    (!(LS_THEME_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
};

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>(checkCurrentThemeIsDark() ? Theme.DARK : Theme.LIGHT);
  const handleThemeToggleClick = () => {
    // if set via local storage previously
    if (localStorage.getItem(LS_THEME_KEY)) {
      if (localStorage.getItem(LS_THEME_KEY) === Theme.LIGHT) {
        document.documentElement.classList.add(Theme.DARK);
        localStorage.setItem(LS_THEME_KEY, Theme.DARK);
        setTheme(Theme.DARK);
      } else {
        document.documentElement.classList.remove(Theme.DARK);
        localStorage.setItem(LS_THEME_KEY, Theme.LIGHT);
        setTheme(Theme.LIGHT);
      }
      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains(Theme.DARK)) {
        document.documentElement.classList.remove(Theme.DARK);
        localStorage.setItem(LS_THEME_KEY, Theme.LIGHT);
        setTheme(Theme.LIGHT);
      } else {
        document.documentElement.classList.add(Theme.DARK);
        localStorage.setItem(LS_THEME_KEY, Theme.DARK);
        setTheme(Theme.DARK);
      }
    }
  };
  return (
    <Button onClick={handleThemeToggleClick}>
      {theme === Theme.DARK ? <BsFillSunFill /> : <BsFillMoonFill color="#0f172a" />}
    </Button>
  );
};

export default ThemeSwitcher;
