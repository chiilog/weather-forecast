import { Routes, Route, useLocation, matchPath } from 'react-router-dom';
import { Header } from './components/Header';
import { PageLayout } from './components/PageLayout';
import { HomePage } from './pages/HomePage';
import { WeatherPage } from './pages/WeatherPage';
import { getCityById } from './constants/cities';
import type { HeaderProps } from './types/header';

const getHeaderProps = (pathname: string): HeaderProps => {
  // 天気画面
  const weatherMatch = matchPath('/weather/:cityId', pathname);
  if (weatherMatch) {
    const { cityId } = weatherMatch.params;
    const city = getCityById(cityId || '');
    return {
      title: city ? `${city.name}の天気` : '天気',
      showBackButton: true,
      backTo: '/',
    };
  }

  // デフォルト
  return {
    title: '天気予報アプリ',
    showBackButton: false,
  };
};

function App() {
  const location = useLocation();
  const headerProps = getHeaderProps(location.pathname);

  return (
    <>
      <Header {...headerProps} />
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather/:cityId" element={<WeatherPage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
