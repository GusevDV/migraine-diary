import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '@/entities/theme';
import { routes } from '@/shared/config';
import ButtonLink from '@/shared/ui/ButtonLink';

const Header = () => {
  return (
    <header className="flex bg-white dark:bg-slate-900 p-3 justify-between items-center">
      <div>
        <Link to={routes.home}>
          <h1 className="dark:text-white">MigraineCharts</h1>
        </Link>
      </div>
      <div className="flex">
        <ThemeSwitcher />
        <ButtonLink to={routes.dashboard}>New report</ButtonLink>
      </div>
    </header>
  );
};

export default Header;
