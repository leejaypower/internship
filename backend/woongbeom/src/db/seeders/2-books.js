module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Books', [
      {
        title: '자유로울 것',
        author: '임경선',
        publisher: '위즈덤하우스',
        page: 287,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '젊은 베르테르의 슬픔',
        author: '요한 볼프강 폰 괴테',
        publisher: '민음사',
        page: 244,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Principles (원칙)',
        author: 'Ray Dalio (레이 달리오)',
        publisher: '한빛비즈',
        page: 715,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '위대한 기업에 투자하라',
        author: '워렌 버핏',
        publisher: '굿모닝북스',
        page: 715,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Do it! 점프 투 파이썬',
        author: '박응용',
        publisher: '이지스퍼블리싱',
        page: 356,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '모던 자바스크립트 Deep Dive',
        author: '이웅모',
        publisher: '위키북스',
        page: 922,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Clean Code (클린 코드)',
        author: '로버트 C. 마틴',
        publisher: '인사이트',
        page: 584,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '데일 카네기 자기관리론',
        author: '데일 카네기',
        publisher: '현대지성',
        page: 422,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '진짜 쓰는 실무 엑셀',
        author: '전진권',
        publisher: '제이펍',
        page: 508,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '비전공자도 이해할 수 있는 AI 지식',
        author: '박상길',
        publisher: '반니',
        page: 440,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '비전공자를 위한 이해할 수 있는 IT지식',
        author: '최원영',
        publisher: '티더블유아이지',
        page: 240,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '1일 1로그 100일완성 IT지식',
        author: '브라이언 W. 커니핸',
        publisher: '인사이트(insight)',
        page: 560,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '혼자 공부하는 파이썬',
        author: '윤인성',
        publisher: '한빛미디어',
        page: 460,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '만들면서 배우는 파이썬과 40개의 작품들',
        author: '장문철',
        publisher: '엔써북',
        page: 348,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '혼자 공부하는 머신러닝 + 딥러닝',
        author: '박해선',
        publisher: '한빛미디어',
        page: 580,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '실무에 바로 쓰는 일잘러의 보고서 작성법',
        author: '김마라',
        publisher: '제이펍',
        page: 256,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Do it! HTML+CSS+자바스크립트 웹 표준의 정석',
        author: '고경희',
        publisher: '이지스퍼블리싱',
        page: 648,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '헤드 퍼스트 디자인 패턴',
        author: '에릭 프리먼, 엘리자베스 롭슨',
        publisher: '한빛미디어',
        page: 656,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '이것이 취업을 위한 코딩 테스트다 with 파이썬',
        author: '나동빈',
        publisher: '한빛미디어',
        page: 604,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '혼자 공부하는 C 언어',
        author: '서현우',
        publisher: '한빛미디어',
        page: 664,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '맛있는 디자인 포토샵&일러스트레이터 CC 2022',
        author: '박정아, 윤이사라',
        publisher: '한빛미디어',
        page: 544,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '퇴근 후 스마트스토어로 투잡하기',
        author: '박하나',
        publisher: '비제이퍼블릭(BJ퍼블릭)',
        page: 508,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Java의 정석',
        author: '남궁성',
        publisher: '도우출판',
        page: 1022,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '프로그래머의 뇌',
        author: '펠리너 헤르만스',
        publisher: '제이펍',
        page: 272,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '면접을 위한 CS 전공지식 노트',
        author: '주홍철',
        publisher: '길벗',
        page: 292,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '도메인 주도 개발 시작하기',
        author: '최범균',
        publisher: '한빛미디어',
        page: 356,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '유튜브 영상 편집을 위한 프리미어 프로',
        author: '조블리',
        publisher: '제이펍',
        page: 452,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '네이버쇼핑 스마트스토어로 상위노출 하라',
        author: '김도균',
        publisher: '휴먼하우스',
        page: 400,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '초등학생을 위한 파워포인트 무작정 따라하기',
        author: '이상권, 권동균',
        publisher: '길벗',
        page: 208,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '리펙터링 2판',
        author: '마틴 파울러',
        publisher: '한빛미디어',
        page: 550,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '한 권으로 읽는 컴퓨터 구조와 프로그래밍',
        author: '조너선 스타인하트',
        publisher: '책만',
        page: 636,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '내가 만들어 누구나 사용하는 카카오톡 이모티콘 만들기',
        author: '김소희',
        publisher: '길벗',
        page: 336,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '인스타그램 브랜딩 레시피',
        author: '김정은',
        publisher: '위키북스',
        page: 292,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '이펙티브 자바 Effective Java 3/E',
        author: '조슈아 블로크',
        publisher: '인사이트(insight)',
        page: 520,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '빅데이터 커리어 가이드북',
        author: '조성준, 김현용, 박서영, 안용대, 임성연',
        publisher: '길벗',
        page: 400,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '직장인을 위한 실무 엑셀',
        author: '선양미',
        publisher: '길벗',
        page: 492,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '윤성우의 열혈 C 프로그래밍',
        author: '윤성우',
        publisher: '오렌지미디어',
        page: 620,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '쏙쏙 들어오는 함수형 코딩',
        author: '윤성우',
        publisher: '오렌지미디어',
        page: 620,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Do it! 알고리즘 코딩 테스트 자바 편',
        author: '김종관',
        publisher: '이지스퍼블리싱',
        page: 564,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '레트로의 유니티 게임 프로그래민 에센스',
        author: '이제민',
        publisher: '한빛미디어',
        page: 1102,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '혼자 공부하는 SQL',
        author: '우재남',
        publisher: '한빛미디어',
        page: 444,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '클린 아키텍처',
        author: '로버트 C. 마틴',
        publisher: '인사이트(insight)',
        page: 432,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '실용주의 프로그래머 (20주년 기념판)',
        author: '데이비드 토머스, 앤드류 헌트',
        publisher: '인사이트(insight)',
        page: 476,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '미래를 바꾼 아홉 가지 알고리즘',
        author: '존 맥코믹',
        publisher: '에이콘출판사',
        page: 328,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '코딩 자율학습 HTML + CSS + 자바스크립트',
        author: '김기수',
        publisher: '길벗',
        page: 612,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'UX/UI 디자이너를 위한 실무 피그마',
        author: '클레어 정',
        publisher: '한빛미디어',
        page: 352,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '리액트를 다루는 기술 (개정판)',
        author: '김민준',
        publisher: '길벗',
        page: 908,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '윤성우의 열혈 C++ 프로그래밍',
        author: '윤성우',
        publisher: '오렌지미디어',
        page: 656,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '자바 ORM 표준 JPA 프로그래밍',
        author: '김영한',
        publisher: '에이콘출판사',
        page: 736,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '모두의 딥러닝',
        author: '조태호',
        publisher: '길벗',
        page: 472,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '밑바닥부터 시작하는 딥러닝',
        author: '사이토 고키',
        publisher: '한빛미디어',
        page: 312,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '스프링 부트와 AWS로 혼자 구현하는 웹 서비스',
        author: '이동욱',
        publisher: '프리렉',
        page: 416,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '함께 자라기',
        author: '김창준',
        publisher: '인사이트(insight)',
        page: 228,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '유니티 교과서',
        author: '기타무라 마나미',
        publisher: '길벗',
        page: 464,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '구글 엔지니어는 이렇게 일한다',
        author: '타이터스 윈터스, 톰 멘쉬렉, 하이럼 라이트',
        publisher: '한빛미디어',
        page: 704,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '나는 파이썬으로 머신러닝한다 1',
        author: '최정원, 박지훈',
        publisher: '씨마스',
        page: 344,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '두려움 없는 조직',
        author: '에이미 에드먼슨',
        publisher: '다산북스',
        page: 287,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'AWS 컨테이너 설계와 구축 철저 입문',
        author: '아라이 마사야, 우마카츠 아츠시',
        publisher: '위키북스',
        page: 468,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '훅: 일상을 사로잡는 제품의 비밀',
        author: '니르 이얄',
        publisher: '유엑스리뷰',
        page: 282,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '컨테이너 인프라 환경 구축을 위한 쿠버네티스/도커',
        author: '조훈, 심근우, 문성주',
        publisher: '길벗',
        page: 580,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '업무와 일상을 정리하는 새로운 방법 노션 Notion',
        author: '이해봄, 전시진',
        publisher: '제이펍',
        page: 392,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'AWS로 시작하는 인프라 구축의 정석',
        author: '나카가키 겐지',
        publisher: '제이펍',
        page: 348,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '좋은 코드, 나쁜 코드',
        author: '통 롱',
        publisher: '제이펍',
        page: 436,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '그림으로 이해하는 AWS 구조와 기술',
        author: '오가사와라 시게타카',
        publisher: '성창규',
        page: 280,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '프리드버그 선형대수학 (개정 5판)',
        author: '스티븐 H. 프리드버그, 아놀드 J. 인셀, 로렌스 E. 스펜스',
        publisher: '한빛아카데미',
        page: 616,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '그림과 실습으로 배우는 도커 & 쿠버네티스',
        author: '오가사와라 시게타카',
        publisher: '위키북스',
        page: 400,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '고객을 끌어오는 구글 애널리틱스 4',
        author: '문준영',
        publisher: '한빛미디어',
        page: 512,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '가상 면접 사례로 배우는 대규모 시스템 설게 기초',
        author: '알렉스 쉬',
        publisher: '인사이트(insight)',
        page: 320,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'IT 엔지니어를 위한 네트워크 입문',
        author: '고재성, 이상훈',
        publisher: '길벗',
        page: 596,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '프로그래밍 대회에서 배우는 알고리즘 문제 해결 전략 세트 (전2권)',
        author: '구종만',
        publisher: '안시이트(insight)',
        page: 1062,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '밑바닥부터 시작하는 딥러닝 2',
        author: '사이토 고키',
        publisher: '한빛미디어',
        page: 420,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '스프링 마이크로서비스 코딩 공작소',
        author: '존 카넬, 일러리 후알리루포 산체스',
        publisher: '길벗',
        page: 524,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '러닝 스파크',
        author: '줄스 담지, 브룩 웨닉, 타타가타 다스, 데니 리',
        publisher: '제이펍',
        page: 404,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'AI 상식사전',
        author: '한규동',
        publisher: '길벗',
        page: 392,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '자바스크립트 완벽 가이드 (7판)',
        author: '데이비드 플래너건',
        publisher: '인사이트(insight)',
        page: 784,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '실전 카프카 개발부터 운영까지',
        author: '고승범',
        publisher: '책만',
        page: 512,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Real MySQL 8.0 (2권)',
        author: '백은빈, 이성욱',
        publisher: '위키북스',
        page: 760,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '모두의 인공지능 기초 수학',
        author: '서지영',
        publisher: '길벗',
        page: 388,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '읽기 좋은 코드가 좋은 코드다',
        author: '더스틴 보즈웰, 트레버 파우커',
        publisher: '한빛미디어',
        page: 252,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Do it! 자바 프로그래밍 입문',
        author: '박은종',
        publisher: '이지스퍼블리싱',
        page: 596,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '코딩인터뷰 완전분석',
        author: '게일 라크만 맥도웰',
        publisher: '인사이트(insight)',
        page: 904,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '자연어 처리의 정석',
        author: '제이콥 에이젠슈테인',
        publisher: '에이콘출판사',
        page: 690,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Do it! 자바스크립트 입문',
        author: '고경희',
        publisher: '이지스퍼블리싱',
        page: 352,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '파이썬 라이브러리를 활용한 데이터 분석',
        author: '웨스 맥키니',
        publisher: '한빛미디어',
        page: 664,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '실습과 그림으로 배우는 리눅스 구조',
        author: '다케우치 사토루',
        publisher: '한빛미디어',
        page: 304,
        statusCode: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
