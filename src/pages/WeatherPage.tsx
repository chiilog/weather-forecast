import { useParams, Link } from 'react-router-dom';

export function WeatherPage() {
  const { cityId } = useParams<{ cityId: string }>();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-4 flex items-center gap-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← 戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{cityId}の天気</h1>
      </header>
      <main>
        {/* WeatherList コンポーネントを後で追加 */}
        <p className="text-gray-600">天気データを表示予定</p>
      </main>
    </div>
  );
}
