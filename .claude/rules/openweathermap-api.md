# OpenWeatherMap API リファレンス

## 概要

このプロジェクトでは、OpenWeatherMapが提供する以下のAPIを使用します。

- **5 Day / 3 Hour Forecast API**: 5日間の3時間ごとの天気予報を取得
- **Geocoding API**: 都市名から座標を取得、または座標から都市名を取得

## 共通事項

### APIキーの管理

- **環境変数**: `VITE_OPENWEATHER_API_KEY`
- APIキーは環境変数で管理し、コード内にハードコードしない
- `.env`ファイルに設定し、`.gitignore`でバージョン管理から除外

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### HTTPSの使用

- 本番環境では必ずHTTPSを使用
- APIエンドポイントは`https://`で始まるURLを使用

### エラーハンドリング

- HTTPステータスコードでエラーを判別
  - `200`: 成功
  - `401`: APIキーが無効または未設定
  - `404`: リクエストされたデータが見つからない
  - `429`: レート制限超過
  - `500`: サーバーエラー

## Geocoding API

### 目的

都市名から座標（緯度・経度）を取得、または座標から都市名を取得するAPI。

### エンドポイント

#### 1. 直接ジオコーディング（都市名から座標）

```
GET http://api.openweathermap.org/geo/1.0/direct
```

**リクエストパラメータ**

| パラメータ | 必須 | 説明 |
|----------|------|------|
| q | ○ | 都市名、州コード（米国の場合）、国コード（ISO 3166）をカンマ区切りで指定。例: `Tokyo,JP` |
| limit | × | 結果の件数（デフォルト: 5、最大: 5） |
| appid | ○ | APIキー |

**レスポンス例**

```json
[
  {
    "name": "Tokyo",
    "local_names": {
      "ja": "東京",
      "en": "Tokyo"
    },
    "lat": 35.6828387,
    "lon": 139.7594549,
    "country": "JP",
    "state": "Tokyo"
  }
]
```

**レスポンスフィールド**

| フィールド | 型 | 説明 |
|----------|------|------|
| name | string | 都市名（英語） |
| local_names | object | ローカライズされた都市名（言語コードがキー） |
| lat | number | 緯度 |
| lon | number | 経度 |
| country | string | 国コード（ISO 3166） |
| state | string | 州・都道府県名 |

#### 2. 郵便番号からジオコーディング

```
GET http://api.openweathermap.org/geo/1.0/zip
```

**リクエストパラメータ**

| パラメータ | 必須 | 説明 |
|----------|------|------|
| zip | ○ | 郵便番号と国コードをカンマ区切りで指定。例: `100-0001,JP` |
| appid | ○ | APIキー |

**レスポンス例**

```json
{
  "zip": "100-0001",
  "name": "Chiyoda",
  "lat": 35.6762,
  "lon": 139.7508,
  "country": "JP"
}
```

#### 3. 逆ジオコーディング（座標から都市名）

```
GET http://api.openweathermap.org/geo/1.0/reverse
```

**リクエストパラメータ**

| パラメータ | 必須 | 説明 |
|----------|------|------|
| lat | ○ | 緯度 |
| lon | ○ | 経度 |
| limit | × | 結果の件数（デフォルト: 5、最大: 5） |
| appid | ○ | APIキー |

**レスポンス例**

```json
[
  {
    "name": "Tokyo",
    "local_names": {
      "ja": "東京",
      "en": "Tokyo"
    },
    "lat": 35.6828387,
    "lon": 139.7594549,
    "country": "JP",
    "state": "Tokyo"
  }
]
```

### 使用例

**TypeScriptでの実装例**

```typescript
// 都市名から座標を取得
const getCityCoordinates = async (cityName: string) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch city coordinates');
  }

  const data = await response.json();
  return data[0]; // 最初の結果を返す
};

// 座標から都市名を取得
const getCityName = async (lat: number, lon: number) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch city name');
  }

  const data = await response.json();
  return data[0];
};
```

## 5 Day / 3 Hour Forecast API

### 目的

指定した座標の5日間の3時間ごとの天気予報を取得する。

### エンドポイント

```
GET https://api.openweathermap.org/data/2.5/forecast
```

### リクエストパラメータ

| パラメータ | 必須 | 説明 |
|----------|------|------|
| lat | ○ | 緯度 |
| lon | ○ | 経度 |
| appid | ○ | APIキー |
| units | × | 単位系（`standard`, `metric`, `imperial`）。`metric`推奨（℃、m/s） |
| lang | × | 言語コード（`ja`で日本語、デフォルト: `en`） |
| cnt | × | 取得する予報データの件数（最大: 40） |

### レスポンス構造

**レスポンス例（簡略版）**

```json
{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1609459200,
      "main": {
        "temp": 5.5,
        "feels_like": 2.3,
        "temp_min": 5.5,
        "temp_max": 6.2,
        "pressure": 1013,
        "humidity": 75
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "快晴",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 3.5,
        "deg": 180,
        "gust": 5.2
      },
      "visibility": 10000,
      "pop": 0.2,
      "rain": {
        "3h": 0.5
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2021-01-01 00:00:00"
    }
  ],
  "city": {
    "id": 1850144,
    "name": "Tokyo",
    "coord": {
      "lat": 35.6895,
      "lon": 139.6917
    },
    "country": "JP",
    "population": 13515271,
    "timezone": 32400,
    "sunrise": 1609452000,
    "sunset": 1609487000
  }
}
```

### レスポンスフィールド詳細

#### `list[]` - 予報データの配列

| フィールド | 型 | 説明 |
|----------|------|------|
| dt | number | Unix時刻（秒） |
| dt_txt | string | 予報時刻（YYYY-MM-DD HH:MM:SS形式） |
| main | object | 気温、湿度、気圧などのメインデータ |
| main.temp | number | 気温（℃） |
| main.feels_like | number | 体感温度（℃） |
| main.temp_min | number | 最低気温（℃） |
| main.temp_max | number | 最高気温（℃） |
| main.pressure | number | 気圧（hPa） |
| main.humidity | number | 湿度（%） |
| weather[] | array | 天気状態の配列 |
| weather[].id | number | 天気状態ID |
| weather[].main | string | 天気グループ（Rain, Snow, Clouds等） |
| weather[].description | string | 天気の説明（langパラメータで言語変更可能） |
| weather[].icon | string | 天気アイコンコード（例: `01d`） |
| clouds | object | 雲量データ |
| clouds.all | number | 雲量（%） |
| wind | object | 風データ |
| wind.speed | number | 風速（m/s） |
| wind.deg | number | 風向（度） |
| wind.gust | number | 突風（m/s） |
| visibility | number | 視程（メートル） |
| pop | number | 降水確率（0〜1） |
| rain | object | 降雨量データ（存在する場合のみ） |
| rain.3h | number | 過去3時間の降雨量（mm） |
| snow | object | 降雪量データ（存在する場合のみ） |
| snow.3h | number | 過去3時間の降雪量（mm） |
| sys.pod | string | 昼夜（`d`: 昼、`n`: 夜） |

#### `city` - 都市情報

| フィールド | 型 | 説明 |
|----------|------|------|
| id | number | 都市ID |
| name | string | 都市名 |
| coord | object | 座標 |
| coord.lat | number | 緯度 |
| coord.lon | number | 経度 |
| country | string | 国コード（ISO 3166） |
| population | number | 人口 |
| timezone | number | タイムゾーンオフセット（秒） |
| sunrise | number | 日の出時刻（Unix時刻） |
| sunset | number | 日の入り時刻（Unix時刻） |

### 天気アイコン

天気アイコンは以下のURLで取得可能：

```
https://openweathermap.org/img/wn/{icon}@2x.png
```

例: `https://openweathermap.org/img/wn/01d@2x.png`

### 使用例

**TypeScriptでの実装例**

```typescript
interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  pop: number;
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  dt_txt: string;
}

interface WeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

const getWeatherForecast = async (lat: number, lon: number): Promise<WeatherApiResponse> => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast');
  }

  return await response.json();
};

// 使用例
const forecast = await getWeatherForecast(35.6895, 139.6917); // 東京の座標
console.log(forecast.list[0].main.temp); // 現在の気温
console.log(forecast.list[0].weather[0].description); // 天気の説明
```

## 参考リンク

- [Geocoding API - OpenWeatherMap](https://openweathermap.org/api/geocoding-api)
- [5 Day / 3 Hour Forecast API - OpenWeatherMap](https://openweathermap.org/forecast5)
- [Weather Conditions - OpenWeatherMap](https://openweathermap.org/weather-conditions)
- [API Keys - OpenWeatherMap](https://home.openweathermap.org/api_keys)

## 注意事項

- **最新情報**: このドキュメントは作成時点の情報です。最新のAPI仕様はOpenWeatherMapの公式ドキュメントを参照してください
- **APIキーの機密性**: APIキーは機密情報です。Gitにコミットしないよう注意してください
- **レート制限**: 無料プランには1分あたりのリクエスト数制限があります。本番環境ではキャッシュやリクエスト制御を実装してください
- **座標の精度**: Geocoding APIで取得した座標を使用してForecast APIを呼び出すのが最も正確です
