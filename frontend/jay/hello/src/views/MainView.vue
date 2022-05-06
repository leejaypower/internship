<template>
  <transition
    name="slide-fade"
  >
    <article>
      <section>
        <h1>안녕하세요.</h1>
        <p>바로고 아카데미실 프론트엔드 인턴 이제이입니다.</p>
      </section>
      <section>
        <h2>바로고에 대해서 궁금하세요?</h2>
        <router-link
          to="/barogo"
        >
          더 알아보기
        </router-link>
      </section>
      <section>
        <h2>제가 누군지 궁금하신가요?</h2>
        <router-link
          to="/me"
        >
          더 알아보기
        </router-link>
      </section>
    </article>
  </transition>
</template>

<script>

export default {
}
</script>

<style scoped>

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(0.755, 0.050, 0.855, 0.060);
}
.slide-fade-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}

article{
  text-align: center;

}

section{
  margin-bottom: 15vw;
}

h1{
  font-size: 10vw;
  font-weight: 400;
}

h2{
  font-size: 5vw;
  font-weight: 400;
  margin-bottom: 3vw;
}

p{
  font-size: 2vw;
}

section > a{
   color: #0066cc;
   font-size: 1.5vw;
   text-decoration: none;
   outline: none;
}

a:hover{
  text-decoration: underline;
}

img{
  width: 30%;
}

</style>
