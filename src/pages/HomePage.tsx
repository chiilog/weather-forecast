import { CityList } from '../components/CityList';
import { PageLayout } from '../components/PageLayout';

export function HomePage() {
  return (
    <PageLayout>
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">天気予報アプリ</h1>
      </header>
      <main>
        <CityList />
      </main>
    </PageLayout>
  );
}
