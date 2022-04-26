<template>
  <div id="nav">
    <router-link v-for="(menu,i) in category" :key="i" :to=menu.path>
      <div class="navCategory" >
      {{ menu.text }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'app-nav',
      category: [
        { text: 'All', path: '/' },
        { text: '가정', path: 'Home' },
        { text: '바로고', path: 'Barogo' },
        { text: '기타', path: 'etc' },
      ],
    }
  },
}
</script>

<style>
 #nav{
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  grid-area: n;
 }

 .navCategory {
  display:flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50px;
  background-color: #fefefe70;
  margin: 5px;
  border-radius: 5px;
 }

 a{
  text-decoration: none !important;
  font-size: 18px;
  color: black;
  display: inline-block;
  width: 90%
 }

 .navCategory:hover{
   background-color: #efefef;
 }
</style>
