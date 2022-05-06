<template>
  <router-link to="/main">
    <button
      class="purple-button"
    >
      처음으로
    </button>
  </router-link>
</template>

<style scoped>

.purple-button {
  text-decoration: none;
  position: fixed;
  left: 90%;
  top: 5%;
  z-index: 100;
  color: white;
  background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  cursor: pointer;
  height: 4rem;
  padding: 0 1.6rem;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  transition: all .5s;
}

.purple-button:hover {
  box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
  transition-duration: .1s;
}

@media (min-width: 768px) {
  .purple-button {
    padding: 0 2.6rem;
  }
}
</style>
