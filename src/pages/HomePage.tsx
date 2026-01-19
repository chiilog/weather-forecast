export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">天気予報アプリ</h1>
      </header>
      <main>
        {/* CityList コンポーネントを後で追加 */}
        <p className="text-gray-600">地域を選択してください</p>
      </main>
    </div>
  );
}
