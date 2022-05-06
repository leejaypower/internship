/**
 * 캐러셀 슬라이드시 현재 페이지 위치를 계산하는 함수입니다.
 * @param { number } cur 현재 위치
 * @param { number } dir 슬라이드 방향
 * @param { number } len 총 슬라이드 개수
 * @returns { number } 현재 슬라이드의 위치(slides의 배열 index)
*/

const calculatePage = (cur, dir, len) => (cur + dir + len) % len

export default calculatePage
