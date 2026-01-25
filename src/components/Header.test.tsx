import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header', () => {
  it('タイトルが表示される', () => {
    render(
      <MemoryRouter>
        <Header title="天気予報アプリ" />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '天気予報アプリ'
    );
  });

  it('戻るボタンがデフォルトで非表示', () => {
    render(
      <MemoryRouter>
        <Header title="天気予報アプリ" />
      </MemoryRouter>
    );

    expect(screen.queryByLabelText('戻る')).not.toBeInTheDocument();
  });

  it('showBackButton={true}で戻るボタンが表示される', () => {
    render(
      <MemoryRouter>
        <Header title="天気予報アプリ" showBackButton={true} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('戻る')).toBeInTheDocument();
  });

  it('backToプロパティで戻るリンク先を設定できる', () => {
    render(
      <MemoryRouter>
        <Header title="天気予報アプリ" showBackButton={true} backTo="/custom" />
      </MemoryRouter>
    );

    const backButton = screen.getByLabelText('戻る');
    expect(backButton).toHaveAttribute('href', '/custom');
  });

  it('arrow_backアイコンが表示される', () => {
    render(
      <MemoryRouter>
        <Header title="天気予報アプリ" showBackButton={true} />
      </MemoryRouter>
    );

    const backButton = screen.getByLabelText('戻る');
    const icon = backButton.querySelector('.material-symbols-outlined');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('arrow_back');
  });
});
