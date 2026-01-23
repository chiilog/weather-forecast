/**
 * WeatherListItemコンポーネントで使用するProps型
 * 将来的にAPIレスポンスから変換する際の型としても使用
 */
export type WeatherListItemProps = {
  dateTime: string;
  iconUrl: string;
  temperature: number;
  description: string;
};

/**
 * WeatherListコンポーネントで使用するProps型
 */
export type WeatherListProps = {
  items: WeatherListItemProps[];
};
