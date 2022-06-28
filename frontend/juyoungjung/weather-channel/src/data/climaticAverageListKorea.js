/**
  * @param climaticAverageListKorea 한국 1991~2020 기후평년값
  * @param location (관측)지점명
  * @param temp 평균 기온
  * @param max_temp 평균 최고기온
  * @param min_temp 평균 최저기온
  * @param wind_speed 평균 풍속
  * @param rain 평균 강수량 합계
  * @see {@link climaticAverageListKorea} 기상청 기후평년값
  * @see {@link https://data.kma.go.kr/normals/table.do}
 */

const climaticAverageListKorea = [
  [{
    location: '속초', temp: 0.1, max_temp: 4.2, min_temp: -3.8, wind_speed: 2.6, rain: 43.5,
  },
  {
    location: '철원', temp: -5.7, max_temp: 0.7, min_temp: -11.8, wind_speed: 1.3, rain: 18.2,
  },
  {
    location: '동두천', temp: -3.8, max_temp: 2.4, min_temp: -9, wind_speed: 1.4, rain: 18.4,
  },
  {
    location: '파주', temp: -4.6, max_temp: 1.8, min_temp: -10.6, wind_speed: 1.4, rain: 17.4,
  },
  {
    location: '대관령', temp: -6.9, max_temp: -1.8, min_temp: -12.2, wind_speed: 4.8, rain: 53.1,
  },
  {
    location: '춘천', temp: -4.1, max_temp: 1.9, min_temp: -9.3, wind_speed: 1.1, rain: 18.6,
  },
  {
    location: '백령도', temp: -1.3, max_temp: 1.2, min_temp: -3.4, wind_speed: 4.4, rain: 13.3,
  },
  {
    location: '강릉', temp: 0.9, max_temp: 5.3, min_temp: -2.7, wind_speed: 3.4, rain: 47.9,
  },
  {
    location: '동해', temp: 1.1, max_temp: 5.4, min_temp: -2.8, wind_speed: 2.8, rain: 46.4,
  },
  {
    location: '서울', temp: -1.9, max_temp: 2.1, min_temp: -5.5, wind_speed: 2.3, rain: 16.8,
  },
  {
    location: '인천', temp: -1.5, max_temp: 2.2, min_temp: -4.8, wind_speed: 3.2, rain: 15.9,
  },
  {
    location: '원주', temp: -3.1, max_temp: 2.4, min_temp: -8, wind_speed: 0.9, rain: 18,
  },
  {
    location: '울릉도', temp: 1.7, max_temp: 4.4, min_temp: -0.5, wind_speed: 3.5, rain: 117.4,
  },
  {
    location: '수원', temp: -2.1, max_temp: 2.8, min_temp: -6.6, wind_speed: 1.6, rain: 18.1,
  },
  {
    location: '영월', temp: -3.6, max_temp: 2.5, min_temp: -9.2, wind_speed: 1.3, rain: 19.1,
  },
  {
    location: '충주', temp: -3.2, max_temp: 2.5, min_temp: -8.3, wind_speed: 1.4, rain: 20,
  },
  {
    location: '서산', temp: -1.6, max_temp: 3.3, min_temp: -6.2, wind_speed: 2.2, rain: 23.5,
  },
  {
    location: '울진', temp: 1.4, max_temp: 6.5, min_temp: -2.9, wind_speed: 3.6, rain: 48.9,
  },
  {
    location: '청주', temp: -1.5, max_temp: 3.4, min_temp: -5.8, wind_speed: 1.5, rain: 20.6,
  },
  {
    location: '대전', temp: -1, max_temp: 4.1, min_temp: -5.5, wind_speed: 1.5, rain: 25.5,
  },
  {
    location: '추풍령', temp: -1.7, max_temp: 2.9, min_temp: -6.1, wind_speed: 3.6, rain: 24.1,
  },
  {
    location: '안동', temp: -1.8, max_temp: 4, min_temp: -7.2, wind_speed: 1.8, rain: 16.7,
  },
  {
    location: '상주', temp: -0.9, max_temp: 3.9, min_temp: -5.2, wind_speed: 2.4, rain: 21.7,
  },
  {
    location: '포항', temp: 2.2, max_temp: 6.7, min_temp: -1.5, wind_speed: 2.8, rain: 39.8,
  },
  {
    location: '군산', temp: -0.1, max_temp: 4, min_temp: -3.8, wind_speed: 2.9, rain: 28.2,
  },
  {
    location: '울산', temp: 2.4, max_temp: 7.4, min_temp: -1.8, wind_speed: 2.3, rain: 38.6,
  },
  {
    location: '창원', temp: 2.6, max_temp: 7.1, min_temp: -1.2, wind_speed: 2.1, rain: 29.6,
  },
  {
    location: '광주', temp: 1, max_temp: 5.7, min_temp: -2.7, wind_speed: 1.9, rain: 32.6,
  },
  {
    location: '부산', temp: 3.6, max_temp: 8.2, min_temp: -0.1, wind_speed: 3.5, rain: 34.5,
  },
  {
    location: '통영', temp: 3.1, max_temp: 7.9, min_temp: -0.8, wind_speed: 2.6, rain: 32.2,
  },
  {
    location: '목포', temp: 1.8, max_temp: 5.8, min_temp: -1.3, wind_speed: 4.3, rain: 31.8,
  },
  {
    location: '여수', temp: 2.8, max_temp: 6.6, min_temp: -0.3, wind_speed: 4.9, rain: 24.5,
  },
  {
    location: '흑산도', temp: 3.4, max_temp: 5.5, min_temp: 1.5, wind_speed: 6.9, rain: 23,
  },
  {
    location: '완도', temp: 2.7, max_temp: 6.3, min_temp: -0.4, wind_speed: 4.2, rain: 34,
  },
  {
    location: '고창', temp: 0, max_temp: 4.5, min_temp: -4.4, wind_speed: 2.7, rain: 31.1,
  },
  {
    location: '제주', temp: 6.1, max_temp: 8.6, min_temp: 3.7, wind_speed: 4.1, rain: 67.5,
  },
  {
    location: '고산', temp: 6.1, max_temp: 8.4, min_temp: 3.8, wind_speed: 9.7, rain: 40.6,
  },
  {
    location: '성산', temp: 5.4, max_temp: 8.9, min_temp: 2.1, wind_speed: 3.3, rain: 77.5,
  },
  {
    location: '서귀포', temp: 7.2, max_temp: 10.8, min_temp: 4.1, wind_speed: 2.4, rain: 60.7,
  },
  {
    location: '진주', temp: 0.3, max_temp: 7.2, min_temp: -5.5, wind_speed: 1.3, rain: 28,
  },
  {
    location: '강화', temp: -3.2, max_temp: 1.7, min_temp: -8.1, wind_speed: 1.6, rain: 15.6,
  },
  {
    location: '양평', temp: -3.4, max_temp: 2.3, min_temp: -8.6, wind_speed: 1.2, rain: 17.2,
  },
  {
    location: '이천', temp: -3.1, max_temp: 2.7, min_temp: -8.5, wind_speed: 1.2, rain: 19.2,
  },
  {
    location: '인제', temp: -4.7, max_temp: 1.5, min_temp: -10.4, wind_speed: 1.7, rain: 16.6,
  },
  {
    location: '홍천', temp: -4.8, max_temp: 2.1, min_temp: -10.5, wind_speed: 0.9, rain: 15.8,
  },
  {
    location: '태백', temp: -4.7, max_temp: 0.7, min_temp: -9.6, wind_speed: 1.6, rain: 26.6,
  },
  {
    location: '정선군', temp: -4, max_temp: 1.8, min_temp: -9.1, wind_speed: 1.9, rain: 17.5,
  },
  {
    location: '제천', temp: -4.8, max_temp: 1.6, min_temp: -10.8, wind_speed: 1.4, rain: 20.3,
  },
  {
    location: '보은', temp: -2.9, max_temp: 3.2, min_temp: -8.4, wind_speed: 1.5, rain: 23.4,
  },
  {
    location: '천안', temp: -2.4, max_temp: 3, min_temp: -7.5, wind_speed: 1.7, rain: 19,
  },
  {
    location: '보령', temp: -0.2, max_temp: 4.2, min_temp: -4.4, wind_speed: 1.8, rain: 22.6,
  },
  {
    location: '부여', temp: -1.5, max_temp: 4.4, min_temp: -6.6, wind_speed: 1, rain: 24.9,
  },
  {
    location: '금산', temp: -2.4, max_temp: 4, min_temp: -7.9, wind_speed: 1.1, rain: 25.5,
  },
  {
    location: '부안', temp: -0.2, max_temp: 4.5, min_temp: -4.5, wind_speed: 1.3, rain: 31.7,
  },
  {
    location: '임실', temp: -2.5, max_temp: 3.8, min_temp: -8, wind_speed: 1.2, rain: 28.5,
  },
  {
    location: '정읍', temp: -0.2, max_temp: 4.5, min_temp: -4.4, wind_speed: 1, rain: 36.5,
  },
  {
    location: '남원', temp: -1.3, max_temp: 5, min_temp: -6.6, wind_speed: 1.4, rain: 28.5,
  },
  {
    location: '장수', temp: -3, max_temp: 3, min_temp: -8.6, wind_speed: 1.8, rain: 31.9,
  },
  {
    location: '영광군', temp: -0.4, max_temp: 4.2, min_temp: -4.7, wind_speed: 2.3, rain: 32.7,
  },
  {
    location: '김해시', temp: 2.1, max_temp: 7.4, min_temp: -2.2, wind_speed: 2.5, rain: 26.4,
  },
  {
    location: '순창군', temp: -1.5, max_temp: 4.4, min_temp: -6.6, wind_speed: 1.7, rain: 25.9,
  },
  {
    location: '양산시', temp: 2.3, max_temp: 7.7, min_temp: -2.4, wind_speed: 2.2, rain: 27,
  },
  {
    location: '강진군', temp: 1.1, max_temp: 6.1, min_temp: -3.2, wind_speed: 2.7, rain: 29.7,
  },
  {
    location: '장흥', temp: 1, max_temp: 6.5, min_temp: -3.9, wind_speed: 2.4, rain: 28.2,
  },
  {
    location: '해남', temp: 1.3, max_temp: 6.3, min_temp: -3.3, wind_speed: 2.2, rain: 30.4,
  },
  {
    location: '고흥', temp: 1.6, max_temp: 7, min_temp: -3.3, wind_speed: 2, rain: 25.9,
  },
  {
    location: '의령군', temp: -0.3, max_temp: 7.2, min_temp: -6.4, wind_speed: 1.3, rain: 22.5,
  },
  {
    location: '함양군', temp: -0.3, max_temp: 5.8, min_temp: -5.7, wind_speed: 1.9, rain: 22.8,
  },
  {
    location: '진도군', temp: 2.1, max_temp: 6, min_temp: -1.8, wind_speed: 2.7, rain: 31.9,
  },
  {
    location: '봉화', temp: -4, max_temp: 3, min_temp: -10.6, wind_speed: 1.4, rain: 16.5,
  },
  {
    location: '영주', temp: -2.2, max_temp: 2.7, min_temp: -7.3, wind_speed: 3.7, rain: 18.4,
  },
  {
    location: '문경', temp: -1.7, max_temp: 3.4, min_temp: -6.3, wind_speed: 2.3, rain: 18.9,
  },
  {
    location: '청송군', temp: -2.8, max_temp: 3.7, min_temp: -8.8, wind_speed: 1.7, rain: 16.8,
  },
  {
    location: '영덕', temp: 1, max_temp: 5.8, min_temp: -3.1, wind_speed: 3.3, rain: 37.4,
  },
  {
    location: '의성', temp: -3, max_temp: 4.8, min_temp: -9.6, wind_speed: 1.2, rain: 15.5,
  },
  {
    location: '구미', temp: -0.6, max_temp: 4.9, min_temp: -5.4, wind_speed: 1.8, rain: 18.4,
  },
  {
    location: '영천', temp: -0.5, max_temp: 5.5, min_temp: -5.9, wind_speed: 2.3, rain: 22.1,
  },
  {
    location: '경주시', temp: 0.3, max_temp: 5.9, min_temp: -4.7, wind_speed: 3, rain: 32.2,
  },
  {
    location: '거창', temp: -1.3, max_temp: 5.4, min_temp: -7.3, wind_speed: 1.4, rain: 23.7,
  },
  {
    location: '합천', temp: -0.2, max_temp: 7, min_temp: -5.9, wind_speed: 1.1, rain: 19.7,
  },
  {
    location: '밀양', temp: 0.5, max_temp: 7.4, min_temp: -5.4, wind_speed: 1.3, rain: 21.2,
  },
  {
    location: '산청', temp: 0.4, max_temp: 6.1, min_temp: -4.4, wind_speed: 2.2, rain: 24.4,
  },
  {
    location: '거제', temp: 2.6, max_temp: 7.3, min_temp: -1.4, wind_speed: 1.7, rain: 40.4,
  },
  {
    location: '남해', temp: 2.2, max_temp: 6.9, min_temp: -2, wind_speed: 1.8, rain: 33.6,
  },
  {
    location: '강남', temp: -1.3, max_temp: 2.5, min_temp: -4.7, wind_speed: 1.7, rain: 14.5,
  },
  {
    location: '서초', temp: -1.2, max_temp: 2.7, min_temp: -4.7, wind_speed: 1.5, rain: 16.2,
  },
  {
    location: '강동', temp: -2.3, max_temp: 2.4, min_temp: -6.7, wind_speed: 1.3, rain: 14.5,
  },
  {
    location: '송파', temp: -0.9, max_temp: 3, min_temp: -4.5, wind_speed: 1.7, rain: 13.3,
  },
  {
    location: '강서', temp: -1.9, max_temp: 2.1, min_temp: -5.5, wind_speed: 1.5, rain: 13.9,
  },
  {
    location: '양천', temp: -1.3, max_temp: 2.6, min_temp: -4.7, wind_speed: 1.4, rain: 15.1,
  },
  {
    location: '도봉', temp: -2.7, max_temp: 2.3, min_temp: -7.4, wind_speed: 1.1, rain: 15.6,
  },
  {
    location: '노원', temp: -3.1, max_temp: 2.4, min_temp: -8.6, wind_speed: 1.6, rain: 14.7,
  },
  {
    location: '동대문', temp: -1.1, max_temp: 2.8, min_temp: -4.7, wind_speed: 1.7, rain: 14.1,
  },
  {
    location: '중랑', temp: -1.4, max_temp: 2.5, min_temp: -5.2, wind_speed: 1.8, rain: 16.4,
  },
  {
    location: '기상청', temp: -1.2, max_temp: 2.5, min_temp: -4.5, wind_speed: 1.5, rain: 15.2,
  },
  {
    location: '마포', temp: -1.4, max_temp: 2.4, min_temp: -4.9, wind_speed: 2.3, rain: 13.3,
  },
  {
    location: '서대문', temp: -2.4, max_temp: 2.2, min_temp: -6.4, wind_speed: 1.7, rain: 14.5,
  },
  {
    location: '광진', temp: -1.2, max_temp: 2.6, min_temp: -4.9, wind_speed: 1.8, rain: 13.7,
  },
  {
    location: '성북', temp: -2.3, max_temp: 1.7, min_temp: -6, wind_speed: 1.5, rain: 14.9,
  },
  {
    location: '용산', temp: -1.4, max_temp: 2.3, min_temp: -4.8, wind_speed: 1.5, rain: 15.8,
  },
  {
    location: '은평', temp: -2.8, max_temp: 2.1, min_temp: -7.1, wind_speed: 1.6, rain: 12.9,
  },
  {
    location: '금천', temp: -0.8, max_temp: 2.7, min_temp: -4.1, wind_speed: 1.6, rain: 14.6,
  },
  {
    location: '중구', temp: -3.3, max_temp: 0.7, min_temp: -6.5, wind_speed: 2.6, rain: 10.9,
  },
  {
    location: '성동', temp: -0.9, max_temp: 2.6, min_temp: -4.2, wind_speed: 2.1, rain: 13.3,
  },
  {
    location: '구로', temp: -2, max_temp: 2.3, min_temp: -5.9, wind_speed: 1.7, rain: 13,
  },
  {
    location: '강북', temp: -1.4, max_temp: 2.6, min_temp: -5, wind_speed: 1.6, rain: 14.3,
  },
  {
    location: '남현', temp: -2.3, max_temp: 1.7, min_temp: -6.3, wind_speed: 1.3, rain: 15.3,
  },
  {
    location: '부천', temp: -1.1, max_temp: 2.8, min_temp: -4.6, wind_speed: 1.1, rain: 11.6,
  },
  {
    location: '안양', temp: -1.4, max_temp: 2.3, min_temp: -4.8, wind_speed: 2.2, rain: 12.6,
  },
  {
    location: '광명', temp: -1.1, max_temp: 2.5, min_temp: -4.3, wind_speed: 1.8, rain: 11.5,
  },
  {
    location: '군포', temp: -1.1, max_temp: 2.9, min_temp: -4.5, wind_speed: 1.3, rain: 14.6,
  },
  {
    location: '김포', temp: -3.5, max_temp: 1.3, min_temp: -7.8, wind_speed: 1.4, rain: 7.4,
  },
  {
    location: '하남', temp: -2.4, max_temp: 2.7, min_temp: -6.9, wind_speed: 0.8, rain: 11.6,
  },
  {
    location: '의왕', temp: -2.7, max_temp: 1.9, min_temp: -7, wind_speed: 1, rain: 12.6,
  },
  {
    location: '포천', temp: -4.5, max_temp: 1.8, min_temp: -10.3, wind_speed: 1.1, rain: 13,
  },
  {
    location: '가평조종', temp: -5.3, max_temp: 1, min_temp: -11.3, wind_speed: 1.2, rain: 15.4,
  },
  {
    location: '영등포', temp: -1.1, max_temp: 2.5, min_temp: -4.5, wind_speed: 1.5, rain: 13.1,
  },
  {
    location: '인천연수', temp: -1.6, max_temp: 2.6, min_temp: -5.7, wind_speed: 1.6, rain: 12.7,
  },
  {
    location: '안성', temp: -2.4, max_temp: 2.8, min_temp: -7.3, wind_speed: 1.2, rain: 19,
  },
  {
    location: '간성', temp: -0.6, max_temp: 3.8, min_temp: -5.3, wind_speed: 2.2, rain: 37.1,
  },
  {
    location: '평창', temp: -4.9, max_temp: 1.8, min_temp: -10.7, wind_speed: 1.1, rain: 27.2,
  },
  {
    location: '의정부', temp: -3.5, max_temp: 1.8, min_temp: -8.7, wind_speed: 1, rain: 16,
  },
  {
    location: '횡성', temp: -4.3, max_temp: 2.3, min_temp: -10.2, wind_speed: 1, rain: 17.8,
  },
  {
    location: '고양', temp: -3.5, max_temp: 2.2, min_temp: -8.8, wind_speed: 1.3, rain: 10.9,
  },
  {
    location: '남양주', temp: -3.8, max_temp: 2.7, min_temp: -9.8, wind_speed: 1, rain: 16,
  },
  {
    location: '안산', temp: -3.3, max_temp: 2.3, min_temp: -9, wind_speed: 1.6, rain: 15.1,
  },
  {
    location: '경기광주', temp: -3.3, max_temp: 2.2, min_temp: -8.2, wind_speed: 1.5, rain: 16.6,
  },
  {
    location: '여주', temp: -3.6, max_temp: 2, min_temp: -8.8, wind_speed: 1.3, rain: 17,
  },
  {
    location: '용인', temp: -3.1, max_temp: 2.6, min_temp: -8.5, wind_speed: 1.2, rain: 17.2,
  },
  {
    location: '오산', temp: -2.6, max_temp: 2.6, min_temp: -7.4, wind_speed: 1.3, rain: 15.3,
  },
  {
    location: '평택', temp: -2, max_temp: 2.7, min_temp: -6.7, wind_speed: 1.7, rain: 17.5,
  },
  {
    location: '화천', temp: -5.5, max_temp: 1.9, min_temp: -11.3, wind_speed: 1.1, rain: 15.4,
  },
  {
    location: '양구', temp: -5.8, max_temp: 1.6, min_temp: -11.9, wind_speed: 0.9, rain: 12.6,
  },
  {
    location: '시흥', temp: -1.9, max_temp: 2.5, min_temp: -6.2, wind_speed: 1.5, rain: 14.3,
  },
  {
    location: '구리', temp: -2.5, max_temp: 2.3, min_temp: -6.9, wind_speed: 1.3, rain: 12.5,
  },
  {
    location: '금곡', temp: -2.8, max_temp: 2, min_temp: -7.3, wind_speed: 1.2, rain: 13.3,
  },
  {
    location: '화성', temp: -2, max_temp: 2.4, min_temp: -6.3, wind_speed: 1.3, rain: 13.5,
  },
  {
    location: '성남', temp: -1.8, max_temp: 2.6, min_temp: -6, wind_speed: 1.3, rain: 14.9,
  },
  {
    location: '과천', temp: -2.3, max_temp: 2.7, min_temp: -7.1, wind_speed: 1.5, rain: 13.4,
  },
  {
    location: '진부령', temp: -5.5, max_temp: -1.1, min_temp: -9.6, wind_speed: 3.7, rain: 30.8,
  },
  {
    location: '양주', temp: -4.8, max_temp: 1.7, min_temp: -10.7, wind_speed: 1.1, rain: 14.3,
  },
  {
    location: '단양', temp: -3.4, max_temp: 2.2, min_temp: -8.3, wind_speed: 0.8, rain: 14.9,
  },
  {
    location: '진천', temp: -2.6, max_temp: 3.2, min_temp: -7.9, wind_speed: 1.1, rain: 19.9,
  },
  {
    location: '괴산', temp: -3.5, max_temp: 2.9, min_temp: -9.2, wind_speed: 1, rain: 21.6,
  },
  {
    location: '옥천', temp: -2.2, max_temp: 3.6, min_temp: -7.4, wind_speed: 1.1, rain: 21.3,
  },
  {
    location: '홍북', temp: -2.1, max_temp: 3.1, min_temp: -6.8, wind_speed: 1.4, rain: 23,
  },
  {
    location: '세종연서', temp: -2.7, max_temp: 3.8, min_temp: -7.8, wind_speed: 1.2, rain: 22.6,
  },
  {
    location: '공주', temp: -2.1, max_temp: 3.6, min_temp: -7.2, wind_speed: 1.2, rain: 21.1,
  },
  {
    location: '서천', temp: -1.1, max_temp: 4, min_temp: -5.7, wind_speed: 1.5, rain: 23.2,
  },
  {
    location: '논산', temp: -1.6, max_temp: 4.1, min_temp: -7, wind_speed: 1.4, rain: 22.9,
  },
  {
    location: '당진', temp: -2, max_temp: 2.6, min_temp: -6.4, wind_speed: 2, rain: 17.2,
  },
  {
    location: '청양', temp: -2.5, max_temp: 3.3, min_temp: -8.1, wind_speed: 1.1, rain: 21.8,
  },
  {
    location: '음성', temp: -3.9, max_temp: 2.6, min_temp: -9.9, wind_speed: 1.4, rain: 20.5,
  },
  {
    location: '증평', temp: -3.1, max_temp: 2.7, min_temp: -8.4, wind_speed: 1.1, rain: 18.9,
  },
  {
    location: '태안', temp: -0.5, max_temp: 3.3, min_temp: -4, wind_speed: 1.9, rain: 18.1,
  },
  {
    location: '예산', temp: -2.1, max_temp: 2.8, min_temp: -6.6, wind_speed: 1.7, rain: 19.6,
  },
  {
    location: '아산', temp: -1.9, max_temp: 2.6, min_temp: -6.3, wind_speed: 1.7, rain: 16.2,
  },
  {
    location: '계룡', temp: -2.6, max_temp: 3.5, min_temp: -8.6, wind_speed: 1, rain: 24.8,
  },
  {
    location: '문화', temp: -0.7, max_temp: 4.3, min_temp: -4.9, wind_speed: 1, rain: 22.7,
  },
  {
    location: '세천', temp: -2.1, max_temp: 3.6, min_temp: -7.1, wind_speed: 1, rain: 20.5,
  },
  {
    location: '장동', temp: -2, max_temp: 3.7, min_temp: -6.8, wind_speed: 0.9, rain: 19.8,
  },
  {
    location: '부평', temp: -3.3, max_temp: 2, min_temp: -8.2, wind_speed: 0.8, rain: 10.4,
  },
  {
    location: '연천청산', temp: -4.7, max_temp: 1.8, min_temp: -10.5, wind_speed: 0.9, rain: 15.4,
  },
  {
    location: '양양', temp: 0.4, max_temp: 4.5, min_temp: -3.4, wind_speed: 3.5, rain: 32.9,
  },
  {
    location: '사북', temp: -5.8, max_temp: -1.4, min_temp: -9.9, wind_speed: 3.3, rain: 16.3,
  },
  {
    location: '무안', temp: 0.8, max_temp: 5, min_temp: -3.1, wind_speed: 2, rain: 29.6,
  },
  {
    location: '무주', temp: -2.6, max_temp: 3.8, min_temp: -8.2, wind_speed: 1.2, rain: 16.9,
  },
  {
    location: '익산', temp: -0.4, max_temp: 4.7, min_temp: -5.3, wind_speed: 1.4, rain: 21.5,
  },
  {
    location: '진안', temp: -3.1, max_temp: 3.2, min_temp: -8.8, wind_speed: 1.4, rain: 27.3,
  },
  {
    location: '담양', temp: 0, max_temp: 5.5, min_temp: -4.9, wind_speed: 1.7, rain: 27.2,
  },
  {
    location: '광산', temp: 0.4, max_temp: 5.6, min_temp: -4.1, wind_speed: 1.8, rain: 26,
  },
  {
    location: '구례', temp: 0, max_temp: 5.7, min_temp: -4.9, wind_speed: 1.7, rain: 22.1,
  },
  {
    location: '나주', temp: 0.3, max_temp: 5.7, min_temp: -4.2, wind_speed: 1.5, rain: 30.5,
  },
  {
    location: '순천시', temp: 2.5, max_temp: 7, min_temp: -1.3, wind_speed: 2.6, rain: 21.1,
  },
  {
    location: '광양읍', temp: 1.9, max_temp: 7.3, min_temp: -2.7, wind_speed: 2, rain: 20.8,
  },
  {
    location: '조선대', temp: 1.4, max_temp: 5.6, min_temp: -2.3, wind_speed: 1.9, rain: 26.8,
  },
  {
    location: '거문도', temp: 5, max_temp: 7.5, min_temp: 2.7, wind_speed: 5.7, rain: 29.8,
  },
  {
    location: '추자도', temp: 5, max_temp: 7.2, min_temp: 2.8, wind_speed: 5.1, rain: 27.2,
  },
  {
    location: '장성', temp: -0.4, max_temp: 5, min_temp: -4.9, wind_speed: 1.6, rain: 30.9,
  },
  {
    location: '영암', temp: 0.7, max_temp: 5.7, min_temp: -3.6, wind_speed: 2, rain: 26.1,
  },
  {
    location: '보성', temp: -0.2, max_temp: 5.4, min_temp: -5.1, wind_speed: 1.9, rain: 24.8,
  },
  {
    location: '완주', temp: -1, max_temp: 4.8, min_temp: -6.2, wind_speed: 1.5, rain: 26.2,
  },
  {
    location: '김제', temp: -0.4, max_temp: 4.3, min_temp: -4.5, wind_speed: 1.9, rain: 23.1,
  },
  {
    location: '화순', temp: 0.1, max_temp: 5.6, min_temp: -4.7, wind_speed: 1.4, rain: 28.6,
  },
  {
    location: '함평', temp: 0.9, max_temp: 5.8, min_temp: -3.3, wind_speed: 1.6, rain: 28.8,
  },
  {
    location: '곡성', temp: -0.7, max_temp: 5.1, min_temp: -5.4, wind_speed: 1.4, rain: 25.1,
  },
  {
    location: '성판악', temp: -0.4, max_temp: 2.8, min_temp: -3.1, wind_speed: 3.6, rain: 137.1,
  },
  {
    location: '풍암', temp: 0.6, max_temp: 5.6, min_temp: -3.6, wind_speed: 1.3, rain: 22.3,
  },
  {
    location: '압해도', temp: 1.7, max_temp: 5.4, min_temp: -1.5, wind_speed: 3.5, rain: 23.5,
  },
  {
    location: '영양', temp: -2.5, max_temp: 4, min_temp: -8.5, wind_speed: 1.7, rain: 19.4,
  },
  {
    location: '성주', temp: -1, max_temp: 5.5, min_temp: -7.1, wind_speed: 1.4, rain: 15.2,
  },
  {
    location: '고령', temp: -1.1, max_temp: 6.4, min_temp: -7.4, wind_speed: 0.8, rain: 18,
  },
  {
    location: '청도', temp: -1.1, max_temp: 6.1, min_temp: -6.8, wind_speed: 1.5, rain: 20.1,
  },
  {
    location: '예천', temp: -2.3, max_temp: 4.4, min_temp: -8.1, wind_speed: 1.3, rain: 16.2,
  },
  {
    location: '김천', temp: -1.4, max_temp: 4.7, min_temp: -6.8, wind_speed: 1.5, rain: 19.5,
  },
  {
    location: '군위', temp: -2.7, max_temp: 4.2, min_temp: -8.6, wind_speed: 1.5, rain: 14.4,
  },
  {
    location: '칠곡', temp: -0.4, max_temp: 5.4, min_temp: -5.8, wind_speed: 2.1, rain: 13.5,
  },
  {
    location: '경산', temp: 0.5, max_temp: 5.7, min_temp: -4, wind_speed: 1.9, rain: 19.1,
  },
  {
    location: '달성', temp: 0.6, max_temp: 6.6, min_temp: -4.2, wind_speed: 1.8, rain: 16.6,
  },
  {
    location: '서구', temp: 0.8, max_temp: 5.6, min_temp: -3.5, wind_speed: 1.7, rain: 16.8,
  },
  {
    location: '대구', temp: 1.1, max_temp: 5.9, min_temp: -2.9, wind_speed: 2.4, rain: 18.6,
  },
  {
    location: '전주', temp: 0, max_temp: 4.8, min_temp: -4.3, wind_speed: 1.5, rain: 26.9,
  },
  {
    location: '삼척', temp: 1.4, max_temp: 5.7, min_temp: -2.3, wind_speed: 2.2, rain: 38.6,
  },
  {
    location: '울기', temp: 3.3, max_temp: 7.6, min_temp: -0.3, wind_speed: 2.4, rain: 36,
  },
  {
    location: '삼천포', temp: 2.7, max_temp: 6.8, min_temp: -1, wind_speed: 2.4, rain: 25.6,
  },
  {
    location: '영도', temp: 3.5, max_temp: 7.2, min_temp: 0.1, wind_speed: 3, rain: 30.6,
  },
  {
    location: '고성', temp: 1.6, max_temp: 7.6, min_temp: -3.7, wind_speed: 1.9, rain: 26.2,
  },
  {
    location: '창녕', temp: -0.6, max_temp: 6.5, min_temp: -6.7, wind_speed: 1.7, rain: 18.2,
  },
  {
    location: '함안', temp: -0.7, max_temp: 7.5, min_temp: -7, wind_speed: 1, rain: 23.7,
  },
  {
    location: '가덕도', temp: 3.7, max_temp: 7.4, min_temp: 0.6, wind_speed: 4.5, rain: 26.9,
  },
  {
    location: '기장', temp: 2.9, max_temp: 8.1, min_temp: -1.9, wind_speed: 1.9, rain: 39.3,
  },
  {
    location: '간절곶', temp: 3.7, max_temp: 7.8, min_temp: -0.1, wind_speed: 3.3, rain: 39.6,
  },
  {
    location: '하동', temp: 1.7, max_temp: 7.2, min_temp: -3.2, wind_speed: 1.8, rain: 24.6,
  },
  {
    location: '해운대', temp: 3.9, max_temp: 8.5, min_temp: -0.1, wind_speed: 2.4, rain: 37.4,
  },
  {
    location: '부산진', temp: 2.7, max_temp: 7, min_temp: -1, wind_speed: 2.3, rain: 32.3,
  },
  {
    location: '동래', temp: 3.1, max_temp: 7.7, min_temp: -0.8, wind_speed: 2.1, rain: 32.7,
  },
  {
    location: '북구', temp: 2.2, max_temp: 6.7, min_temp: -1.7, wind_speed: 1.7, rain: 28.6,
  },
  {
    location: '부산남구', temp: 3.6, max_temp: 7.5, min_temp: -0.1, wind_speed: 2.1, rain: 32.2,
  },
  {
    location: '정자', temp: 2.9, max_temp: 7.7, min_temp: -1.7, wind_speed: 3, rain: 37.1,
  }],
  [{
    location: '속초', temp: 1.9, max_temp: 6, min_temp: -2.2, wind_speed: 2.5, rain: 45.9,
  },
  {
    location: '철원', temp: -2.3, max_temp: 4.1, min_temp: -8.6, wind_speed: 1.5, rain: 26.3,
  },
  {
    location: '동두천', temp: -0.8, max_temp: 5.8, min_temp: -6.2, wind_speed: 1.6, rain: 26,
  },
  {
    location: '파주', temp: -1.3, max_temp: 5.2, min_temp: -7.3, wind_speed: 1.6, rain: 27.9,
  },
  {
    location: '대관령', temp: -4.6, max_temp: 0.6, min_temp: -10.1, wind_speed: 4.4, rain: 49.2,
  },
  {
    location: '춘천', temp: -1, max_temp: 5.4, min_temp: -6.7, wind_speed: 1.2, rain: 27.6,
  },
  {
    location: '백령도', temp: 0, max_temp: 2.8, min_temp: -2.2, wind_speed: 4.4, rain: 17.4,
  },
  {
    location: '강릉', temp: 2.7, max_temp: 7.1, min_temp: -1.3, wind_speed: 3.1, rain: 48,
  },
  {
    location: '동해', temp: 2.8, max_temp: 7, min_temp: -1.4, wind_speed: 2.6, rain: 44,
  },
  {
    location: '서울', temp: 0.7, max_temp: 5.1, min_temp: -3.2, wind_speed: 2.5, rain: 28.2,
  },
  {
    location: '인천', temp: 0.7, max_temp: 4.8, min_temp: -2.8, wind_speed: 3.4, rain: 25.1,
  },
  {
    location: '원주', temp: -0.3, max_temp: 5.6, min_temp: -5.6, wind_speed: 1.1, rain: 28.5,
  },
  {
    location: '울릉도', temp: 2.5, max_temp: 5.6, min_temp: 0, wind_speed: 3.7, rain: 91.3,
  },
  {
    location: '수원', temp: 0.3, max_temp: 5.6, min_temp: -4.5, wind_speed: 1.8, rain: 28.3,
  },
  {
    location: '영월', temp: -0.8, max_temp: 5.8, min_temp: -6.8, wind_speed: 1.4, rain: 28.2,
  },
  {
    location: '충주', temp: -0.5, max_temp: 5.8, min_temp: -6.1, wind_speed: 1.6, rain: 29.4,
  },
  {
    location: '서산', temp: 0.1, max_temp: 5.6, min_temp: -4.9, wind_speed: 2.4, rain: 31.1,
  },
  {
    location: '울진', temp: 3, max_temp: 7.9, min_temp: -1.6, wind_speed: 3.5, rain: 36.9,
  },
  {
    location: '청주', temp: 1, max_temp: 6.4, min_temp: -3.8, wind_speed: 1.6, rain: 29,
  },
  {
    location: '대전', temp: 1.4, max_temp: 7, min_temp: -3.6, wind_speed: 1.7, rain: 37.2,
  },
  {
    location: '추풍령', temp: 0.5, max_temp: 5.9, min_temp: -4.5, wind_speed: 3.4, rain: 34.2,
  },
  {
    location: '안동', temp: 0.8, max_temp: 7, min_temp: -5.1, wind_speed: 1.8, rain: 24.9,
  },
  {
    location: '상주', temp: 1.4, max_temp: 7.1, min_temp: -3.5, wind_speed: 2.2, rain: 33.3,
  },
  {
    location: '포항', temp: 4.3, max_temp: 9, min_temp: 0.2, wind_speed: 2.7, rain: 36.5,
  },
  {
    location: '군산', temp: 1.6, max_temp: 6, min_temp: -2.4, wind_speed: 3.2, rain: 35.9,
  },
  {
    location: '울산', temp: 4.3, max_temp: 9.6, min_temp: -0.3, wind_speed: 2.3, rain: 39.9,
  },
  {
    location: '창원', temp: 4.6, max_temp: 9.4, min_temp: 0.3, wind_speed: 2.1, rain: 46,
  },
  {
    location: '광주', temp: 2.9, max_temp: 8.3, min_temp: -1.5, wind_speed: 2, rain: 43.6,
  },
  {
    location: '부산', temp: 5.4, max_temp: 10.2, min_temp: 1.5, wind_speed: 3.5, rain: 49.6,
  },
  {
    location: '통영', temp: 4.8, max_temp: 9.6, min_temp: 0.6, wind_speed: 2.7, rain: 49.5,
  },
  {
    location: '목포', temp: 3, max_temp: 7.6, min_temp: -0.6, wind_speed: 4.4, rain: 36.8,
  },
  {
    location: '여수', temp: 4.4, max_temp: 8.5, min_temp: 0.9, wind_speed: 4.7, rain: 44.6,
  },
  {
    location: '흑산도', temp: 3.8, max_temp: 6.5, min_temp: 1.8, wind_speed: 6.6, rain: 32.8,
  },
  {
    location: '완도', temp: 3.9, max_temp: 8.3, min_temp: 0.2, wind_speed: 4.1, rain: 52.6,
  },
  {
    location: '고창', temp: 1.8, max_temp: 7, min_temp: -2.8, wind_speed: 2.9, rain: 33.1,
  },
  {
    location: '제주', temp: 6.8, max_temp: 9.9, min_temp: 4, wind_speed: 3.8, rain: 57.2,
  },
  {
    location: '고산', temp: 6.6, max_temp: 9.4, min_temp: 4.1, wind_speed: 8.9, rain: 47.8,
  },
  {
    location: '성산', temp: 6.3, max_temp: 10.1, min_temp: 2.5, wind_speed: 3.5, rain: 83.2,
  },
  {
    location: '서귀포', temp: 8.2, max_temp: 11.8, min_temp: 4.8, wind_speed: 2.5, rain: 77.9,
  },
  {
    location: '진주', temp: 2.6, max_temp: 9.6, min_temp: -3.7, wind_speed: 1.5, rain: 45.6,
  },
  {
    location: '강화', temp: -0.7, max_temp: 4.5, min_temp: -5.8, wind_speed: 1.9, rain: 22.5,
  },
  {
    location: '양평', temp: -0.5, max_temp: 5.6, min_temp: -6.1, wind_speed: 1.4, rain: 28,
  },
  {
    location: '이천', temp: -0.3, max_temp: 6, min_temp: -6.1, wind_speed: 1.4, rain: 29.6,
  },
  {
    location: '인제', temp: -1.8, max_temp: 4.7, min_temp: -7.7, wind_speed: 1.8, rain: 22.8,
  },
  {
    location: '홍천', temp: -1.7, max_temp: 5.4, min_temp: -7.7, wind_speed: 1, rain: 26.2,
  },
  {
    location: '태백', temp: -2.5, max_temp: 3.1, min_temp: -7.8, wind_speed: 1.7, rain: 28.8,
  },
  {
    location: '정선군', temp: -1.3, max_temp: 5, min_temp: -6.7, wind_speed: 1.9, rain: 35.7,
  },
  {
    location: '제천', temp: -1.9, max_temp: 4.8, min_temp: -8.3, wind_speed: 1.6, rain: 32.2,
  },
  {
    location: '보은', temp: -0.6, max_temp: 6, min_temp: -6.6, wind_speed: 1.6, rain: 33,
  },
  {
    location: '천안', temp: 0, max_temp: 5.8, min_temp: -5.4, wind_speed: 1.9, rain: 27,
  },
  {
    location: '보령', temp: 1.2, max_temp: 6.2, min_temp: -3.3, wind_speed: 1.8, rain: 30.2,
  },
  {
    location: '부여', temp: 0.7, max_temp: 7.2, min_temp: -4.9, wind_speed: 1.2, rain: 37.6,
  },
  {
    location: '금산', temp: 0, max_temp: 6.8, min_temp: -6, wind_speed: 1.2, rain: 37.9,
  },
  {
    location: '부안', temp: 1.6, max_temp: 6.7, min_temp: -2.9, wind_speed: 1.7, rain: 36.4,
  },
  {
    location: '임실', temp: -0.3, max_temp: 6.5, min_temp: -6.2, wind_speed: 1.4, rain: 36.9,
  },
  {
    location: '정읍', temp: 1.7, max_temp: 7.1, min_temp: -2.9, wind_speed: 1.3, rain: 39,
  },
  {
    location: '남원', temp: 0.9, max_temp: 7.9, min_temp: -5, wind_speed: 1.6, rain: 39.4,
  },
  {
    location: '장수', temp: -0.8, max_temp: 5.8, min_temp: -6.6, wind_speed: 1.8, rain: 45.5,
  },
  {
    location: '영광군', temp: 1.5, max_temp: 6.4, min_temp: -3.2, wind_speed: 2.6, rain: 38.4,
  },
  {
    location: '김해시', temp: 5.1, max_temp: 10.4, min_temp: 0.5, wind_speed: 2.4, rain: 52.1,
  },
  {
    location: '순창군', temp: 1.4, max_temp: 7.5, min_temp: -3.9, wind_speed: 1.8, rain: 46.7,
  },
  {
    location: '양산시', temp: 4.6, max_temp: 9.9, min_temp: -0.4, wind_speed: 2.3, rain: 54.6,
  },
  {
    location: '강진군', temp: 2.9, max_temp: 8.3, min_temp: -1.8, wind_speed: 2.8, rain: 44.7,
  },
  {
    location: '장흥', temp: 2.6, max_temp: 8.8, min_temp: -3, wind_speed: 2.5, rain: 42.4,
  },
  {
    location: '해남', temp: 2.7, max_temp: 8.3, min_temp: -2.7, wind_speed: 2.5, rain: 39.3,
  },
  {
    location: '고흥', temp: 3.2, max_temp: 9.2, min_temp: -2.3, wind_speed: 2, rain: 46.5,
  },
  {
    location: '의령군', temp: 2.3, max_temp: 9.7, min_temp: -4.1, wind_speed: 1.5, rain: 34.7,
  },
  {
    location: '함양군', temp: 1.8, max_temp: 8.4, min_temp: -4.2, wind_speed: 1.8, rain: 30.5,
  },
  {
    location: '진도군', temp: 3.3, max_temp: 7.8, min_temp: -1.1, wind_speed: 2.7, rain: 46.4,
  },
  {
    location: '봉화', temp: -1.6, max_temp: 5.9, min_temp: -8.4, wind_speed: 1.4, rain: 25.9,
  },
  {
    location: '영주', temp: 0.2, max_temp: 5.8, min_temp: -5.4, wind_speed: 3.4, rain: 30.2,
  },
  {
    location: '문경', temp: 0.6, max_temp: 6.3, min_temp: -4.7, wind_speed: 2.2, rain: 29.7,
  },
  {
    location: '청송군', temp: -0.2, max_temp: 6.6, min_temp: -6.4, wind_speed: 1.6, rain: 24.1,
  },
  {
    location: '영덕', temp: 2.9, max_temp: 8.1, min_temp: -1.8, wind_speed: 3.1, rain: 30.5,
  },
  {
    location: '의성', temp: -0.3, max_temp: 7.8, min_temp: -7.5, wind_speed: 1.3, rain: 22.6,
  },
  {
    location: '구미', temp: 1.8, max_temp: 7.9, min_temp: -3.6, wind_speed: 1.8, rain: 27,
  },
  {
    location: '영천', temp: 1.7, max_temp: 8.3, min_temp: -4.2, wind_speed: 2.1, rain: 26,
  },
  {
    location: '경주시', temp: 2.3, max_temp: 8.4, min_temp: -3.1, wind_speed: 2.7, rain: 30.8,
  },
  {
    location: '거창', temp: 0.9, max_temp: 8.1, min_temp: -5.5, wind_speed: 1.5, rain: 34.1,
  },
  {
    location: '합천', temp: 2.2, max_temp: 9.7, min_temp: -4.1, wind_speed: 1.3, rain: 31.3,
  },
  {
    location: '밀양', temp: 2.8, max_temp: 9.9, min_temp: -3.6, wind_speed: 1.4, rain: 33,
  },
  {
    location: '산청', temp: 2.4, max_temp: 8.9, min_temp: -3.2, wind_speed: 2.1, rain: 40.9,
  },
  {
    location: '거제', temp: 4.4, max_temp: 9.4, min_temp: -0.2, wind_speed: 1.8, rain: 60.5,
  },
  {
    location: '남해', temp: 4, max_temp: 9.2, min_temp: -0.8, wind_speed: 1.8, rain: 65.2,
  },
  {
    location: '강남', temp: 1.4, max_temp: 5.6, min_temp: -2.2, wind_speed: 1.9, rain: 22.6,
  },
  {
    location: '서초', temp: 1.5, max_temp: 5.9, min_temp: -2.2, wind_speed: 1.6, rain: 26.8,
  },
  {
    location: '강동', temp: 0.6, max_temp: 5.9, min_temp: -3.9, wind_speed: 1.5, rain: 23.2,
  },
  {
    location: '송파', temp: 1.9, max_temp: 6.1, min_temp: -2, wind_speed: 1.8, rain: 23.4,
  },
  {
    location: '강서', temp: 0.7, max_temp: 5.3, min_temp: -3, wind_speed: 1.7, rain: 23.1,
  },
  {
    location: '양천', temp: 1.3, max_temp: 5.7, min_temp: -2.3, wind_speed: 1.5, rain: 23.6,
  },
  {
    location: '도봉', temp: 0.6, max_temp: 5.6, min_temp: -4.5, wind_speed: 1.3, rain: 28.1,
  },
  {
    location: '노원', temp: -0.2, max_temp: 5.7, min_temp: -5.8, wind_speed: 1.7, rain: 25.5,
  },
  {
    location: '동대문', temp: 1.7, max_temp: 6.1, min_temp: -2.1, wind_speed: 1.9, rain: 25.4,
  },
  {
    location: '중랑', temp: 1.4, max_temp: 5.7, min_temp: -2.5, wind_speed: 2, rain: 28.1,
  },
  {
    location: '기상청', temp: 1.4, max_temp: 5.7, min_temp: -2.2, wind_speed: 1.5, rain: 23.5,
  },
  {
    location: '마포', temp: 1.2, max_temp: 5.6, min_temp: -2.4, wind_speed: 2.5, rain: 25.1,
  },
  {
    location: '서대문', temp: 0.2, max_temp: 5.5, min_temp: -3.9, wind_speed: 1.8, rain: 25.8,
  },
  {
    location: '광진', temp: 1.4, max_temp: 5.9, min_temp: -2.3, wind_speed: 2, rain: 23.7,
  },
  {
    location: '성북', temp: 0.3, max_temp: 4.7, min_temp: -3.5, wind_speed: 1.6, rain: 24.8,
  },
  {
    location: '용산', temp: 1.2, max_temp: 5.6, min_temp: -2.3, wind_speed: 1.7, rain: 26.1,
  },
  {
    location: '은평', temp: 0, max_temp: 5.2, min_temp: -4.5, wind_speed: 1.8, rain: 22.9,
  },
  {
    location: '금천', temp: 1.6, max_temp: 5.6, min_temp: -1.8, wind_speed: 1.8, rain: 22.3,
  },
  {
    location: '중구', temp: -0.4, max_temp: 4.1, min_temp: -3.9, wind_speed: 2.6, rain: 21.5,
  },
  {
    location: '성동', temp: 1.8, max_temp: 5.8, min_temp: -1.7, wind_speed: 2.3, rain: 24.4,
  },
  {
    location: '구로', temp: 0.9, max_temp: 5.5, min_temp: -3.4, wind_speed: 1.9, rain: 26.1,
  },
  {
    location: '강북', temp: 1.5, max_temp: 5.8, min_temp: -2.5, wind_speed: 1.8, rain: 28.6,
  },
  {
    location: '남현', temp: 0.2, max_temp: 4.6, min_temp: -4.1, wind_speed: 1.4, rain: 36.3,
  },
  {
    location: '부천', temp: 1.4, max_temp: 5.6, min_temp: -2.3, wind_speed: 1.3, rain: 25.4,
  },
  {
    location: '안양', temp: 1.1, max_temp: 5.2, min_temp: -2.5, wind_speed: 2.4, rain: 27.1,
  },
  {
    location: '광명', temp: 1.6, max_temp: 5.6, min_temp: -2, wind_speed: 2, rain: 26.2,
  },
  {
    location: '군포', temp: 1.4, max_temp: 5.7, min_temp: -2.3, wind_speed: 1.5, rain: 28.8,
  },
  {
    location: '김포', temp: -0.5, max_temp: 4.6, min_temp: -5.1, wind_speed: 1.7, rain: 21.7,
  },
  {
    location: '하남', temp: 0.7, max_temp: 5.9, min_temp: -4.3, wind_speed: 0.9, rain: 18.3,
  },
  {
    location: '의왕', temp: 0, max_temp: 4.8, min_temp: -4.6, wind_speed: 1.2, rain: 26.4,
  },
  {
    location: '포천', temp: -1.1, max_temp: 5.3, min_temp: -7.1, wind_speed: 1.3, rain: 21.1,
  },
  {
    location: '가평조종', temp: -2.1, max_temp: 4.5, min_temp: -8.3, wind_speed: 1.3, rain: 28.9,
  },
  {
    location: '영등포', temp: 1.6, max_temp: 5.7, min_temp: -1.9, wind_speed: 1.7, rain: 20.7,
  },
  {
    location: '인천연수', temp: 0.7, max_temp: 5.2, min_temp: -3.5, wind_speed: 1.9, rain: 22.4,
  },
  {
    location: '안성', temp: 0.2, max_temp: 5.8, min_temp: -4.8, wind_speed: 1.4, rain: 23.3,
  },
  {
    location: '간성', temp: 1.1, max_temp: 5.8, min_temp: -3.7, wind_speed: 2.1, rain: 33.7,
  },
  {
    location: '평창', temp: -1.9, max_temp: 5.1, min_temp: -7.8, wind_speed: 1.2, rain: 22.8,
  },
  {
    location: '의정부', temp: -0.5, max_temp: 5.1, min_temp: -5.8, wind_speed: 1.1, rain: 25.2,
  },
  {
    location: '횡성', temp: -1.3, max_temp: 5.8, min_temp: -7.3, wind_speed: 1.2, rain: 24,
  },
  {
    location: '고양', temp: -0.4, max_temp: 5.6, min_temp: -6, wind_speed: 1.5, rain: 20.2,
  },
  {
    location: '남양주', temp: -0.7, max_temp: 6, min_temp: -6.9, wind_speed: 1.2, rain: 25.5,
  },
  {
    location: '안산', temp: -0.6, max_temp: 5.2, min_temp: -6.4, wind_speed: 1.9, rain: 25.6,
  },
  {
    location: '경기광주', temp: -0.4, max_temp: 5.4, min_temp: -5.7, wind_speed: 1.5, rain: 25,
  },
  {
    location: '여주', temp: -0.8, max_temp: 5.5, min_temp: -6.2, wind_speed: 1.4, rain: 23.9,
  },
  {
    location: '용인', temp: -0.4, max_temp: 5.7, min_temp: -6, wind_speed: 1.4, rain: 31.6,
  },
  {
    location: '오산', temp: -0.1, max_temp: 5.7, min_temp: -5.2, wind_speed: 1.4, rain: 24.2,
  },
  {
    location: '평택', temp: 0.7, max_temp: 5.8, min_temp: -4.3, wind_speed: 1.9, rain: 25,
  },
  {
    location: '화천', temp: -2, max_temp: 5.5, min_temp: -8.1, wind_speed: 1.2, rain: 21.2,
  },
  {
    location: '양구', temp: -2.6, max_temp: 5.1, min_temp: -8.8, wind_speed: 1.1, rain: 20.1,
  },
  {
    location: '시흥', temp: 0.5, max_temp: 5.2, min_temp: -3.9, wind_speed: 1.6, rain: 22.4,
  },
  {
    location: '구리', temp: 0.4, max_temp: 5.5, min_temp: -4.2, wind_speed: 1.5, rain: 22.5,
  },
  {
    location: '금곡', temp: -0.3, max_temp: 5, min_temp: -4.8, wind_speed: 1.4, rain: 21.9,
  },
  {
    location: '화성', temp: 0.3, max_temp: 5.1, min_temp: -4.1, wind_speed: 1.4, rain: 22.2,
  },
  {
    location: '성남', temp: 0.9, max_temp: 5.8, min_temp: -3.4, wind_speed: 1.4, rain: 25.3,
  },
  {
    location: '과천', temp: 0.3, max_temp: 5.7, min_temp: -4.5, wind_speed: 1.7, rain: 24.1,
  },
  {
    location: '진부령', temp: -3.1, max_temp: 1.8, min_temp: -7.7, wind_speed: 3.3, rain: 38.5,
  },
  {
    location: '양주', temp: -1.5, max_temp: 5, min_temp: -7.5, wind_speed: 1.3, rain: 23.2,
  },
  {
    location: '단양', temp: -0.5, max_temp: 5.7, min_temp: -5.8, wind_speed: 0.8, rain: 22.3,
  },
  {
    location: '진천', temp: 0, max_temp: 6.4, min_temp: -5.5, wind_speed: 1.3, rain: 25,
  },
  {
    location: '괴산', temp: -0.6, max_temp: 6.1, min_temp: -6.6, wind_speed: 1.1, rain: 33.6,
  },
  {
    location: '옥천', temp: 0.3, max_temp: 6.6, min_temp: -5.2, wind_speed: 1.2, rain: 32.5,
  },
  {
    location: '홍북', temp: 0.2, max_temp: 6, min_temp: -5, wind_speed: 1.6, rain: 29.9,
  },
  {
    location: '세종연서', temp: -0.1, max_temp: 6.9, min_temp: -5.4, wind_speed: 1.4, rain: 31.4,
  },
  {
    location: '공주', temp: 0.6, max_temp: 6.7, min_temp: -4.9, wind_speed: 1.4, rain: 33.8,
  },
  {
    location: '서천', temp: 0.9, max_temp: 6.3, min_temp: -3.9, wind_speed: 1.8, rain: 31.7,
  },
  {
    location: '논산', temp: 0.7, max_temp: 7.1, min_temp: -5, wind_speed: 1.5, rain: 33.7,
  },
  {
    location: '당진', temp: 0, max_temp: 5.2, min_temp: -4.6, wind_speed: 2.2, rain: 26.9,
  },
  {
    location: '청양', temp: -0.2, max_temp: 6.1, min_temp: -6.1, wind_speed: 1.4, rain: 34.1,
  },
  {
    location: '음성', temp: -1.1, max_temp: 5.9, min_temp: -7.4, wind_speed: 1.6, rain: 27.6,
  },
  {
    location: '증평', temp: -0.5, max_temp: 6, min_temp: -6.1, wind_speed: 1.3, rain: 27.2,
  },
  {
    location: '태안', temp: 1.1, max_temp: 5.4, min_temp: -2.9, wind_speed: 2, rain: 29.6,
  },
  {
    location: '예산', temp: 0.2, max_temp: 5.7, min_temp: -4.7, wind_speed: 1.9, rain: 25.6,
  },
  {
    location: '아산', temp: 0.2, max_temp: 5.2, min_temp: -4.3, wind_speed: 1.9, rain: 23.4,
  },
  {
    location: '계룡', temp: -0.2, max_temp: 6.4, min_temp: -6.6, wind_speed: 1.1, rain: 35.5,
  },
  {
    location: '문화', temp: 1.7, max_temp: 7.2, min_temp: -2.9, wind_speed: 1.3, rain: 35.2,
  },
  {
    location: '세천', temp: 0.4, max_temp: 6.6, min_temp: -5.1, wind_speed: 1.2, rain: 30.3,
  },
  {
    location: '장동', temp: 0.7, max_temp: 6.8, min_temp: -4.6, wind_speed: 1, rain: 29.4,
  },
  {
    location: '부평', temp: -0.7, max_temp: 5, min_temp: -5.9, wind_speed: 0.8, rain: 25,
  },
  {
    location: '연천청산', temp: -1.3, max_temp: 5.1, min_temp: -7.2, wind_speed: 1.2, rain: 22.7,
  },
  {
    location: '양양', temp: 1.9, max_temp: 6.2, min_temp: -2.4, wind_speed: 3.1, rain: 35.7,
  },
  {
    location: '사북', temp: -3.2, max_temp: 1.7, min_temp: -7.7, wind_speed: 3.3, rain: 34.7,
  },
  {
    location: '무안', temp: 2.4, max_temp: 7.3, min_temp: -2, wind_speed: 2.2, rain: 41.7,
  },
  {
    location: '무주', temp: 0.1, max_temp: 6.8, min_temp: -6.1, wind_speed: 1.4, rain: 28,
  },
  {
    location: '익산', temp: 1.8, max_temp: 7.4, min_temp: -3.6, wind_speed: 1.6, rain: 32.3,
  },
  {
    location: '진안', temp: -0.7, max_temp: 6, min_temp: -6.7, wind_speed: 1.6, rain: 34.3,
  },
  {
    location: '담양', temp: 2.1, max_temp: 8.4, min_temp: -3.2, wind_speed: 2, rain: 39.7,
  },
  {
    location: '광산', temp: 2.4, max_temp: 8.4, min_temp: -2.7, wind_speed: 2, rain: 36.8,
  },
  {
    location: '구례', temp: 2.3, max_temp: 8.9, min_temp: -3.5, wind_speed: 1.7, rain: 35.5,
  },
  {
    location: '나주', temp: 2.3, max_temp: 8.5, min_temp: -2.8, wind_speed: 1.6, rain: 40.3,
  },
  {
    location: '순천시', temp: 4.3, max_temp: 9.5, min_temp: 0.1, wind_speed: 2.4, rain: 44.2,
  },
  {
    location: '광양읍', temp: 3.8, max_temp: 9.9, min_temp: -1.1, wind_speed: 2, rain: 41.2,
  },
  {
    location: '조선대', temp: 3.3, max_temp: 8.3, min_temp: -0.9, wind_speed: 2.1, rain: 40.8,
  },
  {
    location: '거문도', temp: 6.1, max_temp: 9.2, min_temp: 3.7, wind_speed: 5.2, rain: 50.9,
  },
  {
    location: '추자도', temp: 5.7, max_temp: 8.4, min_temp: 3.3, wind_speed: 4.8, rain: 40.3,
  },
  {
    location: '장성', temp: 1.7, max_temp: 7.8, min_temp: -3.3, wind_speed: 1.7, rain: 40,
  },
  {
    location: '영암', temp: 2.5, max_temp: 8.3, min_temp: -2.3, wind_speed: 2.1, rain: 34,
  },
  {
    location: '보성', temp: 1.8, max_temp: 8, min_temp: -3.7, wind_speed: 2, rain: 47.9,
  },
  {
    location: '완주', temp: 1.2, max_temp: 7.6, min_temp: -4.4, wind_speed: 1.8, rain: 39.3,
  },
  {
    location: '김제', temp: 1.7, max_temp: 7, min_temp: -2.8, wind_speed: 2.3, rain: 29.9,
  },
  {
    location: '화순', temp: 2.3, max_temp: 8.4, min_temp: -3.1, wind_speed: 1.5, rain: 40.4,
  },
  {
    location: '함평', temp: 2.7, max_temp: 8.1, min_temp: -2.1, wind_speed: 1.8, rain: 36.3,
  },
  {
    location: '곡성', temp: 1.6, max_temp: 8.2, min_temp: -3.6, wind_speed: 1.5, rain: 39.7,
  },
  {
    location: '성판악', temp: 1, max_temp: 4.7, min_temp: -2.3, wind_speed: 3.5, rain: 182.4,
  },
  {
    location: '풍암', temp: 2.8, max_temp: 8.5, min_temp: -2, wind_speed: 1.5, rain: 41.1,
  },
  {
    location: '압해도', temp: 2.9, max_temp: 7.1, min_temp: -0.6, wind_speed: 3.7, rain: 33.6,
  },
  {
    location: '영양', temp: 0.1, max_temp: 6.9, min_temp: -6.2, wind_speed: 1.7, rain: 22.8,
  },
  {
    location: '성주', temp: 1.7, max_temp: 8.5, min_temp: -4.9, wind_speed: 1.5, rain: 28.3,
  },
  {
    location: '고령', temp: 1.7, max_temp: 9.2, min_temp: -5.1, wind_speed: 1, rain: 30.2,
  },
  {
    location: '청도', temp: 1.6, max_temp: 8.8, min_temp: -4.5, wind_speed: 1.5, rain: 29.7,
  },
  {
    location: '예천', temp: 0.4, max_temp: 7.4, min_temp: -5.7, wind_speed: 1.3, rain: 22.8,
  },
  {
    location: '김천', temp: 1.2, max_temp: 7.8, min_temp: -4.7, wind_speed: 1.5, rain: 25.3,
  },
  {
    location: '군위', temp: 0.1, max_temp: 7.4, min_temp: -6.4, wind_speed: 1.6, rain: 20.2,
  },
  {
    location: '칠곡', temp: 2, max_temp: 8.5, min_temp: -3.9, wind_speed: 2.1, rain: 22,
  },
  {
    location: '경산', temp: 3, max_temp: 8.7, min_temp: -2, wind_speed: 2, rain: 26.9,
  },
  {
    location: '달성', temp: 3.1, max_temp: 9.5, min_temp: -2.2, wind_speed: 1.8, rain: 28.2,
  },
  {
    location: '서구', temp: 3.3, max_temp: 8.6, min_temp: -1.6, wind_speed: 1.8, rain: 25.5,
  },
  {
    location: '대구', temp: 3.5, max_temp: 8.8, min_temp: -1.1, wind_speed: 2.4, rain: 25.4,
  },
  {
    location: '전주', temp: 2, max_temp: 7.5, min_temp: -2.8, wind_speed: 1.7, rain: 36.8,
  },
  {
    location: '삼척', temp: 2.9, max_temp: 7.2, min_temp: -1.1, wind_speed: 2.2, rain: 41.1,
  },
  {
    location: '울기', temp: 5.1, max_temp: 9.4, min_temp: 1.5, wind_speed: 2.5, rain: 41.9,
  },
  {
    location: '삼천포', temp: 4.5, max_temp: 8.9, min_temp: 0.6, wind_speed: 2.3, rain: 44.7,
  },
  {
    location: '영도', temp: 5.2, max_temp: 9, min_temp: 1.9, wind_speed: 3.3, rain: 38.9,
  },
  {
    location: '고성', temp: 3.7, max_temp: 9.8, min_temp: -1.9, wind_speed: 2, rain: 43.2,
  },
  {
    location: '창녕', temp: 2.1, max_temp: 9.5, min_temp: -4.5, wind_speed: 1.8, rain: 29.5,
  },
  {
    location: '함안', temp: 2.1, max_temp: 10.4, min_temp: -4.7, wind_speed: 1.2, rain: 38.8,
  },
  {
    location: '가덕도', temp: 5.4, max_temp: 9.4, min_temp: 2, wind_speed: 4.2, rain: 36.4,
  },
  {
    location: '기장', temp: 4.7, max_temp: 10, min_temp: -0.4, wind_speed: 2, rain: 51.7,
  },
  {
    location: '간절곶', temp: 5.4, max_temp: 9.3, min_temp: 1.6, wind_speed: 3.6, rain: 47.3,
  },
  {
    location: '하동', temp: 3.8, max_temp: 9.7, min_temp: -1.5, wind_speed: 1.8, rain: 47.2,
  },
  {
    location: '해운대', temp: 5.7, max_temp: 10.3, min_temp: 1.6, wind_speed: 2.4, rain: 52.5,
  },
  {
    location: '부산진', temp: 4.8, max_temp: 9.3, min_temp: 0.9, wind_speed: 2.3, rain: 48.1,
  },
  {
    location: '동래', temp: 5, max_temp: 9.8, min_temp: 0.8, wind_speed: 2, rain: 48.7,
  },
  {
    location: '북구', temp: 4.3, max_temp: 9, min_temp: 0.1, wind_speed: 1.9, rain: 43.7,
  },
  {
    location: '부산남구', temp: 5.5, max_temp: 9.6, min_temp: 1.6, wind_speed: 2.1, rain: 47.3,
  },
  {
    location: '정자', temp: 4.6, max_temp: 9.5, min_temp: -0.4, wind_speed: 3.1, rain: 43.6,
  }],
  [{
    location: '속초', temp: 6.3, max_temp: 10.6, min_temp: 1.8, wind_speed: 2.7, rain: 52.3,
  },
  {
    location: '철원', temp: 3.7, max_temp: 10.2, min_temp: -2.6, wind_speed: 2, rain: 30.8,
  },
  {
    location: '동두천', temp: 5, max_temp: 12.1, min_temp: -0.8, wind_speed: 2, rain: 32,
  },
  {
    location: '파주', temp: 4.4, max_temp: 11.2, min_temp: -1.9, wind_speed: 1.9, rain: 31.5,
  },
  {
    location: '대관령', temp: 0.4, max_temp: 5.5, min_temp: -4.7, wind_speed: 4.2, rain: 72.6,
  },
  {
    location: '춘천', temp: 5, max_temp: 11.6, min_temp: -1.1, wind_speed: 1.5, rain: 33.5,
  },
  {
    location: '백령도', temp: 3.8, max_temp: 7.1, min_temp: 1.3, wind_speed: 4.8, rain: 18.2,
  },
  {
    location: '강릉', temp: 7, max_temp: 11.7, min_temp: 2.6, wind_speed: 2.9, rain: 65.1,
  },
  {
    location: '동해', temp: 6.8, max_temp: 11.2, min_temp: 2.4, wind_speed: 2.8, rain: 57.6,
  },
  {
    location: '서울', temp: 6.1, max_temp: 11, min_temp: 1.9, wind_speed: 2.7, rain: 36.9,
  },
  {
    location: '인천', temp: 5.6, max_temp: 10.1, min_temp: 2.1, wind_speed: 3.6, rain: 33.8,
  },
  {
    location: '원주', temp: 5.5, max_temp: 11.8, min_temp: -0.3, wind_speed: 1.4, rain: 43.8,
  },
  {
    location: '울릉도', temp: 5.8, max_temp: 9.6, min_temp: 2.9, wind_speed: 4.1, rain: 76.4,
  },
  {
    location: '수원', temp: 5.7, max_temp: 11.3, min_temp: 0.6, wind_speed: 2, rain: 40.7,
  },
  {
    location: '영월', temp: 4.9, max_temp: 11.8, min_temp: -1.5, wind_speed: 1.7, rain: 45.1,
  },
  {
    location: '충주', temp: 5.3, max_temp: 11.9, min_temp: -0.9, wind_speed: 1.8, rain: 41.5,
  },
  {
    location: '서산', temp: 4.9, max_temp: 10.8, min_temp: -0.7, wind_speed: 2.8, rain: 41.5,
  },
  {
    location: '울진', temp: 6.9, max_temp: 11.8, min_temp: 2.1, wind_speed: 3.5, rain: 56,
  },
  {
    location: '청주', temp: 6.5, max_temp: 12.5, min_temp: 1, wind_speed: 1.9, rain: 42.9,
  },
  {
    location: '대전', temp: 6.6, max_temp: 12.7, min_temp: 1.1, wind_speed: 2, rain: 51.6,
  },
  {
    location: '추풍령', temp: 5.6, max_temp: 11.8, min_temp: -0.3, wind_speed: 3.1, rain: 52.9,
  },
  {
    location: '안동', temp: 6, max_temp: 12.6, min_temp: -0.2, wind_speed: 1.9, rain: 44.5,
  },
  {
    location: '상주', temp: 6.8, max_temp: 13.2, min_temp: 1, wind_speed: 2.3, rain: 46.9,
  },
  {
    location: '포항', temp: 8.6, max_temp: 13.3, min_temp: 4.2, wind_speed: 2.8, rain: 60.5,
  },
  {
    location: '군산', temp: 5.8, max_temp: 10.8, min_temp: 1.5, wind_speed: 3.6, rain: 44.7,
  },
  {
    location: '울산', temp: 8.4, max_temp: 13.7, min_temp: 3.5, wind_speed: 2.3, rain: 68.4,
  },
  {
    location: '창원', temp: 8.7, max_temp: 13.8, min_temp: 4.4, wind_speed: 2.1, rain: 78.5,
  },
  {
    location: '광주', temp: 7.5, max_temp: 13.6, min_temp: 2.4, wind_speed: 2.1, rain: 61.9,
  },
  {
    location: '부산', temp: 9.1, max_temp: 13.8, min_temp: 5.3, wind_speed: 3.8, rain: 89.7,
  },
  {
    location: '통영', temp: 8.7, max_temp: 13.3, min_temp: 4.5, wind_speed: 2.7, rain: 92.4,
  },
  {
    location: '목포', temp: 6.9, max_temp: 11.9, min_temp: 2.9, wind_speed: 4.3, rain: 64.9,
  },
  {
    location: '여수', temp: 8.3, max_temp: 12.4, min_temp: 4.8, wind_speed: 4.5, rain: 83.9,
  },
  {
    location: '흑산도', temp: 6.5, max_temp: 9.9, min_temp: 3.9, wind_speed: 6, rain: 50.8,
  },
  {
    location: '완도', temp: 7.8, max_temp: 12.6, min_temp: 3.6, wind_speed: 3.8, rain: 103.7,
  },
  {
    location: '고창', temp: 6.3, max_temp: 12.6, min_temp: 0.6, wind_speed: 3, rain: 47,
  },
  {
    location: '제주', temp: 9.8, max_temp: 13.3, min_temp: 6.6, wind_speed: 3.6, rain: 90.6,
  },
  {
    location: '고산', temp: 9.4, max_temp: 12.5, min_temp: 6.5, wind_speed: 7.8, rain: 76.2,
  },
  {
    location: '성산', temp: 9.5, max_temp: 13.6, min_temp: 5.2, wind_speed: 3.5, rain: 139.4,
  },
  {
    location: '서귀포', temp: 11, max_temp: 14.7, min_temp: 7.5, wind_speed: 2.7, rain: 130.3,
  },
  {
    location: '진주', temp: 7.3, max_temp: 14.2, min_temp: 0.6, wind_speed: 1.6, rain: 77.6,
  },
  {
    location: '강화', temp: 4.6, max_temp: 9.8, min_temp: -0.6, wind_speed: 2.3, rain: 31.4,
  },
  {
    location: '양평', temp: 5.4, max_temp: 11.9, min_temp: -0.7, wind_speed: 1.6, rain: 38,
  },
  {
    location: '이천', temp: 5.4, max_temp: 12.2, min_temp: -0.9, wind_speed: 1.7, rain: 42.9,
  },
  {
    location: '인제', temp: 4, max_temp: 10.5, min_temp: -1.9, wind_speed: 2.1, rain: 32.1,
  },
  {
    location: '홍천', temp: 4.4, max_temp: 11.7, min_temp: -2, wind_speed: 1.3, rain: 36.7,
  },
  {
    location: '태백', temp: 2.4, max_temp: 7.9, min_temp: -2.9, wind_speed: 1.9, rain: 54.8,
  },
  {
    location: '정선군', temp: 4.6, max_temp: 11.4, min_temp: -1.4, wind_speed: 2.2, rain: 37,
  },
  {
    location: '제천', temp: 3.8, max_temp: 10.8, min_temp: -2.9, wind_speed: 1.8, rain: 49.7,
  },
  {
    location: '보은', temp: 4.8, max_temp: 11.9, min_temp: -1.8, wind_speed: 1.7, rain: 47.5,
  },
  {
    location: '천안', temp: 5.3, max_temp: 11.8, min_temp: -0.8, wind_speed: 2.2, rain: 38.3,
  },
  {
    location: '보령', temp: 5.5, max_temp: 10.8, min_temp: 0.4, wind_speed: 2, rain: 42,
  },
  {
    location: '부여', temp: 5.7, max_temp: 12.7, min_temp: -0.6, wind_speed: 1.4, rain: 50.9,
  },
  {
    location: '금산', temp: 5.2, max_temp: 12.5, min_temp: -1.5, wind_speed: 1.4, rain: 52.3,
  },
  {
    location: '부안', temp: 5.9, max_temp: 11.8, min_temp: 0.7, wind_speed: 2, rain: 47.3,
  },
  {
    location: '임실', temp: 4.6, max_temp: 12.1, min_temp: -2, wind_speed: 1.6, rain: 53.8,
  },
  {
    location: '정읍', temp: 6.4, max_temp: 12.7, min_temp: 1, wind_speed: 1.4, rain: 56,
  },
  {
    location: '남원', temp: 5.9, max_temp: 13.4, min_temp: -0.8, wind_speed: 1.8, rain: 56.7,
  },
  {
    location: '장수', temp: 4.3, max_temp: 11.2, min_temp: -2, wind_speed: 2, rain: 64.5,
  },
  {
    location: '영광군', temp: 6, max_temp: 11.8, min_temp: 0.5, wind_speed: 2.6, rain: 58.2,
  },
  {
    location: '김해시', temp: 9.3, max_temp: 14.9, min_temp: 4.4, wind_speed: 2.4, rain: 84.6,
  },
  {
    location: '순창군', temp: 6.3, max_temp: 13.1, min_temp: -0.1, wind_speed: 2.1, rain: 62.1,
  },
  {
    location: '양산시', temp: 8.9, max_temp: 14.7, min_temp: 3.6, wind_speed: 2.7, rain: 83.1,
  },
  {
    location: '강진군', temp: 7.1, max_temp: 13.3, min_temp: 1.4, wind_speed: 2.9, rain: 80.4,
  },
  {
    location: '장흥', temp: 6.8, max_temp: 13.4, min_temp: 0.5, wind_speed: 2.4, rain: 78.7,
  },
  {
    location: '해남', temp: 6.7, max_temp: 12.8, min_temp: 0.6, wind_speed: 2.6, rain: 78.3,
  },
  {
    location: '고흥', temp: 7.4, max_temp: 13.5, min_temp: 1.4, wind_speed: 2, rain: 86.7,
  },
  {
    location: '의령군', temp: 7.7, max_temp: 15.3, min_temp: 0.6, wind_speed: 1.7, rain: 73.5,
  },
  {
    location: '함양군', temp: 7, max_temp: 14.3, min_temp: -0.1, wind_speed: 1.8, rain: 60.5,
  },
  {
    location: '진도군', temp: 7, max_temp: 12.2, min_temp: 1.8, wind_speed: 2.7, rain: 75.9,
  },
  {
    location: '봉화', temp: 3.7, max_temp: 11.2, min_temp: -3.2, wind_speed: 1.5, rain: 46.6,
  },
  {
    location: '영주', temp: 5.4, max_temp: 11.5, min_temp: -0.6, wind_speed: 3.1, rain: 53.3,
  },
  {
    location: '문경', temp: 5.8, max_temp: 12.1, min_temp: -0.1, wind_speed: 2.3, rain: 48.7,
  },
  {
    location: '청송군', temp: 5.2, max_temp: 12.9, min_temp: -1.8, wind_speed: 1.7, rain: 46.4,
  },
  {
    location: '영덕', temp: 7, max_temp: 12.5, min_temp: 1.7, wind_speed: 3.1, rain: 49.1,
  },
  {
    location: '의성', temp: 5.3, max_temp: 13.4, min_temp: -2.2, wind_speed: 1.5, rain: 41.5,
  },
  {
    location: '구미', temp: 7.1, max_temp: 13.6, min_temp: 0.9, wind_speed: 1.8, rain: 47.7,
  },
  {
    location: '영천', temp: 6.6, max_temp: 13.6, min_temp: 0, wind_speed: 2.1, rain: 50,
  },
  {
    location: '경주시', temp: 7.4, max_temp: 14.4, min_temp: 1, wind_speed: 2.9, rain: 59.7,
  },
  {
    location: '거창', temp: 5.9, max_temp: 13.3, min_temp: -1, wind_speed: 1.7, rain: 55.4,
  },
  {
    location: '합천', temp: 7.3, max_temp: 14.6, min_temp: 0.5, wind_speed: 1.5, rain: 54,
  },
  {
    location: '밀양', temp: 7.7, max_temp: 14.7, min_temp: 0.9, wind_speed: 1.6, rain: 59,
  },
  {
    location: '산청', temp: 6.9, max_temp: 13.7, min_temp: 0.8, wind_speed: 2.1, rain: 66.8,
  },
  {
    location: '거제', temp: 8.4, max_temp: 13.5, min_temp: 3.5, wind_speed: 1.9, rain: 112.2,
  },
  {
    location: '남해', temp: 8.2, max_temp: 13.7, min_temp: 3.2, wind_speed: 1.8, rain: 113.1,
  },
  {
    location: '강남', temp: 7, max_temp: 11.6, min_temp: 2.9, wind_speed: 2, rain: 34.2,
  },
  {
    location: '서초', temp: 7, max_temp: 12, min_temp: 2.7, wind_speed: 1.7, rain: 34.3,
  },
  {
    location: '강동', temp: 6.3, max_temp: 12.1, min_temp: 1.4, wind_speed: 1.7, rain: 31.7,
  },
  {
    location: '송파', temp: 7.3, max_temp: 12.2, min_temp: 3, wind_speed: 2, rain: 32.1,
  },
  {
    location: '강서', temp: 6.2, max_temp: 11, min_temp: 2.1, wind_speed: 1.9, rain: 31.3,
  },
  {
    location: '양천', temp: 6.8, max_temp: 11.8, min_temp: 2.8, wind_speed: 1.7, rain: 32.8,
  },
  {
    location: '도봉', temp: 6, max_temp: 11.7, min_temp: 0.6, wind_speed: 1.5, rain: 33.3,
  },
  {
    location: '노원', temp: 5.7, max_temp: 11.9, min_temp: -0.6, wind_speed: 2, rain: 32.5,
  },
  {
    location: '동대문', temp: 7.1, max_temp: 12, min_temp: 2.9, wind_speed: 2.2, rain: 32.2,
  },
  {
    location: '중랑', temp: 7, max_temp: 11.8, min_temp: 2.7, wind_speed: 2.4, rain: 36.2,
  },
  {
    location: '기상청', temp: 6.8, max_temp: 11.6, min_temp: 2.7, wind_speed: 1.8, rain: 33.3,
  },
  {
    location: '마포', temp: 6.7, max_temp: 11.7, min_temp: 2.8, wind_speed: 2.6, rain: 30.6,
  },
  {
    location: '서대문', temp: 5.8, max_temp: 11.7, min_temp: 1.1, wind_speed: 1.9, rain: 33,
  },
  {
    location: '광진', temp: 6.9, max_temp: 11.9, min_temp: 2.7, wind_speed: 2.2, rain: 29,
  },
  {
    location: '성북', temp: 5.9, max_temp: 10.8, min_temp: 1.6, wind_speed: 1.9, rain: 33.4,
  },
  {
    location: '용산', temp: 6.8, max_temp: 11.6, min_temp: 2.7, wind_speed: 1.9, rain: 32.9,
  },
  {
    location: '은평', temp: 5.6, max_temp: 11.1, min_temp: 0.5, wind_speed: 2, rain: 28.3,
  },
  {
    location: '금천', temp: 6.7, max_temp: 11.1, min_temp: 2.9, wind_speed: 2, rain: 34.8,
  },
  {
    location: '중구', temp: 5.1, max_temp: 10.5, min_temp: 1.1, wind_speed: 2.6, rain: 30.3,
  },
  {
    location: '성동', temp: 7.1, max_temp: 11.5, min_temp: 3.2, wind_speed: 2.7, rain: 29.7,
  },
  {
    location: '구로', temp: 6, max_temp: 11.2, min_temp: 1.5, wind_speed: 2.2, rain: 32.4,
  },
  {
    location: '강북', temp: 6.9, max_temp: 11.7, min_temp: 2.6, wind_speed: 2.1, rain: 36,
  },
  {
    location: '남현', temp: 6.1, max_temp: 11.4, min_temp: 1.4, wind_speed: 1.5, rain: 32.2,
  },
  {
    location: '부천', temp: 6.6, max_temp: 11.2, min_temp: 2.6, wind_speed: 1.5, rain: 34.9,
  },
  {
    location: '안양', temp: 6.3, max_temp: 10.8, min_temp: 2.4, wind_speed: 2.5, rain: 36.5,
  },
  {
    location: '광명', temp: 6.7, max_temp: 11.3, min_temp: 2.8, wind_speed: 2.2, rain: 38.3,
  },
  {
    location: '군포', temp: 6.5, max_temp: 11.4, min_temp: 2.4, wind_speed: 1.8, rain: 41.6,
  },
  {
    location: '김포', temp: 5.1, max_temp: 10.5, min_temp: 0.3, wind_speed: 2, rain: 30.5,
  },
  {
    location: '하남', temp: 6.2, max_temp: 12.1, min_temp: 0.9, wind_speed: 1.1, rain: 31,
  },
  {
    location: '의왕', temp: 5.2, max_temp: 10.6, min_temp: 0.2, wind_speed: 1.4, rain: 36.4,
  },
  {
    location: '포천', temp: 4.8, max_temp: 11.6, min_temp: -1.6, wind_speed: 1.6, rain: 29.6,
  },
  {
    location: '가평조종', temp: 3.8, max_temp: 11, min_temp: -2.9, wind_speed: 1.5, rain: 32.3,
  },
  {
    location: '영등포', temp: 6.9, max_temp: 11.7, min_temp: 3.2, wind_speed: 1.9, rain: 29.9,
  },
  {
    location: '인천연수', temp: 5.8, max_temp: 10.7, min_temp: 1.4, wind_speed: 2.2, rain: 28.8,
  },
  {
    location: '안성', temp: 5.6, max_temp: 12.2, min_temp: -0.2, wind_speed: 1.6, rain: 34.9,
  },
  {
    location: '간성', temp: 5.6, max_temp: 10.7, min_temp: 0.4, wind_speed: 2.1, rain: 49.4,
  },
  {
    location: '평창', temp: 3.9, max_temp: 11, min_temp: -2.4, wind_speed: 1.4, rain: 40.3,
  },
  {
    location: '의정부', temp: 5.1, max_temp: 11.5, min_temp: -0.6, wind_speed: 1.3, rain: 33.3,
  },
  {
    location: '횡성', temp: 4.6, max_temp: 12.3, min_temp: -1.9, wind_speed: 1.5, rain: 43.5,
  },
  {
    location: '고양', temp: 5.2, max_temp: 11.7, min_temp: -0.6, wind_speed: 1.7, rain: 23.5,
  },
  {
    location: '남양주', temp: 5.1, max_temp: 12.1, min_temp: -1.6, wind_speed: 1.6, rain: 29.7,
  },
  {
    location: '안산', temp: 4.7, max_temp: 11.1, min_temp: -1.4, wind_speed: 2.3, rain: 35.7,
  },
  {
    location: '경기광주', temp: 5.3, max_temp: 11.7, min_temp: -0.5, wind_speed: 1.8, rain: 35.5,
  },
  {
    location: '여주', temp: 5.1, max_temp: 12.2, min_temp: -0.9, wind_speed: 1.8, rain: 34.2,
  },
  {
    location: '용인', temp: 5.2, max_temp: 11.7, min_temp: -1, wind_speed: 1.7, rain: 40.3,
  },
  {
    location: '오산', temp: 5.4, max_temp: 11.8, min_temp: -0.1, wind_speed: 1.7, rain: 34.6,
  },
  {
    location: '평택', temp: 5.9, max_temp: 11.8, min_temp: 0.3, wind_speed: 2.1, rain: 33.1,
  },
  {
    location: '화천', temp: 4.1, max_temp: 11.9, min_temp: -2.4, wind_speed: 1.4, rain: 28.4,
  },
  {
    location: '양구', temp: 3.7, max_temp: 11.3, min_temp: -2.8, wind_speed: 1.4, rain: 27.1,
  },
  {
    location: '시흥', temp: 5.6, max_temp: 10.7, min_temp: 1, wind_speed: 2.1, rain: 29.6,
  },
  {
    location: '구리', temp: 6.1, max_temp: 11.7, min_temp: 0.9, wind_speed: 1.7, rain: 32.7,
  },
  {
    location: '금곡', temp: 5, max_temp: 10.5, min_temp: 0.2, wind_speed: 1.6, rain: 29.1,
  },
  {
    location: '화성', temp: 5.3, max_temp: 10.8, min_temp: 0.5, wind_speed: 1.7, rain: 32.5,
  },
  {
    location: '성남', temp: 6.5, max_temp: 12, min_temp: 1.6, wind_speed: 1.6, rain: 36,
  },
  {
    location: '과천', temp: 5.9, max_temp: 11.7, min_temp: 0.6, wind_speed: 2.1, rain: 32.7,
  },
  {
    location: '진부령', temp: 2.1, max_temp: 7.4, min_temp: -2.7, wind_speed: 3.3, rain: 54.3,
  },
  {
    location: '양주', temp: 4.5, max_temp: 11.2, min_temp: -1.9, wind_speed: 1.6, rain: 30.6,
  },
  {
    location: '단양', temp: 5.2, max_temp: 11.9, min_temp: -0.6, wind_speed: 1, rain: 38.4,
  },
  {
    location: '진천', temp: 5.5, max_temp: 12.7, min_temp: -0.8, wind_speed: 1.5, rain: 40.2,
  },
  {
    location: '괴산', temp: 5, max_temp: 12.2, min_temp: -1.7, wind_speed: 1.4, rain: 47.5,
  },
  {
    location: '옥천', temp: 5.7, max_temp: 12.7, min_temp: -0.6, wind_speed: 1.4, rain: 48,
  },
  {
    location: '홍북', temp: 5.3, max_temp: 12, min_temp: -0.7, wind_speed: 2, rain: 39.4,
  },
  {
    location: '세종연서', temp: 5.5, max_temp: 13.1, min_temp: -0.8, wind_speed: 1.7, rain: 42.4,
  },
  {
    location: '공주', temp: 5.9, max_temp: 12.9, min_temp: -0.4, wind_speed: 1.7, rain: 41.2,
  },
  {
    location: '서천', temp: 5.2, max_temp: 11.2, min_temp: -0.2, wind_speed: 2.1, rain: 42.4,
  },
  {
    location: '논산', temp: 5.6, max_temp: 12.9, min_temp: -0.9, wind_speed: 1.8, rain: 46.3,
  },
  {
    location: '당진', temp: 4.9, max_temp: 10.9, min_temp: -0.2, wind_speed: 2.6, rain: 34.6,
  },
  {
    location: '청양', temp: 4.8, max_temp: 11.8, min_temp: -1.9, wind_speed: 1.6, rain: 44.7,
  },
  {
    location: '음성', temp: 4.4, max_temp: 12.1, min_temp: -2.5, wind_speed: 1.8, rain: 43.1,
  },
  {
    location: '증평', temp: 5.1, max_temp: 12.4, min_temp: -1.3, wind_speed: 1.6, rain: 38.9,
  },
  {
    location: '태안', temp: 5.3, max_temp: 10.2, min_temp: 1, wind_speed: 2.2, rain: 34.5,
  },
  {
    location: '예산', temp: 5.4, max_temp: 11.9, min_temp: -0.2, wind_speed: 2.3, rain: 36.7,
  },
  {
    location: '아산', temp: 5.4, max_temp: 11.5, min_temp: 0.2, wind_speed: 2.2, rain: 31.9,
  },
  {
    location: '계룡', temp: 5, max_temp: 12.2, min_temp: -2.2, wind_speed: 1.3, rain: 47.6,
  },
  {
    location: '문화', temp: 7.1, max_temp: 13.3, min_temp: 1.5, wind_speed: 1.5, rain: 47.3,
  },
  {
    location: '세천', temp: 5.8, max_temp: 12.6, min_temp: -0.7, wind_speed: 1.3, rain: 42.8,
  },
  {
    location: '장동', temp: 6, max_temp: 12.7, min_temp: -0.1, wind_speed: 1.3, rain: 36.4,
  },
  {
    location: '부평', temp: 5.4, max_temp: 11.9, min_temp: -0.4, wind_speed: 1.1, rain: 24.6,
  },
  {
    location: '연천청산', temp: 4.8, max_temp: 11.5, min_temp: -1.6, wind_speed: 1.5, rain: 29.1,
  },
  {
    location: '양양', temp: 6.5, max_temp: 11.2, min_temp: 1.6, wind_speed: 3, rain: 65.6,
  },
  {
    location: '사북', temp: 2.4, max_temp: 7.6, min_temp: -2.4, wind_speed: 3.6, rain: 44.5,
  },
  {
    location: '무안', temp: 6.4, max_temp: 11.9, min_temp: 1.3, wind_speed: 2.3, rain: 56.4,
  },
  {
    location: '무주', temp: 5.4, max_temp: 12.7, min_temp: -1.6, wind_speed: 1.7, rain: 45.5,
  },
  {
    location: '익산', temp: 6.2, max_temp: 12.8, min_temp: 0.4, wind_speed: 1.8, rain: 42.7,
  },
  {
    location: '진안', temp: 4.2, max_temp: 11.6, min_temp: -2.4, wind_speed: 1.8, rain: 53.2,
  },
  {
    location: '담양', temp: 6.5, max_temp: 13.6, min_temp: 0.1, wind_speed: 2.1, rain: 54.6,
  },
  {
    location: '광산', temp: 6.7, max_temp: 13.6, min_temp: 0.7, wind_speed: 2.2, rain: 55.1,
  },
  {
    location: '구례', temp: 7, max_temp: 14.4, min_temp: 0.4, wind_speed: 1.7, rain: 59.7,
  },
  {
    location: '나주', temp: 6.7, max_temp: 13.8, min_temp: 0.7, wind_speed: 1.8, rain: 61.6,
  },
  {
    location: '순천시', temp: 8.5, max_temp: 14.1, min_temp: 3.8, wind_speed: 2.3, rain: 65.8,
  },
  {
    location: '광양읍', temp: 8.2, max_temp: 14.6, min_temp: 2.5, wind_speed: 1.9, rain: 68.6,
  },
  {
    location: '조선대', temp: 7.8, max_temp: 13.6, min_temp: 2.7, wind_speed: 2.2, rain: 55.6,
  },
  {
    location: '거문도', temp: 9.4, max_temp: 12.6, min_temp: 6.8, wind_speed: 4.7, rain: 86.6,
  },
  {
    location: '추자도', temp: 8.6, max_temp: 11.5, min_temp: 6, wind_speed: 4.4, rain: 73,
  },
  {
    location: '장성', temp: 6.1, max_temp: 13.3, min_temp: 0.1, wind_speed: 1.8, rain: 58.2,
  },
  {
    location: '영암', temp: 6.9, max_temp: 13.3, min_temp: 1.1, wind_speed: 2.4, rain: 62.9,
  },
  {
    location: '보성', temp: 6.1, max_temp: 12.9, min_temp: -0.2, wind_speed: 2, rain: 80.3,
  },
  {
    location: '완주', temp: 6.1, max_temp: 13.2, min_temp: -0.4, wind_speed: 2.1, rain: 47.6,
  },
  {
    location: '김제', temp: 6.1, max_temp: 12.4, min_temp: 1, wind_speed: 2.6, rain: 40.6,
  },
  {
    location: '화순', temp: 6.8, max_temp: 13.8, min_temp: 0.6, wind_speed: 1.6, rain: 56.9,
  },
  {
    location: '함평', temp: 6.7, max_temp: 12.9, min_temp: 1.2, wind_speed: 2, rain: 54.9,
  },
  {
    location: '곡성', temp: 6.7, max_temp: 13.8, min_temp: 0.4, wind_speed: 1.6, rain: 57.6,
  },
  {
    location: '성판악', temp: 4.9, max_temp: 9, min_temp: 0.9, wind_speed: 3.4, rain: 258.8,
  },
  {
    location: '풍암', temp: 7.3, max_temp: 13.9, min_temp: 1.7, wind_speed: 1.6, rain: 55,
  },
  {
    location: '압해도', temp: 6.8, max_temp: 11.6, min_temp: 2.7, wind_speed: 3.6, rain: 53.7,
  },
  {
    location: '영양', temp: 5.1, max_temp: 12.1, min_temp: -1.5, wind_speed: 1.8, rain: 42.2,
  },
  {
    location: '성주', temp: 6.9, max_temp: 14.2, min_temp: -0.2, wind_speed: 1.7, rain: 44.6,
  },
  {
    location: '고령', temp: 6.9, max_temp: 14.7, min_temp: -0.4, wind_speed: 1.2, rain: 47.1,
  },
  {
    location: '청도', temp: 6.9, max_temp: 14.3, min_temp: 0.3, wind_speed: 1.7, rain: 57,
  },
  {
    location: '예천', temp: 5.8, max_temp: 13.2, min_temp: -1, wind_speed: 1.5, rain: 41.1,
  },
  {
    location: '김천', temp: 6.7, max_temp: 14.1, min_temp: -0.2, wind_speed: 1.6, rain: 43,
  },
  {
    location: '군위', temp: 5.6, max_temp: 13.5, min_temp: -1.5, wind_speed: 1.8, rain: 40.5,
  },
  {
    location: '칠곡', temp: 7.2, max_temp: 14.4, min_temp: 0.6, wind_speed: 2.3, rain: 43,
  },
  {
    location: '경산', temp: 8, max_temp: 14.5, min_temp: 2.5, wind_speed: 2.1, rain: 52.4,
  },
  {
    location: '달성', temp: 8.1, max_temp: 15, min_temp: 2, wind_speed: 1.8, rain: 50.5,
  },
  {
    location: '서구', temp: 8.5, max_temp: 14.3, min_temp: 3, wind_speed: 2, rain: 48.3,
  },
  {
    location: '대구', temp: 8.4, max_temp: 14.2, min_temp: 3.3, wind_speed: 2.5, rain: 49,
  },
  {
    location: '전주', temp: 6.8, max_temp: 13, min_temp: 1.4, wind_speed: 1.8, rain: 53.7,
  },
  {
    location: '삼척', temp: 7.1, max_temp: 11.6, min_temp: 2.7, wind_speed: 2.3, rain: 60,
  },
  {
    location: '울기', temp: 8.7, max_temp: 12.8, min_temp: 5.3, wind_speed: 2.7, rain: 65.1,
  },
  {
    location: '삼천포', temp: 8.5, max_temp: 12.9, min_temp: 4.6, wind_speed: 2.3, rain: 76.4,
  },
  {
    location: '영도', temp: 8.8, max_temp: 12.3, min_temp: 5.5, wind_speed: 3.9, rain: 70.7,
  },
  {
    location: '고성', temp: 7.9, max_temp: 13.9, min_temp: 2, wind_speed: 2.3, rain: 84.5,
  },
  {
    location: '창녕', temp: 7.3, max_temp: 15, min_temp: 0, wind_speed: 2, rain: 53.9,
  },
  {
    location: '함안', temp: 7.1, max_temp: 15.4, min_temp: -0.2, wind_speed: 1.5, rain: 64.6,
  },
  {
    location: '가덕도', temp: 8.9, max_temp: 13.2, min_temp: 5.6, wind_speed: 4.3, rain: 66.1,
  },
  {
    location: '기장', temp: 8.5, max_temp: 13.8, min_temp: 3.3, wind_speed: 2.1, rain: 86.4,
  },
  {
    location: '간절곶', temp: 8.9, max_temp: 12.5, min_temp: 5.3, wind_speed: 4.1, rain: 75.5,
  },
  {
    location: '하동', temp: 8.3, max_temp: 14.5, min_temp: 2.4, wind_speed: 1.8, rain: 81.8,
  },
  {
    location: '해운대', temp: 9.4, max_temp: 13.8, min_temp: 5.2, wind_speed: 2.6, rain: 85,
  },
  {
    location: '부산진', temp: 9, max_temp: 13.5, min_temp: 4.8, wind_speed: 2.3, rain: 87.4,
  },
  {
    location: '동래', temp: 9.1, max_temp: 13.9, min_temp: 4.7, wind_speed: 2.2, rain: 85.9,
  },
  {
    location: '북구', temp: 8.6, max_temp: 13.4, min_temp: 4.2, wind_speed: 2.2, rain: 72.3,
  },
  {
    location: '부산남구', temp: 9.4, max_temp: 13.5, min_temp: 5.5, wind_speed: 2.2, rain: 88.4,
  },
  {
    location: '정자', temp: 8.8, max_temp: 13.7, min_temp: 3.3, wind_speed: 3.2, rain: 67.6,
  }],
  [{
    location: '속초', temp: 11.9, max_temp: 16.5, min_temp: 7.3, wind_speed: 2.8, rain: 73.3,
  },
  {
    location: '철원', temp: 10.5, max_temp: 17.5, min_temp: 3.4, wind_speed: 2.3, rain: 69,
  },
  {
    location: '동두천', temp: 11.6, max_temp: 19, min_temp: 5.2, wind_speed: 2, rain: 73.2,
  },
  {
    location: '파주', temp: 10.8, max_temp: 17.9, min_temp: 4.1, wind_speed: 2, rain: 74.2,
  },
  {
    location: '대관령', temp: 7, max_temp: 12.9, min_temp: 1.2, wind_speed: 4.3, rain: 93.5,
  },
  {
    location: '춘천', temp: 11.7, max_temp: 18.9, min_temp: 4.7, wind_speed: 1.6, rain: 71.5,
  },
  {
    location: '백령도', temp: 9.1, max_temp: 13, min_temp: 6, wind_speed: 5.2, rain: 47.5,
  },
  {
    location: '강릉', temp: 13.1, max_temp: 17.9, min_temp: 8.2, wind_speed: 2.8, rain: 81.9,
  },
  {
    location: '동해', temp: 12.2, max_temp: 16.7, min_temp: 7.7, wind_speed: 2.8, rain: 72.3,
  },
  {
    location: '서울', temp: 12.6, max_temp: 17.9, min_temp: 8, wind_speed: 2.7, rain: 72.9,
  },
  {
    location: '인천', temp: 11.5, max_temp: 16.2, min_temp: 7.9, wind_speed: 3.4, rain: 63.5,
  },
  {
    location: '원주', temp: 12.2, max_temp: 19.1, min_temp: 5.7, wind_speed: 1.5, rain: 73,
  },
  {
    location: '울릉도', temp: 11.1, max_temp: 15.1, min_temp: 7.8, wind_speed: 4.3, rain: 97.8,
  },
  {
    location: '수원', temp: 12, max_temp: 18.2, min_temp: 6.4, wind_speed: 2.1, rain: 71.6,
  },
  {
    location: '영월', temp: 11.5, max_temp: 18.8, min_temp: 4.3, wind_speed: 1.8, rain: 73.5,
  },
  {
    location: '충주', temp: 11.9, max_temp: 19.2, min_temp: 4.8, wind_speed: 1.9, rain: 73.8,
  },
  {
    location: '서산', temp: 10.9, max_temp: 17.3, min_temp: 5, wind_speed: 2.9, rain: 74.7,
  },
  {
    location: '울진', temp: 12.1, max_temp: 17.2, min_temp: 7.1, wind_speed: 3.6, rain: 76.4,
  },
  {
    location: '청주', temp: 13, max_temp: 19.6, min_temp: 7, wind_speed: 2, rain: 75.5,
  },
  {
    location: '대전', temp: 13, max_temp: 19.4, min_temp: 6.9, wind_speed: 2.2, rain: 81.6,
  },
  {
    location: '추풍령', temp: 12, max_temp: 18.7, min_temp: 5.3, wind_speed: 3.1, rain: 80.3,
  },
  {
    location: '안동', temp: 12.4, max_temp: 19.5, min_temp: 5.5, wind_speed: 2, rain: 74,
  },
  {
    location: '상주', temp: 12.9, max_temp: 19.6, min_temp: 6.5, wind_speed: 2.1, rain: 86.6,
  },
  {
    location: '포항', temp: 14.1, max_temp: 19.1, min_temp: 9.6, wind_speed: 2.9, rain: 81.2,
  },
  {
    location: '군산', temp: 11.5, max_temp: 16.9, min_temp: 6.9, wind_speed: 3.5, rain: 81.6,
  },
  {
    location: '울산', temp: 13.7, max_temp: 19.3, min_temp: 8.5, wind_speed: 2.3, rain: 96.9,
  },
  {
    location: '창원', temp: 13.8, max_temp: 19.1, min_temp: 9.4, wind_speed: 2.2, rain: 133.8,
  },
  {
    location: '광주', temp: 13.4, max_temp: 19.9, min_temp: 7.8, wind_speed: 2.2, rain: 86.6,
  },
  {
    location: '부산', temp: 13.8, max_temp: 18.2, min_temp: 10.1, wind_speed: 3.8, rain: 140.9,
  },
  {
    location: '통영', temp: 13.3, max_temp: 17.9, min_temp: 9.2, wind_speed: 2.6, rain: 138.8,
  },
  {
    location: '목포', temp: 12.4, max_temp: 17.5, min_temp: 8.2, wind_speed: 3.8, rain: 80.3,
  },
  {
    location: '여수', temp: 13.3, max_temp: 17.4, min_temp: 9.9, wind_speed: 4.1, rain: 125.2,
  },
  {
    location: '흑산도', temp: 10.7, max_temp: 14.5, min_temp: 7.8, wind_speed: 5.2, rain: 88.8,
  },
  {
    location: '완도', temp: 12.9, max_temp: 17.9, min_temp: 8.5, wind_speed: 3.6, rain: 141.7,
  },
  {
    location: '고창', temp: 11.9, max_temp: 18.4, min_temp: 6, wind_speed: 3, rain: 83.8,
  },
  {
    location: '제주', temp: 14.2, max_temp: 18, min_temp: 10.8, wind_speed: 3.2, rain: 89.7,
  },
  {
    location: '고산', temp: 13.4, max_temp: 16.7, min_temp: 10.5, wind_speed: 6.5, rain: 94.7,
  },
  {
    location: '성산', temp: 13.8, max_temp: 18, min_temp: 9.4, wind_speed: 3.2, rain: 161.3,
  },
  {
    location: '서귀포', temp: 15, max_temp: 18.6, min_temp: 11.6, wind_speed: 2.6, rain: 187,
  },
  {
    location: '진주', temp: 12.9, max_temp: 19.9, min_temp: 6, wind_speed: 1.6, rain: 126.4,
  },
  {
    location: '강화', temp: 10.7, max_temp: 16.2, min_temp: 5.3, wind_speed: 2.4, rain: 64.9,
  },
  {
    location: '양평', temp: 12, max_temp: 19.2, min_temp: 5.1, wind_speed: 1.6, rain: 72.5,
  },
  {
    location: '이천', temp: 11.9, max_temp: 19.3, min_temp: 5, wind_speed: 1.7, rain: 78.5,
  },
  {
    location: '인제', temp: 10.6, max_temp: 17.8, min_temp: 3.8, wind_speed: 2.3, rain: 69.8,
  },
  {
    location: '홍천', temp: 11.2, max_temp: 19.1, min_temp: 3.8, wind_speed: 1.5, rain: 74.8,
  },
  {
    location: '태백', temp: 8.9, max_temp: 15.1, min_temp: 2.9, wind_speed: 2, rain: 85.8,
  },
  {
    location: '정선군', temp: 10.6, max_temp: 17.7, min_temp: 4.1, wind_speed: 2.3, rain: 81.4,
  },
  {
    location: '제천', temp: 10.5, max_temp: 18.1, min_temp: 2.9, wind_speed: 1.9, rain: 85.1,
  },
  {
    location: '보은', temp: 11.2, max_temp: 18.8, min_temp: 3.7, wind_speed: 1.8, rain: 82.2,
  },
  {
    location: '천안', temp: 11.7, max_temp: 18.7, min_temp: 4.9, wind_speed: 2.1, rain: 67.5,
  },
  {
    location: '보령', temp: 11.1, max_temp: 16.7, min_temp: 5.7, wind_speed: 2, rain: 72.7,
  },
  {
    location: '부여', temp: 11.8, max_temp: 19.3, min_temp: 4.9, wind_speed: 1.5, rain: 85.3,
  },
  {
    location: '금산', temp: 11.6, max_temp: 19.3, min_temp: 4, wind_speed: 1.5, rain: 84.7,
  },
  {
    location: '부안', temp: 11.5, max_temp: 17.9, min_temp: 6, wind_speed: 2, rain: 80,
  },
  {
    location: '임실', temp: 10.7, max_temp: 18.7, min_temp: 3.2, wind_speed: 1.7, rain: 83.6,
  },
  {
    location: '정읍', temp: 12.4, max_temp: 19.3, min_temp: 6.4, wind_speed: 1.5, rain: 82.5,
  },
  {
    location: '남원', temp: 11.9, max_temp: 19.8, min_temp: 4.4, wind_speed: 1.8, rain: 81.8,
  },
  {
    location: '장수', temp: 10.5, max_temp: 17.8, min_temp: 3.2, wind_speed: 2.1, rain: 96.6,
  },
  {
    location: '영광군', temp: 11.4, max_temp: 17.7, min_temp: 5.7, wind_speed: 2.5, rain: 90.1,
  },
  {
    location: '김해시', temp: 14.2, max_temp: 19.9, min_temp: 9.4, wind_speed: 2.3, rain: 128.4,
  },
  {
    location: '순창군', temp: 12, max_temp: 19.2, min_temp: 5.2, wind_speed: 2.1, rain: 104.8,
  },
  {
    location: '양산시', temp: 13.7, max_temp: 19.5, min_temp: 8.3, wind_speed: 2.9, rain: 126.8,
  },
  {
    location: '강진군', temp: 12.3, max_temp: 18.4, min_temp: 6.4, wind_speed: 2.8, rain: 124.9,
  },
  {
    location: '장흥', temp: 12.2, max_temp: 19, min_temp: 5.4, wind_speed: 2.3, rain: 108.5,
  },
  {
    location: '해남', temp: 12.1, max_temp: 18.5, min_temp: 5.6, wind_speed: 2.6, rain: 94.5,
  },
  {
    location: '고흥', temp: 12.7, max_temp: 18.9, min_temp: 6.4, wind_speed: 1.8, rain: 128.2,
  },
  {
    location: '의령군', temp: 12.9, max_temp: 20.3, min_temp: 5.7, wind_speed: 1.7, rain: 118.4,
  },
  {
    location: '함양군', temp: 12.4, max_temp: 19.7, min_temp: 5.1, wind_speed: 1.7, rain: 104.7,
  },
  {
    location: '진도군', temp: 12.1, max_temp: 17.6, min_temp: 6.6, wind_speed: 2.4, rain: 126.5,
  },
  {
    location: '봉화', temp: 9.9, max_temp: 18.1, min_temp: 1.9, wind_speed: 1.6, rain: 80.7,
  },
  {
    location: '영주', temp: 11.8, max_temp: 18.6, min_temp: 4.8, wind_speed: 2.9, rain: 94.8,
  },
  {
    location: '문경', temp: 12.2, max_temp: 18.9, min_temp: 5.4, wind_speed: 2.2, rain: 89.5,
  },
  {
    location: '청송군', temp: 11, max_temp: 18.8, min_temp: 3.5, wind_speed: 1.8, rain: 81.7,
  },
  {
    location: '영덕', temp: 12.5, max_temp: 18.4, min_temp: 6.7, wind_speed: 3.1, rain: 79.5,
  },
  {
    location: '의성', temp: 11.7, max_temp: 20.3, min_temp: 3.3, wind_speed: 1.5, rain: 73.6,
  },
  {
    location: '구미', temp: 13.3, max_temp: 20.4, min_temp: 6.5, wind_speed: 1.8, rain: 79,
  },
  {
    location: '영천', temp: 12.7, max_temp: 19.9, min_temp: 5.3, wind_speed: 2.1, rain: 76.4,
  },
  {
    location: '경주시', temp: 12.7, max_temp: 19.7, min_temp: 6, wind_speed: 2.9, rain: 96.1,
  },
  {
    location: '거창', temp: 11.9, max_temp: 19.5, min_temp: 4.4, wind_speed: 1.7, rain: 84.8,
  },
  {
    location: '합천', temp: 13.2, max_temp: 20.7, min_temp: 5.8, wind_speed: 1.6, rain: 81.9,
  },
  {
    location: '밀양', temp: 13.2, max_temp: 20.7, min_temp: 6, wind_speed: 1.6, rain: 90.5,
  },
  {
    location: '산청', temp: 12.8, max_temp: 19.8, min_temp: 6.1, wind_speed: 2, rain: 106.5,
  },
  {
    location: '거제', temp: 13.4, max_temp: 18.6, min_temp: 8.3, wind_speed: 2, rain: 177.2,
  },
  {
    location: '남해', temp: 13.5, max_temp: 19.3, min_temp: 8.2, wind_speed: 1.8, rain: 179.7,
  },
  {
    location: '강남', temp: 13.2, max_temp: 18.5, min_temp: 8.9, wind_speed: 2, rain: 67.2,
  },
  {
    location: '서초', temp: 13.3, max_temp: 19, min_temp: 8.6, wind_speed: 1.6, rain: 68.7,
  },
  {
    location: '강동', temp: 12.9, max_temp: 18.9, min_temp: 7.5, wind_speed: 1.8, rain: 60.9,
  },
  {
    location: '송파', temp: 13.7, max_temp: 19.1, min_temp: 9, wind_speed: 2, rain: 66.2,
  },
  {
    location: '강서', temp: 12.4, max_temp: 17.7, min_temp: 8.2, wind_speed: 2.1, rain: 63.3,
  },
  {
    location: '양천', temp: 13.2, max_temp: 18.7, min_temp: 9, wind_speed: 1.7, rain: 66.1,
  },
  {
    location: '도봉', temp: 12.5, max_temp: 18.6, min_temp: 6.6, wind_speed: 1.4, rain: 78.2,
  },
  {
    location: '노원', temp: 12.1, max_temp: 18.7, min_temp: 5.5, wind_speed: 2, rain: 67.4,
  },
  {
    location: '동대문', temp: 13.5, max_temp: 18.9, min_temp: 8.9, wind_speed: 2.2, rain: 72.2,
  },
  {
    location: '중랑', temp: 13.4, max_temp: 18.7, min_temp: 8.9, wind_speed: 2.4, rain: 67.6,
  },
  {
    location: '기상청', temp: 13.1, max_temp: 18.4, min_temp: 8.6, wind_speed: 1.7, rain: 70.1,
  },
  {
    location: '마포', temp: 13, max_temp: 18.5, min_temp: 9, wind_speed: 2.6, rain: 64.4,
  },
  {
    location: '서대문', temp: 12.3, max_temp: 18.5, min_temp: 7.2, wind_speed: 1.7, rain: 70.9,
  },
  {
    location: '광진', temp: 13.4, max_temp: 18.7, min_temp: 8.7, wind_speed: 2.1, rain: 69.7,
  },
  {
    location: '성북', temp: 12.2, max_temp: 17.6, min_temp: 7.7, wind_speed: 2, rain: 70.9,
  },
  {
    location: '용산', temp: 13.3, max_temp: 18.5, min_temp: 8.9, wind_speed: 2, rain: 61.6,
  },
  {
    location: '은평', temp: 11.9, max_temp: 17.8, min_temp: 6.7, wind_speed: 2, rain: 64.7,
  },
  {
    location: '금천', temp: 12.7, max_temp: 17.6, min_temp: 8.8, wind_speed: 2.2, rain: 68.2,
  },
  {
    location: '중구', temp: 11.7, max_temp: 17.8, min_temp: 7.4, wind_speed: 2.3, rain: 59.7,
  },
  {
    location: '성동', temp: 13.4, max_temp: 18.2, min_temp: 9.1, wind_speed: 2.7, rain: 63.1,
  },
  {
    location: '구로', temp: 12.2, max_temp: 17.8, min_temp: 7.3, wind_speed: 2.3, rain: 74.7,
  },
  {
    location: '강북', temp: 13.2, max_temp: 18.4, min_temp: 8.5, wind_speed: 2.1, rain: 81.3,
  },
  {
    location: '남현', temp: 11.9, max_temp: 17.7, min_temp: 6.7, wind_speed: 1.5, rain: 89.6,
  },
  {
    location: '부천', temp: 12.5, max_temp: 17.5, min_temp: 8.3, wind_speed: 1.5, rain: 65.1,
  },
  {
    location: '안양', temp: 12.3, max_temp: 17.3, min_temp: 8.1, wind_speed: 2.5, rain: 69.1,
  },
  {
    location: '광명', temp: 12.8, max_temp: 17.8, min_temp: 8.6, wind_speed: 2.3, rain: 64.2,
  },
  {
    location: '군포', temp: 12.6, max_temp: 17.8, min_temp: 8.1, wind_speed: 1.9, rain: 70.9,
  },
  {
    location: '김포', temp: 11.2, max_temp: 16.8, min_temp: 6.3, wind_speed: 2.3, rain: 60.1,
  },
  {
    location: '하남', temp: 12.4, max_temp: 18.8, min_temp: 6.6, wind_speed: 1.1, rain: 57.2,
  },
  {
    location: '의왕', temp: 11.2, max_temp: 17.2, min_temp: 5.7, wind_speed: 1.3, rain: 68.1,
  },
  {
    location: '포천', temp: 11.6, max_temp: 18.8, min_temp: 4.6, wind_speed: 1.8, rain: 67.3,
  },
  {
    location: '가평조종', temp: 10.3, max_temp: 18.3, min_temp: 2.9, wind_speed: 1.6, rain: 74.9,
  },
  {
    location: '영등포', temp: 13.4, max_temp: 18.5, min_temp: 9.4, wind_speed: 1.9, rain: 60.2,
  },
  {
    location: '인천연수', temp: 11.7, max_temp: 17, min_temp: 7.3, wind_speed: 2.1, rain: 60.8,
  },
  {
    location: '안성', temp: 12.2, max_temp: 19, min_temp: 5.9, wind_speed: 1.6, rain: 68.5,
  },
  {
    location: '간성', temp: 11.5, max_temp: 16.7, min_temp: 6, wind_speed: 2.2, rain: 70.2,
  },
  {
    location: '평창', temp: 10.4, max_temp: 17.8, min_temp: 3.5, wind_speed: 1.5, rain: 71,
  },
  {
    location: '의정부', temp: 11.7, max_temp: 18.4, min_temp: 5.5, wind_speed: 1.3, rain: 72.4,
  },
  {
    location: '횡성', temp: 11.3, max_temp: 19.5, min_temp: 4.1, wind_speed: 1.6, rain: 71.7,
  },
  {
    location: '고양', temp: 11.8, max_temp: 18.6, min_temp: 5.5, wind_speed: 1.7, rain: 58.6,
  },
  {
    location: '남양주', temp: 11.4, max_temp: 18.8, min_temp: 4.3, wind_speed: 1.5, rain: 64.6,
  },
  {
    location: '안산', temp: 11, max_temp: 17.8, min_temp: 4.6, wind_speed: 2.2, rain: 67.5,
  },
  {
    location: '경기광주', temp: 11.8, max_temp: 18.6, min_temp: 5.5, wind_speed: 1.9, rain: 67.5,
  },
  {
    location: '여주', temp: 11.8, max_temp: 19.5, min_temp: 5, wind_speed: 1.7, rain: 60.4,
  },
  {
    location: '용인', temp: 11.4, max_temp: 18.5, min_temp: 4.9, wind_speed: 1.8, rain: 75.6,
  },
  {
    location: '오산', temp: 11.9, max_temp: 18.8, min_temp: 5.7, wind_speed: 1.6, rain: 76,
  },
  {
    location: '평택', temp: 12.5, max_temp: 18.7, min_temp: 6.3, wind_speed: 2.1, rain: 65.8,
  },
  {
    location: '화천', temp: 10.8, max_temp: 19.1, min_temp: 3.5, wind_speed: 1.5, rain: 65.8,
  },
  {
    location: '양구', temp: 10.4, max_temp: 18.4, min_temp: 3.2, wind_speed: 1.5, rain: 63.3,
  },
  {
    location: '시흥', temp: 11.9, max_temp: 17.3, min_temp: 7.1, wind_speed: 2, rain: 60.4,
  },
  {
    location: '구리', temp: 12.6, max_temp: 18.7, min_temp: 7.1, wind_speed: 1.7, rain: 66.5,
  },
  {
    location: '금곡', temp: 11.2, max_temp: 17, min_temp: 6.3, wind_speed: 1.7, rain: 58.6,
  },
  {
    location: '화성', temp: 11.5, max_temp: 17.4, min_temp: 6.4, wind_speed: 1.7, rain: 63.3,
  },
  {
    location: '성남', temp: 12.9, max_temp: 18.9, min_temp: 7.5, wind_speed: 1.5, rain: 64.7,
  },
  {
    location: '과천', temp: 12, max_temp: 18.5, min_temp: 6.5, wind_speed: 2.2, rain: 67.4,
  },
  {
    location: '진부령', temp: 8.6, max_temp: 14.4, min_temp: 3.4, wind_speed: 3.3, rain: 89,
  },
  {
    location: '양주', temp: 11.2, max_temp: 18.3, min_temp: 4.3, wind_speed: 1.8, rain: 63.7,
  },
  {
    location: '단양', temp: 12, max_temp: 19.1, min_temp: 5.5, wind_speed: 1.1, rain: 61.6,
  },
  {
    location: '진천', temp: 11.8, max_temp: 19.3, min_temp: 5, wind_speed: 1.5, rain: 72.9,
  },
  {
    location: '괴산', temp: 11.5, max_temp: 19, min_temp: 4.3, wind_speed: 1.5, rain: 87.5,
  },
  {
    location: '옥천', temp: 12.1, max_temp: 19.4, min_temp: 5.3, wind_speed: 1.5, rain: 74.4,
  },
  {
    location: '홍북', temp: 11.5, max_temp: 18.6, min_temp: 5.1, wind_speed: 2.1, rain: 78.5,
  },
  {
    location: '세종연서', temp: 11.7, max_temp: 19.6, min_temp: 5.1, wind_speed: 1.8, rain: 76.6,
  },
  {
    location: '공주', temp: 12.3, max_temp: 19.4, min_temp: 5.8, wind_speed: 1.7, rain: 88.6,
  },
  {
    location: '서천', temp: 11, max_temp: 17.2, min_temp: 5.3, wind_speed: 2.3, rain: 81,
  },
  {
    location: '논산', temp: 11.9, max_temp: 19.4, min_temp: 5.1, wind_speed: 2, rain: 81.3,
  },
  {
    location: '당진', temp: 11, max_temp: 17.5, min_temp: 5.5, wind_speed: 2.5, rain: 67.8,
  },
  {
    location: '청양', temp: 11, max_temp: 18.4, min_temp: 4, wind_speed: 1.6, rain: 84.1,
  },
  {
    location: '음성', temp: 11.2, max_temp: 19.3, min_temp: 3.5, wind_speed: 1.9, rain: 71.6,
  },
  {
    location: '증평', temp: 11.7, max_temp: 19.4, min_temp: 4.7, wind_speed: 1.7, rain: 73.4,
  },
  {
    location: '태안', temp: 11, max_temp: 16.5, min_temp: 6.6, wind_speed: 2.2, rain: 72,
  },
  {
    location: '예산', temp: 11.9, max_temp: 18.7, min_temp: 5.8, wind_speed: 2.5, rain: 67.8,
  },
  {
    location: '아산', temp: 11.7, max_temp: 18.3, min_temp: 6.2, wind_speed: 2.3, rain: 64.5,
  },
  {
    location: '계룡', temp: 11.2, max_temp: 18.8, min_temp: 3.8, wind_speed: 1.4, rain: 92.5,
  },
  {
    location: '문화', temp: 13.3, max_temp: 20, min_temp: 7.5, wind_speed: 1.6, rain: 83.6,
  },
  {
    location: '세천', temp: 12.2, max_temp: 19.3, min_temp: 5.3, wind_speed: 1.5, rain: 76.3,
  },
  {
    location: '장동', temp: 12.4, max_temp: 19.4, min_temp: 5.8, wind_speed: 1.4, rain: 80.4,
  },
  {
    location: '부평', temp: 11.5, max_temp: 18.2, min_temp: 5.4, wind_speed: 1.1, rain: 70.2,
  },
  {
    location: '연천청산', temp: 11.5, max_temp: 18.7, min_temp: 4.6, wind_speed: 1.6, rain: 61.5,
  },
  {
    location: '양양', temp: 12, max_temp: 17, min_temp: 6.8, wind_speed: 2.9, rain: 71.4,
  },
  {
    location: '사북', temp: 8.4, max_temp: 14.2, min_temp: 3.1, wind_speed: 3.7, rain: 85.2,
  },
  {
    location: '무안', temp: 11.8, max_temp: 17.7, min_temp: 6.2, wind_speed: 2.1, rain: 96.7,
  },
  {
    location: '무주', temp: 11.4, max_temp: 18.9, min_temp: 4.1, wind_speed: 1.7, rain: 65.6,
  },
  {
    location: '익산', temp: 12.1, max_temp: 19.1, min_temp: 6.1, wind_speed: 1.9, rain: 76.3,
  },
  {
    location: '진안', temp: 10.4, max_temp: 18, min_temp: 3.3, wind_speed: 2, rain: 82.3,
  },
  {
    location: '담양', temp: 12.4, max_temp: 19.7, min_temp: 5.5, wind_speed: 2, rain: 89.7,
  },
  {
    location: '광산', temp: 12.6, max_temp: 19.7, min_temp: 6.1, wind_speed: 2.1, rain: 83,
  },
  {
    location: '구례', temp: 13, max_temp: 20.7, min_temp: 5.9, wind_speed: 1.7, rain: 80.1,
  },
  {
    location: '나주', temp: 12.6, max_temp: 19.9, min_temp: 6.2, wind_speed: 1.7, rain: 86.5,
  },
  {
    location: '순천시', temp: 14, max_temp: 19.5, min_temp: 9, wind_speed: 2.1, rain: 118.2,
  },
  {
    location: '광양읍', temp: 13.7, max_temp: 20.2, min_temp: 7.8, wind_speed: 1.7, rain: 108.9,
  },
  {
    location: '조선대', temp: 13.5, max_temp: 19.7, min_temp: 7.9, wind_speed: 2.2, rain: 83.8,
  },
  {
    location: '거문도', temp: 13.5, max_temp: 16.7, min_temp: 11, wind_speed: 3.9, rain: 107.5,
  },
  {
    location: '추자도', temp: 12.5, max_temp: 15.6, min_temp: 10, wind_speed: 3.8, rain: 79.6,
  },
  {
    location: '장성', temp: 12.2, max_temp: 19.6, min_temp: 5.3, wind_speed: 1.7, rain: 86.7,
  },
  {
    location: '영암', temp: 12.5, max_temp: 19.2, min_temp: 6.5, wind_speed: 2.5, rain: 87.7,
  },
  {
    location: '보성', temp: 11.6, max_temp: 18.4, min_temp: 5, wind_speed: 2, rain: 126.6,
  },
  {
    location: '완주', temp: 12.2, max_temp: 19.8, min_temp: 5.3, wind_speed: 2.2, rain: 86.5,
  },
  {
    location: '김제', temp: 12.2, max_temp: 18.7, min_temp: 6.7, wind_speed: 2.6, rain: 69.9,
  },
  {
    location: '화순', temp: 12.7, max_temp: 20.1, min_temp: 6, wind_speed: 1.5, rain: 83.7,
  },
  {
    location: '함평', temp: 12.4, max_temp: 18.6, min_temp: 6.4, wind_speed: 2, rain: 84.1,
  },
  {
    location: '곡성', temp: 12.6, max_temp: 20.1, min_temp: 5.9, wind_speed: 1.6, rain: 79.7,
  },
  {
    location: '성판악', temp: 10.2, max_temp: 14.5, min_temp: 5.9, wind_speed: 3.2, rain: 414.9,
  },
  {
    location: '풍암', temp: 13.1, max_temp: 20, min_temp: 6.9, wind_speed: 1.5, rain: 93.6,
  },
  {
    location: '압해도', temp: 12.1, max_temp: 17.2, min_temp: 7.9, wind_speed: 3.2, rain: 80.9,
  },
  {
    location: '영양', temp: 11.2, max_temp: 18.3, min_temp: 3.8, wind_speed: 1.8, rain: 75.2,
  },
  {
    location: '성주', temp: 13.1, max_temp: 20.5, min_temp: 5.6, wind_speed: 1.7, rain: 79.5,
  },
  {
    location: '고령', temp: 13, max_temp: 20.6, min_temp: 5.4, wind_speed: 1.3, rain: 83.9,
  },
  {
    location: '청도', temp: 12.9, max_temp: 20.4, min_temp: 5.9, wind_speed: 1.8, rain: 85.7,
  },
  {
    location: '예천', temp: 12.1, max_temp: 19.7, min_temp: 4.8, wind_speed: 1.5, rain: 73.6,
  },
  {
    location: '김천', temp: 13, max_temp: 20.6, min_temp: 5.5, wind_speed: 1.4, rain: 76.7,
  },
  {
    location: '군위', temp: 12, max_temp: 20.1, min_temp: 4.3, wind_speed: 1.9, rain: 70.6,
  },
  {
    location: '칠곡', temp: 13.3, max_temp: 20.7, min_temp: 6.2, wind_speed: 2.3, rain: 69.9,
  },
  {
    location: '경산', temp: 14, max_temp: 20.8, min_temp: 8.1, wind_speed: 2.2, rain: 77.7,
  },
  {
    location: '달성', temp: 14, max_temp: 21.1, min_temp: 7.4, wind_speed: 1.8, rain: 76.2,
  },
  {
    location: '서구', temp: 14.5, max_temp: 20.7, min_temp: 8.7, wind_speed: 2.1, rain: 69.1,
  },
  {
    location: '대구', temp: 14.5, max_temp: 20.6, min_temp: 8.8, wind_speed: 2.5, rain: 70.6,
  },
  {
    location: '전주', temp: 12.9, max_temp: 19.7, min_temp: 6.9, wind_speed: 1.9, rain: 78.4,
  },
  {
    location: '삼척', temp: 12.5, max_temp: 17.2, min_temp: 7.8, wind_speed: 2.5, rain: 72.1,
  },
  {
    location: '울기', temp: 12.9, max_temp: 16.7, min_temp: 10, wind_speed: 2.9, rain: 89.5,
  },
  {
    location: '삼천포', temp: 13.5, max_temp: 17.9, min_temp: 9.7, wind_speed: 2.2, rain: 122.1,
  },
  {
    location: '영도', temp: 12.9, max_temp: 16.2, min_temp: 10, wind_speed: 4, rain: 119.4,
  },
  {
    location: '고성', temp: 13.1, max_temp: 19, min_temp: 7.4, wind_speed: 2.3, rain: 133.2,
  },
  {
    location: '창녕', temp: 13.3, max_temp: 21, min_temp: 5.6, wind_speed: 2.1, rain: 82.5,
  },
  {
    location: '함안', temp: 13, max_temp: 21.2, min_temp: 5.4, wind_speed: 1.5, rain: 89.1,
  },
  {
    location: '가덕도', temp: 13.2, max_temp: 17.5, min_temp: 10.2, wind_speed: 4.3, rain: 100.5,
  },
  {
    location: '기장', temp: 13.4, max_temp: 18.5, min_temp: 8.1, wind_speed: 2.2, rain: 130,
  },
  {
    location: '간절곶', temp: 13, max_temp: 16.2, min_temp: 9.9, wind_speed: 4.3, rain: 112.1,
  },
  {
    location: '하동', temp: 13.8, max_temp: 20.3, min_temp: 7.9, wind_speed: 1.7, rain: 137,
  },
  {
    location: '해운대', temp: 13.8, max_temp: 18.2, min_temp: 9.9, wind_speed: 2.7, rain: 148.8,
  },
  {
    location: '부산진', temp: 14, max_temp: 18.6, min_temp: 9.9, wind_speed: 2.4, rain: 139.3,
  },
  {
    location: '동래', temp: 14, max_temp: 19, min_temp: 9.7, wind_speed: 2.2, rain: 136.9,
  },
  {
    location: '북구', temp: 13.9, max_temp: 18.8, min_temp: 9.4, wind_speed: 2.4, rain: 119.9,
  },
  {
    location: '부산남구', temp: 14.1, max_temp: 18.2, min_temp: 10.4, wind_speed: 2.3, rain: 143.9,
  },
  {
    location: '정자', temp: 13.5, max_temp: 18.6, min_temp: 8.1, wind_speed: 3.3, rain: 110.4,
  }],
  [{
    location: '속초', temp: 16.3, max_temp: 20.9, min_temp: 12.1, wind_speed: 2.5, rain: 88.5,
  },
  {
    location: '철원', temp: 16.6, max_temp: 22.9, min_temp: 10.4, wind_speed: 2.1, rain: 102.4,
  },
  {
    location: '동두천', temp: 17.4, max_temp: 24.5, min_temp: 11.3, wind_speed: 1.7, rain: 95.2,
  },
  {
    location: '파주', temp: 16.8, max_temp: 23.8, min_temp: 10.7, wind_speed: 1.7, rain: 102,
  },
  {
    location: '대관령', temp: 12.5, max_temp: 18.4, min_temp: 6.8, wind_speed: 3.9, rain: 108.2,
  },
  {
    location: '춘천', temp: 17.6, max_temp: 24.3, min_temp: 11.3, wind_speed: 1.4, rain: 99.4,
  },
  {
    location: '백령도', temp: 14.5, max_temp: 18.7, min_temp: 11.1, wind_speed: 5, rain: 74.3,
  },
  {
    location: '강릉', temp: 17.9, max_temp: 22.7, min_temp: 13.3, wind_speed: 2.4, rain: 79.2,
  },
  {
    location: '동해', temp: 16.6, max_temp: 21.1, min_temp: 12.5, wind_speed: 2.4, rain: 63.3,
  },
  {
    location: '서울', temp: 18.2, max_temp: 23.6, min_temp: 13.5, wind_speed: 2.5, rain: 103.6,
  },
  {
    location: '인천', temp: 16.8, max_temp: 21.6, min_temp: 13.1, wind_speed: 2.8, rain: 96.3,
  },
  {
    location: '원주', temp: 17.9, max_temp: 24.4, min_temp: 11.8, wind_speed: 1.2, rain: 86.1,
  },
  {
    location: '울릉도', temp: 15.8, max_temp: 19.7, min_temp: 12.5, wind_speed: 3.9, rain: 108.5,
  },
  {
    location: '수원', temp: 17.6, max_temp: 23.6, min_temp: 12.3, wind_speed: 1.9, rain: 95,
  },
  {
    location: '영월', temp: 17, max_temp: 24.4, min_temp: 10, wind_speed: 1.5, rain: 78.4,
  },
  {
    location: '충주', temp: 17.5, max_temp: 24.5, min_temp: 10.9, wind_speed: 1.7, rain: 87.4,
  },
  {
    location: '서산', temp: 16.6, max_temp: 22.5, min_temp: 11.4, wind_speed: 2.7, rain: 101.1,
  },
  {
    location: '울진', temp: 16.3, max_temp: 21.1, min_temp: 11.8, wind_speed: 3.1, rain: 70.5,
  },
  {
    location: '청주', temp: 18.7, max_temp: 24.8, min_temp: 13.1, wind_speed: 1.9, rain: 82.8,
  },
  {
    location: '대전', temp: 18.5, max_temp: 24.5, min_temp: 12.8, wind_speed: 2.1, rain: 91.8,
  },
  {
    location: '추풍령', temp: 17.1, max_temp: 23.7, min_temp: 10.7, wind_speed: 2.6, rain: 80.1,
  },
  {
    location: '안동', temp: 17.8, max_temp: 24.7, min_temp: 11.2, wind_speed: 1.7, rain: 85.1,
  },
  {
    location: '상주', temp: 18.6, max_temp: 25.3, min_temp: 12.4, wind_speed: 1.6, rain: 87.6,
  },
  {
    location: '포항', temp: 18.6, max_temp: 23.5, min_temp: 14.4, wind_speed: 2.6, rain: 84.6,
  },
  {
    location: '군산', temp: 17.1, max_temp: 22.3, min_temp: 12.8, wind_speed: 3.2, rain: 85.8,
  },
  {
    location: '울산', temp: 18.2, max_temp: 23.7, min_temp: 13.4, wind_speed: 2, rain: 107.4,
  },
  {
    location: '창원', temp: 18.5, max_temp: 23.7, min_temp: 14.2, wind_speed: 2, rain: 146.4,
  },
  {
    location: '광주', temp: 18.7, max_temp: 24.8, min_temp: 13.4, wind_speed: 2.2, rain: 91.4,
  },
  {
    location: '부산', temp: 17.9, max_temp: 22, min_temp: 14.6, wind_speed: 3.5, rain: 155.9,
  },
  {
    location: '통영', temp: 17.6, max_temp: 22.1, min_temp: 13.9, wind_speed: 2.3, rain: 159.6,
  },
  {
    location: '목포', temp: 17.5, max_temp: 22.3, min_temp: 13.5, wind_speed: 3.4, rain: 91.3,
  },
  {
    location: '여수', temp: 17.9, max_temp: 21.7, min_temp: 14.7, wind_speed: 3.6, rain: 143.5,
  },
  {
    location: '흑산도', temp: 15.2, max_temp: 19.1, min_temp: 12.3, wind_speed: 4.6, rain: 96.7,
  },
  {
    location: '완도', temp: 17.6, max_temp: 22.5, min_temp: 13.4, wind_speed: 3.2, rain: 147,
  },
  {
    location: '고창', temp: 17.9, max_temp: 24.3, min_temp: 12.2, wind_speed: 2.7, rain: 69.6,
  },
  {
    location: '제주', temp: 18.3, max_temp: 22.1, min_temp: 15, wind_speed: 2.9, rain: 95.6,
  },
  {
    location: '고산', temp: 17.1, max_temp: 20.4, min_temp: 14.3, wind_speed: 5.4, rain: 117.7,
  },
  {
    location: '성산', temp: 17.7, max_temp: 21.9, min_temp: 13.7, wind_speed: 2.9, rain: 178,
  },
  {
    location: '서귀포', temp: 18.8, max_temp: 22.3, min_temp: 15.8, wind_speed: 2.4, rain: 223.6,
  },
  {
    location: '진주', temp: 18, max_temp: 24.6, min_temp: 11.6, wind_speed: 1.5, rain: 137.3,
  },
  {
    location: '강화', temp: 16, max_temp: 21.4, min_temp: 11, wind_speed: 2.2, rain: 110.9,
  },
  {
    location: '양평', temp: 17.6, max_temp: 24.5, min_temp: 11.2, wind_speed: 1.4, rain: 94.4,
  },
  {
    location: '이천', temp: 17.6, max_temp: 24.4, min_temp: 11.2, wind_speed: 1.5, rain: 93.2,
  },
  {
    location: '인제', temp: 16.1, max_temp: 23.2, min_temp: 9.6, wind_speed: 2.1, rain: 92.6,
  },
  {
    location: '홍천', temp: 16.9, max_temp: 24.5, min_temp: 10, wind_speed: 1.3, rain: 101.3,
  },
  {
    location: '태백', temp: 14.5, max_temp: 20.8, min_temp: 8.4, wind_speed: 1.8, rain: 90.2,
  },
  {
    location: '정선군', temp: 16.9, max_temp: 24.5, min_temp: 10.1, wind_speed: 1.9, rain: 66.8,
  },
  {
    location: '제천', temp: 16.2, max_temp: 23.4, min_temp: 9.2, wind_speed: 1.7, rain: 96.9,
  },
  {
    location: '보은', temp: 16.7, max_temp: 23.8, min_temp: 9.8, wind_speed: 1.5, rain: 92.8,
  },
  {
    location: '천안', temp: 17.5, max_temp: 24.1, min_temp: 11.4, wind_speed: 1.9, rain: 78.7,
  },
  {
    location: '보령', temp: 16.5, max_temp: 21.9, min_temp: 11.7, wind_speed: 2, rain: 87.5,
  },
  {
    location: '부여', temp: 17.6, max_temp: 24.5, min_temp: 11.4, wind_speed: 1.4, rain: 97.5,
  },
  {
    location: '금산', temp: 17.1, max_temp: 24.4, min_temp: 10.1, wind_speed: 1.3, rain: 81.6,
  },
  {
    location: '부안', temp: 17.1, max_temp: 23.2, min_temp: 12, wind_speed: 1.9, rain: 84.9,
  },
  {
    location: '임실', temp: 16.3, max_temp: 23.7, min_temp: 9.3, wind_speed: 1.5, rain: 85.9,
  },
  {
    location: '정읍', temp: 18, max_temp: 24.5, min_temp: 12.2, wind_speed: 1.5, rain: 87.2,
  },
  {
    location: '남원', temp: 17.6, max_temp: 24.8, min_temp: 10.7, wind_speed: 1.6, rain: 90.5,
  },
  {
    location: '장수', temp: 16, max_temp: 22.7, min_temp: 9.2, wind_speed: 1.9, rain: 100.5,
  },
  {
    location: '영광군', temp: 17.5, max_temp: 23.7, min_temp: 11.9, wind_speed: 2.3, rain: 93.8,
  },
  {
    location: '김해시', temp: 19.5, max_temp: 25.2, min_temp: 14.9, wind_speed: 2.2, rain: 110.6,
  },
  {
    location: '순창군', temp: 18.1, max_temp: 25.2, min_temp: 11.4, wind_speed: 1.9, rain: 87.3,
  },
  {
    location: '양산시', temp: 19.1, max_temp: 25.1, min_temp: 13.8, wind_speed: 2.6, rain: 110.2,
  },
  {
    location: '강진군', temp: 18, max_temp: 23.9, min_temp: 12.4, wind_speed: 2.6, rain: 122.9,
  },
  {
    location: '장흥', temp: 17.3, max_temp: 23.6, min_temp: 11.3, wind_speed: 2, rain: 121.6,
  },
  {
    location: '해남', temp: 17.3, max_temp: 23.2, min_temp: 11.6, wind_speed: 2.4, rain: 102.4,
  },
  {
    location: '고흥', temp: 17.4, max_temp: 23.3, min_temp: 11.7, wind_speed: 1.6, rain: 133.3,
  },
  {
    location: '의령군', temp: 18.6, max_temp: 26.2, min_temp: 11.5, wind_speed: 1.4, rain: 88,
  },
  {
    location: '함양군', temp: 18, max_temp: 25.5, min_temp: 10.5, wind_speed: 1.4, rain: 64.4,
  },
  {
    location: '진도군', temp: 17.2, max_temp: 22.7, min_temp: 12, wind_speed: 2.1, rain: 145.6,
  },
  {
    location: '봉화', temp: 15.5, max_temp: 23.3, min_temp: 7.7, wind_speed: 1.5, rain: 101.5,
  },
  {
    location: '영주', temp: 17.2, max_temp: 23.9, min_temp: 10.5, wind_speed: 2.4, rain: 118.5,
  },
  {
    location: '문경', temp: 17.3, max_temp: 24, min_temp: 10.6, wind_speed: 1.8, rain: 108.1,
  },
  {
    location: '청송군', temp: 16.8, max_temp: 25, min_temp: 9.1, wind_speed: 1.5, rain: 56.7,
  },
  {
    location: '영덕', temp: 17.1, max_temp: 22.9, min_temp: 11.6, wind_speed: 2.7, rain: 74.5,
  },
  {
    location: '의성', temp: 17.1, max_temp: 25.4, min_temp: 9, wind_speed: 1.3, rain: 78.6,
  },
  {
    location: '구미', temp: 18.6, max_temp: 25.4, min_temp: 12, wind_speed: 1.6, rain: 78.7,
  },
  {
    location: '영천', temp: 17.8, max_temp: 24.9, min_temp: 10.8, wind_speed: 1.9, rain: 85.8,
  },
  {
    location: '경주시', temp: 18.4, max_temp: 25.7, min_temp: 11.7, wind_speed: 2.6, rain: 55.3,
  },
  {
    location: '거창', temp: 17.1, max_temp: 24.5, min_temp: 9.8, wind_speed: 1.5, rain: 88.7,
  },
  {
    location: '합천', temp: 18.2, max_temp: 25.6, min_temp: 11.3, wind_speed: 1.5, rain: 94.1,
  },
  {
    location: '밀양', temp: 18.3, max_temp: 25.5, min_temp: 11.6, wind_speed: 1.5, rain: 106.7,
  },
  {
    location: '산청', temp: 17.8, max_temp: 24.7, min_temp: 11.3, wind_speed: 1.7, rain: 105.5,
  },
  {
    location: '거제', temp: 17.9, max_temp: 23.1, min_temp: 13, wind_speed: 1.9, rain: 203,
  },
  {
    location: '남해', temp: 18.2, max_temp: 23.9, min_temp: 13.2, wind_speed: 1.6, rain: 196.3,
  },
  {
    location: '강남', temp: 19.2, max_temp: 24.5, min_temp: 14.7, wind_speed: 1.9, rain: 87.7,
  },
  {
    location: '서초', temp: 19.2, max_temp: 25.1, min_temp: 14.2, wind_speed: 1.4, rain: 89.5,
  },
  {
    location: '강동', temp: 18.8, max_temp: 24.7, min_temp: 13.3, wind_speed: 1.6, rain: 78.7,
  },
  {
    location: '송파', temp: 19.4, max_temp: 24.9, min_temp: 14.6, wind_speed: 1.8, rain: 88.7,
  },
  {
    location: '강서', temp: 18.2, max_temp: 23.5, min_temp: 13.8, wind_speed: 1.9, rain: 86.4,
  },
  {
    location: '양천', temp: 19.1, max_temp: 24.6, min_temp: 14.6, wind_speed: 1.6, rain: 90.5,
  },
  {
    location: '도봉', temp: 18, max_temp: 24.3, min_temp: 12.2, wind_speed: 1.2, rain: 106.2,
  },
  {
    location: '노원', temp: 17.8, max_temp: 24.5, min_temp: 11.3, wind_speed: 1.6, rain: 96.2,
  },
  {
    location: '동대문', temp: 19.2, max_temp: 24.7, min_temp: 14.4, wind_speed: 2, rain: 95.1,
  },
  {
    location: '중랑', temp: 19.3, max_temp: 24.6, min_temp: 14.7, wind_speed: 2.3, rain: 90,
  },
  {
    location: '기상청', temp: 18.6, max_temp: 24, min_temp: 13.9, wind_speed: 1.6, rain: 97.4,
  },
  {
    location: '마포', temp: 18.8, max_temp: 24.3, min_temp: 14.4, wind_speed: 2.3, rain: 82.6,
  },
  {
    location: '서대문', temp: 17.8, max_temp: 24.2, min_temp: 12.6, wind_speed: 1.4, rain: 86.8,
  },
  {
    location: '광진', temp: 19, max_temp: 24.5, min_temp: 14.3, wind_speed: 1.9, rain: 78.7,
  },
  {
    location: '성북', temp: 18.1, max_temp: 23.6, min_temp: 13.3, wind_speed: 1.8, rain: 102.5,
  },
  {
    location: '용산', temp: 19.2, max_temp: 24.5, min_temp: 14.5, wind_speed: 1.9, rain: 83.8,
  },
  {
    location: '은평', temp: 17.6, max_temp: 23.6, min_temp: 12.2, wind_speed: 1.8, rain: 83.4,
  },
  {
    location: '금천', temp: 18.4, max_temp: 23.5, min_temp: 14.2, wind_speed: 2.2, rain: 88.5,
  },
  {
    location: '중구', temp: 17.6, max_temp: 23.7, min_temp: 13, wind_speed: 1.7, rain: 84.6,
  },
  {
    location: '성동', temp: 19.2, max_temp: 24.3, min_temp: 14.8, wind_speed: 2.4, rain: 80.4,
  },
  {
    location: '구로', temp: 18.1, max_temp: 24, min_temp: 13, wind_speed: 2.1, rain: 92.2,
  },
  {
    location: '강북', temp: 19.2, max_temp: 24.8, min_temp: 14.3, wind_speed: 1.9, rain: 100.9,
  },
  {
    location: '남현', temp: 17.9, max_temp: 24, min_temp: 12.5, wind_speed: 1.3, rain: 89.7,
  },
  {
    location: '부천', temp: 18.4, max_temp: 23.6, min_temp: 13.9, wind_speed: 1.4, rain: 87.8,
  },
  {
    location: '안양', temp: 18.4, max_temp: 23.4, min_temp: 13.9, wind_speed: 2.2, rain: 92.7,
  },
  {
    location: '광명', temp: 18.7, max_temp: 24, min_temp: 14.4, wind_speed: 2.1, rain: 96.6,
  },
  {
    location: '군포', temp: 18.5, max_temp: 24, min_temp: 13.8, wind_speed: 1.7, rain: 94.2,
  },
  {
    location: '김포', temp: 17.2, max_temp: 22.8, min_temp: 12.5, wind_speed: 2.1, rain: 90.3,
  },
  {
    location: '하남', temp: 18.3, max_temp: 24.9, min_temp: 12.4, wind_speed: 1, rain: 66.8,
  },
  {
    location: '의왕', temp: 17, max_temp: 23.1, min_temp: 11.4, wind_speed: 1.1, rain: 90.9,
  },
  {
    location: '포천', temp: 17.6, max_temp: 24.5, min_temp: 11.2, wind_speed: 1.6, rain: 91.6,
  },
  {
    location: '가평조종', temp: 16.3, max_temp: 23.8, min_temp: 9.1, wind_speed: 1.3, rain: 93.5,
  },
  {
    location: '영등포', temp: 19.2, max_temp: 24.5, min_temp: 15, wind_speed: 1.8, rain: 83.9,
  },
  {
    location: '인천연수', temp: 17.3, max_temp: 22.7, min_temp: 12.8, wind_speed: 1.8, rain: 84.3,
  },
  {
    location: '안성', temp: 18.1, max_temp: 24.6, min_temp: 12.2, wind_speed: 1.4, rain: 72.6,
  },
  {
    location: '간성', temp: 16.3, max_temp: 21.4, min_temp: 11.6, wind_speed: 1.8, rain: 86.3,
  },
  {
    location: '평창', temp: 16.2, max_temp: 23.4, min_temp: 9.6, wind_speed: 1.4, rain: 80.3,
  },
  {
    location: '의정부', temp: 17.4, max_temp: 24.1, min_temp: 11.4, wind_speed: 1.2, rain: 99.6,
  },
  {
    location: '횡성', temp: 17.1, max_temp: 24.9, min_temp: 10.3, wind_speed: 1.3, rain: 91.8,
  },
  {
    location: '고양', temp: 17.4, max_temp: 24.5, min_temp: 11.3, wind_speed: 1.4, rain: 87.3,
  },
  {
    location: '남양주', temp: 17.3, max_temp: 24.5, min_temp: 10.4, wind_speed: 1.3, rain: 91.8,
  },
  {
    location: '안산', temp: 16.6, max_temp: 23.4, min_temp: 10.6, wind_speed: 1.8, rain: 76.4,
  },
  {
    location: '경기광주', temp: 17.2, max_temp: 23.9, min_temp: 11.2, wind_speed: 1.7, rain: 91.4,
  },
  {
    location: '여주', temp: 17.9, max_temp: 24.9, min_temp: 11.4, wind_speed: 1.5, rain: 71.7,
  },
  {
    location: '용인', temp: 17.1, max_temp: 23.9, min_temp: 10.9, wind_speed: 1.6, rain: 89.4,
  },
  {
    location: '오산', temp: 17.6, max_temp: 24.5, min_temp: 11.8, wind_speed: 1.4, rain: 92.2,
  },
  {
    location: '평택', temp: 18.4, max_temp: 24.5, min_temp: 12.8, wind_speed: 1.9, rain: 77.6,
  },
  {
    location: '화천', temp: 16.8, max_temp: 24.7, min_temp: 9.9, wind_speed: 1.2, rain: 88.1,
  },
  {
    location: '양구', temp: 16.2, max_temp: 24.2, min_temp: 9.6, wind_speed: 1.3, rain: 79.3,
  },
  {
    location: '시흥', temp: 17.6, max_temp: 23, min_temp: 12.8, wind_speed: 1.9, rain: 78.4,
  },
  {
    location: '구리', temp: 18.4, max_temp: 24.5, min_temp: 12.7, wind_speed: 1.5, rain: 93.4,
  },
  {
    location: '금곡', temp: 16.7, max_temp: 22.5, min_temp: 12, wind_speed: 1.5, rain: 84.8,
  },
  {
    location: '화성', temp: 17, max_temp: 23.1, min_temp: 12, wind_speed: 1.5, rain: 72.2,
  },
  {
    location: '성남', temp: 18.6, max_temp: 24.6, min_temp: 13.1, wind_speed: 1.3, rain: 85.3,
  },
  {
    location: '과천', temp: 17.9, max_temp: 24.2, min_temp: 12.1, wind_speed: 2, rain: 90.2,
  },
  {
    location: '진부령', temp: 14.4, max_temp: 20.1, min_temp: 9.3, wind_speed: 3.1, rain: 99.6,
  },
  {
    location: '양주', temp: 17.3, max_temp: 24.2, min_temp: 10.8, wind_speed: 1.6, rain: 95.6,
  },
  {
    location: '단양', temp: 17.7, max_temp: 24.9, min_temp: 11.2, wind_speed: 1, rain: 69.9,
  },
  {
    location: '진천', temp: 17.4, max_temp: 24.5, min_temp: 10.9, wind_speed: 1.4, rain: 86.8,
  },
  {
    location: '괴산', temp: 17.2, max_temp: 24.4, min_temp: 10.4, wind_speed: 1.3, rain: 84.9,
  },
  {
    location: '옥천', temp: 17.7, max_temp: 24.8, min_temp: 11.1, wind_speed: 1.2, rain: 74.4,
  },
  {
    location: '홍북', temp: 17.2, max_temp: 24, min_temp: 11.2, wind_speed: 1.9, rain: 93.2,
  },
  {
    location: '세종연서', temp: 17.4, max_temp: 24.6, min_temp: 11.2, wind_speed: 1.5, rain: 86.5,
  },
  {
    location: '공주', temp: 18.1, max_temp: 25.1, min_temp: 11.9, wind_speed: 1.5, rain: 98.7,
  },
  {
    location: '서천', temp: 17, max_temp: 22.7, min_temp: 11.9, wind_speed: 2.1, rain: 89.2,
  },
  {
    location: '논산', temp: 18, max_temp: 24.8, min_temp: 11.9, wind_speed: 1.8, rain: 88.1,
  },
  {
    location: '당진', temp: 16.8, max_temp: 23, min_temp: 11.5, wind_speed: 2.3, rain: 85.3,
  },
  {
    location: '청양', temp: 16.8, max_temp: 23.9, min_temp: 10.1, wind_speed: 1.4, rain: 90.1,
  },
  {
    location: '음성', temp: 16.8, max_temp: 24.6, min_temp: 9.6, wind_speed: 1.6, rain: 83.4,
  },
  {
    location: '증평', temp: 17.5, max_temp: 25, min_temp: 10.8, wind_speed: 1.5, rain: 75.1,
  },
  {
    location: '태안', temp: 16.7, max_temp: 22.1, min_temp: 12.1, wind_speed: 1.9, rain: 89.1,
  },
  {
    location: '예산', temp: 17.9, max_temp: 24.4, min_temp: 12.2, wind_speed: 2.2, rain: 74,
  },
  {
    location: '아산', temp: 17.7, max_temp: 24.1, min_temp: 12.6, wind_speed: 2.1, rain: 73.3,
  },
  {
    location: '계룡', temp: 16.8, max_temp: 24.1, min_temp: 9.9, wind_speed: 1.2, rain: 98.8,
  },
  {
    location: '문화', temp: 19.1, max_temp: 25.5, min_temp: 13.3, wind_speed: 1.5, rain: 85.6,
  },
  {
    location: '세천', temp: 17.7, max_temp: 24.7, min_temp: 11, wind_speed: 1.2, rain: 79.6,
  },
  {
    location: '장동', temp: 18, max_temp: 24.8, min_temp: 11.7, wind_speed: 1.2, rain: 82.7,
  },
  {
    location: '부평', temp: 17.6, max_temp: 24.8, min_temp: 11.3, wind_speed: 0.7, rain: 73.4,
  },
  {
    location: '연천청산', temp: 17.6, max_temp: 24.6, min_temp: 11.2, wind_speed: 1.4, rain: 84.2,
  },
  {
    location: '양양', temp: 17.6, max_temp: 22.6, min_temp: 12.8, wind_speed: 2.5, rain: 70.3,
  },
  {
    location: '사북', temp: 14.9, max_temp: 20.9, min_temp: 9.2, wind_speed: 3.4, rain: 76.1,
  },
  {
    location: '무안', temp: 17.4, max_temp: 23.3, min_temp: 12.2, wind_speed: 1.9, rain: 96.5,
  },
  {
    location: '무주', temp: 17.1, max_temp: 24.7, min_temp: 9.8, wind_speed: 1.5, rain: 69.1,
  },
  {
    location: '익산', temp: 18, max_temp: 24.4, min_temp: 12.2, wind_speed: 1.7, rain: 83.1,
  },
  {
    location: '진안', temp: 16, max_temp: 23.2, min_temp: 9.2, wind_speed: 1.7, rain: 87.9,
  },
  {
    location: '담양', temp: 17.7, max_temp: 24.7, min_temp: 11.6, wind_speed: 1.8, rain: 99.3,
  },
  {
    location: '광산', temp: 18.1, max_temp: 25, min_temp: 12, wind_speed: 1.9, rain: 92.9,
  },
  {
    location: '구례', temp: 18.3, max_temp: 25.9, min_temp: 11.5, wind_speed: 1.5, rain: 90.6,
  },
  {
    location: '나주', temp: 18, max_temp: 25.1, min_temp: 12, wind_speed: 1.6, rain: 107.4,
  },
  {
    location: '순천시', temp: 18.9, max_temp: 24.4, min_temp: 14.1, wind_speed: 1.9, rain: 141.7,
  },
  {
    location: '광양읍', temp: 18.7, max_temp: 25.2, min_temp: 12.9, wind_speed: 1.4, rain: 132.9,
  },
  {
    location: '조선대', temp: 18.7, max_temp: 24.8, min_temp: 13.1, wind_speed: 2.1, rain: 84.7,
  },
  {
    location: '거문도', temp: 17.3, max_temp: 20.6, min_temp: 14.8, wind_speed: 3.3, rain: 133.9,
  },
  {
    location: '추자도', temp: 16.3, max_temp: 19.4, min_temp: 13.9, wind_speed: 3.6, rain: 92.5,
  },
  {
    location: '장성', temp: 17.5, max_temp: 24.8, min_temp: 11.2, wind_speed: 1.6, rain: 99.2,
  },
  {
    location: '영암', temp: 17.9, max_temp: 24.1, min_temp: 12.4, wind_speed: 2.4, rain: 97.7,
  },
  {
    location: '보성', temp: 16.8, max_temp: 23.2, min_temp: 10.9, wind_speed: 1.8, rain: 151.3,
  },
  {
    location: '완주', temp: 18, max_temp: 25.3, min_temp: 11.4, wind_speed: 2, rain: 92.4,
  },
  {
    location: '김제', temp: 18.1, max_temp: 24.3, min_temp: 12.9, wind_speed: 2.4, rain: 78.1,
  },
  {
    location: '화순', temp: 18.1, max_temp: 25.3, min_temp: 11.8, wind_speed: 1.2, rain: 90,
  },
  {
    location: '함평', temp: 17.7, max_temp: 23.9, min_temp: 12.2, wind_speed: 1.8, rain: 93.8,
  },
  {
    location: '곡성', temp: 18, max_temp: 25.2, min_temp: 11.6, wind_speed: 1.4, rain: 85.1,
  },
  {
    location: '성판악', temp: 14.7, max_temp: 18.9, min_temp: 10.6, wind_speed: 2.7, rain: 465.9,
  },
  {
    location: '풍암', temp: 18.9, max_temp: 25.8, min_temp: 12.7, wind_speed: 1.4, rain: 102.7,
  },
  {
    location: '압해도', temp: 17.4, max_temp: 22.4, min_temp: 13.4, wind_speed: 2.8, rain: 86.5,
  },
  {
    location: '영양', temp: 16.3, max_temp: 23.6, min_temp: 9.5, wind_speed: 1.6, rain: 78.3,
  },
  {
    location: '성주', temp: 18.4, max_temp: 25.6, min_temp: 11.4, wind_speed: 1.4, rain: 82.3,
  },
  {
    location: '고령', temp: 18.1, max_temp: 25.6, min_temp: 11.1, wind_speed: 1.1, rain: 93.6,
  },
  {
    location: '청도', temp: 18.2, max_temp: 25.6, min_temp: 11.4, wind_speed: 1.6, rain: 95.1,
  },
  {
    location: '예천', temp: 17.5, max_temp: 25.1, min_temp: 10.5, wind_speed: 1.3, rain: 87,
  },
  {
    location: '김천', temp: 18.3, max_temp: 26, min_temp: 11, wind_speed: 1.2, rain: 68.2,
  },
  {
    location: '군위', temp: 17.5, max_temp: 25.5, min_temp: 10.1, wind_speed: 1.6, rain: 74.1,
  },
  {
    location: '칠곡', temp: 18.8, max_temp: 26, min_temp: 12.2, wind_speed: 2, rain: 79.3,
  },
  {
    location: '경산', temp: 19.4, max_temp: 26.2, min_temp: 13.4, wind_speed: 2, rain: 81.9,
  },
  {
    location: '달성', temp: 19.2, max_temp: 26.4, min_temp: 13, wind_speed: 1.7, rain: 83.4,
  },
  {
    location: '서구', temp: 19.9, max_temp: 26.2, min_temp: 14, wind_speed: 2, rain: 75.8,
  },
  {
    location: '대구', temp: 19.7, max_temp: 25.7, min_temp: 14.1, wind_speed: 2.4, rain: 77.9,
  },
  {
    location: '전주', temp: 18.5, max_temp: 25, min_temp: 12.7, wind_speed: 1.8, rain: 82.8,
  },
  {
    location: '삼척', temp: 17.5, max_temp: 22.3, min_temp: 13.1, wind_speed: 2.2, rain: 52.2,
  },
  {
    location: '울기', temp: 16.5, max_temp: 20.2, min_temp: 14.1, wind_speed: 2.6, rain: 102,
  },
  {
    location: '삼천포', temp: 18.1, max_temp: 22.4, min_temp: 14.7, wind_speed: 1.9, rain: 139.1,
  },
  {
    location: '영도', temp: 16.7, max_temp: 20.1, min_temp: 14.1, wind_speed: 3.7, rain: 114.7,
  },
  {
    location: '고성', temp: 18.1, max_temp: 23.8, min_temp: 13.1, wind_speed: 2.1, rain: 149.7,
  },
  {
    location: '창녕', temp: 18.7, max_temp: 26.4, min_temp: 11.5, wind_speed: 1.9, rain: 89.4,
  },
  {
    location: '함안', temp: 18.4, max_temp: 26.2, min_temp: 11.5, wind_speed: 1.4, rain: 98.2,
  },
  {
    location: '가덕도', temp: 17.3, max_temp: 21.5, min_temp: 14.5, wind_speed: 3.8, rain: 98.1,
  },
  {
    location: '기장', temp: 17.7, max_temp: 22.6, min_temp: 12.9, wind_speed: 1.9, rain: 148.5,
  },
  {
    location: '간절곶', temp: 16.6, max_temp: 19.7, min_temp: 14, wind_speed: 3.7, rain: 127.3,
  },
  {
    location: '하동', temp: 18.9, max_temp: 25.3, min_temp: 13.2, wind_speed: 1.5, rain: 155.9,
  },
  {
    location: '해운대', temp: 17.9, max_temp: 22.3, min_temp: 14.2, wind_speed: 2.4, rain: 155.6,
  },
  {
    location: '부산진', temp: 18.8, max_temp: 23.5, min_temp: 14.9, wind_speed: 2.3, rain: 154.8,
  },
  {
    location: '동래', temp: 18.9, max_temp: 23.9, min_temp: 14.6, wind_speed: 2, rain: 143.9,
  },
  {
    location: '북구', temp: 18.7, max_temp: 23.6, min_temp: 14.4, wind_speed: 2.2, rain: 127.3,
  },
  {
    location: '부산남구', temp: 18.6, max_temp: 22.6, min_temp: 15.2, wind_speed: 2.2, rain: 153.1,
  },
  {
    location: '정자', temp: 17.7, max_temp: 22.7, min_temp: 13.1, wind_speed: 2.7, rain: 103.3,
  }],
  [{
    location: '속초', temp: 19.8, max_temp: 23.5, min_temp: 16.5, wind_speed: 2, rain: 119.5,
  },
  {
    location: '철원', temp: 21.1, max_temp: 26.7, min_temp: 16.1, wind_speed: 1.8, rain: 119,
  },
  {
    location: '동두천', temp: 21.8, max_temp: 28.2, min_temp: 16.7, wind_speed: 1.5, rain: 130.5,
  },
  {
    location: '파주', temp: 21.4, max_temp: 27.5, min_temp: 16.5, wind_speed: 1.5, rain: 107.4,
  },
  {
    location: '대관령', temp: 16.2, max_temp: 21.3, min_temp: 11.6, wind_speed: 2.9, rain: 162.5,
  },
  {
    location: '춘천', temp: 22.2, max_temp: 28.1, min_temp: 17, wind_speed: 1.3, rain: 122.9,
  },
  {
    location: '백령도', temp: 19, max_temp: 22.9, min_temp: 16.1, wind_speed: 4, rain: 72,
  },
  {
    location: '강릉', temp: 21.3, max_temp: 25.4, min_temp: 17.5, wind_speed: 1.9, rain: 118.5,
  },
  {
    location: '동해', temp: 19.6, max_temp: 23.4, min_temp: 16.5, wind_speed: 1.9, rain: 105.9,
  },
  {
    location: '서울', temp: 22.7, max_temp: 27.6, min_temp: 18.7, wind_speed: 2.2, rain: 129.5,
  },
  {
    location: '인천', temp: 21.3, max_temp: 25.6, min_temp: 18, wind_speed: 2.4, rain: 106,
  },
  {
    location: '원주', temp: 22.4, max_temp: 28.1, min_temp: 17.3, wind_speed: 1.1, rain: 136.7,
  },
  {
    location: '울릉도', temp: 19.1, max_temp: 22.5, min_temp: 16.5, wind_speed: 3.1, rain: 116.8,
  },
  {
    location: '수원', temp: 22.2, max_temp: 27.5, min_temp: 17.9, wind_speed: 1.8, rain: 122.9,
  },
  {
    location: '영월', temp: 21.3, max_temp: 28.1, min_temp: 15.6, wind_speed: 1.3, rain: 137.1,
  },
  {
    location: '충주', temp: 22.1, max_temp: 28, min_temp: 16.8, wind_speed: 1.6, rain: 134.7,
  },
  {
    location: '서산', temp: 21.3, max_temp: 26.4, min_temp: 17, wind_speed: 2.2, rain: 138.2,
  },
  {
    location: '울진', temp: 19.4, max_temp: 23.3, min_temp: 16, wind_speed: 2.6, rain: 104.3,
  },
  {
    location: '청주', temp: 23, max_temp: 28.2, min_temp: 18.4, wind_speed: 1.7, rain: 140,
  },
  {
    location: '대전', temp: 22.7, max_temp: 27.9, min_temp: 18.1, wind_speed: 1.8, rain: 167.3,
  },
  {
    location: '추풍령', temp: 21.1, max_temp: 26.8, min_temp: 16, wind_speed: 1.9, rain: 136.6,
  },
  {
    location: '안동', temp: 21.9, max_temp: 27.9, min_temp: 16.5, wind_speed: 1.5, rain: 123.1,
  },
  {
    location: '상주', temp: 22.5, max_temp: 28.5, min_temp: 17.4, wind_speed: 1.2, rain: 115.2,
  },
  {
    location: '포항', temp: 21.8, max_temp: 25.8, min_temp: 18.6, wind_speed: 2.3, rain: 126.8,
  },
  {
    location: '군산', temp: 21.6, max_temp: 26.1, min_temp: 18.1, wind_speed: 2.8, rain: 142.2,
  },
  {
    location: '울산', temp: 21.6, max_temp: 26.1, min_temp: 17.7, wind_speed: 1.9, rain: 155.5,
  },
  {
    location: '창원', temp: 21.8, max_temp: 26.1, min_temp: 18.5, wind_speed: 2, rain: 190.7,
  },
  {
    location: '광주', temp: 22.7, max_temp: 27.9, min_temp: 18.7, wind_speed: 2, rain: 152.6,
  },
  {
    location: '부산', temp: 21, max_temp: 24.6, min_temp: 18.3, wind_speed: 3.2, rain: 188.4,
  },
  {
    location: '통영', temp: 20.9, max_temp: 24.8, min_temp: 18, wind_speed: 2.1, rain: 195.8,
  },
  {
    location: '목포', temp: 21.6, max_temp: 25.7, min_temp: 18.5, wind_speed: 2.9, rain: 150.2,
  },
  {
    location: '여수', temp: 21.2, max_temp: 24.4, min_temp: 18.8, wind_speed: 3.1, rain: 194.3,
  },
  {
    location: '흑산도', temp: 19.2, max_temp: 22.8, min_temp: 16.6, wind_speed: 3.8, rain: 157.5,
  },
  {
    location: '완도', temp: 21.2, max_temp: 25.4, min_temp: 17.9, wind_speed: 2.8, rain: 207.2,
  },
  {
    location: '고창', temp: 22, max_temp: 27.2, min_temp: 18, wind_speed: 2.4, rain: 89,
  },
  {
    location: '제주', temp: 21.7, max_temp: 24.9, min_temp: 19.1, wind_speed: 2.7, rain: 171.2,
  },
  {
    location: '고산', temp: 20.7, max_temp: 23.7, min_temp: 18.4, wind_speed: 4.4, rain: 158.1,
  },
  {
    location: '성산', temp: 20.9, max_temp: 24.2, min_temp: 17.9, wind_speed: 2.5, rain: 231.9,
  },
  {
    location: '서귀포', temp: 21.8, max_temp: 24.7, min_temp: 19.5, wind_speed: 2.3, rain: 267.6,
  },
  {
    location: '진주', temp: 21.8, max_temp: 27.4, min_temp: 17.2, wind_speed: 1.4, rain: 174.3,
  },
  {
    location: '강화', temp: 20.5, max_temp: 25.4, min_temp: 16.3, wind_speed: 1.9, rain: 110,
  },
  {
    location: '양평', temp: 22.2, max_temp: 28.3, min_temp: 16.9, wind_speed: 1.3, rain: 134.2,
  },
  {
    location: '이천', temp: 22, max_temp: 27.9, min_temp: 16.7, wind_speed: 1.3, rain: 128.2,
  },
  {
    location: '인제', temp: 20.4, max_temp: 27, min_temp: 15.1, wind_speed: 1.8, rain: 116.8,
  },
  {
    location: '홍천', temp: 21.6, max_temp: 28.4, min_temp: 16, wind_speed: 1.2, rain: 124.9,
  },
  {
    location: '태백', temp: 18.1, max_temp: 24, min_temp: 12.9, wind_speed: 1.5, rain: 140.4,
  },
  {
    location: '정선군', temp: 20.9, max_temp: 28, min_temp: 15.5, wind_speed: 1.4, rain: 107.4,
  },
  {
    location: '제천', temp: 20.8, max_temp: 27.1, min_temp: 15.2, wind_speed: 1.4, rain: 147.5,
  },
  {
    location: '보은', temp: 21.1, max_temp: 27.1, min_temp: 15.7, wind_speed: 1.3, rain: 156.4,
  },
  {
    location: '천안', temp: 21.8, max_temp: 27.5, min_temp: 16.8, wind_speed: 1.6, rain: 127,
  },
  {
    location: '보령', temp: 21.1, max_temp: 25.7, min_temp: 17.1, wind_speed: 1.7, rain: 134,
  },
  {
    location: '부여', temp: 22.1, max_temp: 28, min_temp: 17.2, wind_speed: 1.3, rain: 157.1,
  },
  {
    location: '금산', temp: 21.6, max_temp: 27.8, min_temp: 16.1, wind_speed: 1.2, rain: 161.8,
  },
  {
    location: '부안', temp: 21.5, max_temp: 26.6, min_temp: 17.6, wind_speed: 1.7, rain: 131.8,
  },
  {
    location: '임실', temp: 20.8, max_temp: 27.1, min_temp: 15.5, wind_speed: 1.3, rain: 142.4,
  },
  {
    location: '정읍', temp: 22.2, max_temp: 27.9, min_temp: 17.5, wind_speed: 1.3, rain: 136.1,
  },
  {
    location: '남원', temp: 22.1, max_temp: 28, min_temp: 16.9, wind_speed: 1.4, rain: 157.3,
  },
  {
    location: '장수', temp: 20.1, max_temp: 25.9, min_temp: 15, wind_speed: 1.6, rain: 164.9,
  },
  {
    location: '영광군', temp: 21.8, max_temp: 26.9, min_temp: 17.8, wind_speed: 2, rain: 104.7,
  },
  {
    location: '김해시', temp: 22.7, max_temp: 27.7, min_temp: 19, wind_speed: 1.9, rain: 140.8,
  },
  {
    location: '순창군', temp: 22.4, max_temp: 28.3, min_temp: 17.4, wind_speed: 1.6, rain: 122.3,
  },
  {
    location: '양산시', temp: 22.7, max_temp: 27.8, min_temp: 18.5, wind_speed: 2.4, rain: 147.7,
  },
  {
    location: '강진군', temp: 22, max_temp: 26.6, min_temp: 18.3, wind_speed: 2.3, rain: 156.6,
  },
  {
    location: '장흥', temp: 21.4, max_temp: 26.2, min_temp: 17.3, wind_speed: 1.8, rain: 187,
  },
  {
    location: '해남', temp: 21.5, max_temp: 26.4, min_temp: 17.5, wind_speed: 2.3, rain: 160.9,
  },
  {
    location: '고흥', temp: 21.1, max_temp: 26, min_temp: 16.9, wind_speed: 1.4, rain: 186.9,
  },
  {
    location: '의령군', temp: 22.2, max_temp: 28.2, min_temp: 17.3, wind_speed: 1.1, rain: 121.5,
  },
  {
    location: '함양군', temp: 22, max_temp: 28.2, min_temp: 16.6, wind_speed: 1, rain: 114,
  },
  {
    location: '진도군', temp: 21.3, max_temp: 26, min_temp: 17.3, wind_speed: 1.8, rain: 153.9,
  },
  {
    location: '봉화', temp: 19.6, max_temp: 26.6, min_temp: 13.4, wind_speed: 1.3, rain: 143.2,
  },
  {
    location: '영주', temp: 21.3, max_temp: 27.4, min_temp: 15.8, wind_speed: 1.8, rain: 158.5,
  },
  {
    location: '문경', temp: 21.3, max_temp: 27.2, min_temp: 15.9, wind_speed: 1.4, rain: 154.8,
  },
  {
    location: '청송군', temp: 20.6, max_temp: 27.8, min_temp: 14.6, wind_speed: 1.2, rain: 93.7,
  },
  {
    location: '영덕', temp: 20.4, max_temp: 25.6, min_temp: 16, wind_speed: 2.4, rain: 113.4,
  },
  {
    location: '의성', temp: 21.6, max_temp: 28.6, min_temp: 15.2, wind_speed: 1.1, rain: 115.8,
  },
  {
    location: '구미', temp: 22.6, max_temp: 28.4, min_temp: 17.4, wind_speed: 1.3, rain: 120.3,
  },
  {
    location: '영천', temp: 21.7, max_temp: 27.6, min_temp: 16.3, wind_speed: 1.7, rain: 126,
  },
  {
    location: '경주시', temp: 21.9, max_temp: 27.7, min_temp: 17, wind_speed: 2.2, rain: 100.6,
  },
  {
    location: '거창', temp: 21.2, max_temp: 27.4, min_temp: 15.7, wind_speed: 1.3, rain: 149.4,
  },
  {
    location: '합천', temp: 22.2, max_temp: 28.5, min_temp: 16.8, wind_speed: 1.4, rain: 146.7,
  },
  {
    location: '밀양', temp: 22.3, max_temp: 28.3, min_temp: 17.3, wind_speed: 1.5, rain: 155.9,
  },
  {
    location: '산청', temp: 21.6, max_temp: 27.5, min_temp: 16.7, wind_speed: 1.4, rain: 172.4,
  },
  {
    location: '거제', temp: 21.2, max_temp: 25.8, min_temp: 17.4, wind_speed: 1.8, rain: 237.1,
  },
  {
    location: '남해', temp: 21.6, max_temp: 26.5, min_temp: 17.8, wind_speed: 1.4, rain: 243.8,
  },
  {
    location: '강남', temp: 23.6, max_temp: 28.4, min_temp: 19.6, wind_speed: 1.7, rain: 120.3,
  },
  {
    location: '서초', temp: 23.7, max_temp: 29.3, min_temp: 19.4, wind_speed: 1.3, rain: 123.8,
  },
  {
    location: '강동', temp: 23.3, max_temp: 28.7, min_temp: 18.6, wind_speed: 1.5, rain: 129.4,
  },
  {
    location: '송파', temp: 23.7, max_temp: 28.7, min_temp: 19.6, wind_speed: 1.7, rain: 132.8,
  },
  {
    location: '강서', temp: 22.7, max_temp: 27.5, min_temp: 18.8, wind_speed: 1.8, rain: 111.9,
  },
  {
    location: '양천', temp: 23.6, max_temp: 28.6, min_temp: 19.7, wind_speed: 1.5, rain: 113.1,
  },
  {
    location: '도봉', temp: 22.5, max_temp: 28.3, min_temp: 17.6, wind_speed: 1.1, rain: 136.6,
  },
  {
    location: '노원', temp: 22.3, max_temp: 28.4, min_temp: 16.9, wind_speed: 1.4, rain: 126,
  },
  {
    location: '동대문', temp: 23.6, max_temp: 28.8, min_temp: 19.5, wind_speed: 1.9, rain: 120.6,
  },
  {
    location: '중랑', temp: 23.7, max_temp: 28.5, min_temp: 19.6, wind_speed: 2.1, rain: 125.6,
  },
  {
    location: '기상청', temp: 23, max_temp: 27.9, min_temp: 18.9, wind_speed: 1.5, rain: 120.4,
  },
  {
    location: '마포', temp: 23.3, max_temp: 28.3, min_temp: 19.4, wind_speed: 2.2, rain: 118,
  },
  {
    location: '서대문', temp: 22.2, max_temp: 28.2, min_temp: 17.7, wind_speed: 1.3, rain: 122,
  },
  {
    location: '광진', temp: 23.6, max_temp: 28.6, min_temp: 19.4, wind_speed: 1.8, rain: 115.2,
  },
  {
    location: '성북', temp: 22.6, max_temp: 27.5, min_temp: 18.4, wind_speed: 1.6, rain: 132.2,
  },
  {
    location: '용산', temp: 23.7, max_temp: 28.7, min_temp: 19.7, wind_speed: 1.9, rain: 120.6,
  },
  {
    location: '은평', temp: 22.2, max_temp: 27.6, min_temp: 17.6, wind_speed: 1.6, rain: 107,
  },
  {
    location: '금천', temp: 22.8, max_temp: 27.3, min_temp: 19.1, wind_speed: 2, rain: 116.3,
  },
  {
    location: '중구', temp: 21.9, max_temp: 27.6, min_temp: 17.9, wind_speed: 1.6, rain: 114.3,
  },
  {
    location: '성동', temp: 23.5, max_temp: 28.1, min_temp: 19.7, wind_speed: 2.3, rain: 116,
  },
  {
    location: '구로', temp: 22.6, max_temp: 27.9, min_temp: 18.2, wind_speed: 1.9, rain: 111.3,
  },
  {
    location: '강북', temp: 23.6, max_temp: 28.8, min_temp: 19.4, wind_speed: 1.8, rain: 126.4,
  },
  {
    location: '남현', temp: 22.3, max_temp: 27.9, min_temp: 17.6, wind_speed: 1.2, rain: 129.5,
  },
  {
    location: '부천', temp: 22.9, max_temp: 27.7, min_temp: 19.1, wind_speed: 1.3, rain: 110,
  },
  {
    location: '안양', temp: 22.9, max_temp: 27.4, min_temp: 19, wind_speed: 2.1, rain: 114.1,
  },
  {
    location: '광명', temp: 23.2, max_temp: 28, min_temp: 19.3, wind_speed: 2, rain: 126.4,
  },
  {
    location: '군포', temp: 23, max_temp: 27.9, min_temp: 19, wind_speed: 1.5, rain: 115.2,
  },
  {
    location: '김포', temp: 21.9, max_temp: 27, min_temp: 17.9, wind_speed: 1.8, rain: 100.1,
  },
  {
    location: '하남', temp: 22.9, max_temp: 28.7, min_temp: 18, wind_speed: 0.9, rain: 103.1,
  },
  {
    location: '의왕', temp: 21.7, max_temp: 27.2, min_temp: 17.1, wind_speed: 1, rain: 117.1,
  },
  {
    location: '포천', temp: 22.4, max_temp: 28.6, min_temp: 16.9, wind_speed: 1.4, rain: 128.2,
  },
  {
    location: '가평조종', temp: 20.9, max_temp: 27.6, min_temp: 14.9, wind_speed: 1.1, rain: 130.2,
  },
  {
    location: '영등포', temp: 23.5, max_temp: 28.5, min_temp: 19.9, wind_speed: 1.7, rain: 113.1,
  },
  {
    location: '인천연수', temp: 22, max_temp: 26.9, min_temp: 18.1, wind_speed: 1.6, rain: 98.6,
  },
  {
    location: '안성', temp: 22.7, max_temp: 28.3, min_temp: 17.9, wind_speed: 1.3, rain: 125.3,
  },
  {
    location: '간성', temp: 19.7, max_temp: 24.2, min_temp: 16, wind_speed: 1.4, rain: 126.6,
  },
  {
    location: '평창', temp: 20.4, max_temp: 27, min_temp: 15, wind_speed: 1.2, rain: 139.2,
  },
  {
    location: '의정부', temp: 22, max_temp: 28, min_temp: 16.9, wind_speed: 1.1, rain: 127.4,
  },
  {
    location: '횡성', temp: 21.7, max_temp: 28.7, min_temp: 16.1, wind_speed: 1.1, rain: 141.2,
  },
  {
    location: '고양', temp: 22, max_temp: 28.6, min_temp: 16.7, wind_speed: 1.1, rain: 107.7,
  },
  {
    location: '남양주', temp: 21.9, max_temp: 28.4, min_temp: 16.2, wind_speed: 1.1, rain: 133.6,
  },
  {
    location: '안산', temp: 21.4, max_temp: 27.4, min_temp: 16.2, wind_speed: 1.6, rain: 100.7,
  },
  {
    location: '경기광주', temp: 21.8, max_temp: 27.8, min_temp: 16.8, wind_speed: 1.5, rain: 118.1,
  },
  {
    location: '여주', temp: 22.2, max_temp: 28.2, min_temp: 16.9, wind_speed: 1.2, rain: 125,
  },
  {
    location: '용인', temp: 21.7, max_temp: 27.8, min_temp: 16.5, wind_speed: 1.3, rain: 123.5,
  },
  {
    location: '오산', temp: 22.1, max_temp: 28.3, min_temp: 17.3, wind_speed: 1.2, rain: 114.9,
  },
  {
    location: '평택', temp: 22.8, max_temp: 28.3, min_temp: 18.3, wind_speed: 1.7, rain: 109.5,
  },
  {
    location: '화천', temp: 21.3, max_temp: 28.5, min_temp: 15.7, wind_speed: 1, rain: 126.1,
  },
  {
    location: '양구', temp: 20.7, max_temp: 28.1, min_temp: 15.1, wind_speed: 1, rain: 111,
  },
  {
    location: '시흥', temp: 22.1, max_temp: 27.1, min_temp: 18.1, wind_speed: 1.6, rain: 107,
  },
  {
    location: '구리', temp: 22.9, max_temp: 28.4, min_temp: 18.1, wind_speed: 1.4, rain: 116.7,
  },
  {
    location: '금곡', temp: 21.2, max_temp: 26.5, min_temp: 17.1, wind_speed: 1.3, rain: 99.7,
  },
  {
    location: '화성', temp: 21.6, max_temp: 27, min_temp: 17.3, wind_speed: 1.3, rain: 102,
  },
  {
    location: '성남', temp: 23.2, max_temp: 28.5, min_temp: 18.5, wind_speed: 1.2, rain: 111.8,
  },
  {
    location: '과천', temp: 22.4, max_temp: 28.1, min_temp: 17.5, wind_speed: 1.7, rain: 123.8,
  },
  {
    location: '진부령', temp: 18, max_temp: 23.2, min_temp: 13.7, wind_speed: 2.4, rain: 141.5,
  },
  {
    location: '양주', temp: 22.1, max_temp: 28.2, min_temp: 16.6, wind_speed: 1.4, rain: 114.6,
  },
  {
    location: '단양', temp: 22.1, max_temp: 28.6, min_temp: 16.7, wind_speed: 1, rain: 124.3,
  },
  {
    location: '진천', temp: 21.6, max_temp: 27.8, min_temp: 16.3, wind_speed: 1.2, rain: 146.6,
  },
  {
    location: '괴산', temp: 21.6, max_temp: 27.7, min_temp: 16, wind_speed: 1.1, rain: 140.2,
  },
  {
    location: '옥천', temp: 22.2, max_temp: 28.2, min_temp: 16.9, wind_speed: 1.1, rain: 141.6,
  },
  {
    location: '홍북', temp: 21.5, max_temp: 27.6, min_temp: 16.5, wind_speed: 1.5, rain: 133.8,
  },
  {
    location: '세종연서', temp: 21.7, max_temp: 28, min_temp: 16.7, wind_speed: 1.2, rain: 132.5,
  },
  {
    location: '공주', temp: 22.5, max_temp: 28.5, min_temp: 17.4, wind_speed: 1.3, rain: 149.1,
  },
  {
    location: '서천', temp: 21.7, max_temp: 26.5, min_temp: 18, wind_speed: 1.9, rain: 136,
  },
  {
    location: '논산', temp: 22.5, max_temp: 28.2, min_temp: 17.9, wind_speed: 1.6, rain: 143,
  },
  {
    location: '당진', temp: 21.1, max_temp: 26.8, min_temp: 16.8, wind_speed: 1.8, rain: 115.3,
  },
  {
    location: '청양', temp: 21.4, max_temp: 27.5, min_temp: 15.9, wind_speed: 1.2, rain: 134.4,
  },
  {
    location: '음성', temp: 21.5, max_temp: 28.1, min_temp: 15.5, wind_speed: 1.3, rain: 142.9,
  },
  {
    location: '증평', temp: 22.2, max_temp: 28.5, min_temp: 16.7, wind_speed: 1.2, rain: 131.2,
  },
  {
    location: '태안', temp: 21.3, max_temp: 26.4, min_temp: 17.4, wind_speed: 1.8, rain: 127.6,
  },
  {
    location: '예산', temp: 22.4, max_temp: 28.3, min_temp: 17.6, wind_speed: 1.8, rain: 128.6,
  },
  {
    location: '아산', temp: 22, max_temp: 27.8, min_temp: 17.9, wind_speed: 1.8, rain: 105.7,
  },
  {
    location: '계룡', temp: 21.4, max_temp: 27.7, min_temp: 15.8, wind_speed: 1, rain: 162.1,
  },
  {
    location: '문화', temp: 23.3, max_temp: 28.9, min_temp: 18.6, wind_speed: 1.3, rain: 160.9,
  },
  {
    location: '세천', temp: 22, max_temp: 28.2, min_temp: 16.7, wind_speed: 1, rain: 147.9,
  },
  {
    location: '장동', temp: 22.3, max_temp: 28.1, min_temp: 17.1, wind_speed: 1.1, rain: 161.7,
  },
  {
    location: '부평', temp: 22.4, max_temp: 28.8, min_temp: 17.2, wind_speed: 0.5, rain: 102.9,
  },
  {
    location: '연천청산', temp: 22.3, max_temp: 28.5, min_temp: 17, wind_speed: 1.1, rain: 112.1,
  },
  {
    location: '양양', temp: 20.6, max_temp: 24.7, min_temp: 16.9, wind_speed: 2, rain: 116.7,
  },
  {
    location: '사북', temp: 18.2, max_temp: 24, min_temp: 13.3, wind_speed: 2.2, rain: 130.4,
  },
  {
    location: '무안', temp: 21.7, max_temp: 26.7, min_temp: 17.8, wind_speed: 1.7, rain: 143.6,
  },
  {
    location: '무주', temp: 21.4, max_temp: 27.9, min_temp: 15.8, wind_speed: 1.3, rain: 105.5,
  },
  {
    location: '익산', temp: 22.5, max_temp: 28.1, min_temp: 18.1, wind_speed: 1.6, rain: 139.9,
  },
  {
    location: '진안', temp: 20.4, max_temp: 26.4, min_temp: 15.2, wind_speed: 1.4, rain: 134.7,
  },
  {
    location: '담양', temp: 22.3, max_temp: 27.7, min_temp: 17.7, wind_speed: 1.6, rain: 150.5,
  },
  {
    location: '광산', temp: 22.5, max_temp: 28.4, min_temp: 17.8, wind_speed: 1.7, rain: 152.4,
  },
  {
    location: '구례', temp: 22.7, max_temp: 28.8, min_temp: 17.6, wind_speed: 1.4, rain: 135.9,
  },
  {
    location: '나주', temp: 22.5, max_temp: 28.3, min_temp: 18, wind_speed: 1.4, rain: 157.3,
  },
  {
    location: '순천시', temp: 22.4, max_temp: 26.9, min_temp: 18.7, wind_speed: 1.6, rain: 190.4,
  },
  {
    location: '광양읍', temp: 22.4, max_temp: 27.9, min_temp: 18, wind_speed: 1.1, rain: 177.3,
  },
  {
    location: '조선대', temp: 22.7, max_temp: 28.1, min_temp: 18.3, wind_speed: 1.8, rain: 140.2,
  },
  {
    location: '거문도', temp: 20.7, max_temp: 23.8, min_temp: 18.6, wind_speed: 2.8, rain: 184.6,
  },
  {
    location: '추자도', temp: 19.9, max_temp: 22.8, min_temp: 17.8, wind_speed: 3.2, rain: 152.7,
  },
  {
    location: '장성', temp: 22, max_temp: 28.1, min_temp: 17.2, wind_speed: 1.5, rain: 136,
  },
  {
    location: '영암', temp: 22.3, max_temp: 27.2, min_temp: 18.3, wind_speed: 2.2, rain: 138,
  },
  {
    location: '보성', temp: 20.7, max_temp: 25.9, min_temp: 16.5, wind_speed: 1.7, rain: 190.3,
  },
  {
    location: '완주', temp: 22.5, max_temp: 28.8, min_temp: 17.4, wind_speed: 1.6, rain: 150.6,
  },
  {
    location: '김제', temp: 22.4, max_temp: 27.9, min_temp: 18.6, wind_speed: 2.1, rain: 117.4,
  },
  {
    location: '화순', temp: 22.3, max_temp: 28.4, min_temp: 17.6, wind_speed: 1, rain: 140.9,
  },
  {
    location: '함평', temp: 22.2, max_temp: 27.4, min_temp: 18.2, wind_speed: 1.7, rain: 151.4,
  },
  {
    location: '곡성', temp: 22.4, max_temp: 28.4, min_temp: 17.4, wind_speed: 1.2, rain: 135.5,
  },
  {
    location: '성판악', temp: 17.7, max_temp: 21.4, min_temp: 14.3, wind_speed: 2.2, rain: 451.7,
  },
  {
    location: '풍암', temp: 23.1, max_temp: 29, min_temp: 18.5, wind_speed: 1.2, rain: 126.9,
  },
  {
    location: '압해도', temp: 21.6, max_temp: 26, min_temp: 18.4, wind_speed: 2.5, rain: 121.7,
  },
  {
    location: '영양', temp: 20, max_temp: 26.6, min_temp: 14.5, wind_speed: 1.4, rain: 114.5,
  },
  {
    location: '성주', temp: 22.5, max_temp: 28.5, min_temp: 17, wind_speed: 1.2, rain: 126.7,
  },
  {
    location: '고령', temp: 22.2, max_temp: 28.3, min_temp: 16.8, wind_speed: 1, rain: 144.3,
  },
  {
    location: '청도', temp: 22.1, max_temp: 28.4, min_temp: 16.9, wind_speed: 1.5, rain: 138.1,
  },
  {
    location: '예천', temp: 21.6, max_temp: 28.3, min_temp: 16.1, wind_speed: 1.1, rain: 130.7,
  },
  {
    location: '김천', temp: 22.4, max_temp: 29.1, min_temp: 16.7, wind_speed: 1, rain: 118.4,
  },
  {
    location: '군위', temp: 21.8, max_temp: 28.7, min_temp: 15.9, wind_speed: 1.4, rain: 114.2,
  },
  {
    location: '칠곡', temp: 23, max_temp: 28.9, min_temp: 17.9, wind_speed: 1.8, rain: 119.4,
  },
  {
    location: '경산', temp: 23, max_temp: 29.2, min_temp: 18.2, wind_speed: 1.9, rain: 124.5,
  },
  {
    location: '달성', temp: 23.2, max_temp: 29.3, min_temp: 18.2, wind_speed: 1.6, rain: 130,
  },
  {
    location: '서구', temp: 23.5, max_temp: 29.1, min_temp: 18.8, wind_speed: 2, rain: 127.1,
  },
  {
    location: '대구', temp: 23.4, max_temp: 28.7, min_temp: 18.8, wind_speed: 2.3, rain: 129.2,
  },
  {
    location: '전주', temp: 22.8, max_temp: 28.4, min_temp: 18.2, wind_speed: 1.7, rain: 159,
  },
  {
    location: '삼척', temp: 20.6, max_temp: 24.6, min_temp: 17.1, wind_speed: 1.8, rain: 98.7,
  },
  {
    location: '울기', temp: 19.7, max_temp: 22.9, min_temp: 17.7, wind_speed: 2.5, rain: 137.4,
  },
  {
    location: '삼천포', temp: 21.4, max_temp: 25.2, min_temp: 18.8, wind_speed: 1.7, rain: 186.3,
  },
  {
    location: '영도', temp: 19.9, max_temp: 23, min_temp: 17.7, wind_speed: 3.9, rain: 154.1,
  },
  {
    location: '고성', temp: 21.8, max_temp: 26.6, min_temp: 18.1, wind_speed: 2.1, rain: 176.8,
  },
  {
    location: '창녕', temp: 23, max_temp: 29.3, min_temp: 17.8, wind_speed: 2, rain: 128.8,
  },
  {
    location: '함안', temp: 22.3, max_temp: 28.8, min_temp: 17.3, wind_speed: 1.3, rain: 138.8,
  },
  {
    location: '가덕도', temp: 20.5, max_temp: 24.1, min_temp: 18.2, wind_speed: 3.6, rain: 128.3,
  },
  {
    location: '기장', temp: 20.9, max_temp: 25.1, min_temp: 17.2, wind_speed: 1.8, rain: 174.8,
  },
  {
    location: '간절곶', temp: 19.7, max_temp: 22.3, min_temp: 17.7, wind_speed: 3.5, rain: 150.6,
  },
  {
    location: '하동', temp: 22.6, max_temp: 28.1, min_temp: 18.3, wind_speed: 1.3, rain: 194.7,
  },
  {
    location: '해운대', temp: 21.1, max_temp: 24.9, min_temp: 18.1, wind_speed: 2.3, rain: 182.1,
  },
  {
    location: '부산진', temp: 22.1, max_temp: 26.2, min_temp: 18.9, wind_speed: 2.1, rain: 180,
  },
  {
    location: '동래', temp: 22.1, max_temp: 26.5, min_temp: 18.6, wind_speed: 1.8, rain: 171.8,
  },
  {
    location: '북구', temp: 22, max_temp: 26.3, min_temp: 18.5, wind_speed: 2.3, rain: 164.1,
  },
  {
    location: '부산남구', temp: 21.8, max_temp: 25.2, min_temp: 19.1, wind_speed: 2.1, rain: 180.7,
  },
  {
    location: '정자', temp: 21, max_temp: 25.1, min_temp: 17.3, wind_speed: 2.6, rain: 128.5,
  }],
  [{
    location: '속초', temp: 23.4, max_temp: 26.7, min_temp: 20.6, wind_speed: 1.9, rain: 265.6,
  },
  {
    location: '철원', temp: 23.8, max_temp: 28.1, min_temp: 20.2, wind_speed: 1.9, rain: 400,
  },
  {
    location: '동두천', temp: 24.3, max_temp: 29, min_temp: 20.9, wind_speed: 1.5, rain: 431.7,
  },
  {
    location: '파주', temp: 24.2, max_temp: 28.8, min_temp: 20.8, wind_speed: 1.5, rain: 395.2,
  },
  {
    location: '대관령', temp: 19.6, max_temp: 23.4, min_temp: 16.6, wind_speed: 3.3, rain: 336.3,
  },
  {
    location: '춘천', temp: 24.9, max_temp: 29.3, min_temp: 21.3, wind_speed: 1.2, rain: 398.2,
  },
  {
    location: '백령도', temp: 22.3, max_temp: 25.4, min_temp: 19.9, wind_speed: 4.1, rain: 201,
  },
  {
    location: '강릉', temp: 24.7, max_temp: 28.1, min_temp: 21.6, wind_speed: 1.9, rain: 250.2,
  },
  {
    location: '동해', temp: 23.2, max_temp: 26.6, min_temp: 20.5, wind_speed: 1.8, rain: 230.8,
  },
  {
    location: '서울', temp: 25.3, max_temp: 29, min_temp: 22.3, wind_speed: 2.2, rain: 414.4,
  },
  {
    location: '인천', temp: 24.4, max_temp: 27.8, min_temp: 21.8, wind_speed: 2.6, rain: 337.7,
  },
  {
    location: '원주', temp: 25.1, max_temp: 29.7, min_temp: 21.4, wind_speed: 1, rain: 357.8,
  },
  {
    location: '울릉도', temp: 22.7, max_temp: 25.5, min_temp: 20.5, wind_speed: 3.6, rain: 175,
  },
  {
    location: '수원', temp: 25.3, max_temp: 29.3, min_temp: 22.1, wind_speed: 1.8, rain: 385.1,
  },
  {
    location: '영월', temp: 23.9, max_temp: 29.2, min_temp: 20.1, wind_speed: 1.2, rain: 294.8,
  },
  {
    location: '충주', temp: 24.9, max_temp: 29.7, min_temp: 21.1, wind_speed: 1.4, rain: 293.3,
  },
  {
    location: '서산', temp: 24.5, max_temp: 28.5, min_temp: 21.5, wind_speed: 2.6, rain: 274.6,
  },
  {
    location: '울진', temp: 23.1, max_temp: 26.8, min_temp: 20.3, wind_speed: 2.7, rain: 203,
  },
  {
    location: '청주', temp: 25.8, max_temp: 30, min_temp: 22.4, wind_speed: 1.8, rain: 293.8,
  },
  {
    location: '대전', temp: 25.5, max_temp: 29.6, min_temp: 22.2, wind_speed: 1.9, rain: 306.9,
  },
  {
    location: '추풍령', temp: 23.9, max_temp: 28.7, min_temp: 20.3, wind_speed: 1.7, rain: 260.7,
  },
  {
    location: '안동', temp: 24.8, max_temp: 29.5, min_temp: 21, wind_speed: 1.4, rain: 235.2,
  },
  {
    location: '상주', temp: 24.9, max_temp: 29.5, min_temp: 21.3, wind_speed: 1.1, rain: 279.3,
  },
  {
    location: '포항', temp: 25.4, max_temp: 29, min_temp: 22.5, wind_speed: 2.4, rain: 200.6,
  },
  {
    location: '군산', temp: 25.1, max_temp: 28.8, min_temp: 22.3, wind_speed: 2.9, rain: 277.3,
  },
  {
    location: '울산', temp: 25.2, max_temp: 29.2, min_temp: 22.1, wind_speed: 2, rain: 234.1,
  },
  {
    location: '창원', temp: 25.3, max_temp: 29, min_temp: 22.6, wind_speed: 2, rain: 304.5,
  },
  {
    location: '광주', temp: 25.9, max_temp: 30, min_temp: 22.8, wind_speed: 2.5, rain: 294.2,
  },
  {
    location: '부산', temp: 24.4, max_temp: 27.5, min_temp: 22.1, wind_speed: 3.7, rain: 326.8,
  },
  {
    location: '통영', temp: 24.4, max_temp: 27.6, min_temp: 22, wind_speed: 2.5, rain: 289.1,
  },
  {
    location: '목포', temp: 25.1, max_temp: 28.4, min_temp: 22.7, wind_speed: 3.3, rain: 220.7,
  },
  {
    location: '여수', temp: 24.5, max_temp: 27.3, min_temp: 22.5, wind_speed: 3.5, rain: 276.8,
  },
  {
    location: '흑산도', temp: 22.9, max_temp: 25.9, min_temp: 20.6, wind_speed: 4.8, rain: 208.1,
  },
  {
    location: '완도', temp: 24.7, max_temp: 28.3, min_temp: 22.1, wind_speed: 3, rain: 257.2,
  },
  {
    location: '고창', temp: 25.6, max_temp: 29.7, min_temp: 22.6, wind_speed: 2.6, rain: 284.6,
  },
  {
    location: '제주', temp: 26.2, max_temp: 29.3, min_temp: 23.7, wind_speed: 2.9, rain: 210.2,
  },
  {
    location: '고산', temp: 24.9, max_temp: 27.4, min_temp: 22.9, wind_speed: 5.1, rain: 167.7,
  },
  {
    location: '성산', temp: 25.1, max_temp: 28.1, min_temp: 22.6, wind_speed: 3, rain: 271.3,
  },
  {
    location: '서귀포', temp: 25.7, max_temp: 28.3, min_temp: 23.8, wind_speed: 2.4, rain: 275.8,
  },
  {
    location: '진주', temp: 25.3, max_temp: 29.6, min_temp: 21.9, wind_speed: 1.6, rain: 312.2,
  },
  {
    location: '강화', temp: 23.7, max_temp: 27.6, min_temp: 20.6, wind_speed: 2, rain: 355.6,
  },
  {
    location: '양평', temp: 24.9, max_temp: 29.6, min_temp: 21.2, wind_speed: 1.2, rain: 409,
  },
  {
    location: '이천', temp: 24.7, max_temp: 29.4, min_temp: 20.9, wind_speed: 1.2, rain: 364.3,
  },
  {
    location: '인제', temp: 23.3, max_temp: 28.2, min_temp: 19.6, wind_speed: 1.8, rain: 332.4,
  },
  {
    location: '홍천', temp: 24.5, max_temp: 29.8, min_temp: 20.5, wind_speed: 1.1, rain: 395.7,
  },
  {
    location: '태백', temp: 21.4, max_temp: 25.9, min_temp: 17.7, wind_speed: 1.7, rain: 274.2,
  },
  {
    location: '정선군', temp: 23.6, max_temp: 29, min_temp: 19.9, wind_speed: 1.5, rain: 332.7,
  },
  {
    location: '제천', temp: 23.5, max_temp: 28.6, min_temp: 19.7, wind_speed: 1.3, rain: 356,
  },
  {
    location: '보은', temp: 24, max_temp: 28.9, min_temp: 20.3, wind_speed: 1.2, rain: 306,
  },
  {
    location: '천안', temp: 24.9, max_temp: 29.5, min_temp: 21.2, wind_speed: 1.6, rain: 284.1,
  },
  {
    location: '보령', temp: 24.8, max_temp: 28.4, min_temp: 21.9, wind_speed: 2.3, rain: 248.1,
  },
  {
    location: '부여', temp: 25.3, max_temp: 29.8, min_temp: 21.8, wind_speed: 1.4, rain: 295.7,
  },
  {
    location: '금산', temp: 24.8, max_temp: 29.8, min_temp: 20.8, wind_speed: 1.2, rain: 297.8,
  },
  {
    location: '부안', temp: 25.3, max_temp: 29.7, min_temp: 22, wind_speed: 1.8, rain: 275.5,
  },
  {
    location: '임실', temp: 24.1, max_temp: 29.1, min_temp: 20.5, wind_speed: 1.3, rain: 312,
  },
  {
    location: '정읍', temp: 25.7, max_temp: 30.3, min_temp: 22.2, wind_speed: 1.3, rain: 284,
  },
  {
    location: '남원', temp: 25.2, max_temp: 30, min_temp: 21.4, wind_speed: 1.4, rain: 303.2,
  },
  {
    location: '장수', temp: 23.3, max_temp: 27.9, min_temp: 19.5, wind_speed: 1.7, rain: 339.7,
  },
  {
    location: '영광군', temp: 25.7, max_temp: 29.7, min_temp: 22.6, wind_speed: 2.3, rain: 259.9,
  },
  {
    location: '김해시', temp: 26, max_temp: 30.2, min_temp: 23, wind_speed: 2, rain: 291.1,
  },
  {
    location: '순창군', temp: 25.4, max_temp: 30, min_temp: 21.8, wind_speed: 1.6, rain: 366.6,
  },
  {
    location: '양산시', temp: 26.1, max_temp: 30.4, min_temp: 22.9, wind_speed: 2.7, rain: 313.3,
  },
  {
    location: '강진군', temp: 25.2, max_temp: 29.1, min_temp: 22.4, wind_speed: 2.3, rain: 233.7,
  },
  {
    location: '장흥', temp: 24.9, max_temp: 28.9, min_temp: 21.7, wind_speed: 1.8, rain: 275.3,
  },
  {
    location: '해남', temp: 25, max_temp: 29, min_temp: 22, wind_speed: 2.4, rain: 226.6,
  },
  {
    location: '고흥', temp: 24.7, max_temp: 28.7, min_temp: 21.5, wind_speed: 1.5, rain: 264.9,
  },
  {
    location: '의령군', temp: 25.4, max_temp: 30.1, min_temp: 21.6, wind_speed: 1.2, rain: 267.2,
  },
  {
    location: '함양군', temp: 25.2, max_temp: 30.4, min_temp: 21.1, wind_speed: 0.9, rain: 285.1,
  },
  {
    location: '진도군', temp: 25.1, max_temp: 28.8, min_temp: 22.3, wind_speed: 2.1, rain: 232.6,
  },
  {
    location: '봉화', temp: 22.8, max_temp: 28, min_temp: 18.5, wind_speed: 1.1, rain: 277.7,
  },
  {
    location: '영주', temp: 24, max_temp: 28.9, min_temp: 20.1, wind_speed: 1.5, rain: 298.8,
  },
  {
    location: '문경', temp: 23.9, max_temp: 28.8, min_temp: 20.2, wind_speed: 1.1, rain: 309.5,
  },
  {
    location: '청송군', temp: 24.1, max_temp: 29.7, min_temp: 19.7, wind_speed: 1, rain: 196.6,
  },
  {
    location: '영덕', temp: 24.1, max_temp: 28.6, min_temp: 20.5, wind_speed: 2.2, rain: 194.3,
  },
  {
    location: '의성', temp: 24.8, max_temp: 30.5, min_temp: 20.3, wind_speed: 1, rain: 221.4,
  },
  {
    location: '구미', temp: 25.3, max_temp: 30.2, min_temp: 21.4, wind_speed: 1.1, rain: 233.9,
  },
  {
    location: '영천', temp: 25, max_temp: 29.9, min_temp: 21, wind_speed: 1.6, rain: 229.8,
  },
  {
    location: '경주시', temp: 25.4, max_temp: 30.6, min_temp: 21.4, wind_speed: 2.1, rain: 190.1,
  },
  {
    location: '거창', temp: 24.3, max_temp: 29.5, min_temp: 20.3, wind_speed: 1.2, rain: 286.2,
  },
  {
    location: '합천', temp: 25.3, max_temp: 30.4, min_temp: 21.4, wind_speed: 1.4, rain: 289.5,
  },
  {
    location: '밀양', temp: 25.6, max_temp: 30.4, min_temp: 21.8, wind_speed: 1.5, rain: 259.3,
  },
  {
    location: '산청', temp: 24.7, max_temp: 29.5, min_temp: 21.1, wind_speed: 1.3, rain: 328.5,
  },
  {
    location: '거제', temp: 24.8, max_temp: 28.3, min_temp: 22.1, wind_speed: 2, rain: 367.6,
  },
  {
    location: '남해', temp: 25.1, max_temp: 29.2, min_temp: 22.1, wind_speed: 1.4, rain: 353.9,
  },
  {
    location: '강남', temp: 26.1, max_temp: 30, min_temp: 23, wind_speed: 1.7, rain: 395.7,
  },
  {
    location: '서초', temp: 26.3, max_temp: 30.7, min_temp: 23, wind_speed: 1.3, rain: 367.1,
  },
  {
    location: '강동', temp: 25.8, max_temp: 30, min_temp: 22.4, wind_speed: 1.5, rain: 383.4,
  },
  {
    location: '송파', temp: 26.1, max_temp: 30.2, min_temp: 22.9, wind_speed: 1.7, rain: 377.4,
  },
  {
    location: '강서', temp: 25.3, max_temp: 29.2, min_temp: 22.3, wind_speed: 1.9, rain: 364.3,
  },
  {
    location: '양천', temp: 26.3, max_temp: 30.3, min_temp: 23.2, wind_speed: 1.5, rain: 342.4,
  },
  {
    location: '도봉', temp: 25.2, max_temp: 29.7, min_temp: 21.7, wind_speed: 1, rain: 425.4,
  },
  {
    location: '노원', temp: 25, max_temp: 29.6, min_temp: 21.3, wind_speed: 1.4, rain: 427.5,
  },
  {
    location: '동대문', temp: 26, max_temp: 30.2, min_temp: 22.9, wind_speed: 1.9, rain: 401.3,
  },
  {
    location: '중랑', temp: 26.1, max_temp: 30, min_temp: 23, wind_speed: 2.2, rain: 407.7,
  },
  {
    location: '기상청', temp: 25.5, max_temp: 29.4, min_temp: 22.3, wind_speed: 1.6, rain: 371.9,
  },
  {
    location: '마포', temp: 25.8, max_temp: 29.8, min_temp: 22.7, wind_speed: 2.2, rain: 375.8,
  },
  {
    location: '서대문', temp: 24.8, max_temp: 29.3, min_temp: 21.6, wind_speed: 1.4, rain: 357.3,
  },
  {
    location: '광진', temp: 26, max_temp: 30, min_temp: 22.7, wind_speed: 1.7, rain: 376.2,
  },
  {
    location: '성북', temp: 25.1, max_temp: 29, min_temp: 22, wind_speed: 1.7, rain: 411.4,
  },
  {
    location: '용산', temp: 26.2, max_temp: 30.2, min_temp: 23, wind_speed: 2, rain: 349.2,
  },
  {
    location: '은평', temp: 25, max_temp: 29.1, min_temp: 21.7, wind_speed: 1.7, rain: 377.3,
  },
  {
    location: '금천', temp: 25.4, max_temp: 29, min_temp: 22.6, wind_speed: 2.2, rain: 356.8,
  },
  {
    location: '중구', temp: 24.3, max_temp: 28.9, min_temp: 21.3, wind_speed: 1.6, rain: 333.8,
  },
  {
    location: '성동', temp: 25.8, max_temp: 29.5, min_temp: 22.8, wind_speed: 2.2, rain: 425,
  },
  {
    location: '구로', temp: 25.2, max_temp: 29.5, min_temp: 22, wind_speed: 2.1, rain: 373.7,
  },
  {
    location: '강북', temp: 26, max_temp: 30.1, min_temp: 22.9, wind_speed: 1.7, rain: 456.6,
  },
  {
    location: '남현', temp: 24.9, max_temp: 29.1, min_temp: 21.6, wind_speed: 1.1, rain: 435.7,
  },
  {
    location: '부천', temp: 25.4, max_temp: 29.1, min_temp: 22.6, wind_speed: 1.3, rain: 391.5,
  },
  {
    location: '안양', temp: 25.4, max_temp: 28.8, min_temp: 22.5, wind_speed: 2.1, rain: 409.9,
  },
  {
    location: '광명', temp: 25.6, max_temp: 29.4, min_temp: 22.8, wind_speed: 2.1, rain: 412.8,
  },
  {
    location: '군포', temp: 25.4, max_temp: 29.2, min_temp: 22.5, wind_speed: 1.5, rain: 426.2,
  },
  {
    location: '김포', temp: 24.7, max_temp: 28.6, min_temp: 21.8, wind_speed: 1.7, rain: 362.3,
  },
  {
    location: '하남', temp: 25.1, max_temp: 29.5, min_temp: 21.9, wind_speed: 0.8, rain: 379.1,
  },
  {
    location: '의왕', temp: 24.5, max_temp: 28.5, min_temp: 21.3, wind_speed: 1, rain: 437.7,
  },
  {
    location: '포천', temp: 24.9, max_temp: 29.8, min_temp: 21.3, wind_speed: 1.4, rain: 397.1,
  },
  {
    location: '가평조종', temp: 23.5, max_temp: 28.7, min_temp: 19.9, wind_speed: 1, rain: 417.9,
  },
  {
    location: '영등포', temp: 26.1, max_temp: 30.1, min_temp: 23.3, wind_speed: 1.7, rain: 347.5,
  },
  {
    location: '인천연수', temp: 25.2, max_temp: 29.2, min_temp: 22.2, wind_speed: 1.7, rain: 315.7,
  },
  {
    location: '안성', temp: 25.6, max_temp: 30.2, min_temp: 22.1, wind_speed: 1.2, rain: 323.1,
  },
  {
    location: '간성', temp: 23.3, max_temp: 27, min_temp: 20.2, wind_speed: 1.3, rain: 279.3,
  },
  {
    location: '평창', temp: 22.9, max_temp: 28.1, min_temp: 19.3, wind_speed: 1, rain: 310,
  },
  {
    location: '의정부', temp: 25, max_temp: 29.3, min_temp: 21.3, wind_speed: 1, rain: 425.7,
  },
  {
    location: '횡성', temp: 24.5, max_temp: 29.7, min_temp: 20.7, wind_speed: 1, rain: 397,
  },
  {
    location: '고양', temp: 24.8, max_temp: 29.7, min_temp: 21.3, wind_speed: 1.1, rain: 359.3,
  },
  {
    location: '남양주', temp: 24.8, max_temp: 29.5, min_temp: 21, wind_speed: 1, rain: 414.7,
  },
  {
    location: '안산', temp: 24.8, max_temp: 29.4, min_temp: 21.1, wind_speed: 1.5, rain: 321.7,
  },
  {
    location: '경기광주', temp: 24.7, max_temp: 29.2, min_temp: 21.2, wind_speed: 1.6, rain: 374.4,
  },
  {
    location: '여주', temp: 24.8, max_temp: 29.6, min_temp: 21.2, wind_speed: 1.1, rain: 321.5,
  },
  {
    location: '용인', temp: 24.7, max_temp: 29.2, min_temp: 21, wind_speed: 1.3, rain: 374.6,
  },
  {
    location: '오산', temp: 25.2, max_temp: 30, min_temp: 21.7, wind_speed: 1.2, rain: 342.2,
  },
  {
    location: '평택', temp: 25.7, max_temp: 30.2, min_temp: 22.2, wind_speed: 1.7, rain: 300.6,
  },
  {
    location: '화천', temp: 24.1, max_temp: 29.6, min_temp: 20.2, wind_speed: 0.8, rain: 358.4,
  },
  {
    location: '양구', temp: 23.5, max_temp: 29, min_temp: 19.8, wind_speed: 1, rain: 321.4,
  },
  {
    location: '시흥', temp: 25.4, max_temp: 29.3, min_temp: 22.2, wind_speed: 1.7, rain: 321.4,
  },
  {
    location: '구리', temp: 25.5, max_temp: 29.8, min_temp: 22.1, wind_speed: 1.4, rain: 405.4,
  },
  {
    location: '금곡', temp: 24.3, max_temp: 28.4, min_temp: 21.2, wind_speed: 1.4, rain: 333.8,
  },
  {
    location: '화성', temp: 24.8, max_temp: 28.9, min_temp: 21.7, wind_speed: 1.4, rain: 327.3,
  },
  {
    location: '성남', temp: 25.8, max_temp: 30, min_temp: 22.4, wind_speed: 1.2, rain: 375.5,
  },
  {
    location: '과천', temp: 25.2, max_temp: 29.6, min_temp: 21.7, wind_speed: 1.8, rain: 392.8,
  },
  {
    location: '진부령', temp: 21, max_temp: 24.9, min_temp: 18.1, wind_speed: 2.6, rain: 351.6,
  },
  {
    location: '양주', temp: 24.8, max_temp: 29.5, min_temp: 21.1, wind_speed: 1.5, rain: 381,
  },
  {
    location: '단양', temp: 24.7, max_temp: 29.8, min_temp: 20.9, wind_speed: 0.9, rain: 253.2,
  },
  {
    location: '진천', temp: 24.5, max_temp: 29.2, min_temp: 20.6, wind_speed: 1.1, rain: 309.6,
  },
  {
    location: '괴산', temp: 24.5, max_temp: 29.2, min_temp: 20.7, wind_speed: 1.1, rain: 309.1,
  },
  {
    location: '옥천', temp: 25, max_temp: 29.9, min_temp: 21.3, wind_speed: 1, rain: 284,
  },
  {
    location: '홍북', temp: 24.9, max_temp: 29.3, min_temp: 21.1, wind_speed: 1.7, rain: 283,
  },
  {
    location: '세종연서', temp: 24.7, max_temp: 29.4, min_temp: 21, wind_speed: 1.2, rain: 284.9,
  },
  {
    location: '공주', temp: 25.4, max_temp: 30.1, min_temp: 21.8, wind_speed: 1.3, rain: 308.5,
  },
  {
    location: '서천', temp: 25.2, max_temp: 29.1, min_temp: 22.3, wind_speed: 2, rain: 266.4,
  },
  {
    location: '논산', temp: 25.4, max_temp: 30, min_temp: 21.9, wind_speed: 1.5, rain: 282.5,
  },
  {
    location: '당진', temp: 24.6, max_temp: 28.9, min_temp: 21.4, wind_speed: 2, rain: 294.4,
  },
  {
    location: '청양', temp: 24.9, max_temp: 29.3, min_temp: 21, wind_speed: 1.2, rain: 290.4,
  },
  {
    location: '음성', temp: 24.5, max_temp: 29.5, min_temp: 20.4, wind_speed: 1.3, rain: 302.4,
  },
  {
    location: '증평', temp: 25.1, max_temp: 30, min_temp: 21.3, wind_speed: 1.2, rain: 280.1,
  },
  {
    location: '태안', temp: 24.7, max_temp: 28.6, min_temp: 21.9, wind_speed: 1.9, rain: 269.5,
  },
  {
    location: '예산', temp: 25.6, max_temp: 30.1, min_temp: 22, wind_speed: 2, rain: 270.8,
  },
  {
    location: '아산', temp: 25.2, max_temp: 29.8, min_temp: 22, wind_speed: 1.9, rain: 289.3,
  },
  {
    location: '계룡', temp: 24.6, max_temp: 29.3, min_temp: 20.9, wind_speed: 1.1, rain: 350.8,
  },
  {
    location: '문화', temp: 26, max_temp: 30.6, min_temp: 22.5, wind_speed: 1.2, rain: 311.5,
  },
  {
    location: '세천', temp: 24.9, max_temp: 29.9, min_temp: 21.2, wind_speed: 1, rain: 297.2,
  },
  {
    location: '장동', temp: 25.1, max_temp: 29.8, min_temp: 21.5, wind_speed: 1.1, rain: 313.6,
  },
  {
    location: '부평', temp: 25.4, max_temp: 30.2, min_temp: 21.8, wind_speed: 0.6, rain: 365.8,
  },
  {
    location: '연천청산', temp: 25, max_temp: 29.8, min_temp: 21.3, wind_speed: 1.1, rain: 379.7,
  },
  {
    location: '양양', temp: 24.1, max_temp: 27.6, min_temp: 21.2, wind_speed: 1.9, rain: 257.5,
  },
  {
    location: '사북', temp: 21.1, max_temp: 25.3, min_temp: 17.7, wind_speed: 2.6, rain: 300.7,
  },
  {
    location: '무안', temp: 25.2, max_temp: 29.1, min_temp: 22.2, wind_speed: 2, rain: 271.3,
  },
  {
    location: '무주', temp: 24.4, max_temp: 29.5, min_temp: 20.4, wind_speed: 1.2, rain: 285.1,
  },
  {
    location: '익산', temp: 25.7, max_temp: 30.2, min_temp: 22.3, wind_speed: 1.6, rain: 271.5,
  },
  {
    location: '진안', temp: 23.6, max_temp: 28.2, min_temp: 20, wind_speed: 1.5, rain: 317.5,
  },
  {
    location: '담양', temp: 25.3, max_temp: 29.5, min_temp: 21.9, wind_speed: 1.5, rain: 286.7,
  },
  {
    location: '광산', temp: 26, max_temp: 30.4, min_temp: 22.3, wind_speed: 1.8, rain: 259.6,
  },
  {
    location: '구례', temp: 25.8, max_temp: 30.8, min_temp: 22.1, wind_speed: 1.2, rain: 305.6,
  },
  {
    location: '나주', temp: 25.9, max_temp: 30.4, min_temp: 22.5, wind_speed: 1.5, rain: 274.1,
  },
  {
    location: '순천시', temp: 25.5, max_temp: 29.4, min_temp: 22.7, wind_speed: 1.5, rain: 307.9,
  },
  {
    location: '광양읍', temp: 25.6, max_temp: 30.1, min_temp: 22.3, wind_speed: 1, rain: 308.2,
  },
  {
    location: '조선대', temp: 25.7, max_temp: 29.9, min_temp: 22.6, wind_speed: 1.8, rain: 288,
  },
  {
    location: '거문도', temp: 24.6, max_temp: 27.4, min_temp: 22.6, wind_speed: 3.1, rain: 216.5,
  },
  {
    location: '추자도', temp: 24.3, max_temp: 26.8, min_temp: 22.2, wind_speed: 3.6, rain: 190.3,
  },
  {
    location: '장성', temp: 25.2, max_temp: 30, min_temp: 21.9, wind_speed: 1.6, rain: 294.7,
  },
  {
    location: '영암', temp: 25.7, max_temp: 29.8, min_temp: 22.6, wind_speed: 2.1, rain: 230.8,
  },
  {
    location: '보성', temp: 24.2, max_temp: 28.3, min_temp: 21.1, wind_speed: 1.8, rain: 286,
  },
  {
    location: '완주', temp: 25.9, max_temp: 30.7, min_temp: 22, wind_speed: 1.6, rain: 310.4,
  },
  {
    location: '김제', temp: 26, max_temp: 30.4, min_temp: 22.7, wind_speed: 2.2, rain: 246.8,
  },
  {
    location: '화순', temp: 25.4, max_temp: 30.4, min_temp: 22.1, wind_speed: 0.9, rain: 288.3,
  },
  {
    location: '함평', temp: 25.9, max_temp: 29.9, min_temp: 22.6, wind_speed: 1.8, rain: 268.4,
  },
  {
    location: '곡성', temp: 25.4, max_temp: 30.3, min_temp: 21.8, wind_speed: 1.2, rain: 288.3,
  },
  {
    location: '성판악', temp: 21.4, max_temp: 24.7, min_temp: 18.5, wind_speed: 2.5, rain: 583.9,
  },
  {
    location: '풍암', temp: 26.2, max_temp: 30.8, min_temp: 22.9, wind_speed: 1.3, rain: 328.1,
  },
  {
    location: '압해도', temp: 25, max_temp: 28.8, min_temp: 22.4, wind_speed: 2.7, rain: 230.7,
  },
  {
    location: '영양', temp: 23.3, max_temp: 28.3, min_temp: 19.5, wind_speed: 1.3, rain: 209.2,
  },
  {
    location: '성주', temp: 25.5, max_temp: 30.3, min_temp: 21.6, wind_speed: 1.3, rain: 227.5,
  },
  {
    location: '고령', temp: 25.2, max_temp: 30, min_temp: 21.4, wind_speed: 1, rain: 259.8,
  },
  {
    location: '청도', temp: 25.5, max_temp: 30.3, min_temp: 21.6, wind_speed: 1.4, rain: 243.6,
  },
  {
    location: '예천', temp: 24.5, max_temp: 29.7, min_temp: 20.6, wind_speed: 1, rain: 240.9,
  },
  {
    location: '김천', temp: 25.5, max_temp: 30.8, min_temp: 21.3, wind_speed: 0.8, rain: 214.2,
  },
  {
    location: '군위', temp: 24.9, max_temp: 30.5, min_temp: 20.6, wind_speed: 1.3, rain: 197.5,
  },
  {
    location: '칠곡', temp: 25.7, max_temp: 30.6, min_temp: 22, wind_speed: 1.7, rain: 224.5,
  },
  {
    location: '경산', temp: 26.2, max_temp: 31.3, min_temp: 22.5, wind_speed: 1.9, rain: 218.9,
  },
  {
    location: '달성', temp: 26.1, max_temp: 31.1, min_temp: 22.4, wind_speed: 1.7, rain: 232.3,
  },
  {
    location: '서구', temp: 26.3, max_temp: 31, min_temp: 22.7, wind_speed: 1.9, rain: 224.1,
  },
  {
    location: '대구', temp: 26.3, max_temp: 30.8, min_temp: 22.8, wind_speed: 2.2, rain: 223.9,
  },
  {
    location: '전주', temp: 26.2, max_temp: 30.6, min_temp: 22.7, wind_speed: 1.8, rain: 302.8,
  },
  {
    location: '삼척', temp: 24.1, max_temp: 27.6, min_temp: 21.3, wind_speed: 1.6, rain: 255,
  },
  {
    location: '울기', temp: 22.4, max_temp: 25.4, min_temp: 20.4, wind_speed: 2.7, rain: 201,
  },
  {
    location: '삼천포', temp: 24.8, max_temp: 28.2, min_temp: 22.5, wind_speed: 1.7, rain: 295,
  },
  {
    location: '영도', temp: 23.1, max_temp: 25.8, min_temp: 21.1, wind_speed: 3.9, rain: 264.9,
  },
  {
    location: '고성', temp: 25.5, max_temp: 29.3, min_temp: 22.5, wind_speed: 2.3, rain: 304,
  },
  {
    location: '창녕', temp: 26.1, max_temp: 31, min_temp: 22.3, wind_speed: 1.9, rain: 235.4,
  },
  {
    location: '함안', temp: 25.6, max_temp: 30.8, min_temp: 21.7, wind_speed: 1.3, rain: 258.4,
  },
  {
    location: '가덕도', temp: 24, max_temp: 27.3, min_temp: 21.8, wind_speed: 3.7, rain: 230.6,
  },
  {
    location: '기장', temp: 24.5, max_temp: 28.4, min_temp: 21.5, wind_speed: 1.9, rain: 283.1,
  },
  {
    location: '간절곶', temp: 22.5, max_temp: 25.1, min_temp: 20.4, wind_speed: 3.7, rain: 239.3,
  },
  {
    location: '하동', temp: 26, max_temp: 30.5, min_temp: 22.6, wind_speed: 1.3, rain: 357.7,
  },
  {
    location: '해운대', temp: 24.4, max_temp: 28, min_temp: 21.9, wind_speed: 2.5, rain: 302,
  },
  {
    location: '부산진', temp: 25.5, max_temp: 29.2, min_temp: 22.8, wind_speed: 2.1, rain: 322.9,
  },
  {
    location: '동래', temp: 25.6, max_temp: 29.4, min_temp: 22.7, wind_speed: 2, rain: 307.8,
  },
  {
    location: '북구', temp: 25.2, max_temp: 29, min_temp: 22.4, wind_speed: 2.4, rain: 291.9,
  },
  {
    location: '부산남구', temp: 25.3, max_temp: 28.5, min_temp: 22.8, wind_speed: 2.2, rain: 313.3,
  },
  {
    location: '정자', temp: 24.4, max_temp: 28.5, min_temp: 20.8, wind_speed: 2.3, rain: 246.8,
  }],
  [{
    location: '속초', temp: 24.1, max_temp: 27.5, min_temp: 21.2, wind_speed: 1.8, rain: 298,
  },
  {
    location: '철원', temp: 24, max_temp: 28.9, min_temp: 20.1, wind_speed: 1.7, rain: 347.4,
  },
  {
    location: '동두천', temp: 24.9, max_temp: 30.1, min_temp: 21.2, wind_speed: 1.4, rain: 347.5,
  },
  {
    location: '파주', temp: 24.9, max_temp: 29.9, min_temp: 21.2, wind_speed: 1.5, rain: 282.9,
  },
  {
    location: '대관령', temp: 19.7, max_temp: 23.6, min_temp: 16.5, wind_speed: 2.7, rain: 368.4,
  },
  {
    location: '춘천', temp: 25, max_temp: 29.9, min_temp: 21.3, wind_speed: 1.2, rain: 319.9,
  },
  {
    location: '백령도', temp: 23.8, max_temp: 26.9, min_temp: 21.5, wind_speed: 3.8, rain: 158.5,
  },
  {
    location: '강릉', temp: 25, max_temp: 28.6, min_temp: 21.9, wind_speed: 1.9, rain: 292.9,
  },
  {
    location: '동해', temp: 24.1, max_temp: 27.6, min_temp: 21.1, wind_speed: 1.8, rain: 227.2,
  },
  {
    location: '서울', temp: 26.1, max_temp: 30, min_temp: 22.9, wind_speed: 2.1, rain: 348.2,
  },
  {
    location: '인천', temp: 25.6, max_temp: 29.2, min_temp: 22.9, wind_speed: 2.4, rain: 274.6,
  },
  {
    location: '원주', temp: 25.3, max_temp: 30.3, min_temp: 21.5, wind_speed: 1, rain: 289.8,
  },
  {
    location: '울릉도', temp: 23.8, max_temp: 26.9, min_temp: 21.7, wind_speed: 3.3, rain: 176.7,
  },
  {
    location: '수원', temp: 26, max_temp: 30.3, min_temp: 22.7, wind_speed: 1.8, rain: 296.3,
  },
  {
    location: '영월', temp: 24.3, max_temp: 29.9, min_temp: 20.5, wind_speed: 1.2, rain: 280.4,
  },
  {
    location: '충주', temp: 25.2, max_temp: 30.3, min_temp: 21.3, wind_speed: 1.3, rain: 273,
  },
  {
    location: '서산', temp: 25.3, max_temp: 29.7, min_temp: 21.7, wind_speed: 2.2, rain: 283.5,
  },
  {
    location: '울진', temp: 23.9, max_temp: 27.5, min_temp: 21.1, wind_speed: 2.6, rain: 213,
  },
  {
    location: '청주', temp: 26.2, max_temp: 30.6, min_temp: 22.6, wind_speed: 1.7, rain: 274.2,
  },
  {
    location: '대전', temp: 26, max_temp: 30.3, min_temp: 22.5, wind_speed: 1.8, rain: 299.8,
  },
  {
    location: '추풍령', temp: 24.2, max_temp: 29.1, min_temp: 20.5, wind_speed: 1.6, rain: 263.9,
  },
  {
    location: '안동', temp: 25.1, max_temp: 30.1, min_temp: 21.2, wind_speed: 1.4, rain: 226.4,
  },
  {
    location: '상주', temp: 25.3, max_temp: 30.4, min_temp: 21.6, wind_speed: 1, rain: 253.9,
  },
  {
    location: '포항', temp: 26, max_temp: 29.5, min_temp: 23.3, wind_speed: 2.5, rain: 230.2,
  },
  {
    location: '군산', temp: 25.9, max_temp: 29.9, min_temp: 22.8, wind_speed: 2.9, rain: 266.5,
  },
  {
    location: '울산', temp: 26, max_temp: 30, min_temp: 22.8, wind_speed: 2.1, rain: 234.1,
  },
  {
    location: '창원', temp: 26.5, max_temp: 30.4, min_temp: 23.6, wind_speed: 1.9, rain: 283.8,
  },
  {
    location: '광주', temp: 26.5, max_temp: 30.9, min_temp: 23.2, wind_speed: 2.2, rain: 326.4,
  },
  {
    location: '부산', temp: 26.1, max_temp: 29.5, min_temp: 23.7, wind_speed: 3.6, rain: 266.5,
  },
  {
    location: '통영', temp: 26, max_temp: 29.6, min_temp: 23.4, wind_speed: 2.4, rain: 243.9,
  },
  {
    location: '목포', temp: 26.3, max_temp: 30, min_temp: 23.5, wind_speed: 3.1, rain: 209,
  },
  {
    location: '여수', temp: 26, max_temp: 28.9, min_temp: 23.8, wind_speed: 3.7, rain: 264.8,
  },
  {
    location: '흑산도', temp: 24.7, max_temp: 27.9, min_temp: 22.5, wind_speed: 4.3, rain: 211.2,
  },
  {
    location: '완도', temp: 26, max_temp: 29.8, min_temp: 23.2, wind_speed: 3, rain: 238.8,
  },
  {
    location: '고창', temp: 26.3, max_temp: 30.8, min_temp: 22.8, wind_speed: 2.4, rain: 285.2,
  },
  {
    location: '제주', temp: 27.2, max_temp: 30.1, min_temp: 24.8, wind_speed: 2.9, rain: 272.3,
  },
  {
    location: '고산', temp: 26.4, max_temp: 29.3, min_temp: 24.1, wind_speed: 5.2, rain: 201.9,
  },
  {
    location: '성산', temp: 26.5, max_temp: 29.7, min_temp: 23.9, wind_speed: 3.1, rain: 343.2,
  },
  {
    location: '서귀포', temp: 27.2, max_temp: 30.1, min_temp: 24.9, wind_speed: 2.7, rain: 315.7,
  },
  {
    location: '진주', temp: 25.9, max_temp: 30.6, min_temp: 22.2, wind_speed: 1.4, rain: 296.8,
  },
  {
    location: '강화', temp: 24.7, max_temp: 29, min_temp: 21.2, wind_speed: 1.9, rain: 300.4,
  },
  {
    location: '양평', temp: 25.2, max_temp: 30.3, min_temp: 21.3, wind_speed: 1.2, rain: 330.9,
  },
  {
    location: '이천', temp: 25, max_temp: 30.2, min_temp: 21.1, wind_speed: 1.1, rain: 288,
  },
  {
    location: '인제', temp: 23.4, max_temp: 28.8, min_temp: 19.7, wind_speed: 1.7, rain: 287.6,
  },
  {
    location: '홍천', temp: 24.7, max_temp: 30.4, min_temp: 20.6, wind_speed: 1.1, rain: 312.5,
  },
  {
    location: '태백', temp: 21.3, max_temp: 26, min_temp: 17.7, wind_speed: 1.5, rain: 278.7,
  },
  {
    location: '정선군', temp: 24, max_temp: 29.7, min_temp: 20.3, wind_speed: 1.3, rain: 202.7,
  },
  {
    location: '제천', temp: 23.8, max_temp: 29.3, min_temp: 19.8, wind_speed: 1.3, rain: 300.9,
  },
  {
    location: '보은', temp: 24.3, max_temp: 29.5, min_temp: 20.4, wind_speed: 1.1, rain: 296.6,
  },
  {
    location: '천안', temp: 25.2, max_temp: 30.2, min_temp: 21.3, wind_speed: 1.6, rain: 299.7,
  },
  {
    location: '보령', temp: 25.7, max_temp: 29.8, min_temp: 22.3, wind_speed: 1.9, rain: 270.3,
  },
  {
    location: '부여', temp: 25.7, max_temp: 30.8, min_temp: 21.9, wind_speed: 1.3, rain: 284.8,
  },
  {
    location: '금산', temp: 24.9, max_temp: 30.3, min_temp: 20.9, wind_speed: 1.1, rain: 284.3,
  },
  {
    location: '부안', temp: 25.9, max_temp: 30.6, min_temp: 22.3, wind_speed: 1.5, rain: 260.3,
  },
  {
    location: '임실', temp: 24.4, max_temp: 29.8, min_temp: 20.4, wind_speed: 1.2, rain: 312.1,
  },
  {
    location: '정읍', temp: 26.1, max_temp: 31.1, min_temp: 22.3, wind_speed: 1.2, rain: 298.1,
  },
  {
    location: '남원', temp: 25.4, max_temp: 30.7, min_temp: 21.4, wind_speed: 1.3, rain: 313.3,
  },
  {
    location: '장수', temp: 23.4, max_temp: 28.6, min_temp: 19.4, wind_speed: 1.5, rain: 336.5,
  },
  {
    location: '영광군', temp: 26.4, max_temp: 30.9, min_temp: 23, wind_speed: 2.1, rain: 286.7,
  },
  {
    location: '김해시', temp: 27.3, max_temp: 31.9, min_temp: 24.1, wind_speed: 1.9, rain: 188,
  },
  {
    location: '순창군', temp: 26, max_temp: 31.1, min_temp: 22.1, wind_speed: 1.5, rain: 336.1,
  },
  {
    location: '양산시', temp: 27.4, max_temp: 32.1, min_temp: 24, wind_speed: 2.6, rain: 214.6,
  },
  {
    location: '강진군', temp: 26.4, max_temp: 30.6, min_temp: 23, wind_speed: 2.3, rain: 277.2,
  },
  {
    location: '장흥', temp: 25.6, max_temp: 30, min_temp: 21.9, wind_speed: 1.7, rain: 316.5,
  },
  {
    location: '해남', temp: 25.9, max_temp: 30.4, min_temp: 22.2, wind_speed: 2.2, rain: 248.4,
  },
  {
    location: '고흥', temp: 25.7, max_temp: 30.1, min_temp: 22.2, wind_speed: 1.5, rain: 264.9,
  },
  {
    location: '의령군', temp: 25.7, max_temp: 31.1, min_temp: 21.6, wind_speed: 1.1, rain: 254.4,
  },
  {
    location: '함양군', temp: 25.4, max_temp: 31.2, min_temp: 21.3, wind_speed: 0.8, rain: 289.1,
  },
  {
    location: '진도군', temp: 26.3, max_temp: 30.4, min_temp: 23, wind_speed: 1.9, rain: 235.3,
  },
  {
    location: '봉화', temp: 22.9, max_temp: 28.6, min_temp: 18.5, wind_speed: 1.1, rain: 246.8,
  },
  {
    location: '영주', temp: 24.2, max_temp: 29.6, min_temp: 20.2, wind_speed: 1.4, rain: 283.7,
  },
  {
    location: '문경', temp: 24.2, max_temp: 29.4, min_temp: 20.3, wind_speed: 1.1, rain: 274.7,
  },
  {
    location: '청송군', temp: 24.4, max_temp: 30.4, min_temp: 20.1, wind_speed: 1, rain: 174.5,
  },
  {
    location: '영덕', temp: 24.5, max_temp: 29.1, min_temp: 21.1, wind_speed: 2.2, rain: 213.6,
  },
  {
    location: '의성', temp: 25.1, max_temp: 31, min_temp: 20.5, wind_speed: 0.9, rain: 229.6,
  },
  {
    location: '구미', temp: 25.6, max_temp: 30.7, min_temp: 21.6, wind_speed: 1.1, rain: 256.1,
  },
  {
    location: '영천', temp: 25.3, max_temp: 30.5, min_temp: 21.2, wind_speed: 1.5, rain: 233.2,
  },
  {
    location: '경주시', temp: 25.9, max_temp: 31.4, min_temp: 21.9, wind_speed: 2, rain: 191.9,
  },
  {
    location: '거창', temp: 24.4, max_temp: 29.9, min_temp: 20.4, wind_speed: 1.1, rain: 285.3,
  },
  {
    location: '합천', temp: 25.6, max_temp: 31.1, min_temp: 21.5, wind_speed: 1.2, rain: 294.8,
  },
  {
    location: '밀양', temp: 26.1, max_temp: 31.3, min_temp: 22, wind_speed: 1.4, rain: 240.6,
  },
  {
    location: '산청', temp: 25.1, max_temp: 30.2, min_temp: 21.4, wind_speed: 1.1, rain: 362.3,
  },
  {
    location: '거제', temp: 26, max_temp: 29.9, min_temp: 22.9, wind_speed: 1.8, rain: 330.4,
  },
  {
    location: '남해', temp: 26, max_temp: 30.4, min_temp: 22.9, wind_speed: 1.4, rain: 319.7,
  },
  {
    location: '강남', temp: 26.8, max_temp: 31, min_temp: 23.6, wind_speed: 1.6, rain: 316,
  },
  {
    location: '서초', temp: 27.1, max_temp: 31.9, min_temp: 23.7, wind_speed: 1.2, rain: 317.1,
  },
  {
    location: '강동', temp: 26.2, max_temp: 30.8, min_temp: 22.6, wind_speed: 1.4, rain: 348.3,
  },
  {
    location: '송파', temp: 26.8, max_temp: 31.1, min_temp: 23.6, wind_speed: 1.7, rain: 310.1,
  },
  {
    location: '강서', temp: 26.3, max_temp: 30.4, min_temp: 23.1, wind_speed: 1.9, rain: 285.1,
  },
  {
    location: '양천', temp: 27.2, max_temp: 31.4, min_temp: 24, wind_speed: 1.5, rain: 286.9,
  },
  {
    location: '도봉', temp: 25.7, max_temp: 30.5, min_temp: 21.9, wind_speed: 0.9, rain: 378.1,
  },
  {
    location: '노원', temp: 25.5, max_temp: 30.4, min_temp: 21.4, wind_speed: 1.3, rain: 329.3,
  },
  {
    location: '동대문', temp: 26.8, max_temp: 31.2, min_temp: 23.4, wind_speed: 1.8, rain: 335.8,
  },
  {
    location: '중랑', temp: 26.9, max_temp: 30.9, min_temp: 23.6, wind_speed: 2.2, rain: 319.8,
  },
  {
    location: '기상청', temp: 26.4, max_temp: 30.3, min_temp: 23.2, wind_speed: 1.5, rain: 284,
  },
  {
    location: '마포', temp: 26.7, max_temp: 30.7, min_temp: 23.4, wind_speed: 2.3, rain: 312.8,
  },
  {
    location: '서대문', temp: 25.6, max_temp: 30.4, min_temp: 22.2, wind_speed: 1.3, rain: 280.8,
  },
  {
    location: '광진', temp: 26.7, max_temp: 31, min_temp: 23.4, wind_speed: 1.7, rain: 332.7,
  },
  {
    location: '성북', temp: 25.9, max_temp: 30, min_temp: 22.6, wind_speed: 1.7, rain: 342.9,
  },
  {
    location: '용산', temp: 27.1, max_temp: 31.3, min_temp: 23.9, wind_speed: 1.9, rain: 293,
  },
  {
    location: '은평', temp: 25.8, max_temp: 30.1, min_temp: 22.2, wind_speed: 1.6, rain: 302.7,
  },
  {
    location: '금천', temp: 26.4, max_temp: 30.1, min_temp: 23.5, wind_speed: 2.1, rain: 299.5,
  },
  {
    location: '중구', temp: 25.2, max_temp: 29.6, min_temp: 21.8, wind_speed: 1.9, rain: 263.4,
  },
  {
    location: '성동', temp: 26.7, max_temp: 30.6, min_temp: 23.6, wind_speed: 2.2, rain: 269.8,
  },
  {
    location: '구로', temp: 26.3, max_temp: 30.7, min_temp: 23, wind_speed: 2.1, rain: 262.4,
  },
  {
    location: '강북', temp: 27, max_temp: 31.3, min_temp: 23.6, wind_speed: 1.7, rain: 321.9,
  },
  {
    location: '남현', temp: 25.7, max_temp: 30.1, min_temp: 22.3, wind_speed: 1.1, rain: 310.9,
  },
  {
    location: '부천', temp: 26.9, max_temp: 30.8, min_temp: 23.8, wind_speed: 1.3, rain: 207.8,
  },
  {
    location: '안양', temp: 26.4, max_temp: 30.2, min_temp: 23.5, wind_speed: 2.2, rain: 257.3,
  },
  {
    location: '광명', temp: 27, max_temp: 31, min_temp: 24.1, wind_speed: 2.1, rain: 231,
  },
  {
    location: '군포', temp: 26.5, max_temp: 30.6, min_temp: 23.5, wind_speed: 1.5, rain: 260.5,
  },
  {
    location: '김포', temp: 25.7, max_temp: 30, min_temp: 22.4, wind_speed: 1.6, rain: 245,
  },
  {
    location: '하남', temp: 26, max_temp: 30.6, min_temp: 22.3, wind_speed: 0.8, rain: 230.9,
  },
  {
    location: '의왕', temp: 25.3, max_temp: 29.8, min_temp: 21.9, wind_speed: 1, rain: 259.1,
  },
  {
    location: '포천', temp: 25.3, max_temp: 30.7, min_temp: 21.4, wind_speed: 1.3, rain: 378.1,
  },
  {
    location: '가평조종', temp: 24, max_temp: 29.7, min_temp: 19.9, wind_speed: 1, rain: 346.3,
  },
  {
    location: '영등포', temp: 27.3, max_temp: 31.3, min_temp: 24.2, wind_speed: 1.6, rain: 314.4,
  },
  {
    location: '인천연수', temp: 26.5, max_temp: 30.7, min_temp: 23.2, wind_speed: 1.7, rain: 235.6,
  },
  {
    location: '안성', temp: 26.1, max_temp: 31, min_temp: 22.5, wind_speed: 1.1, rain: 267,
  },
  {
    location: '간성', temp: 24, max_temp: 27.8, min_temp: 20.6, wind_speed: 1.3, rain: 305.5,
  },
  {
    location: '평창', temp: 23.3, max_temp: 28.8, min_temp: 19.5, wind_speed: 1, rain: 254.3,
  },
  {
    location: '의정부', temp: 25.2, max_temp: 30.3, min_temp: 21.5, wind_speed: 1, rain: 399.2,
  },
  {
    location: '횡성', temp: 24.8, max_temp: 30.4, min_temp: 20.9, wind_speed: 1, rain: 283,
  },
  {
    location: '고양', temp: 25.4, max_temp: 30.9, min_temp: 21.5, wind_speed: 1.2, rain: 274.1,
  },
  {
    location: '남양주', temp: 25.2, max_temp: 30.4, min_temp: 21, wind_speed: 1, rain: 333.5,
  },
  {
    location: '안산', temp: 25.5, max_temp: 30.6, min_temp: 21.6, wind_speed: 1.4, rain: 225.9,
  },
  {
    location: '경기광주', temp: 25.2, max_temp: 30.2, min_temp: 21.6, wind_speed: 1.5, rain: 317.6,
  },
  {
    location: '여주', temp: 25.1, max_temp: 30.3, min_temp: 21.4, wind_speed: 1, rain: 258.8,
  },
  {
    location: '용인', temp: 25.1, max_temp: 30.1, min_temp: 21.3, wind_speed: 1.2, rain: 290.3,
  },
  {
    location: '오산', temp: 25.7, max_temp: 31, min_temp: 22.2, wind_speed: 1.1, rain: 257.4,
  },
  {
    location: '평택', temp: 26.2, max_temp: 31.1, min_temp: 22.6, wind_speed: 1.6, rain: 257.1,
  },
  {
    location: '화천', temp: 24.1, max_temp: 30.4, min_temp: 20.3, wind_speed: 0.8, rain: 341.6,
  },
  {
    location: '양구', temp: 23.6, max_temp: 29.9, min_temp: 19.9, wind_speed: 0.9, rain: 310.9,
  },
  {
    location: '시흥', temp: 26.4, max_temp: 30.5, min_temp: 23, wind_speed: 1.7, rain: 254,
  },
  {
    location: '구리', temp: 26.1, max_temp: 30.7, min_temp: 22.5, wind_speed: 1.3, rain: 337.2,
  },
  {
    location: '금곡', temp: 25.4, max_temp: 29.7, min_temp: 21.9, wind_speed: 1.3, rain: 258.2,
  },
  {
    location: '화성', temp: 25.8, max_temp: 30.1, min_temp: 22.5, wind_speed: 1.3, rain: 232.9,
  },
  {
    location: '성남', temp: 26.5, max_temp: 30.9, min_temp: 22.9, wind_speed: 1.1, rain: 320.2,
  },
  {
    location: '과천', temp: 25.9, max_temp: 30.7, min_temp: 22.2, wind_speed: 1.7, rain: 313.6,
  },
  {
    location: '진부령', temp: 21.3, max_temp: 25.5, min_temp: 18.2, wind_speed: 2.3, rain: 316.1,
  },
  {
    location: '양주', temp: 25.3, max_temp: 30.5, min_temp: 21.2, wind_speed: 1.3, rain: 340.4,
  },
  {
    location: '단양', temp: 25, max_temp: 30.5, min_temp: 21.1, wind_speed: 0.9, rain: 237.7,
  },
  {
    location: '진천', temp: 24.6, max_temp: 30, min_temp: 20.8, wind_speed: 1, rain: 255.7,
  },
  {
    location: '괴산', temp: 24.8, max_temp: 30, min_temp: 20.7, wind_speed: 1, rain: 285.3,
  },
  {
    location: '옥천', temp: 25.3, max_temp: 30.6, min_temp: 21.5, wind_speed: 1, rain: 265.2,
  },
  {
    location: '홍북', temp: 25.4, max_temp: 30.3, min_temp: 21.4, wind_speed: 1.5, rain: 241.2,
  },
  {
    location: '세종연서', temp: 24.9, max_temp: 30.1, min_temp: 21.1, wind_speed: 1.1, rain: 260.3,
  },
  {
    location: '공주', temp: 25.9, max_temp: 31, min_temp: 22.1, wind_speed: 1.2, rain: 257.6,
  },
  {
    location: '서천', temp: 25.8, max_temp: 30.4, min_temp: 22.5, wind_speed: 1.7, rain: 232.1,
  },
  {
    location: '논산', temp: 25.8, max_temp: 31, min_temp: 22.1, wind_speed: 1.4, rain: 259.6,
  },
  {
    location: '당진', temp: 25.3, max_temp: 30, min_temp: 21.9, wind_speed: 1.8, rain: 265.9,
  },
  {
    location: '청양', temp: 25.2, max_temp: 30.2, min_temp: 21.1, wind_speed: 1.1, rain: 296.6,
  },
  {
    location: '음성', temp: 24.7, max_temp: 30.3, min_temp: 20.5, wind_speed: 1.2, rain: 274.4,
  },
  {
    location: '증평', temp: 25.4, max_temp: 30.9, min_temp: 21.5, wind_speed: 1.1, rain: 263.2,
  },
  {
    location: '태안', temp: 25.9, max_temp: 30.2, min_temp: 22.8, wind_speed: 1.9, rain: 257.8,
  },
  {
    location: '예산', temp: 26.2, max_temp: 31.1, min_temp: 22.4, wind_speed: 1.7, rain: 253,
  },
  {
    location: '아산', temp: 26, max_temp: 30.8, min_temp: 22.5, wind_speed: 1.8, rain: 273.8,
  },
  {
    location: '계룡', temp: 25.3, max_temp: 30.3, min_temp: 21.2, wind_speed: 1, rain: 300.6,
  },
  {
    location: '문화', temp: 26.6, max_temp: 31.4, min_temp: 23, wind_speed: 1.1, rain: 307.5,
  },
  {
    location: '세천', temp: 25.4, max_temp: 30.6, min_temp: 21.6, wind_speed: 1, rain: 278.3,
  },
  {
    location: '장동', temp: 25.6, max_temp: 30.6, min_temp: 21.8, wind_speed: 1, rain: 260.3,
  },
  {
    location: '부평', temp: 26.5, max_temp: 31.6, min_temp: 22.6, wind_speed: 0.6, rain: 218.6,
  },
  {
    location: '연천청산', temp: 25.5, max_temp: 30.8, min_temp: 21.5, wind_speed: 1, rain: 346.6,
  },
  {
    location: '양양', temp: 24.7, max_temp: 28.4, min_temp: 21.5, wind_speed: 1.7, rain: 265.6,
  },
  {
    location: '사북', temp: 21.2, max_temp: 25.7, min_temp: 17.9, wind_speed: 2.3, rain: 252.4,
  },
  {
    location: '무안', temp: 26.1, max_temp: 30.5, min_temp: 22.7, wind_speed: 1.9, rain: 249,
  },
  {
    location: '무주', temp: 24.7, max_temp: 30.3, min_temp: 20.6, wind_speed: 1.2, rain: 244.4,
  },
  {
    location: '익산', temp: 26.2, max_temp: 31.1, min_temp: 22.5, wind_speed: 1.5, rain: 261.3,
  },
  {
    location: '진안', temp: 23.7, max_temp: 29, min_temp: 20, wind_speed: 1.3, rain: 306.9,
  },
  {
    location: '담양', temp: 25.8, max_temp: 30.6, min_temp: 22, wind_speed: 1.4, rain: 308.3,
  },
  {
    location: '광산', temp: 26.7, max_temp: 31.6, min_temp: 22.6, wind_speed: 1.7, rain: 291.9,
  },
  {
    location: '구례', temp: 26.3, max_temp: 31.7, min_temp: 22.4, wind_speed: 1.1, rain: 298.5,
  },
  {
    location: '나주', temp: 26.4, max_temp: 31.7, min_temp: 22.7, wind_speed: 1.4, rain: 264.4,
  },
  {
    location: '순천시', temp: 26.6, max_temp: 30.8, min_temp: 23.5, wind_speed: 1.6, rain: 275.4,
  },
  {
    location: '광양읍', temp: 26.5, max_temp: 31.5, min_temp: 22.8, wind_speed: 1.1, rain: 289,
  },
  {
    location: '조선대', temp: 26.4, max_temp: 30.9, min_temp: 22.9, wind_speed: 1.8, rain: 319.2,
  },
  {
    location: '거문도', temp: 26.7, max_temp: 29.5, min_temp: 24.7, wind_speed: 3, rain: 215.9,
  },
  {
    location: '추자도', temp: 26.2, max_temp: 28.9, min_temp: 24.2, wind_speed: 3.6, rain: 201.8,
  },
  {
    location: '장성', temp: 25.7, max_temp: 31, min_temp: 22, wind_speed: 1.4, rain: 298.5,
  },
  {
    location: '영암', temp: 26.5, max_temp: 30.9, min_temp: 22.9, wind_speed: 2, rain: 241.9,
  },
  {
    location: '보성', temp: 25, max_temp: 29.7, min_temp: 21.5, wind_speed: 1.7, rain: 312.6,
  },
  {
    location: '완주', temp: 26.2, max_temp: 31.6, min_temp: 22.2, wind_speed: 1.5, rain: 306.4,
  },
  {
    location: '김제', temp: 26.6, max_temp: 31.4, min_temp: 23.1, wind_speed: 2, rain: 240.9,
  },
  {
    location: '화순', temp: 26, max_temp: 31.7, min_temp: 22.4, wind_speed: 0.9, rain: 296,
  },
  {
    location: '함평', temp: 26.6, max_temp: 31.3, min_temp: 23, wind_speed: 1.6, rain: 240.5,
  },
  {
    location: '곡성', temp: 25.8, max_temp: 31.2, min_temp: 21.9, wind_speed: 1.1, rain: 321.9,
  },
  {
    location: '성판악', temp: 21.6, max_temp: 24.7, min_temp: 18.9, wind_speed: 2.6, rain: 717,
  },
  {
    location: '풍암', temp: 27.1, max_temp: 32.3, min_temp: 23.4, wind_speed: 1.2, rain: 321.6,
  },
  {
    location: '압해도', temp: 26.4, max_temp: 30.5, min_temp: 23.5, wind_speed: 2.6, rain: 209.4,
  },
  {
    location: '영양', temp: 23.8, max_temp: 28.9, min_temp: 19.8, wind_speed: 1.2, rain: 208.9,
  },
  {
    location: '성주', temp: 25.7, max_temp: 31.1, min_temp: 21.9, wind_speed: 1.1, rain: 249.1,
  },
  {
    location: '고령', temp: 25.6, max_temp: 30.9, min_temp: 21.6, wind_speed: 0.9, rain: 283.4,
  },
  {
    location: '청도', temp: 25.7, max_temp: 31.2, min_temp: 21.7, wind_speed: 1.3, rain: 255.4,
  },
  {
    location: '예천', temp: 24.7, max_temp: 30.4, min_temp: 20.8, wind_speed: 1, rain: 225.2,
  },
  {
    location: '김천', temp: 25.7, max_temp: 31.3, min_temp: 21.5, wind_speed: 0.8, rain: 237,
  },
  {
    location: '군위', temp: 25.2, max_temp: 31.2, min_temp: 20.9, wind_speed: 1.3, rain: 228.1,
  },
  {
    location: '칠곡', temp: 26, max_temp: 31.4, min_temp: 22.2, wind_speed: 1.5, rain: 225.9,
  },
  {
    location: '경산', temp: 26.7, max_temp: 32, min_temp: 22.9, wind_speed: 1.8, rain: 231.1,
  },
  {
    location: '달성', temp: 26.5, max_temp: 32.1, min_temp: 22.7, wind_speed: 1.5, rain: 258.4,
  },
  {
    location: '서구', temp: 26.9, max_temp: 31.8, min_temp: 23.2, wind_speed: 1.8, rain: 255.5,
  },
  {
    location: '대구', temp: 26.7, max_temp: 31.3, min_temp: 23.1, wind_speed: 2.2, rain: 245.3,
  },
  {
    location: '전주', temp: 26.5, max_temp: 31.3, min_temp: 22.9, wind_speed: 1.7, rain: 289.6,
  },
  {
    location: '삼척', temp: 25, max_temp: 28.7, min_temp: 22, wind_speed: 1.6, rain: 217.1,
  },
  {
    location: '울기', temp: 24.7, max_temp: 27.6, min_temp: 22.7, wind_speed: 2.5, rain: 172.4,
  },
  {
    location: '삼천포', temp: 26.4, max_temp: 30.1, min_temp: 23.7, wind_speed: 1.7, rain: 237.4,
  },
  {
    location: '영도', temp: 25.1, max_temp: 28.1, min_temp: 23, wind_speed: 4, rain: 199.3,
  },
  {
    location: '고성', temp: 26.8, max_temp: 31.1, min_temp: 23.2, wind_speed: 2, rain: 239.5,
  },
  {
    location: '창녕', temp: 26.5, max_temp: 32, min_temp: 22.4, wind_speed: 1.7, rain: 275.9,
  },
  {
    location: '함안', temp: 26.1, max_temp: 31.8, min_temp: 21.9, wind_speed: 1.1, rain: 253.6,
  },
  {
    location: '가덕도', temp: 25.9, max_temp: 29.4, min_temp: 23.5, wind_speed: 3.9, rain: 167.7,
  },
  {
    location: '기장', temp: 25.9, max_temp: 29.8, min_temp: 22.7, wind_speed: 1.9, rain: 209.7,
  },
  {
    location: '간절곶', temp: 25, max_temp: 27.4, min_temp: 22.7, wind_speed: 3.6, rain: 186.8,
  },
  {
    location: '하동', temp: 26.9, max_temp: 31.8, min_temp: 23.1, wind_speed: 1.2, rain: 337.8,
  },
  {
    location: '해운대', temp: 26.1, max_temp: 29.8, min_temp: 23.5, wind_speed: 2.4, rain: 205.1,
  },
  {
    location: '부산진', temp: 26.9, max_temp: 30.7, min_temp: 24.1, wind_speed: 2.1, rain: 226.9,
  },
  {
    location: '동래', temp: 26.8, max_temp: 30.8, min_temp: 23.8, wind_speed: 1.9, rain: 230.9,
  },
  {
    location: '북구', temp: 26.4, max_temp: 30.4, min_temp: 23.4, wind_speed: 2.3, rain: 238.5,
  },
  {
    location: '부산남구', temp: 27, max_temp: 30.2, min_temp: 24.5, wind_speed: 2.2, rain: 217.4,
  },
  {
    location: '정자', temp: 25.8, max_temp: 29.6, min_temp: 22.4, wind_speed: 2.7, rain: 214,
  }],
  [{
    location: '속초', temp: 20.1, max_temp: 24, min_temp: 16.5, wind_speed: 2, rain: 200.6,
  },
  {
    location: '철원', temp: 18.9, max_temp: 25, min_temp: 13.6, wind_speed: 1.6, rain: 121.2,
  },
  {
    location: '동두천', temp: 20.1, max_temp: 26.3, min_temp: 15.3, wind_speed: 1.3, rain: 137.9,
  },
  {
    location: '파주', temp: 19.9, max_temp: 26.1, min_temp: 15.1, wind_speed: 1.4, rain: 134.5,
  },
  {
    location: '대관령', temp: 14.6, max_temp: 19.4, min_temp: 10.4, wind_speed: 2.4, rain: 249.6,
  },
  {
    location: '춘천', temp: 19.8, max_temp: 25.6, min_temp: 15.3, wind_speed: 1.1, rain: 128.1,
  },
  {
    location: '백령도', temp: 20.1, max_temp: 23.5, min_temp: 17.8, wind_speed: 3.4, rain: 90.6,
  },
  {
    location: '강릉', temp: 20.5, max_temp: 24.6, min_temp: 17, wind_speed: 2.1, rain: 229.3,
  },
  {
    location: '동해', temp: 19.8, max_temp: 23.8, min_temp: 16.2, wind_speed: 2.2, rain: 219.8,
  },
  {
    location: '서울', temp: 21.6, max_temp: 26.2, min_temp: 17.7, wind_speed: 1.9, rain: 141.5,
  },
  {
    location: '인천', temp: 21.5, max_temp: 25.8, min_temp: 18.1, wind_speed: 2.1, rain: 130.3,
  },
  {
    location: '원주', temp: 20.2, max_temp: 25.9, min_temp: 15.5, wind_speed: 0.8, rain: 147,
  },
  {
    location: '울릉도', temp: 20, max_temp: 23.2, min_temp: 17.7, wind_speed: 3.3, rain: 173.6,
  },
  {
    location: '수원', temp: 21.4, max_temp: 26.4, min_temp: 17.1, wind_speed: 1.6, rain: 133.5,
  },
  {
    location: '영월', temp: 19.2, max_temp: 25.5, min_temp: 14.7, wind_speed: 1.2, rain: 139.4,
  },
  {
    location: '충주', temp: 19.9, max_temp: 26, min_temp: 15.2, wind_speed: 1.3, rain: 140.2,
  },
  {
    location: '서산', temp: 20.7, max_temp: 26.1, min_temp: 16.1, wind_speed: 2, rain: 144.4,
  },
  {
    location: '울진', temp: 20, max_temp: 24.1, min_temp: 16.3, wind_speed: 3, rain: 181.2,
  },
  {
    location: '청주', temp: 21.3, max_temp: 26.4, min_temp: 17, wind_speed: 1.5, rain: 142.3,
  },
  {
    location: '대전', temp: 21.2, max_temp: 26.3, min_temp: 17, wind_speed: 1.6, rain: 152.5,
  },
  {
    location: '추풍령', temp: 19.3, max_temp: 25, min_temp: 14.6, wind_speed: 1.6, rain: 135.6,
  },
  {
    location: '안동', temp: 20, max_temp: 25.8, min_temp: 15.5, wind_speed: 1.2, rain: 119.8,
  },
  {
    location: '상주', temp: 20.1, max_temp: 25.9, min_temp: 15.8, wind_speed: 0.9, rain: 138.5,
  },
  {
    location: '포항', temp: 21.9, max_temp: 25.5, min_temp: 18.9, wind_speed: 2.5, rain: 189.3,
  },
  {
    location: '군산', temp: 21.5, max_temp: 26, min_temp: 17.8, wind_speed: 2.6, rain: 137.5,
  },
  {
    location: '울산', temp: 21.7, max_temp: 26, min_temp: 18.2, wind_speed: 1.9, rain: 170.3,
  },
  {
    location: '창원', temp: 22.6, max_temp: 26.9, min_temp: 19.3, wind_speed: 1.7, rain: 172.9,
  },
  {
    location: '광주', temp: 22.2, max_temp: 27.1, min_temp: 18.2, wind_speed: 1.9, rain: 145,
  },
  {
    location: '부산', temp: 22.6, max_temp: 26.4, min_temp: 19.8, wind_speed: 3.4, rain: 160.6,
  },
  {
    location: '통영', temp: 22.5, max_temp: 26.7, min_temp: 19.4, wind_speed: 2.4, rain: 177.1,
  },
  {
    location: '목포', temp: 22.3, max_temp: 26.5, min_temp: 19, wind_speed: 3, rain: 137.7,
  },
  {
    location: '여수', temp: 22.6, max_temp: 25.8, min_temp: 20, wind_speed: 4.2, rain: 151.7,
  },
  {
    location: '흑산도', temp: 21.3, max_temp: 24.1, min_temp: 19.4, wind_speed: 4.3, rain: 120.5,
  },
  {
    location: '완도', temp: 22.3, max_temp: 26.6, min_temp: 19, wind_speed: 2.7, rain: 176.4,
  },
  {
    location: '고창', temp: 21, max_temp: 26.4, min_temp: 16.6, wind_speed: 2.1, rain: 123.8,
  },
  {
    location: '제주', temp: 23.3, max_temp: 26.1, min_temp: 20.9, wind_speed: 2.9, rain: 227.8,
  },
  {
    location: '고산', temp: 23, max_temp: 26.1, min_temp: 20.6, wind_speed: 5.3, rain: 120.4,
  },
  {
    location: '성산', temp: 23.2, max_temp: 26.5, min_temp: 20.2, wind_speed: 3.1, rain: 248.6,
  },
  {
    location: '서귀포', temp: 24.1, max_temp: 27.4, min_temp: 21.5, wind_speed: 2.8, rain: 208.8,
  },
  {
    location: '진주', temp: 21.4, max_temp: 26.9, min_temp: 16.7, wind_speed: 1.2, rain: 180.7,
  },
  {
    location: '강화', temp: 20.2, max_temp: 25.5, min_temp: 15.6, wind_speed: 1.7, rain: 131.5,
  },
  {
    location: '양평', temp: 20, max_temp: 26.2, min_temp: 15.4, wind_speed: 1, rain: 144.5,
  },
  {
    location: '이천', temp: 19.8, max_temp: 26, min_temp: 15, wind_speed: 1, rain: 153.1,
  },
  {
    location: '인제', temp: 18.4, max_temp: 24.7, min_temp: 14, wind_speed: 1.6, rain: 127.4,
  },
  {
    location: '홍천', temp: 19.2, max_temp: 26, min_temp: 14.5, wind_speed: 1, rain: 141.3,
  },
  {
    location: '태백', temp: 16.2, max_temp: 21.5, min_temp: 11.7, wind_speed: 1.4, rain: 198.4,
  },
  {
    location: '정선군', temp: 18.4, max_temp: 24.6, min_temp: 14.6, wind_speed: 1.3, rain: 119.2,
  },
  {
    location: '제천', temp: 18.5, max_temp: 25.1, min_temp: 13.3, wind_speed: 1.2, rain: 145.3,
  },
  {
    location: '보은', temp: 19.1, max_temp: 25.4, min_temp: 14, wind_speed: 1, rain: 137.4,
  },
  {
    location: '천안', temp: 20.2, max_temp: 26.1, min_temp: 15.2, wind_speed: 1.4, rain: 146.4,
  },
  {
    location: '보령', temp: 21.2, max_temp: 26.2, min_temp: 16.9, wind_speed: 1.7, rain: 135.4,
  },
  {
    location: '부여', temp: 20.7, max_temp: 26.9, min_temp: 15.9, wind_speed: 1.1, rain: 146,
  },
  {
    location: '금산', temp: 19.7, max_temp: 26.2, min_temp: 14.8, wind_speed: 1, rain: 130.5,
  },
  {
    location: '부안', temp: 21.2, max_temp: 26.6, min_temp: 16.7, wind_speed: 1.3, rain: 139.4,
  },
  {
    location: '임실', temp: 19.5, max_temp: 26, min_temp: 14.4, wind_speed: 1, rain: 138.3,
  },
  {
    location: '정읍', temp: 21.4, max_temp: 26.9, min_temp: 16.9, wind_speed: 1.1, rain: 148.5,
  },
  {
    location: '남원', temp: 20.6, max_temp: 27, min_temp: 15.6, wind_speed: 1.3, rain: 144.2,
  },
  {
    location: '장수', temp: 18.3, max_temp: 24.8, min_temp: 13.2, wind_speed: 1.3, rain: 153.8,
  },
  {
    location: '영광군', temp: 21.4, max_temp: 26.7, min_temp: 17.2, wind_speed: 1.7, rain: 134.8,
  },
  {
    location: '김해시', temp: 22.7, max_temp: 27.8, min_temp: 19, wind_speed: 1.7, rain: 184.9,
  },
  {
    location: '순창군', temp: 20.8, max_temp: 26.8, min_temp: 16.2, wind_speed: 1.3, rain: 137.8,
  },
  {
    location: '양산시', temp: 22.6, max_temp: 27.5, min_temp: 18.7, wind_speed: 2.5, rain: 207.8,
  },
  {
    location: '강진군', temp: 21.6, max_temp: 26.9, min_temp: 17.4, wind_speed: 1.9, rain: 164.3,
  },
  {
    location: '장흥', temp: 21.2, max_temp: 26.9, min_temp: 16.5, wind_speed: 1.4, rain: 163.6,
  },
  {
    location: '해남', temp: 21.5, max_temp: 27, min_temp: 16.7, wind_speed: 1.8, rain: 150.4,
  },
  {
    location: '고흥', temp: 21.6, max_temp: 26.8, min_temp: 17.2, wind_speed: 1.3, rain: 167.2,
  },
  {
    location: '의령군', temp: 20.3, max_temp: 26.3, min_temp: 15.8, wind_speed: 0.9, rain: 188.4,
  },
  {
    location: '함양군', temp: 19.9, max_temp: 26.3, min_temp: 15, wind_speed: 0.7, rain: 165.1,
  },
  {
    location: '진도군', temp: 22, max_temp: 26.8, min_temp: 18, wind_speed: 1.6, rain: 155.3,
  },
  {
    location: '봉화', temp: 17.8, max_temp: 24.5, min_temp: 12.4, wind_speed: 1.2, rain: 135.1,
  },
  {
    location: '영주', temp: 19.3, max_temp: 25.5, min_temp: 14.2, wind_speed: 1.6, rain: 154.1,
  },
  {
    location: '문경', temp: 19.2, max_temp: 25.3, min_temp: 14.5, wind_speed: 1.2, rain: 138.4,
  },
  {
    location: '청송군', temp: 18.6, max_temp: 25, min_temp: 14.2, wind_speed: 0.8, rain: 137.6,
  },
  {
    location: '영덕', temp: 20.1, max_temp: 25, min_temp: 16, wind_speed: 2.4, rain: 159.6,
  },
  {
    location: '의성', temp: 19.8, max_temp: 26.6, min_temp: 14.4, wind_speed: 0.9, rain: 124.3,
  },
  {
    location: '구미', temp: 20.6, max_temp: 26.4, min_temp: 16, wind_speed: 1.1, rain: 147.6,
  },
  {
    location: '영천', temp: 20.4, max_temp: 26.2, min_temp: 15.5, wind_speed: 1.4, rain: 137.6,
  },
  {
    location: '경주시', temp: 20.5, max_temp: 26.2, min_temp: 16.2, wind_speed: 1.9, rain: 194.1,
  },
  {
    location: '거창', temp: 19.4, max_temp: 25.9, min_temp: 14.5, wind_speed: 1, rain: 166.2,
  },
  {
    location: '합천', temp: 20.9, max_temp: 27.1, min_temp: 16.2, wind_speed: 1.1, rain: 158.6,
  },
  {
    location: '밀양', temp: 21.5, max_temp: 27.4, min_temp: 16.6, wind_speed: 1.3, rain: 144.4,
  },
  {
    location: '산청', temp: 20.3, max_temp: 26.5, min_temp: 15.9, wind_speed: 1, rain: 207.2,
  },
  {
    location: '거제', temp: 22, max_temp: 26.5, min_temp: 18.2, wind_speed: 1.4, rain: 209.5,
  },
  {
    location: '남해', temp: 21.9, max_temp: 26.6, min_temp: 18.4, wind_speed: 1.5, rain: 221.9,
  },
  {
    location: '강남', temp: 22.4, max_temp: 26.8, min_temp: 18.7, wind_speed: 1.6, rain: 143,
  },
  {
    location: '서초', temp: 22.6, max_temp: 27.5, min_temp: 18.6, wind_speed: 1.1, rain: 146.2,
  },
  {
    location: '강동', temp: 21.5, max_temp: 26.6, min_temp: 17.3, wind_speed: 1.4, rain: 146.9,
  },
  {
    location: '송파', temp: 22.5, max_temp: 27, min_temp: 18.3, wind_speed: 1.5, rain: 139.4,
  },
  {
    location: '강서', temp: 21.9, max_temp: 26.4, min_temp: 18.2, wind_speed: 1.6, rain: 139.3,
  },
  {
    location: '양천', temp: 22.9, max_temp: 27.4, min_temp: 19.3, wind_speed: 1.3, rain: 128.5,
  },
  {
    location: '도봉', temp: 20.8, max_temp: 26.5, min_temp: 16.3, wind_speed: 0.8, rain: 147.8,
  },
  {
    location: '노원', temp: 20.4, max_temp: 26.3, min_temp: 15.4, wind_speed: 1.2, rain: 129.2,
  },
  {
    location: '동대문', temp: 22.3, max_temp: 27.1, min_temp: 18.4, wind_speed: 1.7, rain: 144.9,
  },
  {
    location: '중랑', temp: 22.3, max_temp: 26.8, min_temp: 18.4, wind_speed: 2.1, rain: 142,
  },
  {
    location: '기상청', temp: 22.2, max_temp: 26.4, min_temp: 18.4, wind_speed: 1.3, rain: 149,
  },
  {
    location: '마포', temp: 22.4, max_temp: 26.7, min_temp: 18.9, wind_speed: 2.1, rain: 142.9,
  },
  {
    location: '서대문', temp: 21.2, max_temp: 26.6, min_temp: 17.2, wind_speed: 1.3, rain: 133.6,
  },
  {
    location: '광진', temp: 22.1, max_temp: 26.8, min_temp: 18.2, wind_speed: 1.6, rain: 154.3,
  },
  {
    location: '성북', temp: 21.3, max_temp: 26, min_temp: 17.6, wind_speed: 1.6, rain: 138.7,
  },
  {
    location: '용산', temp: 22.6, max_temp: 27.2, min_temp: 18.9, wind_speed: 1.8, rain: 137.8,
  },
  {
    location: '은평', temp: 21.1, max_temp: 26.3, min_temp: 16.7, wind_speed: 1.4, rain: 124.6,
  },
  {
    location: '금천', temp: 22.2, max_temp: 26.3, min_temp: 18.9, wind_speed: 1.8, rain: 153.3,
  },
  {
    location: '중구', temp: 20.7, max_temp: 25.3, min_temp: 17.1, wind_speed: 2.4, rain: 103.6,
  },
  {
    location: '성동', temp: 22.4, max_temp: 26.6, min_temp: 18.9, wind_speed: 2, rain: 136.2,
  },
  {
    location: '구로', temp: 21.7, max_temp: 26.6, min_temp: 17.7, wind_speed: 1.9, rain: 150.3,
  },
  {
    location: '강북', temp: 22.2, max_temp: 26.9, min_temp: 18.3, wind_speed: 1.5, rain: 147.9,
  },
  {
    location: '남현', temp: 20.7, max_temp: 25.7, min_temp: 16.7, wind_speed: 1.1, rain: 119.5,
  },
  {
    location: '부천', temp: 22.2, max_temp: 26.6, min_temp: 18.4, wind_speed: 1.1, rain: 147.4,
  },
  {
    location: '안양', temp: 21.8, max_temp: 25.9, min_temp: 18.2, wind_speed: 2, rain: 144.5,
  },
  {
    location: '광명', temp: 22.6, max_temp: 26.8, min_temp: 19.2, wind_speed: 1.9, rain: 153.8,
  },
  {
    location: '군포', temp: 21.9, max_temp: 26.3, min_temp: 18.4, wind_speed: 1.2, rain: 140.5,
  },
  {
    location: '김포', temp: 20.8, max_temp: 25.8, min_temp: 16.8, wind_speed: 1.3, rain: 139.1,
  },
  {
    location: '하남', temp: 20.8, max_temp: 26.2, min_temp: 16.5, wind_speed: 0.8, rain: 120.3,
  },
  {
    location: '의왕', temp: 20.3, max_temp: 25.4, min_temp: 16.1, wind_speed: 0.9, rain: 136.7,
  },
  {
    location: '포천', temp: 19.9, max_temp: 26.4, min_temp: 14.9, wind_speed: 1.2, rain: 124.6,
  },
  {
    location: '가평조종', temp: 18.5, max_temp: 25.5, min_temp: 13.5, wind_speed: 0.9, rain: 120.1,
  },
  {
    location: '영등포', temp: 22.9, max_temp: 27.2, min_temp: 19.5, wind_speed: 1.5, rain: 133.2,
  },
  {
    location: '인천연수', temp: 22.1, max_temp: 26.9, min_temp: 18, wind_speed: 1.5, rain: 116.5,
  },
  {
    location: '안성', temp: 21.2, max_temp: 26.7, min_temp: 16.8, wind_speed: 1.1, rain: 149.1,
  },
  {
    location: '간성', temp: 19.2, max_temp: 23.8, min_temp: 15.1, wind_speed: 1.5, rain: 196.9,
  },
  {
    location: '평창', temp: 18.3, max_temp: 24.6, min_temp: 13.8, wind_speed: 1, rain: 135,
  },
  {
    location: '의정부', temp: 20.1, max_temp: 26.2, min_temp: 15.5, wind_speed: 0.9, rain: 133.9,
  },
  {
    location: '횡성', temp: 19.4, max_temp: 26.2, min_temp: 14.7, wind_speed: 1, rain: 147.6,
  },
  {
    location: '고양', temp: 20.8, max_temp: 27, min_temp: 15.6, wind_speed: 1.1, rain: 117.1,
  },
  {
    location: '남양주', temp: 20, max_temp: 26.4, min_temp: 14.8, wind_speed: 0.9, rain: 131.7,
  },
  {
    location: '안산', temp: 20.6, max_temp: 26.6, min_temp: 15.5, wind_speed: 1.3, rain: 124.9,
  },
  {
    location: '경기광주', temp: 20.2, max_temp: 26, min_temp: 16, wind_speed: 1.5, rain: 140.5,
  },
  {
    location: '여주', temp: 19.9, max_temp: 26, min_temp: 15.4, wind_speed: 0.9, rain: 154.2,
  },
  {
    location: '용인', temp: 19.8, max_temp: 26, min_temp: 15.3, wind_speed: 1.1, rain: 130.7,
  },
  {
    location: '오산', temp: 21, max_temp: 26.8, min_temp: 16.5, wind_speed: 1, rain: 134.2,
  },
  {
    location: '평택', temp: 21.6, max_temp: 27, min_temp: 17.1, wind_speed: 1.4, rain: 139.4,
  },
  {
    location: '화천', temp: 18.8, max_temp: 26.1, min_temp: 14.3, wind_speed: 0.9, rain: 114,
  },
  {
    location: '양구', temp: 18.1, max_temp: 25.5, min_temp: 13.9, wind_speed: 0.8, rain: 121.1,
  },
  {
    location: '시흥', temp: 21.7, max_temp: 26.6, min_temp: 17.5, wind_speed: 1.4, rain: 122.4,
  },
  {
    location: '구리', temp: 21.3, max_temp: 26.6, min_temp: 17.1, wind_speed: 1.3, rain: 133,
  },
  {
    location: '금곡', temp: 20.8, max_temp: 25.9, min_temp: 16.7, wind_speed: 1.2, rain: 133.5,
  },
  {
    location: '화성', temp: 21.4, max_temp: 26.3, min_temp: 17.3, wind_speed: 1.2, rain: 128.2,
  },
  {
    location: '성남', temp: 21.7, max_temp: 26.7, min_temp: 17.4, wind_speed: 1.1, rain: 131.1,
  },
  {
    location: '과천', temp: 21, max_temp: 26.6, min_temp: 16.5, wind_speed: 1.6, rain: 137.9,
  },
  {
    location: '진부령', temp: 16.2, max_temp: 21.1, min_temp: 12.1, wind_speed: 2.1, rain: 247.6,
  },
  {
    location: '양주', temp: 20.1, max_temp: 26.5, min_temp: 14.7, wind_speed: 1, rain: 141.7,
  },
  {
    location: '단양', temp: 19.6, max_temp: 25.9, min_temp: 15.5, wind_speed: 0.8, rain: 126.5,
  },
  {
    location: '진천', temp: 19.5, max_temp: 26, min_temp: 15, wind_speed: 1, rain: 148.1,
  },
  {
    location: '괴산', temp: 19.4, max_temp: 25.8, min_temp: 14.8, wind_speed: 0.9, rain: 142.8,
  },
  {
    location: '옥천', temp: 20.1, max_temp: 26.2, min_temp: 15.7, wind_speed: 0.9, rain: 133.3,
  },
  {
    location: '홍북', temp: 20.4, max_temp: 26.2, min_temp: 15.7, wind_speed: 1.3, rain: 159.5,
  },
  {
    location: '세종연서', temp: 19.8, max_temp: 26.2, min_temp: 15.4, wind_speed: 1, rain: 141.2,
  },
  {
    location: '공주', temp: 20.8, max_temp: 26.8, min_temp: 16.2, wind_speed: 1.2, rain: 159,
  },
  {
    location: '서천', temp: 20.9, max_temp: 26.6, min_temp: 16.7, wind_speed: 1.6, rain: 128.9,
  },
  {
    location: '논산', temp: 20.8, max_temp: 27, min_temp: 16.2, wind_speed: 1.3, rain: 130.2,
  },
  {
    location: '당진', temp: 20.5, max_temp: 25.9, min_temp: 16.2, wind_speed: 1.5, rain: 136,
  },
  {
    location: '청양', temp: 19.9, max_temp: 26.1, min_temp: 14.8, wind_speed: 1.1, rain: 143.4,
  },
  {
    location: '음성', temp: 19.2, max_temp: 26.2, min_temp: 14.1, wind_speed: 1.1, rain: 133.6,
  },
  {
    location: '증평', temp: 20.1, max_temp: 26.6, min_temp: 15.4, wind_speed: 0.9, rain: 124,
  },
  {
    location: '태안', temp: 21.8, max_temp: 26.4, min_temp: 17.9, wind_speed: 1.7, rain: 123.4,
  },
  {
    location: '예산', temp: 21.2, max_temp: 26.8, min_temp: 16.5, wind_speed: 1.6, rain: 157.8,
  },
  {
    location: '아산', temp: 21.1, max_temp: 26.5, min_temp: 16.8, wind_speed: 1.6, rain: 144.2,
  },
  {
    location: '계룡', temp: 20, max_temp: 26.2, min_temp: 15.1, wind_speed: 0.9, rain: 149.3,
  },
  {
    location: '문화', temp: 21.8, max_temp: 27.1, min_temp: 17.6, wind_speed: 1, rain: 151,
  },
  {
    location: '세천', temp: 20.4, max_temp: 26.3, min_temp: 15.9, wind_speed: 0.9, rain: 144.2,
  },
  {
    location: '장동', temp: 20.6, max_temp: 26.4, min_temp: 16.1, wind_speed: 1, rain: 147.4,
  },
  {
    location: '부평', temp: 21.1, max_temp: 26.9, min_temp: 16.1, wind_speed: 0.6, rain: 115.3,
  },
  {
    location: '연천청산', temp: 20.3, max_temp: 26.6, min_temp: 15.2, wind_speed: 0.9, rain: 133.5,
  },
  {
    location: '양양', temp: 19.8, max_temp: 24, min_temp: 16, wind_speed: 1.8, rain: 198.9,
  },
  {
    location: '사북', temp: 15.7, max_temp: 20.7, min_temp: 11.9, wind_speed: 1.9, rain: 153.8,
  },
  {
    location: '무안', temp: 21.6, max_temp: 26.7, min_temp: 17.6, wind_speed: 1.7, rain: 145.4,
  },
  {
    location: '무주', temp: 19.5, max_temp: 25.6, min_temp: 14.7, wind_speed: 1.1, rain: 129.3,
  },
  {
    location: '익산', temp: 21.5, max_temp: 27, min_temp: 16.9, wind_speed: 1.4, rain: 113.4,
  },
  {
    location: '진안', temp: 18.8, max_temp: 25.1, min_temp: 14.3, wind_speed: 1.3, rain: 139.5,
  },
  {
    location: '담양', temp: 21.2, max_temp: 27.1, min_temp: 16.7, wind_speed: 1.5, rain: 147.8,
  },
  {
    location: '광산', temp: 22, max_temp: 27.7, min_temp: 17.3, wind_speed: 1.5, rain: 132.5,
  },
  {
    location: '구례', temp: 21.4, max_temp: 28, min_temp: 16.9, wind_speed: 0.9, rain: 138.9,
  },
  {
    location: '나주', temp: 21.9, max_temp: 27.9, min_temp: 17.5, wind_speed: 1.2, rain: 139.9,
  },
  {
    location: '순천시', temp: 22.6, max_temp: 27.4, min_temp: 18.8, wind_speed: 1.6, rain: 165.6,
  },
  {
    location: '광양읍', temp: 22.4, max_temp: 27.9, min_temp: 17.9, wind_speed: 1.2, rain: 145.6,
  },
  {
    location: '조선대', temp: 22.1, max_temp: 27.4, min_temp: 18.1, wind_speed: 1.6, rain: 152.4,
  },
  {
    location: '거문도', temp: 23.4, max_temp: 26, min_temp: 21.5, wind_speed: 3.2, rain: 156.1,
  },
  {
    location: '추자도', temp: 22.9, max_temp: 25.5, min_temp: 21.1, wind_speed: 3.5, rain: 132.9,
  },
  {
    location: '장성', temp: 21.1, max_temp: 27.2, min_temp: 16.7, wind_speed: 1.2, rain: 143.4,
  },
  {
    location: '영암', temp: 21.8, max_temp: 27.4, min_temp: 17.5, wind_speed: 1.5, rain: 156.2,
  },
  {
    location: '보성', temp: 20.5, max_temp: 26.3, min_temp: 16.1, wind_speed: 1.4, rain: 172.3,
  },
  {
    location: '완주', temp: 21.3, max_temp: 27.6, min_temp: 16.6, wind_speed: 1.6, rain: 115.6,
  },
  {
    location: '김제', temp: 21.7, max_temp: 27.3, min_temp: 17.6, wind_speed: 1.9, rain: 115.7,
  },
  {
    location: '화순', temp: 21.7, max_temp: 28, min_temp: 17.2, wind_speed: 0.8, rain: 134.3,
  },
  {
    location: '함평', temp: 22.1, max_temp: 27.6, min_temp: 17.8, wind_speed: 1.4, rain: 141,
  },
  {
    location: '곡성', temp: 21, max_temp: 27.2, min_temp: 16.6, wind_speed: 1, rain: 162.5,
  },
  {
    location: '성판악', temp: 17.8, max_temp: 21.1, min_temp: 15, wind_speed: 2.3, rain: 581.1,
  },
  {
    location: '풍암', temp: 22.5, max_temp: 28.3, min_temp: 18.2, wind_speed: 1, rain: 148.3,
  },
  {
    location: '압해도', temp: 22.3, max_temp: 26.7, min_temp: 19, wind_speed: 2.4, rain: 141.9,
  },
  {
    location: '영양', temp: 18.7, max_temp: 24.7, min_temp: 14.4, wind_speed: 1.2, rain: 128.4,
  },
  {
    location: '성주', temp: 20.7, max_temp: 26.7, min_temp: 16.2, wind_speed: 1, rain: 163.5,
  },
  {
    location: '고령', temp: 20.6, max_temp: 26.7, min_temp: 16, wind_speed: 0.7, rain: 161.4,
  },
  {
    location: '청도', temp: 20.6, max_temp: 26.8, min_temp: 16.2, wind_speed: 1.2, rain: 163.3,
  },
  {
    location: '예천', temp: 19.6, max_temp: 26.1, min_temp: 15, wind_speed: 0.9, rain: 127.2,
  },
  {
    location: '김천', temp: 20.5, max_temp: 26.8, min_temp: 15.7, wind_speed: 0.8, rain: 154.4,
  },
  {
    location: '군위', temp: 19.8, max_temp: 26.6, min_temp: 15.1, wind_speed: 1.2, rain: 133,
  },
  {
    location: '칠곡', temp: 21, max_temp: 27.1, min_temp: 16.5, wind_speed: 1.3, rain: 145.1,
  },
  {
    location: '경산', temp: 21.7, max_temp: 27.3, min_temp: 17.5, wind_speed: 1.6, rain: 151.9,
  },
  {
    location: '달성', temp: 21.7, max_temp: 27.7, min_temp: 17.5, wind_speed: 1.4, rain: 143,
  },
  {
    location: '서구', temp: 22.1, max_temp: 27.1, min_temp: 18, wind_speed: 1.6, rain: 158.3,
  },
  {
    location: '대구', temp: 22.1, max_temp: 27, min_temp: 18, wind_speed: 2, rain: 142.4,
  },
  {
    location: '전주', temp: 21.9, max_temp: 27.4, min_temp: 17.4, wind_speed: 1.5, rain: 128.2,
  },
  {
    location: '삼척', temp: 20.3, max_temp: 24.2, min_temp: 16.9, wind_speed: 1.7, rain: 224.9,
  },
  {
    location: '울기', temp: 22, max_temp: 24.9, min_temp: 19.9, wind_speed: 2.5, rain: 165.7,
  },
  {
    location: '삼천포', temp: 22.9, max_temp: 27, min_temp: 19.7, wind_speed: 1.7, rain: 171.5,
  },
  {
    location: '영도', temp: 22.1, max_temp: 25.1, min_temp: 19.8, wind_speed: 4.2, rain: 142.8,
  },
  {
    location: '고성', temp: 22.2, max_temp: 27.4, min_temp: 17.9, wind_speed: 1.8, rain: 161.8,
  },
  {
    location: '창녕', temp: 21.5, max_temp: 27.7, min_temp: 16.7, wind_speed: 1.8, rain: 164.1,
  },
  {
    location: '함안', temp: 21, max_temp: 27.8, min_temp: 16.4, wind_speed: 1, rain: 178.4,
  },
  {
    location: '가덕도', temp: 22.5, max_temp: 26.2, min_temp: 20, wind_speed: 4, rain: 127.3,
  },
  {
    location: '기장', temp: 21.9, max_temp: 25.9, min_temp: 18.6, wind_speed: 2.2, rain: 167.4,
  },
  {
    location: '간절곶', temp: 22.2, max_temp: 24.8, min_temp: 19.8, wind_speed: 4.2, rain: 189.1,
  },
  {
    location: '하동', temp: 22.5, max_temp: 28, min_temp: 18.1, wind_speed: 1.3, rain: 185.8,
  },
  {
    location: '해운대', temp: 22.6, max_temp: 26.5, min_temp: 19.7, wind_speed: 2.4, rain: 158.3,
  },
  {
    location: '부산진', temp: 22.8, max_temp: 26.8, min_temp: 19.7, wind_speed: 2, rain: 160.2,
  },
  {
    location: '동래', temp: 22.6, max_temp: 26.8, min_temp: 19.4, wind_speed: 1.9, rain: 163.8,
  },
  {
    location: '북구', temp: 22.2, max_temp: 26.4, min_temp: 19, wind_speed: 2.4, rain: 156.2,
  },
  {
    location: '부산남구', temp: 23.2, max_temp: 26.4, min_temp: 20.5, wind_speed: 2.3, rain: 162.1,
  },
  {
    location: '정자', temp: 22, max_temp: 25.6, min_temp: 18.5, wind_speed: 3.5, rain: 224.7,
  }],
  [{
    location: '속초', temp: 15.1, max_temp: 19.5, min_temp: 10.8, wind_speed: 2.2, rain: 87.9,
  },
  {
    location: '철원', temp: 11.8, max_temp: 19.1, min_temp: 5.5, wind_speed: 1.3, rain: 49.9,
  },
  {
    location: '동두천', temp: 13.1, max_temp: 20.5, min_temp: 7.4, wind_speed: 1.2, rain: 55.1,
  },
  {
    location: '파주', temp: 12.6, max_temp: 20.3, min_temp: 6.5, wind_speed: 1.3, rain: 50.1,
  },
  {
    location: '대관령', temp: 8.8, max_temp: 14.6, min_temp: 3.5, wind_speed: 3.2, rain: 97.6,
  },
  {
    location: '춘천', temp: 12.7, max_temp: 19.6, min_temp: 7.5, wind_speed: 1, rain: 49.3,
  },
  {
    location: '백령도', temp: 14.7, max_temp: 17.7, min_temp: 12.3, wind_speed: 3.9, rain: 31,
  },
  {
    location: '강릉', temp: 15.6, max_temp: 20.3, min_temp: 11.5, wind_speed: 2.5, rain: 113.9,
  },
  {
    location: '동해', temp: 15.1, max_temp: 19.7, min_temp: 10.7, wind_speed: 2.4, rain: 102.9,
  },
  {
    location: '서울', temp: 15, max_temp: 20.2, min_temp: 10.6, wind_speed: 2, rain: 52.2,
  },
  {
    location: '인천', temp: 15.3, max_temp: 19.9, min_temp: 11.4, wind_speed: 2.4, rain: 51.1,
  },
  {
    location: '원주', temp: 13.3, max_temp: 20, min_temp: 7.8, wind_speed: 0.8, rain: 52.7,
  },
  {
    location: '울릉도', temp: 15.4, max_temp: 18.8, min_temp: 13, wind_speed: 3.5, rain: 100.9,
  },
  {
    location: '수원', temp: 14.6, max_temp: 20.4, min_temp: 9.4, wind_speed: 1.4, rain: 54.1,
  },
  {
    location: '영월', temp: 12.6, max_temp: 20, min_temp: 7.1, wind_speed: 1.1, rain: 49.4,
  },
  {
    location: '충주', temp: 12.9, max_temp: 20.2, min_temp: 7.1, wind_speed: 1.2, rain: 56.7,
  },
  {
    location: '서산', temp: 14.1, max_temp: 20.5, min_temp: 8.6, wind_speed: 1.9, rain: 53,
  },
  {
    location: '울진', temp: 15.1, max_temp: 20.1, min_temp: 10.4, wind_speed: 3.1, rain: 97.3,
  },
  {
    location: '청주', temp: 14.6, max_temp: 20.7, min_temp: 9.4, wind_speed: 1.4, rain: 58,
  },
  {
    location: '대전', temp: 14.6, max_temp: 20.8, min_temp: 9.4, wind_speed: 1.4, rain: 59.3,
  },
  {
    location: '추풍령', temp: 13.1, max_temp: 19.7, min_temp: 7.5, wind_speed: 2, rain: 58.1,
  },
  {
    location: '안동', temp: 13.5, max_temp: 20.5, min_temp: 8, wind_speed: 1.2, rain: 46.5,
  },
  {
    location: '상주', temp: 13.8, max_temp: 20.8, min_temp: 8.3, wind_speed: 1.2, rain: 57.1,
  },
  {
    location: '포항', temp: 16.9, max_temp: 21.4, min_temp: 13.1, wind_speed: 2.5, rain: 76.7,
  },
  {
    location: '군산', temp: 15.3, max_temp: 20.5, min_temp: 10.9, wind_speed: 2.6, rain: 55.2,
  },
  {
    location: '울산', temp: 16.5, max_temp: 21.8, min_temp: 12.1, wind_speed: 1.9, rain: 74.8,
  },
  {
    location: '창원', temp: 17.3, max_temp: 22.2, min_temp: 13.3, wind_speed: 1.7, rain: 72.3,
  },
  {
    location: '광주', temp: 16.1, max_temp: 21.9, min_temp: 11.2, wind_speed: 1.6, rain: 59,
  },
  {
    location: '부산', temp: 17.9, max_temp: 22.5, min_temp: 14.5, wind_speed: 3.1, rain: 79.6,
  },
  {
    location: '통영', temp: 17.4, max_temp: 22.3, min_temp: 13.6, wind_speed: 2.3, rain: 76.4,
  },
  {
    location: '목포', temp: 16.6, max_temp: 21.5, min_temp: 12.7, wind_speed: 3.5, rain: 58.9,
  },
  {
    location: '여수', temp: 17.5, max_temp: 21.3, min_temp: 14.5, wind_speed: 4.1, rain: 66.6,
  },
  {
    location: '흑산도', temp: 16.9, max_temp: 19.4, min_temp: 15.1, wind_speed: 5.3, rain: 58.7,
  },
  {
    location: '완도', temp: 16.9, max_temp: 21.6, min_temp: 13, wind_speed: 2.9, rain: 73,
  },
  {
    location: '고창', temp: 14.8, max_temp: 21, min_temp: 9.5, wind_speed: 2.3, rain: 76.1,
  },
  {
    location: '제주', temp: 18.6, max_temp: 21.6, min_temp: 15.7, wind_speed: 3.1, rain: 95.1,
  },
  {
    location: '고산', temp: 18.5, max_temp: 21.4, min_temp: 15.9, wind_speed: 6.4, rain: 56.9,
  },
  {
    location: '성산', temp: 18.2, max_temp: 22, min_temp: 14.5, wind_speed: 3.1, rain: 114,
  },
  {
    location: '서귀포', temp: 19.6, max_temp: 23.5, min_temp: 16.4, wind_speed: 2.6, rain: 100.4,
  },
  {
    location: '진주', temp: 15, max_temp: 22.3, min_temp: 8.9, wind_speed: 1.1, rain: 68.3,
  },
  {
    location: '강화', temp: 13.7, max_temp: 19.5, min_temp: 8.1, wind_speed: 1.6, rain: 55.8,
  },
  {
    location: '양평', temp: 13, max_temp: 20.2, min_temp: 7.6, wind_speed: 1, rain: 47.1,
  },
  {
    location: '이천', temp: 13, max_temp: 20.4, min_temp: 7, wind_speed: 1, rain: 50.9,
  },
  {
    location: '인제', temp: 11.8, max_temp: 19.1, min_temp: 6.4, wind_speed: 1.5, rain: 44.8,
  },
  {
    location: '홍천', temp: 12, max_temp: 20, min_temp: 6.6, wind_speed: 0.9, rain: 49.7,
  },
  {
    location: '태백', temp: 10.5, max_temp: 16.8, min_temp: 5, wind_speed: 1.5, rain: 65.5,
  },
  {
    location: '정선군', temp: 12, max_temp: 19.1, min_temp: 7.3, wind_speed: 1.3, rain: 57.9,
  },
  {
    location: '제천', temp: 11.5, max_temp: 19.5, min_temp: 5.1, wind_speed: 1.2, rain: 57.4,
  },
  {
    location: '보은', temp: 12.2, max_temp: 20.1, min_temp: 6, wind_speed: 1, rain: 56.6,
  },
  {
    location: '천안', temp: 13.4, max_temp: 20.4, min_temp: 7.4, wind_speed: 1.4, rain: 55.5,
  },
  {
    location: '보령', temp: 15.1, max_temp: 20.7, min_temp: 10.1, wind_speed: 1.6, rain: 59.9,
  },
  {
    location: '부여', temp: 13.8, max_temp: 21.4, min_temp: 7.7, wind_speed: 1, rain: 63.6,
  },
  {
    location: '금산', temp: 12.8, max_temp: 20.8, min_temp: 6.9, wind_speed: 0.9, rain: 55.7,
  },
  {
    location: '부안', temp: 14.9, max_temp: 21.1, min_temp: 9.4, wind_speed: 1.3, rain: 56,
  },
  {
    location: '임실', temp: 12.5, max_temp: 20.6, min_temp: 6.2, wind_speed: 1, rain: 58.1,
  },
  {
    location: '정읍', temp: 15.1, max_temp: 21.3, min_temp: 9.8, wind_speed: 1.1, rain: 61,
  },
  {
    location: '남원', temp: 13.6, max_temp: 21.6, min_temp: 7.3, wind_speed: 1.2, rain: 63,
  },
  {
    location: '장수', temp: 11.6, max_temp: 19.6, min_temp: 5.3, wind_speed: 1.4, rain: 63.6,
  },
  {
    location: '영광군', temp: 15.2, max_temp: 21.2, min_temp: 9.9, wind_speed: 1.9, rain: 75,
  },
  {
    location: '김해시', temp: 17.4, max_temp: 23.1, min_temp: 13.1, wind_speed: 1.8, rain: 89.8,
  },
  {
    location: '순창군', temp: 14.2, max_temp: 21.3, min_temp: 8.5, wind_speed: 1.4, rain: 88.6,
  },
  {
    location: '양산시', temp: 17, max_temp: 22.8, min_temp: 12.3, wind_speed: 2.2, rain: 112.4,
  },
  {
    location: '강진군', temp: 15.7, max_temp: 22, min_temp: 10.4, wind_speed: 2.1, rain: 106.3,
  },
  {
    location: '장흥', temp: 15, max_temp: 22.2, min_temp: 8.8, wind_speed: 1.5, rain: 63.4,
  },
  {
    location: '해남', temp: 15.4, max_temp: 22, min_temp: 9, wind_speed: 1.9, rain: 65.1,
  },
  {
    location: '고흥', temp: 15.7, max_temp: 22.2, min_temp: 9.9, wind_speed: 1.3, rain: 66.8,
  },
  {
    location: '의령군', temp: 14.2, max_temp: 21.8, min_temp: 8.6, wind_speed: 1, rain: 109.7,
  },
  {
    location: '함양군', temp: 13.6, max_temp: 21.6, min_temp: 7.6, wind_speed: 0.8, rain: 115.6,
  },
  {
    location: '진도군', temp: 16.2, max_temp: 21.6, min_temp: 11.2, wind_speed: 1.9, rain: 76,
  },
  {
    location: '봉화', temp: 11.1, max_temp: 19.5, min_temp: 4.4, wind_speed: 1.2, rain: 48.1,
  },
  {
    location: '영주', temp: 12.9, max_temp: 20, min_temp: 6.7, wind_speed: 2.1, rain: 58.2,
  },
  {
    location: '문경', temp: 13, max_temp: 20, min_temp: 7.3, wind_speed: 1.5, rain: 58.8,
  },
  {
    location: '청송군', temp: 12.2, max_temp: 19.8, min_temp: 6.7, wind_speed: 1, rain: 83.8,
  },
  {
    location: '영덕', temp: 15, max_temp: 20.7, min_temp: 10.1, wind_speed: 2.5, rain: 86.2,
  },
  {
    location: '의성', temp: 12.7, max_temp: 21.4, min_temp: 6, wind_speed: 0.9, rain: 41.5,
  },
  {
    location: '구미', temp: 14.2, max_temp: 21.2, min_temp: 8.6, wind_speed: 1.2, rain: 53.3,
  },
  {
    location: '영천', temp: 14.1, max_temp: 21.5, min_temp: 7.9, wind_speed: 1.4, rain: 48.6,
  },
  {
    location: '경주시', temp: 14.8, max_temp: 21.6, min_temp: 9.3, wind_speed: 2, rain: 108.2,
  },
  {
    location: '거창', temp: 12.8, max_temp: 21, min_temp: 6.4, wind_speed: 1.1, rain: 60.8,
  },
  {
    location: '합천', temp: 14.5, max_temp: 22.3, min_temp: 8.7, wind_speed: 1, rain: 64.5,
  },
  {
    location: '밀양', temp: 15.2, max_temp: 22.6, min_temp: 9, wind_speed: 1.1, rain: 53.3,
  },
  {
    location: '산청', temp: 14.1, max_temp: 21.7, min_temp: 8.5, wind_speed: 1.2, rain: 74.2,
  },
  {
    location: '거제', temp: 16.7, max_temp: 22, min_temp: 12.2, wind_speed: 1.3, rain: 96.4,
  },
  {
    location: '남해', temp: 16.6, max_temp: 21.9, min_temp: 12.3, wind_speed: 1.5, rain: 95.9,
  },
  {
    location: '강남', temp: 15.8, max_temp: 20.6, min_temp: 11.8, wind_speed: 1.5, rain: 51.1,
  },
  {
    location: '서초', temp: 15.8, max_temp: 21, min_temp: 11.5, wind_speed: 1.2, rain: 45.5,
  },
  {
    location: '강동', temp: 14.8, max_temp: 20.5, min_temp: 9.9, wind_speed: 1.2, rain: 50.5,
  },
  {
    location: '송파', temp: 16, max_temp: 20.9, min_temp: 11.7, wind_speed: 1.5, rain: 46.2,
  },
  {
    location: '강서', temp: 15.3, max_temp: 20.2, min_temp: 11.1, wind_speed: 1.5, rain: 44.5,
  },
  {
    location: '양천', temp: 16.2, max_temp: 20.8, min_temp: 12.2, wind_speed: 1.2, rain: 44.7,
  },
  {
    location: '도봉', temp: 14, max_temp: 20.4, min_temp: 8.7, wind_speed: 0.8, rain: 53.2,
  },
  {
    location: '노원', temp: 13.5, max_temp: 20.3, min_temp: 7.4, wind_speed: 1.2, rain: 49.6,
  },
  {
    location: '동대문', temp: 15.8, max_temp: 20.9, min_temp: 11.4, wind_speed: 1.6, rain: 48.5,
  },
  {
    location: '중랑', temp: 15.7, max_temp: 20.5, min_temp: 11.4, wind_speed: 1.9, rain: 49.5,
  },
  {
    location: '기상청', temp: 15.9, max_temp: 20.5, min_temp: 11.7, wind_speed: 1.3, rain: 45.8,
  },
  {
    location: '마포', temp: 15.9, max_temp: 20.5, min_temp: 12, wind_speed: 2, rain: 47.1,
  },
  {
    location: '서대문', temp: 14.6, max_temp: 20.5, min_temp: 9.9, wind_speed: 1.4, rain: 46.2,
  },
  {
    location: '광진', temp: 15.6, max_temp: 20.6, min_temp: 11.3, wind_speed: 1.5, rain: 48.1,
  },
  {
    location: '성북', temp: 14.7, max_temp: 19.7, min_temp: 10.5, wind_speed: 1.4, rain: 47.6,
  },
  {
    location: '용산', temp: 15.9, max_temp: 20.7, min_temp: 11.8, wind_speed: 1.5, rain: 45.9,
  },
  {
    location: '은평', temp: 14.3, max_temp: 20.1, min_temp: 9.2, wind_speed: 1.4, rain: 41.1,
  },
  {
    location: '금천', temp: 15.8, max_temp: 20.3, min_temp: 12.2, wind_speed: 1.7, rain: 48.7,
  },
  {
    location: '중구', temp: 14.3, max_temp: 19.1, min_temp: 10.5, wind_speed: 2.2, rain: 39.1,
  },
  {
    location: '성동', temp: 16.1, max_temp: 20.6, min_temp: 12.2, wind_speed: 1.9, rain: 46.9,
  },
  {
    location: '구로', temp: 15, max_temp: 20.4, min_temp: 10.4, wind_speed: 1.6, rain: 48.6,
  },
  {
    location: '강북', temp: 15.6, max_temp: 20.7, min_temp: 11.1, wind_speed: 1.5, rain: 50.4,
  },
  {
    location: '남현', temp: 14.3, max_temp: 19.4, min_temp: 9.8, wind_speed: 1.2, rain: 63.6,
  },
  {
    location: '부천', temp: 15.9, max_temp: 20.7, min_temp: 11.4, wind_speed: 1, rain: 46.9,
  },
  {
    location: '안양', temp: 15.5, max_temp: 20.1, min_temp: 11.5, wind_speed: 1.9, rain: 50.7,
  },
  {
    location: '광명', temp: 16.3, max_temp: 20.7, min_temp: 12.6, wind_speed: 1.7, rain: 47.9,
  },
  {
    location: '군포', temp: 15.7, max_temp: 20.5, min_temp: 11.7, wind_speed: 1.2, rain: 49.9,
  },
  {
    location: '김포', temp: 14.2, max_temp: 19.9, min_temp: 9.5, wind_speed: 1.2, rain: 39,
  },
  {
    location: '하남', temp: 14.2, max_temp: 21, min_temp: 9.2, wind_speed: 0.7, rain: 34.5,
  },
  {
    location: '의왕', temp: 13.9, max_temp: 19.5, min_temp: 8.9, wind_speed: 0.9, rain: 50.9,
  },
  {
    location: '포천', temp: 12.7, max_temp: 20.3, min_temp: 6.6, wind_speed: 1.1, rain: 56.1,
  },
  {
    location: '가평조종', temp: 11.2, max_temp: 19.3, min_temp: 5.2, wind_speed: 0.9, rain: 52.1,
  },
  {
    location: '영등포', temp: 16.3, max_temp: 20.9, min_temp: 12.7, wind_speed: 1.4, rain: 50.7,
  },
  {
    location: '인천연수', temp: 15.5, max_temp: 20.7, min_temp: 10.8, wind_speed: 1.5, rain: 45.9,
  },
  {
    location: '안성', temp: 14.3, max_temp: 20.8, min_temp: 8.8, wind_speed: 1, rain: 50.7,
  },
  {
    location: '간성', temp: 14.1, max_temp: 19.4, min_temp: 9, wind_speed: 1.6, rain: 95.9,
  },
  {
    location: '평창', temp: 11.6, max_temp: 19.2, min_temp: 6.1, wind_speed: 1, rain: 49.7,
  },
  {
    location: '의정부', temp: 13.3, max_temp: 20, min_temp: 7.5, wind_speed: 0.8, rain: 54.3,
  },
  {
    location: '횡성', temp: 12.4, max_temp: 20.4, min_temp: 6.5, wind_speed: 1, rain: 55.1,
  },
  {
    location: '고양', temp: 13.8, max_temp: 20.8, min_temp: 7.8, wind_speed: 1.1, rain: 44.9,
  },
  {
    location: '남양주', temp: 12.7, max_temp: 20.5, min_temp: 6.5, wind_speed: 0.9, rain: 53.1,
  },
  {
    location: '안산', temp: 13.5, max_temp: 20.4, min_temp: 7.3, wind_speed: 1.4, rain: 47.3,
  },
  {
    location: '경기광주', temp: 13.3, max_temp: 20, min_temp: 8.2, wind_speed: 1.4, rain: 55.9,
  },
  {
    location: '여주', temp: 12.9, max_temp: 20, min_temp: 7.4, wind_speed: 1, rain: 48.2,
  },
  {
    location: '용인', temp: 12.9, max_temp: 20.1, min_temp: 7.4, wind_speed: 1.1, rain: 50.1,
  },
  {
    location: '오산', temp: 14.1, max_temp: 20.7, min_temp: 8.8, wind_speed: 1, rain: 52.7,
  },
  {
    location: '평택', temp: 14.9, max_temp: 21, min_temp: 9.3, wind_speed: 1.4, rain: 53.6,
  },
  {
    location: '화천', temp: 11.8, max_temp: 20.1, min_temp: 6.3, wind_speed: 1, rain: 42.1,
  },
  {
    location: '양구', temp: 11.3, max_temp: 19.7, min_temp: 5.9, wind_speed: 0.9, rain: 42.5,
  },
  {
    location: '시흥', temp: 15.1, max_temp: 20.5, min_temp: 10, wind_speed: 1.4, rain: 47.5,
  },
  {
    location: '구리', temp: 14.5, max_temp: 20.5, min_temp: 9.6, wind_speed: 1.2, rain: 48.6,
  },
  {
    location: '금곡', temp: 14.3, max_temp: 20, min_temp: 9.5, wind_speed: 1.1, rain: 37.8,
  },
  {
    location: '화성', temp: 14.7, max_temp: 20.3, min_temp: 10, wind_speed: 1.1, rain: 46,
  },
  {
    location: '성남', temp: 14.9, max_temp: 20.5, min_temp: 10, wind_speed: 1, rain: 45.9,
  },
  {
    location: '과천', temp: 14.2, max_temp: 20.5, min_temp: 8.9, wind_speed: 1.4, rain: 45.3,
  },
  {
    location: '진부령', temp: 10.7, max_temp: 16.2, min_temp: 5.9, wind_speed: 2.6, rain: 85,
  },
  {
    location: '양주', temp: 12.7, max_temp: 20.3, min_temp: 6.3, wind_speed: 0.9, rain: 47.4,
  },
  {
    location: '단양', temp: 13, max_temp: 20.1, min_temp: 8.2, wind_speed: 0.8, rain: 48.8,
  },
  {
    location: '진천', temp: 13, max_temp: 20.6, min_temp: 7.3, wind_speed: 1, rain: 62.4,
  },
  {
    location: '괴산', temp: 12.3, max_temp: 20.2, min_temp: 6.6, wind_speed: 0.8, rain: 60.6,
  },
  {
    location: '옥천', temp: 13.1, max_temp: 20.5, min_temp: 7.7, wind_speed: 0.8, rain: 56.4,
  },
  {
    location: '홍북', temp: 13.8, max_temp: 20.5, min_temp: 8, wind_speed: 1.3, rain: 62.3,
  },
  {
    location: '세종연서', temp: 13, max_temp: 20.8, min_temp: 7.3, wind_speed: 1, rain: 58.4,
  },
  {
    location: '공주', temp: 13.9, max_temp: 21, min_temp: 8.2, wind_speed: 1.1, rain: 61,
  },
  {
    location: '서천', temp: 14.3, max_temp: 20.9, min_temp: 8.6, wind_speed: 1.4, rain: 60.1,
  },
  {
    location: '논산', temp: 13.9, max_temp: 21.4, min_temp: 7.7, wind_speed: 1.2, rain: 55.4,
  },
  {
    location: '당진', temp: 14, max_temp: 20.1, min_temp: 8.7, wind_speed: 1.6, rain: 53.1,
  },
  {
    location: '청양', temp: 13, max_temp: 20.5, min_temp: 6.6, wind_speed: 1, rain: 65.1,
  },
  {
    location: '음성', temp: 12, max_temp: 20.5, min_temp: 5.6, wind_speed: 1.1, rain: 56.2,
  },
  {
    location: '증평', temp: 13, max_temp: 20.6, min_temp: 7.1, wind_speed: 1, rain: 57.4,
  },
  {
    location: '태안', temp: 15.5, max_temp: 20.5, min_temp: 11.2, wind_speed: 1.6, rain: 55.6,
  },
  {
    location: '예산', temp: 14.3, max_temp: 20.9, min_temp: 8.7, wind_speed: 1.6, rain: 52.7,
  },
  {
    location: '아산', temp: 14.5, max_temp: 20.5, min_temp: 9.1, wind_speed: 1.6, rain: 46.9,
  },
  {
    location: '계룡', temp: 13, max_temp: 20.6, min_temp: 6.6, wind_speed: 0.8, rain: 59.8,
  },
  {
    location: '문화', temp: 15.2, max_temp: 21.4, min_temp: 10.2, wind_speed: 0.9, rain: 61.3,
  },
  {
    location: '세천', temp: 13.6, max_temp: 20.7, min_temp: 8, wind_speed: 0.8, rain: 54.6,
  },
  {
    location: '장동', temp: 13.8, max_temp: 20.8, min_temp: 8.4, wind_speed: 0.8, rain: 54,
  },
  {
    location: '부평', temp: 14, max_temp: 20.5, min_temp: 8.3, wind_speed: 0.5, rain: 52.5,
  },
  {
    location: '연천청산', temp: 12.9, max_temp: 20.4, min_temp: 6.9, wind_speed: 0.9, rain: 52.9,
  },
  {
    location: '양양', temp: 15, max_temp: 19.8, min_temp: 10.6, wind_speed: 2.2, rain: 87.6,
  },
  {
    location: '사북', temp: 10.3, max_temp: 15.5, min_temp: 5.8, wind_speed: 2.3, rain: 86,
  },
  {
    location: '무안', temp: 15.5, max_temp: 21.2, min_temp: 10.4, wind_speed: 1.7, rain: 72.3,
  },
  {
    location: '무주', temp: 12.7, max_temp: 20.3, min_temp: 6.9, wind_speed: 1.1, rain: 56.3,
  },
  {
    location: '익산', temp: 14.9, max_temp: 21.4, min_temp: 9.1, wind_speed: 1.3, rain: 48.5,
  },
  {
    location: '진안', temp: 12.1, max_temp: 19.8, min_temp: 6.3, wind_speed: 1.3, rain: 61.5,
  },
  {
    location: '담양', temp: 14.8, max_temp: 21.9, min_temp: 9.1, wind_speed: 1.6, rain: 64,
  },
  {
    location: '광산', temp: 15.4, max_temp: 22.2, min_temp: 9.4, wind_speed: 1.6, rain: 58.4,
  },
  {
    location: '구례', temp: 14.6, max_temp: 22.6, min_temp: 8.7, wind_speed: 1, rain: 60.9,
  },
  {
    location: '나주', temp: 15.2, max_temp: 22.4, min_temp: 9.5, wind_speed: 1.3, rain: 66.6,
  },
  {
    location: '순천시', temp: 16.9, max_temp: 22.5, min_temp: 12.5, wind_speed: 1.9, rain: 67.2,
  },
  {
    location: '광양읍', temp: 16.3, max_temp: 22.9, min_temp: 10.9, wind_speed: 1.4, rain: 66,
  },
  {
    location: '조선대', temp: 16.1, max_temp: 22, min_temp: 11.4, wind_speed: 1.7, rain: 64.3,
  },
  {
    location: '거문도', temp: 18.7, max_temp: 21.5, min_temp: 16.8, wind_speed: 3.8, rain: 76.8,
  },
  {
    location: '추자도', temp: 18.4, max_temp: 21, min_temp: 16.4, wind_speed: 3.8, rain: 57.9,
  },
  {
    location: '장성', temp: 14.5, max_temp: 21.7, min_temp: 9, wind_speed: 1.2, rain: 64.9,
  },
  {
    location: '영암', temp: 15.4, max_temp: 22.1, min_temp: 9.7, wind_speed: 1.5, rain: 61.6,
  },
  {
    location: '보성', temp: 14.1, max_temp: 21.4, min_temp: 8.1, wind_speed: 1.3, rain: 74.5,
  },
  {
    location: '완주', temp: 14.5, max_temp: 21.8, min_temp: 8.6, wind_speed: 1.4, rain: 50.9,
  },
  {
    location: '김제', temp: 15.3, max_temp: 21.6, min_temp: 10.1, wind_speed: 1.8, rain: 52.4,
  },
  {
    location: '화순', temp: 15, max_temp: 22.4, min_temp: 9.3, wind_speed: 0.9, rain: 62.8,
  },
  {
    location: '함평', temp: 15.7, max_temp: 22.2, min_temp: 10.2, wind_speed: 1.4, rain: 71.8,
  },
  {
    location: '곡성', temp: 14.3, max_temp: 21.9, min_temp: 8.7, wind_speed: 1, rain: 63.8,
  },
  {
    location: '성판악', temp: 12.8, max_temp: 16.6, min_temp: 9.3, wind_speed: 2.7, rain: 237.2,
  },
  {
    location: '풍암', temp: 16, max_temp: 22.8, min_temp: 10.6, wind_speed: 1, rain: 64.6,
  },
  {
    location: '압해도', temp: 16.7, max_temp: 21.3, min_temp: 12.7, wind_speed: 2.8, rain: 69.2,
  },
  {
    location: '영양', temp: 12.6, max_temp: 19.9, min_temp: 7.2, wind_speed: 1.3, rain: 50.4,
  },
  {
    location: '성주', temp: 14.3, max_temp: 21.6, min_temp: 8.4, wind_speed: 1, rain: 63.1,
  },
  {
    location: '고령', temp: 13.9, max_temp: 21.8, min_temp: 8, wind_speed: 0.7, rain: 65,
  },
  {
    location: '청도', temp: 14.1, max_temp: 21.9, min_temp: 8.2, wind_speed: 1.1, rain: 54.1,
  },
  {
    location: '예천', temp: 12.9, max_temp: 21, min_temp: 7, wind_speed: 1, rain: 47.7,
  },
  {
    location: '김천', temp: 13.8, max_temp: 21.4, min_temp: 7.7, wind_speed: 0.9, rain: 60.5,
  },
  {
    location: '군위', temp: 12.8, max_temp: 21, min_temp: 7, wind_speed: 1.2, rain: 51.8,
  },
  {
    location: '칠곡', temp: 14.5, max_temp: 21.9, min_temp: 8.7, wind_speed: 1.4, rain: 54,
  },
  {
    location: '경산', temp: 15.7, max_temp: 22.2, min_temp: 10.5, wind_speed: 1.5, rain: 53.8,
  },
  {
    location: '달성', temp: 15.6, max_temp: 22.5, min_temp: 10.4, wind_speed: 1.4, rain: 55,
  },
  {
    location: '서구', temp: 16.2, max_temp: 21.8, min_temp: 11.4, wind_speed: 1.5, rain: 57.4,
  },
  {
    location: '대구', temp: 16.2, max_temp: 22, min_temp: 11.4, wind_speed: 1.8, rain: 50.1,
  },
  {
    location: '전주', temp: 15.4, max_temp: 21.7, min_temp: 10.1, wind_speed: 1.4, rain: 57.3,
  },
  {
    location: '삼척', temp: 15.5, max_temp: 20, min_temp: 11.4, wind_speed: 1.9, rain: 111.3,
  },
  {
    location: '울기', temp: 17.6, max_temp: 21.3, min_temp: 14.7, wind_speed: 2.4, rain: 76.1,
  },
  {
    location: '삼천포', temp: 17.6, max_temp: 22.2, min_temp: 13.7, wind_speed: 1.9, rain: 77.4,
  },
  {
    location: '영도', temp: 17.5, max_temp: 21.2, min_temp: 14.7, wind_speed: 3.3, rain: 77.1,
  },
  {
    location: '고성', temp: 16.4, max_temp: 22.8, min_temp: 10.8, wind_speed: 1.7, rain: 81.5,
  },
  {
    location: '창녕', temp: 15, max_temp: 22.7, min_temp: 8.8, wind_speed: 1.5, rain: 59.9,
  },
  {
    location: '함안', temp: 14.4, max_temp: 22.9, min_temp: 8.3, wind_speed: 0.9, rain: 69.1,
  },
  {
    location: '가덕도', temp: 17.9, max_temp: 21.9, min_temp: 15.1, wind_speed: 3.6, rain: 66.3,
  },
  {
    location: '기장', temp: 16.9, max_temp: 21.9, min_temp: 12.3, wind_speed: 1.9, rain: 79.9,
  },
  {
    location: '간절곶', temp: 17.8, max_temp: 21.2, min_temp: 14.4, wind_speed: 3.8, rain: 80.8,
  },
  {
    location: '하동', temp: 16.3, max_temp: 23, min_temp: 10.9, wind_speed: 1.4, rain: 74.3,
  },
  {
    location: '해운대', temp: 17.9, max_temp: 22.5, min_temp: 14.3, wind_speed: 2.1, rain: 94.4,
  },
  {
    location: '부산진', temp: 17.6, max_temp: 22.2, min_temp: 13.9, wind_speed: 1.9, rain: 83.6,
  },
  {
    location: '동래', temp: 17.5, max_temp: 22.5, min_temp: 13.4, wind_speed: 1.6, rain: 77.1,
  },
  {
    location: '북구', temp: 16.9, max_temp: 21.8, min_temp: 12.9, wind_speed: 1.8, rain: 77.1,
  },
  {
    location: '부산남구', temp: 18.2, max_temp: 22.2, min_temp: 14.8, wind_speed: 2, rain: 86.4,
  },
  {
    location: '정자', temp: 16.9, max_temp: 21.7, min_temp: 12.3, wind_speed: 3.4, rain: 80.6,
  }],
  [{
    location: '속초', temp: 8.8, max_temp: 13.1, min_temp: 4.7, wind_speed: 2.4, rain: 92,
  },
  {
    location: '철원', temp: 4.3, max_temp: 10.5, min_temp: -1.2, wind_speed: 1.4, rain: 48.1,
  },
  {
    location: '동두천', temp: 5.7, max_temp: 12.2, min_temp: 0.5, wind_speed: 1.4, rain: 47.4,
  },
  {
    location: '파주', temp: 5.2, max_temp: 11.6, min_temp: -0.4, wind_speed: 1.5, rain: 52.7,
  },
  {
    location: '대관령', temp: 2.3, max_temp: 7.5, min_temp: -2.6, wind_speed: 4.3, rain: 69.4,
  },
  {
    location: '춘천', temp: 5.3, max_temp: 11.2, min_temp: 0.4, wind_speed: 1.1, rain: 48.3,
  },
  {
    location: '백령도', temp: 7.9, max_temp: 10.6, min_temp: 5.5, wind_speed: 4.7, rain: 41.9,
  },
  {
    location: '강릉', temp: 9.5, max_temp: 14, min_temp: 5.6, wind_speed: 2.8, rain: 81.1,
  },
  {
    location: '동해', temp: 9.3, max_temp: 13.7, min_temp: 5, wind_speed: 2.5, rain: 71.6,
  },
  {
    location: '서울', temp: 7.5, max_temp: 11.9, min_temp: 3.5, wind_speed: 2.2, rain: 51.1,
  },
  {
    location: '인천', temp: 7.9, max_temp: 12, min_temp: 4.3, wind_speed: 2.9, rain: 50.8,
  },
  {
    location: '원주', temp: 6, max_temp: 12, min_temp: 1, wind_speed: 0.9, rain: 42.1,
  },
  {
    location: '울릉도', temp: 9.9, max_temp: 13.2, min_temp: 7.4, wind_speed: 3.6, rain: 116.9,
  },
  {
    location: '수원', temp: 7.2, max_temp: 12.5, min_temp: 2.4, wind_speed: 1.5, rain: 48.9,
  },
  {
    location: '영월', temp: 5.3, max_temp: 11.9, min_temp: -0.1, wind_speed: 1.1, rain: 37.4,
  },
  {
    location: '충주', temp: 5.7, max_temp: 12.3, min_temp: 0.3, wind_speed: 1.4, rain: 39.4,
  },
  {
    location: '서산', temp: 7.4, max_temp: 13, min_temp: 2.2, wind_speed: 2.1, rain: 54.1,
  },
  {
    location: '울진', temp: 9.3, max_temp: 14.5, min_temp: 4.4, wind_speed: 3.3, rain: 61,
  },
  {
    location: '청주', temp: 7.5, max_temp: 13, min_temp: 2.6, wind_speed: 1.3, rain: 46.6,
  },
  {
    location: '대전', temp: 7.7, max_temp: 13.5, min_temp: 2.8, wind_speed: 1.4, rain: 48,
  },
  {
    location: '추풍령', temp: 6.6, max_temp: 12.5, min_temp: 1.3, wind_speed: 2.5, rain: 43,
  },
  {
    location: '안동', temp: 6.4, max_temp: 13, min_temp: 1, wind_speed: 1.4, rain: 30.9,
  },
  {
    location: '상주', temp: 7.2, max_temp: 13.1, min_temp: 2.1, wind_speed: 1.6, rain: 35.2,
  },
  {
    location: '포항', temp: 10.6, max_temp: 15.4, min_temp: 6.6, wind_speed: 2.5, rain: 40.1,
  },
  {
    location: '군산', temp: 8.7, max_temp: 13.4, min_temp: 4.6, wind_speed: 2.8, rain: 53.9,
  },
  {
    location: '울산', temp: 10.4, max_temp: 15.9, min_temp: 5.7, wind_speed: 1.9, rain: 44.2,
  },
  {
    location: '창원', temp: 10.9, max_temp: 15.6, min_temp: 6.8, wind_speed: 1.7, rain: 47.9,
  },
  {
    location: '광주', temp: 9.6, max_temp: 15, min_temp: 5, wind_speed: 1.6, rain: 50.2,
  },
  {
    location: '부산', temp: 11.9, max_temp: 16.6, min_temp: 8.3, wind_speed: 3.1, rain: 50.4,
  },
  {
    location: '통영', temp: 11.3, max_temp: 16.2, min_temp: 7.3, wind_speed: 2.3, rain: 48.6,
  },
  {
    location: '목포', temp: 10.4, max_temp: 14.9, min_temp: 6.6, wind_speed: 3.8, rain: 48.9,
  },
  {
    location: '여수', temp: 11.3, max_temp: 15.1, min_temp: 8.2, wind_speed: 4.1, rain: 46.8,
  },
  {
    location: '흑산도', temp: 11.5, max_temp: 14, min_temp: 9.5, wind_speed: 6, rain: 46.1,
  },
  {
    location: '완도', temp: 10.8, max_temp: 15.2, min_temp: 7, wind_speed: 3.2, rain: 62.7,
  },
  {
    location: '고창', temp: 9.1, max_temp: 14.4, min_temp: 4.2, wind_speed: 2.7, rain: 59.1,
  },
  {
    location: '제주', temp: 13.3, max_temp: 16.4, min_temp: 10.4, wind_speed: 3.4, rain: 69.5,
  },
  {
    location: '고산', temp: 13.5, max_temp: 16.4, min_temp: 10.9, wind_speed: 7.5, rain: 60.2,
  },
  {
    location: '성산', temp: 12.7, max_temp: 16.7, min_temp: 8.8, wind_speed: 3, rain: 102.8,
  },
  {
    location: '서귀포', temp: 14.6, max_temp: 18.4, min_temp: 11.2, wind_speed: 2.4, rain: 86.2,
  },
  {
    location: '진주', temp: 8.2, max_temp: 15.6, min_temp: 2, wind_speed: 1.1, rain: 44.7,
  },
  {
    location: '강화', temp: 6.3, max_temp: 11.5, min_temp: 1.2, wind_speed: 1.7, rain: 46.3,
  },
  {
    location: '양평', temp: 5.7, max_temp: 11.9, min_temp: 0.6, wind_speed: 1.2, rain: 46.4,
  },
  {
    location: '이천', temp: 5.8, max_temp: 12.1, min_temp: 0.2, wind_speed: 1.1, rain: 45.1,
  },
  {
    location: '인제', temp: 4.8, max_temp: 11, min_temp: -0.4, wind_speed: 1.6, rain: 40.9,
  },
  {
    location: '홍천', temp: 4.6, max_temp: 11.5, min_temp: -0.6, wind_speed: 0.9, rain: 40.9,
  },
  {
    location: '태백', temp: 4.2, max_temp: 9.9, min_temp: -0.9, wind_speed: 1.6, rain: 45.2,
  },
  {
    location: '정선군', temp: 5.3, max_temp: 11.4, min_temp: 0.7, wind_speed: 1.7, rain: 47.3,
  },
  {
    location: '제천', temp: 4.4, max_temp: 11.4, min_temp: -1.6, wind_speed: 1.3, rain: 43.4,
  },
  {
    location: '보은', temp: 5.6, max_temp: 12.8, min_temp: -0.3, wind_speed: 1.3, rain: 45.2,
  },
  {
    location: '천안', temp: 6.5, max_temp: 12.8, min_temp: 1, wind_speed: 1.6, rain: 47.6,
  },
  {
    location: '보령', temp: 8.6, max_temp: 13.7, min_temp: 4.1, wind_speed: 1.8, rain: 53.7,
  },
  {
    location: '부여', temp: 6.9, max_temp: 13.8, min_temp: 1.4, wind_speed: 1, rain: 51.8,
  },
  {
    location: '금산', temp: 6.1, max_temp: 13.6, min_temp: 0.2, wind_speed: 1, rain: 47.2,
  },
  {
    location: '부안', temp: 8.5, max_temp: 14.1, min_temp: 3.5, wind_speed: 1.4, rain: 52.3,
  },
  {
    location: '임실', temp: 6, max_temp: 13.4, min_temp: -0.1, wind_speed: 1.2, rain: 50.7,
  },
  {
    location: '정읍', temp: 8.6, max_temp: 14.2, min_temp: 3.7, wind_speed: 1.1, rain: 55.6,
  },
  {
    location: '남원', temp: 6.9, max_temp: 14.4, min_temp: 0.9, wind_speed: 1.2, rain: 45.3,
  },
  {
    location: '장수', temp: 5.4, max_temp: 12.5, min_temp: -0.6, wind_speed: 1.5, rain: 52.1,
  },
  {
    location: '영광군', temp: 8.8, max_temp: 14.3, min_temp: 3.8, wind_speed: 2.2, rain: 57.3,
  },
  {
    location: '김해시', temp: 11, max_temp: 16.5, min_temp: 6.5, wind_speed: 2, rain: 47,
  },
  {
    location: '순창군', temp: 7.6, max_temp: 14.1, min_temp: 2.2, wind_speed: 1.5, rain: 59.2,
  },
  {
    location: '양산시', temp: 10.7, max_temp: 16.6, min_temp: 5.5, wind_speed: 2, rain: 52.2,
  },
  {
    location: '강진군', temp: 9.6, max_temp: 15.6, min_temp: 4.5, wind_speed: 2.3, rain: 64.9,
  },
  {
    location: '장흥', temp: 8.7, max_temp: 15.5, min_temp: 2.8, wind_speed: 1.8, rain: 54.8,
  },
  {
    location: '해남', temp: 9.3, max_temp: 15.4, min_temp: 3.3, wind_speed: 2, rain: 51.1,
  },
  {
    location: '고흥', temp: 9.4, max_temp: 15.7, min_temp: 3.6, wind_speed: 1.5, rain: 51.4,
  },
  {
    location: '의령군', temp: 8.1, max_temp: 15.6, min_temp: 2.3, wind_speed: 1.1, rain: 48.1,
  },
  {
    location: '함양군', temp: 7.8, max_temp: 15, min_temp: 1.9, wind_speed: 1.2, rain: 50.9,
  },
  {
    location: '진도군', temp: 10.2, max_temp: 15.3, min_temp: 5.3, wind_speed: 2.2, rain: 52.1,
  },
  {
    location: '봉화', temp: 4.2, max_temp: 12.1, min_temp: -2.2, wind_speed: 1.2, rain: 33.2,
  },
  {
    location: '영주', temp: 6.1, max_temp: 12.2, min_temp: 0.4, wind_speed: 2.6, rain: 42.2,
  },
  {
    location: '문경', temp: 6.4, max_temp: 12.4, min_temp: 1.1, wind_speed: 1.8, rain: 40.9,
  },
  {
    location: '청송군', temp: 5.8, max_temp: 13, min_temp: 0.2, wind_speed: 1.3, rain: 37.6,
  },
  {
    location: '영덕', temp: 9.2, max_temp: 14.6, min_temp: 4.2, wind_speed: 2.7, rain: 49.8,
  },
  {
    location: '의성', temp: 5.5, max_temp: 14, min_temp: -1.2, wind_speed: 1, rain: 30.5,
  },
  {
    location: '구미', temp: 7.4, max_temp: 13.9, min_temp: 2, wind_speed: 1.3, rain: 32.8,
  },
  {
    location: '영천', temp: 7.3, max_temp: 14.6, min_temp: 1.1, wind_speed: 1.7, rain: 31.6,
  },
  {
    location: '경주시', temp: 8.7, max_temp: 15.3, min_temp: 3, wind_speed: 2.3, rain: 37.8,
  },
  {
    location: '거창', temp: 6.5, max_temp: 14.3, min_temp: 0.1, wind_speed: 1.2, rain: 37.8,
  },
  {
    location: '합천', temp: 7.8, max_temp: 15.6, min_temp: 2, wind_speed: 1, rain: 34.7,
  },
  {
    location: '밀양', temp: 8.4, max_temp: 15.9, min_temp: 2.1, wind_speed: 1.1, rain: 40.1,
  },
  {
    location: '산청', temp: 7.9, max_temp: 15, min_temp: 2.3, wind_speed: 1.6, rain: 43.6,
  },
  {
    location: '거제', temp: 10.6, max_temp: 15.7, min_temp: 6.1, wind_speed: 1.4, rain: 59,
  },
  {
    location: '남해', temp: 10.4, max_temp: 15.4, min_temp: 5.9, wind_speed: 1.6, rain: 62.9,
  },
  {
    location: '강남', temp: 8.1, max_temp: 12.3, min_temp: 4.6, wind_speed: 1.5, rain: 49.7,
  },
  {
    location: '서초', temp: 8.2, max_temp: 12.6, min_temp: 4.4, wind_speed: 1.3, rain: 50.5,
  },
  {
    location: '강동', temp: 7.2, max_temp: 12.2, min_temp: 2.9, wind_speed: 1.3, rain: 43.7,
  },
  {
    location: '송파', temp: 8.5, max_temp: 12.8, min_temp: 4.7, wind_speed: 1.6, rain: 47.5,
  },
  {
    location: '강서', temp: 7.7, max_temp: 11.7, min_temp: 3.9, wind_speed: 1.6, rain: 46.7,
  },
  {
    location: '양천', temp: 8.3, max_temp: 12.4, min_temp: 4.7, wind_speed: 1.3, rain: 46.4,
  },
  {
    location: '도봉', temp: 6.7, max_temp: 12.1, min_temp: 1.8, wind_speed: 1, rain: 51.4,
  },
  {
    location: '노원', temp: 6.2, max_temp: 12.1, min_temp: 0.7, wind_speed: 1.4, rain: 46.6,
  },
  {
    location: '동대문', temp: 8.2, max_temp: 12.6, min_temp: 4.4, wind_speed: 1.6, rain: 48.2,
  },
  {
    location: '중랑', temp: 8.1, max_temp: 12.2, min_temp: 4.2, wind_speed: 1.8, rain: 44.3,
  },
  {
    location: '기상청', temp: 8.2, max_temp: 12.3, min_temp: 4.5, wind_speed: 1.3, rain: 48.4,
  },
  {
    location: '마포', temp: 8.3, max_temp: 12.2, min_temp: 4.6, wind_speed: 2.1, rain: 43.8,
  },
  {
    location: '서대문', temp: 7, max_temp: 12.2, min_temp: 2.9, wind_speed: 1.6, rain: 45.2,
  },
  {
    location: '광진', temp: 8.1, max_temp: 12.4, min_temp: 4.2, wind_speed: 1.6, rain: 47.3,
  },
  {
    location: '성북', temp: 7.2, max_temp: 11.3, min_temp: 3.2, wind_speed: 1.4, rain: 47.7,
  },
  {
    location: '용산', temp: 8.2, max_temp: 12.2, min_temp: 4.4, wind_speed: 1.5, rain: 51.5,
  },
  {
    location: '은평', temp: 7, max_temp: 11.9, min_temp: 2.4, wind_speed: 1.6, rain: 43.5,
  },
  {
    location: '금천', temp: 8.5, max_temp: 12.2, min_temp: 5, wind_speed: 1.7, rain: 46.7,
  },
  {
    location: '중구', temp: 6.4, max_temp: 10.7, min_temp: 3, wind_speed: 2.5, rain: 40.9,
  },
  {
    location: '성동', temp: 8.6, max_temp: 12.3, min_temp: 5, wind_speed: 2, rain: 46.2,
  },
  {
    location: '구로', temp: 7.5, max_temp: 12.1, min_temp: 3.3, wind_speed: 1.8, rain: 54.2,
  },
  {
    location: '강북', temp: 8, max_temp: 12.3, min_temp: 4.1, wind_speed: 1.6, rain: 55.7,
  },
  {
    location: '남현', temp: 7.4, max_temp: 11.6, min_temp: 3.4, wind_speed: 1.3, rain: 78.4,
  },
  {
    location: '부천', temp: 8.4, max_temp: 12.5, min_temp: 4.4, wind_speed: 1.1, rain: 58.4,
  },
  {
    location: '안양', temp: 8, max_temp: 11.9, min_temp: 4.2, wind_speed: 2.1, rain: 58.3,
  },
  {
    location: '광명', temp: 8.8, max_temp: 12.5, min_temp: 5.2, wind_speed: 1.8, rain: 58.4,
  },
  {
    location: '군포', temp: 8.4, max_temp: 12.5, min_temp: 4.7, wind_speed: 1.3, rain: 60.6,
  },
  {
    location: '김포', temp: 6.8, max_temp: 11.5, min_temp: 2.3, wind_speed: 1.4, rain: 47.6,
  },
  {
    location: '하남', temp: 7.2, max_temp: 12.6, min_temp: 2.5, wind_speed: 0.8, rain: 42,
  },
  {
    location: '의왕', temp: 6.8, max_temp: 11.6, min_temp: 2.2, wind_speed: 1, rain: 57.5,
  },
  {
    location: '포천', temp: 5.2, max_temp: 11.6, min_temp: -0.4, wind_speed: 1.2, rain: 44.1,
  },
  {
    location: '가평조종', temp: 4, max_temp: 10.8, min_temp: -1.6, wind_speed: 1.1, rain: 44.8,
  },
  {
    location: '영등포', temp: 8.6, max_temp: 12.5, min_temp: 5.2, wind_speed: 1.5, rain: 44,
  },
  {
    location: '인천연수', temp: 8, max_temp: 12.6, min_temp: 3.6, wind_speed: 1.7, rain: 47.4,
  },
  {
    location: '안성', temp: 6.9, max_temp: 12.7, min_temp: 1.7, wind_speed: 1.1, rain: 41.4,
  },
  {
    location: '간성', temp: 7.9, max_temp: 12.8, min_temp: 2.9, wind_speed: 1.9, rain: 92.7,
  },
  {
    location: '평창', temp: 4.5, max_temp: 11.2, min_temp: -0.9, wind_speed: 1, rain: 35.6,
  },
  {
    location: '의정부', temp: 6, max_temp: 11.7, min_temp: 0.7, wind_speed: 0.9, rain: 48.6,
  },
  {
    location: '횡성', temp: 5, max_temp: 12.1, min_temp: -0.6, wind_speed: 1.1, rain: 41.1,
  },
  {
    location: '고양', temp: 6.3, max_temp: 12.3, min_temp: 1, wind_speed: 1.2, rain: 38.9,
  },
  {
    location: '남양주', temp: 5.5, max_temp: 12.3, min_temp: -0.3, wind_speed: 1, rain: 45.9,
  },
  {
    location: '안산', temp: 6.2, max_temp: 12.4, min_temp: 0.5, wind_speed: 1.6, rain: 44,
  },
  {
    location: '경기광주', temp: 6.1, max_temp: 11.9, min_temp: 1, wind_speed: 1.5, rain: 45.8,
  },
  {
    location: '여주', temp: 5.5, max_temp: 11.7, min_temp: 0.4, wind_speed: 1.1, rain: 41.2,
  },
  {
    location: '용인', temp: 5.8, max_temp: 12.2, min_temp: 0.5, wind_speed: 1.2, rain: 47.2,
  },
  {
    location: '오산', temp: 7, max_temp: 12.6, min_temp: 1.9, wind_speed: 1.2, rain: 42.6,
  },
  {
    location: '평택', temp: 7.6, max_temp: 12.7, min_temp: 2.2, wind_speed: 1.6, rain: 44.3,
  },
  {
    location: '화천', temp: 4.4, max_temp: 11.4, min_temp: -0.8, wind_speed: 1.2, rain: 42.4,
  },
  {
    location: '양구', temp: 4.1, max_temp: 11, min_temp: -1.2, wind_speed: 1, rain: 43.5,
  },
  {
    location: '시흥', temp: 7.6, max_temp: 12.4, min_temp: 3, wind_speed: 1.6, rain: 46.7,
  },
  {
    location: '구리', temp: 6.8, max_temp: 12, min_temp: 2.3, wind_speed: 1.3, rain: 43.7,
  },
  {
    location: '금곡', temp: 6.7, max_temp: 11.7, min_temp: 2.3, wind_speed: 1.2, rain: 46,
  },
  {
    location: '화성', temp: 7.4, max_temp: 12.3, min_temp: 2.9, wind_speed: 1.3, rain: 43.9,
  },
  {
    location: '성남', temp: 7.5, max_temp: 12.4, min_temp: 3.2, wind_speed: 1.2, rain: 44.5,
  },
  {
    location: '과천', temp: 7, max_temp: 12.4, min_temp: 2.2, wind_speed: 1.5, rain: 52.1,
  },
  {
    location: '진부령', temp: 3.9, max_temp: 8.4, min_temp: -0.2, wind_speed: 3.3, rain: 82.6,
  },
  {
    location: '양주', temp: 5, max_temp: 11.6, min_temp: -0.7, wind_speed: 1.1, rain: 46.2,
  },
  {
    location: '단양', temp: 5.9, max_temp: 11.8, min_temp: 1, wind_speed: 0.8, rain: 34.7,
  },
  {
    location: '진천', temp: 6.2, max_temp: 12.7, min_temp: 0.8, wind_speed: 1.1, rain: 44.6,
  },
  {
    location: '괴산', temp: 5.5, max_temp: 12.6, min_temp: -0.3, wind_speed: 1, rain: 50.2,
  },
  {
    location: '옥천', temp: 6.5, max_temp: 13.1, min_temp: 0.9, wind_speed: 0.9, rain: 44.4,
  },
  {
    location: '홍북', temp: 6.8, max_temp: 12.7, min_temp: 1.5, wind_speed: 1.4, rain: 54.5,
  },
  {
    location: '세종연서', temp: 6.1, max_temp: 13.2, min_temp: 0.8, wind_speed: 1.1, rain: 45.3,
  },
  {
    location: '공주', temp: 6.7, max_temp: 13.2, min_temp: 1.4, wind_speed: 1.1, rain: 48.6,
  },
  {
    location: '서천', temp: 7.8, max_temp: 13.6, min_temp: 2.5, wind_speed: 1.5, rain: 53.8,
  },
  {
    location: '논산', temp: 7.1, max_temp: 13.8, min_temp: 1.2, wind_speed: 1.3, rain: 43.9,
  },
  {
    location: '당진', temp: 7, max_temp: 12.4, min_temp: 2.1, wind_speed: 1.8, rain: 45.7,
  },
  {
    location: '청양', temp: 6.2, max_temp: 12.9, min_temp: 0.4, wind_speed: 1.1, rain: 54.9,
  },
  {
    location: '음성', temp: 5.2, max_temp: 12.5, min_temp: -1, wind_speed: 1.4, rain: 43,
  },
  {
    location: '증평', temp: 5.9, max_temp: 12.6, min_temp: 0.3, wind_speed: 1.1, rain: 43.1,
  },
  {
    location: '태안', temp: 8.5, max_temp: 13, min_temp: 4.6, wind_speed: 1.8, rain: 52.9,
  },
  {
    location: '예산', temp: 7.2, max_temp: 12.9, min_temp: 2.1, wind_speed: 1.7, rain: 48,
  },
  {
    location: '아산', temp: 7.3, max_temp: 12.6, min_temp: 2.4, wind_speed: 1.8, rain: 44.2,
  },
  {
    location: '계룡', temp: 6.1, max_temp: 13.1, min_temp: 0, wind_speed: 0.9, rain: 52.2,
  },
  {
    location: '문화', temp: 8.2, max_temp: 13.7, min_temp: 3.5, wind_speed: 1, rain: 48.9,
  },
  {
    location: '세천', temp: 6.7, max_temp: 13.1, min_temp: 1.3, wind_speed: 1, rain: 43.6,
  },
  {
    location: '장동', temp: 7, max_temp: 13.2, min_temp: 1.8, wind_speed: 0.9, rain: 38.4,
  },
  {
    location: '부평', temp: 6.7, max_temp: 12.1, min_temp: 1.6, wind_speed: 0.8, rain: 68.4,
  },
  {
    location: '연천청산', temp: 5.3, max_temp: 11.6, min_temp: -0.2, wind_speed: 1, rain: 44,
  },
  {
    location: '양양', temp: 8.9, max_temp: 13.2, min_temp: 4.7, wind_speed: 2.7, rain: 81.4,
  },
  {
    location: '사북', temp: 3.9, max_temp: 8.2, min_temp: -0.1, wind_speed: 3.1, rain: 55.4,
  },
  {
    location: '무안', temp: 9.2, max_temp: 14.3, min_temp: 4.5, wind_speed: 2, rain: 47.9,
  },
  {
    location: '무주', temp: 6.2, max_temp: 13.3, min_temp: 0.4, wind_speed: 1.2, rain: 38.9,
  },
  {
    location: '익산', temp: 8.2, max_temp: 14.1, min_temp: 2.9, wind_speed: 1.4, rain: 41.4,
  },
  {
    location: '진안', temp: 5.6, max_temp: 12.8, min_temp: -0.2, wind_speed: 1.3, rain: 49.6,
  },
  {
    location: '담양', temp: 8.4, max_temp: 14.9, min_temp: 2.9, wind_speed: 1.7, rain: 46.4,
  },
  {
    location: '광산', temp: 8.8, max_temp: 15.1, min_temp: 3.2, wind_speed: 1.6, rain: 41.2,
  },
  {
    location: '구례', temp: 8.1, max_temp: 15.3, min_temp: 2.1, wind_speed: 1.3, rain: 43.7,
  },
  {
    location: '나주', temp: 8.7, max_temp: 15.4, min_temp: 3.1, wind_speed: 1.4, rain: 47.4,
  },
  {
    location: '순천시', temp: 10.5, max_temp: 15.8, min_temp: 6.2, wind_speed: 2, rain: 45.3,
  },
  {
    location: '광양읍', temp: 9.8, max_temp: 16.2, min_temp: 4.6, wind_speed: 1.5, rain: 43.1,
  },
  {
    location: '조선대', temp: 9.8, max_temp: 14.9, min_temp: 5.4, wind_speed: 1.8, rain: 46.3,
  },
  {
    location: '거문도', temp: 12.9, max_temp: 15.6, min_temp: 10.7, wind_speed: 4.3, rain: 48.7,
  },
  {
    location: '추자도', temp: 12.8, max_temp: 15.3, min_temp: 10.6, wind_speed: 4.2, rain: 46.6,
  },
  {
    location: '장성', temp: 8.1, max_temp: 14.5, min_temp: 2.8, wind_speed: 1.4, rain: 52.2,
  },
  {
    location: '영암', temp: 9.1, max_temp: 15.1, min_temp: 3.7, wind_speed: 1.8, rain: 49.3,
  },
  {
    location: '보성', temp: 7.6, max_temp: 14.5, min_temp: 1.7, wind_speed: 1.5, rain: 48.1,
  },
  {
    location: '완주', temp: 7.7, max_temp: 14.5, min_temp: 2.1, wind_speed: 1.5, rain: 44.5,
  },
  {
    location: '김제', temp: 8.6, max_temp: 14.1, min_temp: 3.8, wind_speed: 2, rain: 45.8,
  },
  {
    location: '화순', temp: 8.6, max_temp: 15.2, min_temp: 3, wind_speed: 1.1, rain: 55,
  },
  {
    location: '함평', temp: 9.4, max_temp: 15.2, min_temp: 4.2, wind_speed: 1.5, rain: 47.4,
  },
  {
    location: '곡성', temp: 7.6, max_temp: 14.7, min_temp: 2.2, wind_speed: 1.2, rain: 45.9,
  },
  {
    location: '성판악', temp: 7.4, max_temp: 11.2, min_temp: 4, wind_speed: 2.9, rain: 197.5,
  },
  {
    location: '풍암', temp: 9.5, max_temp: 15.6, min_temp: 4.4, wind_speed: 1.1, rain: 46.1,
  },
  {
    location: '압해도', temp: 10.4, max_temp: 14.6, min_temp: 6.5, wind_speed: 3.1, rain: 41.6,
  },
  {
    location: '영양', temp: 6, max_temp: 12.9, min_temp: 0.1, wind_speed: 1.4, rain: 30.6,
  },
  {
    location: '성주', temp: 7.3, max_temp: 14.5, min_temp: 1.1, wind_speed: 1.2, rain: 29.8,
  },
  {
    location: '고령', temp: 7.2, max_temp: 15, min_temp: 0.8, wind_speed: 0.7, rain: 30.3,
  },
  {
    location: '청도', temp: 7.2, max_temp: 15.1, min_temp: 1, wind_speed: 1.2, rain: 34.4,
  },
  {
    location: '예천', temp: 6, max_temp: 13.4, min_temp: 0, wind_speed: 1.1, rain: 27.9,
  },
  {
    location: '김천', temp: 7, max_temp: 14, min_temp: 0.9, wind_speed: 1.1, rain: 33.3,
  },
  {
    location: '군위', temp: 5.8, max_temp: 13.5, min_temp: -0.3, wind_speed: 1.3, rain: 30.2,
  },
  {
    location: '칠곡', temp: 7.6, max_temp: 14.4, min_temp: 1.8, wind_speed: 1.7, rain: 30.9,
  },
  {
    location: '경산', temp: 8.8, max_temp: 14.9, min_temp: 3.6, wind_speed: 1.6, rain: 33.4,
  },
  {
    location: '달성', temp: 8.7, max_temp: 15.3, min_temp: 3.4, wind_speed: 1.4, rain: 32.3,
  },
  {
    location: '서구', temp: 9.3, max_temp: 14.6, min_temp: 4.4, wind_speed: 1.5, rain: 31.8,
  },
  {
    location: '대구', temp: 9.4, max_temp: 14.9, min_temp: 4.8, wind_speed: 1.9, rain: 29.7,
  },
  {
    location: '전주', temp: 8.8, max_temp: 14.4, min_temp: 3.9, wind_speed: 1.5, rain: 49.8,
  },
  {
    location: '삼척', temp: 9.6, max_temp: 14.1, min_temp: 5.4, wind_speed: 2, rain: 62.4,
  },
  {
    location: '울기', temp: 11.7, max_temp: 15.7, min_temp: 8.3, wind_speed: 2.3, rain: 56,
  },
  {
    location: '삼천포', temp: 11.3, max_temp: 15.6, min_temp: 7.1, wind_speed: 2.1, rain: 45.9,
  },
  {
    location: '영도', temp: 11.9, max_temp: 15.4, min_temp: 8.4, wind_speed: 2.9, rain: 42.4,
  },
  {
    location: '고성', temp: 9.8, max_temp: 16.2, min_temp: 4.1, wind_speed: 1.6, rain: 44.4,
  },
  {
    location: '창녕', temp: 7.7, max_temp: 15.5, min_temp: 1.5, wind_speed: 1.4, rain: 34.6,
  },
  {
    location: '함안', temp: 7.6, max_temp: 16, min_temp: 1, wind_speed: 0.9, rain: 40.8,
  },
  {
    location: '가덕도', temp: 12, max_temp: 15.8, min_temp: 8.9, wind_speed: 3.6, rain: 41.5,
  },
  {
    location: '기장', temp: 10.7, max_temp: 16.2, min_temp: 5.7, wind_speed: 1.8, rain: 49.6,
  },
  {
    location: '간절곶', temp: 11.9, max_temp: 15.8, min_temp: 8, wind_speed: 3.2, rain: 49.8,
  },
  {
    location: '하동', temp: 9.5, max_temp: 16.1, min_temp: 4.2, wind_speed: 1.4, rain: 50.7,
  },
  {
    location: '해운대', temp: 12, max_temp: 16.8, min_temp: 7.9, wind_speed: 2, rain: 53.7,
  },
  {
    location: '부산진', temp: 11.2, max_temp: 15.8, min_temp: 7.3, wind_speed: 1.9, rain: 51.9,
  },
  {
    location: '동래', temp: 11.3, max_temp: 16.3, min_temp: 6.9, wind_speed: 1.6, rain: 51.4,
  },
  {
    location: '북구', temp: 10.5, max_temp: 15.4, min_temp: 6.3, wind_speed: 1.6, rain: 51.2,
  },
  {
    location: '부산남구', temp: 12, max_temp: 16.1, min_temp: 8.1, wind_speed: 1.8, rain: 54.8,
  },
  {
    location: '정자', temp: 10.9, max_temp: 16, min_temp: 5.8, wind_speed: 2.9, rain: 51.9,
  }],
  [{
    location: '속초', temp: 2.5, max_temp: 6.6, min_temp: -1.5, wind_speed: 2.5, rain: 40.1,
  },
  {
    location: '철원', temp: -3.2, max_temp: 2.7, min_temp: -8.6, wind_speed: 1.3, rain: 22.1,
  },
  {
    location: '동두천', temp: -1.9, max_temp: 3.9, min_temp: -6.9, wind_speed: 1.4, rain: 22.2,
  },
  {
    location: '파주', temp: -2.6, max_temp: 3.2, min_temp: -8, wind_speed: 1.4, rain: 20,
  },
  {
    location: '대관령', temp: -4.5, max_temp: 0.5, min_temp: -9.4, wind_speed: 4.9, rain: 34.7,
  },
  {
    location: '춘천', temp: -2, max_temp: 3.5, min_temp: -6.6, wind_speed: 1, rain: 24.2,
  },
  {
    location: '백령도', temp: 1.2, max_temp: 3.8, min_temp: -1.1, wind_speed: 4.8, rain: 21.6,
  },
  {
    location: '강릉', temp: 3.3, max_temp: 7.7, min_temp: -0.5, wind_speed: 3.3, rain: 36.9,
  },
  {
    location: '동해', temp: 3.4, max_temp: 7.7, min_temp: -0.8, wind_speed: 2.7, rain: 22.5,
  },
  {
    location: '서울', temp: 0.2, max_temp: 4.2, min_temp: -3.4, wind_speed: 2.3, rain: 22.6,
  },
  {
    location: '인천', temp: 0.7, max_temp: 4.5, min_temp: -2.7, wind_speed: 3.3, rain: 22.3,
  },
  {
    location: '원주', temp: -1.1, max_temp: 4.3, min_temp: -5.7, wind_speed: 0.9, rain: 23.5,
  },
  {
    location: '울릉도', temp: 4.3, max_temp: 7.2, min_temp: 1.9, wind_speed: 3.4, rain: 129.3,
  },
  {
    location: '수원', temp: 0.1, max_temp: 4.9, min_temp: -4.2, wind_speed: 1.6, rain: 25.8,
  },
  {
    location: '영월', temp: -1.7, max_temp: 4.2, min_temp: -7, wind_speed: 1.2, rain: 22.3,
  },
  {
    location: '충주', temp: -1.3, max_temp: 4.5, min_temp: -6.2, wind_speed: 1.4, rain: 24.9,
  },
  {
    location: '서산', temp: 0.8, max_temp: 5.7, min_temp: -3.7, wind_speed: 2.2, rain: 34.2,
  },
  {
    location: '울진', temp: 3.6, max_temp: 8.9, min_temp: -1, wind_speed: 3.5, rain: 33.2,
  },
  {
    location: '청주', temp: 0.6, max_temp: 5.4, min_temp: -3.7, wind_speed: 1.3, rain: 26.7,
  },
  {
    location: '대전', temp: 1, max_temp: 6.2, min_temp: -3.4, wind_speed: 1.4, rain: 29.7,
  },
  {
    location: '추풍령', temp: 0.1, max_temp: 5.1, min_temp: -4.4, wind_speed: 3.2, rain: 25.8,
  },
  {
    location: '안동', temp: -0.1, max_temp: 5.9, min_temp: -5.3, wind_speed: 1.7, rain: 18.6,
  },
  {
    location: '상주', temp: 0.4, max_temp: 5.4, min_temp: -3.9, wind_speed: 2.2, rain: 23.3,
  },
  {
    location: '포항', temp: 4.3, max_temp: 8.9, min_temp: 0.5, wind_speed: 2.7, rain: 26.1,
  },
  {
    location: '군산', temp: 2.2, max_temp: 6.4, min_temp: -1.5, wind_speed: 2.7, rain: 37.2,
  },
  {
    location: '울산', temp: 4.3, max_temp: 9.6, min_temp: -0.1, wind_speed: 2.1, rain: 28.4,
  },
  {
    location: '창원', temp: 4.6, max_temp: 9.2, min_temp: 0.6, wind_speed: 1.9, rain: 27.7,
  },
  {
    location: '광주', temp: 3.2, max_temp: 8, min_temp: -0.8, wind_speed: 1.8, rain: 37.1,
  },
  {
    location: '부산', temp: 5.8, max_temp: 10.4, min_temp: 2, wind_speed: 3.3, rain: 33.8,
  },
  {
    location: '통영', temp: 5.4, max_temp: 10.2, min_temp: 1.3, wind_speed: 2.6, rain: 32.4,
  },
  {
    location: '목포', temp: 4.2, max_temp: 8.3, min_temp: 0.7, wind_speed: 4.1, rain: 37.2,
  },
  {
    location: '여수', temp: 5.1, max_temp: 8.9, min_temp: 2, wind_speed: 4.6, rain: 26.4,
  },
  {
    location: '흑산도', temp: 5.9, max_temp: 8.2, min_temp: 3.9, wind_speed: 6.8, rain: 33.1,
  },
  {
    location: '완도', temp: 4.9, max_temp: 8.8, min_temp: 1.4, wind_speed: 3.7, rain: 37.2,
  },
  {
    location: '고창', temp: 2.1, max_temp: 6.6, min_temp: -2, wind_speed: 2.9, rain: 43.1,
  },
  {
    location: '제주', temp: 8.3, max_temp: 11, min_temp: 5.6, wind_speed: 4.1, rain: 55.6,
  },
  {
    location: '고산', temp: 8.5, max_temp: 11, min_temp: 5.9, wind_speed: 9.4, rain: 40.7,
  },
  {
    location: '성산', temp: 7.5, max_temp: 11.2, min_temp: 3.9, wind_speed: 3.1, rain: 78.8,
  },
  {
    location: '서귀포', temp: 9.4, max_temp: 13.1, min_temp: 6.2, wind_speed: 2.4, rain: 55.6,
  },
  {
    location: '진주', temp: 2.1, max_temp: 9.2, min_temp: -3.8, wind_speed: 1.2, rain: 26.1,
  },
  {
    location: '강화', temp: -0.9, max_temp: 3.9, min_temp: -5.7, wind_speed: 1.6, rain: 21.3,
  },
  {
    location: '양평', temp: -1.3, max_temp: 4.1, min_temp: -6, wind_speed: 1.2, rain: 21.4,
  },
  {
    location: '이천', temp: -1.2, max_temp: 4.4, min_temp: -6.3, wind_speed: 1.1, rain: 22.9,
  },
  {
    location: '인제', temp: -2.1, max_temp: 3.5, min_temp: -7.3, wind_speed: 1.6, rain: 20.8,
  },
  {
    location: '홍천', temp: -2.6, max_temp: 3.7, min_temp: -7.6, wind_speed: 0.9, rain: 19.1,
  },
  {
    location: '태백', temp: -2.3, max_temp: 3, min_temp: -7.1, wind_speed: 1.5, rain: 19.4,
  },
  {
    location: '정선군', temp: -2.4, max_temp: 3.1, min_temp: -7, wind_speed: 2, rain: 21,
  },
  {
    location: '제천', temp: -2.6, max_temp: 3.7, min_temp: -8.3, wind_speed: 1.3, rain: 24.6,
  },
  {
    location: '보은', temp: -1, max_temp: 5.3, min_temp: -6.4, wind_speed: 1.4, rain: 28.2,
  },
  {
    location: '천안', temp: -0.2, max_temp: 5.2, min_temp: -5.1, wind_speed: 1.7, rain: 27.9,
  },
  {
    location: '보령', temp: 2.1, max_temp: 6.7, min_temp: -2, wind_speed: 1.9, rain: 35,
  },
  {
    location: '부여', temp: 0.4, max_temp: 6.5, min_temp: -4.5, wind_speed: 1, rain: 31.4,
  },
  {
    location: '금산', temp: -0.4, max_temp: 6.2, min_temp: -5.8, wind_speed: 1, rain: 29.3,
  },
  {
    location: '부안', temp: 2.1, max_temp: 7, min_temp: -2.4, wind_speed: 1.4, rain: 42.4,
  },
  {
    location: '임실', temp: -0.4, max_temp: 6, min_temp: -5.9, wind_speed: 1.1, rain: 33.3,
  },
  {
    location: '정읍', temp: 2.1, max_temp: 6.9, min_temp: -2.2, wind_speed: 1.1, rain: 45.3,
  },
  {
    location: '남원', temp: 0.6, max_temp: 7.1, min_temp: -4.7, wind_speed: 1.2, rain: 30,
  },
  {
    location: '장수', temp: -0.8, max_temp: 5.3, min_temp: -6.2, wind_speed: 1.7, rain: 36.4,
  },
  {
    location: '영광군', temp: 1.9, max_temp: 6.6, min_temp: -2.5, wind_speed: 2.4, rain: 46.2,
  },
  {
    location: '김해시', temp: 4, max_temp: 9.1, min_temp: -0.4, wind_speed: 2.4, rain: 32.1,
  },
  {
    location: '순창군', temp: 0.5, max_temp: 6.2, min_temp: -4.1, wind_speed: 1.7, rain: 35.9,
  },
  {
    location: '양산시', temp: 4, max_temp: 9.4, min_temp: -0.8, wind_speed: 2.1, rain: 33.6,
  },
  {
    location: '강진군', temp: 3.1, max_temp: 8.2, min_temp: -1.5, wind_speed: 2.6, rain: 36.5,
  },
  {
    location: '장흥', temp: 2.9, max_temp: 8.8, min_temp: -2.4, wind_speed: 2.2, rain: 31.8,
  },
  {
    location: '해남', temp: 3.3, max_temp: 8.8, min_temp: -1.9, wind_speed: 2.1, rain: 34.6,
  },
  {
    location: '고흥', temp: 3.5, max_temp: 9.3, min_temp: -1.8, wind_speed: 1.8, rain: 26.6,
  },
  {
    location: '의령군', temp: 1.2, max_temp: 8.5, min_temp: -4.5, wind_speed: 1.3, rain: 28.6,
  },
  {
    location: '함양군', temp: 1.2, max_temp: 7.4, min_temp: -4.1, wind_speed: 1.7, rain: 22.4,
  },
  {
    location: '진도군', temp: 4.3, max_temp: 8.5, min_temp: 0, wind_speed: 2.6, rain: 43.2,
  },
  {
    location: '봉화', temp: -2.1, max_temp: 5.1, min_temp: -8.3, wind_speed: 1.4, rain: 20.3,
  },
  {
    location: '영주', temp: -0.4, max_temp: 4.8, min_temp: -5.4, wind_speed: 3.4, rain: 23.3,
  },
  {
    location: '문경', temp: 0.1, max_temp: 5.4, min_temp: -4.7, wind_speed: 2.1, rain: 22.9,
  },
  {
    location: '청송군', temp: -1.2, max_temp: 5.1, min_temp: -6.8, wind_speed: 1.8, rain: 17.7,
  },
  {
    location: '영덕', temp: 3.1, max_temp: 8, min_temp: -1.2, wind_speed: 3.1, rain: 24.3,
  },
  {
    location: '의성', temp: -1.1, max_temp: 6.8, min_temp: -7.5, wind_speed: 1.2, rain: 16.3,
  },
  {
    location: '구미', temp: 1.1, max_temp: 6.9, min_temp: -3.7, wind_speed: 1.6, rain: 18.3,
  },
  {
    location: '영천', temp: 1.1, max_temp: 7.5, min_temp: -4.4, wind_speed: 2.2, rain: 18.8,
  },
  {
    location: '경주시', temp: 1.9, max_temp: 7.7, min_temp: -3.2, wind_speed: 2.9, rain: 24.4,
  },
  {
    location: '거창', temp: 0.5, max_temp: 7.5, min_temp: -5.4, wind_speed: 1.4, rain: 22.3,
  },
  {
    location: '합천', temp: 1.7, max_temp: 9, min_temp: -4, wind_speed: 1.1, rain: 20.1,
  },
  {
    location: '밀양', temp: 2.1, max_temp: 9.3, min_temp: -3.6, wind_speed: 1.2, rain: 22.6,
  },
  {
    location: '산청', temp: 2.1, max_temp: 8.3, min_temp: -2.9, wind_speed: 2.1, rain: 23.9,
  },
  {
    location: '거제', temp: 4.7, max_temp: 9.5, min_temp: 0.4, wind_speed: 1.6, rain: 37,
  },
  {
    location: '남해', temp: 4.3, max_temp: 9.1, min_temp: -0.1, wind_speed: 1.7, rain: 35.2,
  },
  {
    location: '강남', temp: 0.8, max_temp: 4.5, min_temp: -2.6, wind_speed: 1.6, rain: 18.9,
  },
  {
    location: '서초', temp: 0.9, max_temp: 4.6, min_temp: -2.7, wind_speed: 1.5, rain: 19.4,
  },
  {
    location: '강동', temp: -0.2, max_temp: 4.3, min_temp: -4.4, wind_speed: 1.2, rain: 17.7,
  },
  {
    location: '송파', temp: 1.2, max_temp: 5, min_temp: -2.4, wind_speed: 1.7, rain: 17,
  },
  {
    location: '강서', temp: 0.3, max_temp: 4, min_temp: -3.3, wind_speed: 1.5, rain: 17.1,
  },
  {
    location: '양천', temp: 0.9, max_temp: 4.6, min_temp: -2.6, wind_speed: 1.4, rain: 17.6,
  },
  {
    location: '도봉', temp: -0.6, max_temp: 4.2, min_temp: -5.2, wind_speed: 1, rain: 18.7,
  },
  {
    location: '노원', temp: -1.1, max_temp: 4.2, min_temp: -6.3, wind_speed: 1.5, rain: 17.4,
  },
  {
    location: '동대문', temp: 0.8, max_temp: 4.8, min_temp: -2.7, wind_speed: 1.6, rain: 18.7,
  },
  {
    location: '중랑', temp: 0.6, max_temp: 4.3, min_temp: -3.1, wind_speed: 1.8, rain: 18.3,
  },
  {
    location: '기상청', temp: 0.8, max_temp: 4.5, min_temp: -2.6, wind_speed: 1.4, rain: 19.6,
  },
  {
    location: '마포', temp: 0.8, max_temp: 4.4, min_temp: -2.7, wind_speed: 2.3, rain: 16.3,
  },
  {
    location: '서대문', temp: -0.3, max_temp: 4.2, min_temp: -4.3, wind_speed: 1.8, rain: 18.3,
  },
  {
    location: '광진', temp: 0.8, max_temp: 4.5, min_temp: -2.8, wind_speed: 1.7, rain: 18.7,
  },
  {
    location: '성북', temp: -0.3, max_temp: 3.5, min_temp: -4.1, wind_speed: 1.4, rain: 18,
  },
  {
    location: '용산', temp: 0.7, max_temp: 4.4, min_temp: -2.7, wind_speed: 1.4, rain: 18.7,
  },
  {
    location: '은평', temp: -0.6, max_temp: 4.1, min_temp: -5.1, wind_speed: 1.6, rain: 16.1,
  },
  {
    location: '금천', temp: 1, max_temp: 4.6, min_temp: -2.1, wind_speed: 1.6, rain: 17.8,
  },
  {
    location: '중구', temp: -1.2, max_temp: 2.6, min_temp: -4.4, wind_speed: 2.6, rain: 15.2,
  },
  {
    location: '성동', temp: 1, max_temp: 4.4, min_temp: -2.3, wind_speed: 2.1, rain: 18,
  },
  {
    location: '구로', temp: 0, max_temp: 4.1, min_temp: -4, wind_speed: 1.7, rain: 19.2,
  },
  {
    location: '강북', temp: 0.2, max_temp: 4.1, min_temp: -3.3, wind_speed: 1.6, rain: 20.2,
  },
  {
    location: '남현', temp: -0.6, max_temp: 3.4, min_temp: -4.5, wind_speed: 1.4, rain: 32.1,
  },
  {
    location: '부천', temp: 0.6, max_temp: 4.3, min_temp: -2.9, wind_speed: 1.1, rain: 18.2,
  },
  {
    location: '안양', temp: 0.4, max_temp: 4, min_temp: -3.1, wind_speed: 2.3, rain: 22.1,
  },
  {
    location: '광명', temp: 0.8, max_temp: 4.3, min_temp: -2.5, wind_speed: 1.9, rain: 21.7,
  },
  {
    location: '군포', temp: 0.6, max_temp: 4.5, min_temp: -2.9, wind_speed: 1.3, rain: 24.6,
  },
  {
    location: '김포', temp: -1.3, max_temp: 3, min_temp: -5.5, wind_speed: 1.5, rain: 17.4,
  },
  {
    location: '하남', temp: -0.6, max_temp: 4.1, min_temp: -5, wind_speed: 0.9, rain: 15.8,
  },
  {
    location: '의왕', temp: -0.9, max_temp: 3.5, min_temp: -5.1, wind_speed: 1.1, rain: 20.6,
  },
  {
    location: '포천', temp: -2.4, max_temp: 3.6, min_temp: -7.6, wind_speed: 1.1, rain: 17.4,
  },
  {
    location: '가평조종', temp: -3.3, max_temp: 2.6, min_temp: -8.7, wind_speed: 1.1, rain: 18.4,
  },
  {
    location: '영등포', temp: 1, max_temp: 4.7, min_temp: -2.2, wind_speed: 1.5, rain: 17.1,
  },
  {
    location: '인천연수', temp: 0.7, max_temp: 4.9, min_temp: -3.4, wind_speed: 1.7, rain: 16.7,
  },
  {
    location: '안성', temp: -0.4, max_temp: 4.7, min_temp: -5.1, wind_speed: 1.1, rain: 20,
  },
  {
    location: '간성', temp: 1.5, max_temp: 6.1, min_temp: -3.1, wind_speed: 2.2, rain: 28.3,
  },
  {
    location: '평창', temp: -2.9, max_temp: 3.6, min_temp: -8.1, wind_speed: 1, rain: 17.5,
  },
  {
    location: '의정부', temp: -1.5, max_temp: 3.6, min_temp: -6.5, wind_speed: 1, rain: 20.6,
  },
  {
    location: '횡성', temp: -2.4, max_temp: 4, min_temp: -7.8, wind_speed: 1, rain: 17.7,
  },
  {
    location: '고양', temp: -1.2, max_temp: 4.1, min_temp: -6.4, wind_speed: 1.4, rain: 13.9,
  },
  {
    location: '남양주', temp: -1.7, max_temp: 4.5, min_temp: -7.2, wind_speed: 1, rain: 18.3,
  },
  {
    location: '안산', temp: -0.9, max_temp: 4.5, min_temp: -6.4, wind_speed: 1.6, rain: 19,
  },
  {
    location: '경기광주', temp: -1.4, max_temp: 3.9, min_temp: -6.1, wind_speed: 1.4, rain: 19.8,
  },
  {
    location: '여주', temp: -1.8, max_temp: 3.7, min_temp: -6.5, wind_speed: 1.2, rain: 16.9,
  },
  {
    location: '용인', temp: -1.3, max_temp: 4.4, min_temp: -6.4, wind_speed: 1.2, rain: 21.4,
  },
  {
    location: '오산', temp: -0.4, max_temp: 4.7, min_temp: -5, wind_speed: 1.3, rain: 18.1,
  },
  {
    location: '평택', temp: 0.3, max_temp: 4.8, min_temp: -4.5, wind_speed: 1.6, rain: 20.8,
  },
  {
    location: '화천', temp: -3.2, max_temp: 3.5, min_temp: -8.3, wind_speed: 1.1, rain: 14.4,
  },
  {
    location: '양구', temp: -3.6, max_temp: 3.2, min_temp: -8.9, wind_speed: 1, rain: 14.2,
  },
  {
    location: '시흥', temp: 0.3, max_temp: 4.7, min_temp: -4, wind_speed: 1.6, rain: 18.5,
  },
  {
    location: '구리', temp: -0.4, max_temp: 4.1, min_temp: -4.8, wind_speed: 1.3, rain: 17.8,
  },
  {
    location: '금곡', temp: -0.6, max_temp: 3.8, min_temp: -5.1, wind_speed: 1.2, rain: 19.5,
  },
  {
    location: '화성', temp: 0.1, max_temp: 4.5, min_temp: -4.2, wind_speed: 1.3, rain: 18.2,
  },
  {
    location: '성남', temp: 0.2, max_temp: 4.5, min_temp: -3.8, wind_speed: 1.3, rain: 19.6,
  },
  {
    location: '과천', temp: -0.2, max_temp: 4.6, min_temp: -4.9, wind_speed: 1.5, rain: 19.8,
  },
  {
    location: '진부령', temp: -3.2, max_temp: 0.9, min_temp: -7.1, wind_speed: 3.8, rain: 27.9,
  },
  {
    location: '양주', temp: -2.5, max_temp: 3.5, min_temp: -8, wind_speed: 1.1, rain: 18.2,
  },
  {
    location: '단양', temp: -1.4, max_temp: 4, min_temp: -6.1, wind_speed: 0.8, rain: 17.6,
  },
  {
    location: '진천', temp: -0.7, max_temp: 4.9, min_temp: -5.8, wind_speed: 1.1, rain: 22.4,
  },
  {
    location: '괴산', temp: -1.6, max_temp: 4.8, min_temp: -7.1, wind_speed: 0.9, rain: 23.4,
  },
  {
    location: '옥천', temp: -0.3, max_temp: 5.6, min_temp: -5.3, wind_speed: 0.9, rain: 23.8,
  },
  {
    location: '홍북', temp: 0.1, max_temp: 5.1, min_temp: -4.7, wind_speed: 1.4, rain: 29.8,
  },
  {
    location: '세종연서', temp: -0.7, max_temp: 5.6, min_temp: -5.6, wind_speed: 1.1, rain: 22.8,
  },
  {
    location: '공주', temp: -0.2, max_temp: 5.5, min_temp: -5.1, wind_speed: 1.1, rain: 25.4,
  },
  {
    location: '서천', temp: 1.1, max_temp: 6.3, min_temp: -3.3, wind_speed: 1.4, rain: 31,
  },
  {
    location: '논산', temp: 0.3, max_temp: 6.1, min_temp: -4.9, wind_speed: 1.3, rain: 24.9,
  },
  {
    location: '당진', temp: 0.3, max_temp: 4.9, min_temp: -4.2, wind_speed: 1.9, rain: 23.3,
  },
  {
    location: '청양', temp: -0.4, max_temp: 5.3, min_temp: -5.8, wind_speed: 1, rain: 31.8,
  },
  {
    location: '음성', temp: -2.1, max_temp: 4.5, min_temp: -7.8, wind_speed: 1.4, rain: 22.1,
  },
  {
    location: '증평', temp: -1.2, max_temp: 4.6, min_temp: -6.3, wind_speed: 1.1, rain: 20.7,
  },
  {
    location: '태안', temp: 1.9, max_temp: 5.7, min_temp: -1.8, wind_speed: 1.9, rain: 27.1,
  },
  {
    location: '예산', temp: 0.1, max_temp: 5, min_temp: -4.4, wind_speed: 1.7, rain: 23.6,
  },
  {
    location: '아산', temp: 0.3, max_temp: 4.8, min_temp: -4, wind_speed: 1.8, rain: 19.5,
  },
  {
    location: '계룡', temp: -0.7, max_temp: 5.6, min_temp: -6.5, wind_speed: 0.9, rain: 27.6,
  },
  {
    location: '문화', temp: 1.3, max_temp: 6.2, min_temp: -2.9, wind_speed: 1, rain: 25,
  },
  {
    location: '세천', temp: -0.2, max_temp: 5.6, min_temp: -5.1, wind_speed: 1, rain: 24.5,
  },
  {
    location: '장동', temp: 0.1, max_temp: 5.6, min_temp: -4.6, wind_speed: 0.8, rain: 21.2,
  },
  {
    location: '부평', temp: -1.3, max_temp: 3.5, min_temp: -6, wind_speed: 0.9, rain: 15.5,
  },
  {
    location: '연천청산', temp: -2.6, max_temp: 3.2, min_temp: -7.8, wind_speed: 1, rain: 14.1,
  },
  {
    location: '양양', temp: 2.1, max_temp: 6.2, min_temp: -1.7, wind_speed: 3.5, rain: 27.6,
  },
  {
    location: '사북', temp: -3.9, max_temp: 0.2, min_temp: -8, wind_speed: 3.6, rain: 21.6,
  },
  {
    location: '무안', temp: 2.8, max_temp: 7.3, min_temp: -1.1, wind_speed: 2.1, rain: 39.7,
  },
  {
    location: '무주', temp: -0.8, max_temp: 5.4, min_temp: -6.2, wind_speed: 1.3, rain: 20.7,
  },
  {
    location: '익산', temp: 1.6, max_temp: 6.6, min_temp: -3.2, wind_speed: 1.4, rain: 25.4,
  },
  {
    location: '진안', temp: -1, max_temp: 5.3, min_temp: -6.5, wind_speed: 1.3, rain: 30,
  },
  {
    location: '담양', temp: 2, max_temp: 7.6, min_temp: -2.9, wind_speed: 1.7, rain: 29.8,
  },
  {
    location: '광산', temp: 2.4, max_temp: 7.9, min_temp: -2.3, wind_speed: 1.7, rain: 30.8,
  },
  {
    location: '구례', temp: 1.8, max_temp: 7.9, min_temp: -3.3, wind_speed: 1.6, rain: 24.5,
  },
  {
    location: '나주', temp: 2.3, max_temp: 8, min_temp: -2.4, wind_speed: 1.4, rain: 34.4,
  },
  {
    location: '순천시', temp: 4.4, max_temp: 9.1, min_temp: 0.4, wind_speed: 2.3, rain: 24.6,
  },
  {
    location: '광양읍', temp: 3.6, max_temp: 9.3, min_temp: -1.1, wind_speed: 1.8, rain: 22.7,
  },
  {
    location: '조선대', temp: 3.4, max_temp: 7.8, min_temp: -0.3, wind_speed: 1.9, rain: 28.8,
  },
  {
    location: '거문도', temp: 7.3, max_temp: 9.8, min_temp: 5, wind_speed: 5.4, rain: 30.9,
  },
  {
    location: '추자도', temp: 7.5, max_temp: 9.7, min_temp: 5.1, wind_speed: 4.8, rain: 32.9,
  },
  {
    location: '장성', temp: 1.6, max_temp: 7.1, min_temp: -2.9, wind_speed: 1.5, rain: 35,
  },
  {
    location: '영암', temp: 2.7, max_temp: 8, min_temp: -1.8, wind_speed: 1.9, rain: 32.2,
  },
  {
    location: '보성', temp: 1.7, max_temp: 7.6, min_temp: -3.7, wind_speed: 1.7, rain: 27.5,
  },
  {
    location: '완주', temp: 1.1, max_temp: 6.9, min_temp: -4, wind_speed: 1.5, rain: 25.7,
  },
  {
    location: '김제', temp: 1.8, max_temp: 6.5, min_temp: -2.4, wind_speed: 2, rain: 29.3,
  },
  {
    location: '화순', temp: 2.2, max_temp: 7.9, min_temp: -2.6, wind_speed: 1.3, rain: 31.1,
  },
  {
    location: '함평', temp: 3, max_temp: 8.2, min_temp: -1.4, wind_speed: 1.5, rain: 37.7,
  },
  {
    location: '곡성', temp: 1.1, max_temp: 7, min_temp: -3.5, wind_speed: 1.3, rain: 27.8,
  },
  {
    location: '성판악', temp: 1.9, max_temp: 5.2, min_temp: -1, wind_speed: 3.4, rain: 153.5,
  },
  {
    location: '풍암', temp: 2.7, max_temp: 7.9, min_temp: -1.6, wind_speed: 1.3, rain: 31.1,
  },
  {
    location: '압해도', temp: 4, max_temp: 7.7, min_temp: 0.5, wind_speed: 3.4, rain: 32.1,
  },
  {
    location: '영양', temp: -0.5, max_temp: 6, min_temp: -6.1, wind_speed: 1.5, rain: 16.8,
  },
  {
    location: '성주', temp: 0.6, max_temp: 7.5, min_temp: -5.3, wind_speed: 1.4, rain: 16.5,
  },
  {
    location: '고령', temp: 0.6, max_temp: 8.1, min_temp: -5.4, wind_speed: 0.8, rain: 18.4,
  },
  {
    location: '청도', temp: 0.8, max_temp: 8, min_temp: -5, wind_speed: 1.4, rain: 20.4,
  },
  {
    location: '예천', temp: -0.6, max_temp: 6.1, min_temp: -6.1, wind_speed: 1.2, rain: 17,
  },
  {
    location: '김천', temp: 0.4, max_temp: 6.6, min_temp: -5, wind_speed: 1.4, rain: 17.7,
  },
  {
    location: '군위', temp: -1, max_temp: 6.1, min_temp: -6.7, wind_speed: 1.4, rain: 12.9,
  },
  {
    location: '칠곡', temp: 1.1, max_temp: 7.2, min_temp: -4.2, wind_speed: 2, rain: 14,
  },
  {
    location: '경산', temp: 2.2, max_temp: 7.6, min_temp: -2.4, wind_speed: 1.8, rain: 20.1,
  },
  {
    location: '달성', temp: 2.4, max_temp: 8.3, min_temp: -2.7, wind_speed: 1.8, rain: 16.7,
  },
  {
    location: '서구', temp: 2.5, max_temp: 7.4, min_temp: -1.9, wind_speed: 1.6, rain: 17.5,
  },
  {
    location: '대구', temp: 3, max_temp: 7.9, min_temp: -1.2, wind_speed: 2.2, rain: 18.7,
  },
  {
    location: '전주', temp: 2.2, max_temp: 7.1, min_temp: -2.1, wind_speed: 1.5, rain: 34,
  },
  {
    location: '삼척', temp: 3.2, max_temp: 7.7, min_temp: -0.7, wind_speed: 2.1, rain: 24.8,
  },
  {
    location: '울기', temp: 5.5, max_temp: 9.7, min_temp: 1.7, wind_speed: 2.3, rain: 26.1,
  },
  {
    location: '삼천포', temp: 4.9, max_temp: 9.1, min_temp: 1, wind_speed: 2.3, rain: 24.9,
  },
  {
    location: '영도', temp: 5.7, max_temp: 9.2, min_temp: 2.1, wind_speed: 2.8, rain: 30.7,
  },
  {
    location: '고성', temp: 3.6, max_temp: 9.7, min_temp: -1.9, wind_speed: 1.7, rain: 25.6,
  },
  {
    location: '창녕', temp: 1.1, max_temp: 8.4, min_temp: -4.8, wind_speed: 1.5, rain: 20.4,
  },
  {
    location: '함안', temp: 1, max_temp: 9.2, min_temp: -5.3, wind_speed: 1, rain: 23.6,
  },
  {
    location: '가덕도', temp: 5.9, max_temp: 9.5, min_temp: 2.7, wind_speed: 4.4, rain: 28.3,
  },
  {
    location: '기장', temp: 4.8, max_temp: 10.2, min_temp: -0.2, wind_speed: 1.7, rain: 31.5,
  },
  {
    location: '간절곶', temp: 5.8, max_temp: 9.9, min_temp: 1.8, wind_speed: 3, rain: 28.9,
  },
  {
    location: '하동', temp: 3.4, max_temp: 9.3, min_temp: -1.5, wind_speed: 1.7, rain: 27.6,
  },
  {
    location: '해운대', temp: 5.9, max_temp: 10.6, min_temp: 1.6, wind_speed: 2.2, rain: 34.8,
  },
  {
    location: '부산진', temp: 4.8, max_temp: 9, min_temp: 0.9, wind_speed: 2.1, rain: 34.2,
  },
  {
    location: '동래', temp: 5.1, max_temp: 9.8, min_temp: 0.9, wind_speed: 1.8, rain: 31.8,
  },
  {
    location: '북구', temp: 4.2, max_temp: 8.8, min_temp: 0.1, wind_speed: 1.6, rain: 27.7,
  },
  {
    location: '부산남구', temp: 5.7, max_temp: 9.6, min_temp: 1.8, wind_speed: 2, rain: 34.4,
  },
  {
    location: '정자', temp: 4.7, max_temp: 9.7, min_temp: -0.1, wind_speed: 2.8, rain: 26.4,
  }],
]

export default climaticAverageListKorea
