import musicianThornApple from '../assets/tastes/musician_thornApple.png'
import musicianBlackSkirt from '../assets/tastes/musician_blackSkirt.png'
import musicianAutumnVacation from '../assets/tastes/musician_autumnVacation.png'
import musicianCham from '../assets/tastes/musician_cham.png'
import musicianMoon from '../assets/tastes/musician_moon.png'
import tvshowClinic from '../assets/tastes/tvshow_clinic.png'
import novelCold from '../assets/tastes/novel_cold.png'
import novelZorba from '../assets/tastes/novel_zorba.png'
import musicianLunch from '../assets/tastes/musician_lunch.png'
import tvshowAgain from '../assets/tastes/tvshow_again.png'
import tvshowMilitary from '../assets/tastes/tvshow_military.png'
import musicianNell from '../assets/tastes/musician_nell.png'
import musicianOlivia from '../assets/tastes/musician_olivia.png'
import musicianClazi from '../assets/tastes/musician_clazi.png'
import youtubeChanelAhaBujang from '../assets/tastes/youtubeChanel_aha-bujang.png'

import birthdayParty from '../assets/family/birthdayParty.png'
import daughterRed from '../assets/family/daughterRed.png'
import winterPicnic from '../assets/family/winterPicnic.png'
import wifeAndDaughter from '../assets/family/wifeAndDaughter.png'
import whiteDress from '../assets/family/whiteDress.png'
import sonImage from '../assets/family/sonImage.png'
import wifeFamily from '../assets/family/wifeFamily.png'
import daughterRiver from '../assets/family/daughterRiver.png'

const tasteImageSet = [
  {
    src: musicianThornApple, title: '쏜애플', contents: '제가 추천하는 뮤지션, "쏜애플"입니다. 개성넘치는 음색과 작품세계가 일품입니다.', alt: 'aa', category: '뮤지션',
  },
  {
    src: youtubeChanelAhaBujang, title: '아하부장', contents: '제 유튜브 구독채널 중에서도 특별히 애정하는 요리채널, 이 채널 덕에 요리가 취미가 되었습니다. 너무 쉽고 맛있는 레시피, 시원시원한 설명, 딱 제 스타일이에요.', alt: '아하부장', category: '유튜브',
  },
  {
    src: musicianMoon, title: '두번째달', contents: '애스닉 퓨전 밴드, 가사없는 연주곡을 많이 갖고 있고, 드라마 "궁"OST로 유명세가 있었습니다. 분위기 있고, 독특합니다.', alt: '두번째달', category: '음악',
  },
  {
    src: tvshowMilitary, title: '강철부대', contents: '요새 너무 재밌게 보고 있습니다. 저는 운동을 잘 안하는 편인데, 대신에 강인한 군인들을 보면서 마치 내가 운동한것처럼 대리만족을 느끼곤 합니다.', alt: '강철부대이미지', category: 'TV쇼',
  },
  {
    src: musicianNell, title: '넬', contents: '처음으로 음반을 사고 콘서트를 예매했던 밴드입니다. 노래를 들은지 20년은 된 것 같은데, 오래오래 갔으면 좋겠네요.', alt: '넬', category: '뮤지션',
  },
  {
    src: novelCold, title: '냉정과열정사이', contents: '냉정과 열정사이, 책도 재밌게 봤고 영화도 재밌게 봤지만, 피렌체에 여자친구랑 여행을 갔을때, 패러디 영상을 찍었던 추억이 있네요. 제게 있어 일본문학 하면 떠오르는 소설로, 특유의 분위기가 마음에 듭니다.', alt: '냉정과열정사이', category: '문학',
  },
  {
    src: musicianCham, title: '참깨와솜사탕', contents: '특별히 좋아하는 인디밴드, 언젠가 딸이랑 같이 공연을 보러가고 싶네요.', alt: '참깨와솜사탕', category: '뮤지션',
  },
  {
    src: musicianAutumnVacation, title: '가을방학', contents: '지금의 부인을 만나게 해줬던 뮤지션, 안타깝게도 최근에 해체해서, 더이상 신곡을 들을 수 없는 밴드입니다. 대표곡은 "취미는 사랑"', alt: '가을방학', category: '뮤지션',
  },
  {
    src: musicianLunch, title: '중식이', contents: '가장 최근에 가장 열심히 듣는 뮤지션, "개똥벌레"라는 노래가 심금을 울립니다. 추천합니다.', alt: '중식이', category: '뮤지션',
  },
  {
    src: tvshowClinic, title: '순풍산부인과', contents: '너무 오래된 시트콤이지만, 혼자 밥먹기 심심할때 유튜브로 보곤 합니다. 미달이가 너무 귀여워서 주로 미달이편을 봅니다.', alt: '순풍산부인과', category: 'tv쇼',
  },
  {
    src: novelZorba, title: '그리스인조르바', contents: '그리스 소설가 니콜스키잔차키스의 대표작, 정말 남자다운 소설이라는 느낌을 받았습니다.', alt: '조르바', category: '문학',
  },
  {
    src: tvshowAgain, title: '또오해영', contents: '작년에 넷플릭스로 뒤늦게 본 드라마, 서현진이라는 배우에 빠지게 된 드라마 입니다. 요즘같은 봄날에 다시 볼만합니다.', alt: '또오해영', category: 'TV쇼',
  },
  {
    src: musicianOlivia, title: '올리비아왕', contents: '싱가폴 가수로 알고 있습니다. 보사노바풍의 노래가 많은데, 음색이 아주 아름답습니다.', alt: '올리비아왕', category: '뮤지션',
  },
  {
    src: musicianClazi, title: '클래지콰이', contents: '요즘엔 알렉스,호란 개별멤버로서 활동이 더 많지만, 노래는 그 이상으로 훌륭합니다. 넬과 함께 20년 이상 열심히 듣는 뮤지션팀', alt: '클래지콰이', category: '뮤지션',
  },
  {
    src: musicianBlackSkirt, title: '검정치마', contents: '콘서트도 갔었고, 꾸준히 신곡발매를 살피는 아주 좋아하는 뮤지션입니다.', alt: '검정치마', category: '뮤지션',
  },
]

const familyImageSet = [
  {
    src: daughterRed, title: '첫째 김서아', contents: '개구쟁이 딸 김서아 입니다. 올해 미운4살을 맞아 저와 기싸움중이지만, 사랑스러울때가 더 많은 착한딸', alt: '김서아',
  },
  {
    src: sonImage, title: '둘째 김영웅(아들)', contents: '4.1일 태어난 따끈따근한 저의 둘째입니다.', alt: '김영웅',
  },
  {
    src: winterPicnic, title: '지난겨울 눈오는 날', contents: '눈이 많이왔던 지난 겨울 어느날, 눈사람을 만들었던 추억입니다.', alt: '눈오는날',
  },
  {
    src: birthdayParty, title: '친가가족', contents: '대전에 사시는 저희 부모님과 파중에서는 남동생 내외 입니다. ', alt: '친가가족',
  },
  {
    src: whiteDress, title: '만삭사진 찍으러 가는 길', contents: '올해3월, 아내와 딸이 만삭사진을 찍으러 가는 길이었습니다. 임신기간 아내가 정말 힘들어했는데, 무사히 출산하여 회복중이라 다행입니다.', alt: '만삭사진찍으러가는날',
  },
  {
    src: wifeFamily, title: '처가가족', contents: '서울에 거주하는 처가식구들입니다. 장인어른과 장모님, 처형네 부부와 쌍둥이들입니다. ', alt: '처가가족담ㄴ체사진',
  },
  {
    src: wifeAndDaughter, title: '아내와 첫째딸', contents: '우리집 미모 1,2위를 담당하고 있는 아내와 딸, 서아입니다.', alt: '모녀',
  },
  {
    src: daughterRiver, title: '한강에 간 서아', contents: '어느 저녁, 한강에 산책을 갔다가 찍은 사진입니다.', alt: '한강서아',
  },
]

export default { tasteImageSet, familyImageSet }
