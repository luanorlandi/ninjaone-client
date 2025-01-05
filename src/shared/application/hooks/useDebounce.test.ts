import { renderHook, act } from "@/testUtils";

import { useDebounce } from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce hook", () => {
  it("should call the function after the specified timeout", () => {
    const mockFunction = jest.fn();
    const { result } = renderHook(() =>
      useDebounce({ func: mockFunction, timeout: 500 })
    );

    act(() => {
      result.current();
    });

    expect(mockFunction).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFunction).toHaveBeenCalled();
  });

  it("should cancel the previous call if invoked again within the timeout period", () => {
    const mockFunction = jest.fn();
    const { result } = renderHook(() =>
      useDebounce({ func: mockFunction, timeout: 500 })
    );

    act(() => {
      result.current();
      jest.advanceTimersByTime(300);
      result.current();
      jest.advanceTimersByTime(300);
    });

    expect(mockFunction).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
