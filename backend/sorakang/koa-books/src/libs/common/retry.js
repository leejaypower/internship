const retry = async (MAXCOUNT, promiseArr) => {
  const resultPromise = await Promise.allSettled(promiseArr);

  // retry 대상 추출
  const rejectedPromise = resultPromise.map((promise, idx) => {
    if (promise.status === 'rejected') {
      return promiseArr[idx];
    }
  }).filter((bookPromise) => !!bookPromise);

  // base case 최대 횟수가 되면 false , rejected promise return
  if (MAXCOUNT === 0) {
    return { state: false, data: rejectedPromise };
  }

  // if rejected된 상태가 있다면 retry진행
  if (rejectedPromise.length > 0) {
    console.log(`Try again count: ${MAXCOUNT}, rejected ${rejectedPromise.length}`);
    // retry 시도
    return retry(MAXCOUNT - 1, rejectedPromise);
  }
  // 성공 시
  const result = { state: true, data: [] };
  return result;
};

module.exports = retry;
