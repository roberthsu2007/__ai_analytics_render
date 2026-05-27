import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch 用於 API 測試
global.fetch = vi.fn();

// 清理 fetch mock
beforeEach(() => {
  vi.clearAllMocks();
});
