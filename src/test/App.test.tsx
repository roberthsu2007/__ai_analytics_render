import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main app', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /會議/i })).toBeDefined();
  });

  it('displays textarea for transcript input', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/貼上會議逐字稿/i);
    expect(textarea).toBeDefined();
  });

  it('has template type selector', () => {
    render(<App />);
    const generalOption = screen.getByLabelText(/綜合商務/i);
    expect(generalOption).toBeDefined();
  });

  it('disables submit button when transcript is empty', () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { name: /立即生成/i });
    expect(submitButton.hasAttribute('disabled')).toBeTruthy();
  });

  it('enables submit button when transcript has content', async () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/貼上會議逐字稿/i) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Test transcript content' } });
    
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /立即生成/i });
      expect(submitButton.hasAttribute('disabled')).toBeFalsy();
    });
  });
});
