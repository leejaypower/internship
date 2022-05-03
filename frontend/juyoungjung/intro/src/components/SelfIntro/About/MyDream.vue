<template>
  <section
    id="MyDream"
    class="about"
  >
    <v-container>
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <div class="img_container">
            <img
              src="~@/assets/images/tech_tree.png"
              alt="tech_tree"
            >
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="text_container">
            <span>{{ text }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'MyDream',
  props: {
    isKor: Boolean,
  },
  data() {
    return { text: '제가 개발자로서 가진 미션은 "제가 가진 지식과 기술로 돈보다 사람이 먼저인 세상을 만들어간다"라고 생각하고 있습니다. 그래서 저의 비전은 "사람이 중심인 소프트웨어를 만드는데 기여하는 것"입니다. 국제적인 환경, 인권, 빈부격차 등의 문제를 해결위한 프로젝트에 프로그래머로서 기여하는 것이 저의 꿈입니다.' }
  },
  watch: {
    isKor() {
      this.text = this.isKor
        ? '제가 개발자로서 가진 미션은 "제가 가진 지식과 기술로 돈보다 사람이 먼저인 세상을 만들어간다"라고 생각하고 있습니다. 그래서 저의 비전은 "사람이 중심인 소프트웨어를 만드는데 기여하는 것"입니다. 국제적인 환경, 인권, 빈부격차 등의 문제를 해결위한 프로젝트에 프로그래머로서 기여하는 것이 저의 꿈입니다.'
        : 'My mission as a programmer is “To create a world where people come before money with my knowledge and skills." So my vision is "To contribute to creating human-centered software." My dream is to contribute as a programmer to projects to solve problems such as the international environment, human rights, and the gap between the rich and the poor.'
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/self_intro.scss';

.img_container {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
