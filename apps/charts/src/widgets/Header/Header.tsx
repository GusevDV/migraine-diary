import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { routes } from '@/shared/config';

const Header = () => {
  return (
    <header className="flex p-3 justify-between items-center">
      <div>
        <Link to={routes.home}>
          <h1>MigraineCharts</h1>
        </Link>
      </div>
      <div>
        <Button as={Link} to={routes.home} gradientDuoTone="purpleToPink" outline>
          <p>Новый дневник</p>
        </Button>
      </div>
    </header>
  );
};

export default Header;
