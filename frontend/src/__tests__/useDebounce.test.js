import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import useDebounce from '../hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  test('returns initial value immediately without waiting', () => {
    const { result } = renderHook(() => useDebounce('hola', 300));
    expect(result.current).toBe('hola');
  });

  test('does not update before delay has passed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hola' } }
    );
    rerender({ value: 'mundo' });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('hola');
  });

  test('updates value after delay has passed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hola' } }
    );
    rerender({ value: 'mundo' });
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('mundo');
  });

  test('resets timer when value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    );
    rerender({ value: 'b' });
    act(() => { vi.advanceTimersByTime(200); });
    rerender({ value: 'c' });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('a');
    act(() => { vi.advanceTimersByTime(100); });
    expect(result.current).toBe('c');
  });
});
