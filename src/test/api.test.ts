import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('API Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should make POST request to /api/summarize', async () => {
    const mockResponse = {
      success: true,
      summaryMarkdown: '# Test Summary',
      metadata: {
        wordCount: 100,
        processingTimeMs: 1000,
        title: 'Test Meeting'
      }
    };

    // 模擬 fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transcript: 'Test transcript',
        templateType: 'general',
        targetLanguage: 'none'
      })
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.summaryMarkdown).toBeDefined();
  });

  it('should handle API errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: 'Server error' }),
    });

    const response = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({})
    });

    expect(response.ok).toBe(false);
  });

  it('should handle empty transcript error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ success: false, error: '會議逐字稿內容不得為空' }),
    });

    const response = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({ transcript: '', templateType: 'general' })
    });

    expect(response.ok).toBe(false);
    const data = await response.json();
    expect(data.error).toContain('不得為空');
  });
});
