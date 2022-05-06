const axios = require('axios');
require('dotenv').config();

/**
 * get movie data from open api and filter data
 * 페이지네이션, 무한 스크롤을 고려한 설계가 필요하나,테스트 코드 이므로 단순하게 작성하였습니다.
 */

module.exports = async (start = 1, count = 20) => {
  const params = encodeURI(
    `startCount=${start}&listCount=${count}&type=극영화&releaseDts=2022-01-01`,
  );

  const url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${process.env.KMDB_KDY}&${params}`;

  const genreExtract = /드라마|첩보|옴니버스|뮤직|로드무비|아동|청춘영화|재난|문예|신파|군사|스포츠|종교|무협|미스터리|SF|코메디|느와르|액션|범죄|어드벤처|가족|멜로|로맨스|공포|뮤지컬|시대극|사극|실험|스릴러|전쟁|판타지/g;

  const getApiData = async function getApiData() {
    await axios
      .get(url)
      .then((response) => response.data.Data[0].Result);
  };

  const filterData = (data) => data.map((movie) => {
    const directors = movie.directors.director
      .map((dir) => dir.directorEnNm)
      .join(',');
    const actors = movie.actors.actor.map((act) => act.actorEnNm).join(',');

    if (genreExtract.test(movie.genre)) {
      return {
        title: movie.title,
        directors,
        actors,
        releaseDate: movie.ratings.rating[0].releaseDate,
        genre: movie.genre,
        poster: movie.posters,
        plot: movie.plots.plot[0].plotText,
        runtime: movie.runtime,
        kmdbUrl: movie.kmdbUrl,
      };
    }
    return undefined;
  })
    .filter((movie) => movie !== undefined);

  return getApiData(start, count).then((data) => filterData(data));

  // http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=Y1F9JY52213P85WA8P4E&$startCount=1&listCount=10&type=극영화&releaseDts=2022-01-01
};
