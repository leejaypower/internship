# 안내

1. 도커에 Mapping할 포트가 무엇일지 설정해 주세요.
Dockerfile Expose 8089 (나의 경우)
Docker-compose.yml internship-deokheyong port 8089:8089로 설정
포트 설정은 위 설정을 따르실 필요는 없지만 포트 번호를 일치시키는게 도커 사용시 오류 핸들링 하기 편할 것입니다.
compose로 컨테이너를 실행할 수도 있고, 단독으로도 실행할 수 있는데 이때 포트가 내부 코드도 만져줄 것이 많이 생김

2. 현재 PR은 naverHTTP의 대한 설정을 염두할 필요가 없어서 따로 작업할 내용이 없습니다.
다만 다른 PR과 합쳐졌을 때 proxy Server에 대한 처리를 해줄 필요가 있는데 이 때 개개인에게
맞는 포트 번호를 부여할 필요가 있습니다.
추후 naver API를 사용하는 브랜치(저의 경우 feature/issue-371)와 합쳐질 경우
naver axios의 baseURL에 port번호를 8089(개인이 설정한 포트)로 바꾸셔야합니다!

3. 2번 과정을 수행하셨다는 것은 Proxy Server사용이 필수적이라는 이야기인데 그렇다면
nginx에서 Proxy Server가 listen하는 포트는 개인이 설정한 포트와 일치하도록 설정해주세요!

4. npm run serve를 했을 때 보통 8080 포트로 열리는데 이때는 어떻게 할 것인지 같이 고려해주면 좋습니다.
제 브랜치중 feature/issue-371에 커밋을 참고하셔도 좋을 것 같아요
