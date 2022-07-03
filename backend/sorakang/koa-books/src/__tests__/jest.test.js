const sum = (one, two) => Number(one + two);

describe('테스트', () => {
  it('', () => {
    expect(sum(1, 4)).toBe(5);
  });
  it('unHappy', () => {
    expect(sum(2, 2)).not.toBe(5);
  });
  it('edge', () => {
    expect(sum('2', 2)).not.toBe(4);
  });
});

function check(predicate, onSuccess, onFail) {
  if (predicate()) {
    onSuccess('yes');
  } else {
    onFail('no');
  }
}

describe('check', () => {
  let onSuccess;
  let onFail;

  beforeEach(() => {
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  it('should call onSuccess when predicate is true', () => {
    check(() => true, onSuccess, onFail);

    // onSuccess 함수의 호출 횟수
    // expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    // Onsuccess 함수의 인자
    // expect(onSuccess.mock.calls[0][0]).toBe('yes');
    expect(onSuccess).toHaveBeenCalledWith('yes');
    // onFail 함수의 호출 횟수
    // expect(onFail.mock.calls.length).toBe(0);
    expect(onFail).toHaveBeenCalledTimes(0);
  });

  it('should call onFail when predicate is false', () => {
    check(() => false, onSuccess, onFail);

    expect(onFail).toHaveBeenCalledTimes(1);
    expect(onFail).toHaveBeenCalledWith('no');
    expect(onSuccess).toHaveBeenCalledTimes(0);
  });
});
