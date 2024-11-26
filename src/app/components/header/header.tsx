import Link from 'next/link';
import './style.css';

export const Header = () => {
  return (
    <div className="header" id="app-header">
      <Link href="/">
        <img
          src="https://www.maltego.com/img/maltego-logo.svg"
          width="151px"
          height="30px"
        />
      </Link>
    </div>
  );
};
