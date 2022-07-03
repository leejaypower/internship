/**
 * Naver open api를 사용하여 book data를 받아오는 함수 입니다
 * DB 스키마 구조에 맞게 가공 후 결과로 return
 * 100개의 영화 data를 배열로 return 한다.
 */

const axios = require('axios');

async function getBookDataApi(genre, display) {
  const query = encodeURI(`?query=${genre}&display=${display}`);
  // const query = '?query=%EC%A3%BC%EC%8B%9D&display=100';
  const url = `https://openapi.naver.com/v1/search/book.json${query}`;

  const headers = {
    headers: {
      'X-Naver-Client-Id': process.env.CLIENT_ID,
      'X-Naver-Client-Secret': process.env.CLIENT_SECRETE,
    },
  };

  try {
    const { data } = await axios.get(url + query, headers);
    const bookList = data.items.map((book) => ({
      title: book.title,
      authors: book.author,
      isbn: book.isbn,
      content: book.description,
      publisher: book.publisher,
      publicationDate: book.pubdate,
      thumbnail: book.image,
      category: 'Horror',
      bookLocation: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return bookList;
  } catch (err) {
    throw err;
  }
}

module.exports = getBookDataApi;
