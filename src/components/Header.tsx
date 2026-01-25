import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  backTo?: string;
}

export const Header = ({
  title,
  showBackButton = false,
  backTo = '/',
}: HeaderProps) => {
  return (
    <header className="w-full h-14 flex items-center justify-center px-4 relative bg-white border-b border-gray-200">
      {showBackButton && (
        <Link
          to={backTo}
          aria-label="戻る"
          className="absolute left-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <span
            className="material-symbols-outlined text-2xl"
            aria-hidden="true"
          >
            arrow_back
          </span>
        </Link>
      )}
      <h1 className="text-lg font-bold text-gray-800">{title}</h1>
    </header>
  );
};
