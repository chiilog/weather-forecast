import { Link } from 'react-router-dom';

interface ErrorViewProps {
  message: string;
  showRetryButton: boolean;
  onRetry?: () => void;
}

/**
 * エラー表示用のコンポーネント
 */
export const ErrorView = ({
  message,
  showRetryButton,
  onRetry,
}: ErrorViewProps) => (
  <>
    <p className="text-red-600">{message}</p>
    <div className="mt-4">
      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className="mr-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          再試行
        </button>
      )}
      <Link to="/" className="text-blue-600">
        ← ホームへ戻る
      </Link>
    </div>
  </>
);
