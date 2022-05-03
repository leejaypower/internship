<template>
  <div class="nav-container">
    <nav>
      <router-link to="/intro/me">
        <span>Me</span>
      </router-link>
      <span class="division">|</span>
      <router-link to="/intro/company">
        <span>Company</span>
      </router-link>
    </nav>
    <aside class="current-section-container">
      <ul>
        <li
          v-for="{id, title} in titles"
          :key="id"
        >
          <a
            :class="{active: isCurentA(title)}"
            :href="`#${title}`"
          >{{ title }}</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { meInfo, companyInfo } from '../data'

export default {
  data() {
    return {
      currentA: '',
    }
  },
  computed: {
    titles() {
      const me = meInfo.map(({ id, title }) => ({ id, title }))
      const company = companyInfo.map(({ id, title }) => ({ id, title }))
      if (this.path === '/intro/me') {
        return me
      }
      return company
    },
    path() {
      return this.$route.path
    },
  },
  mounted() {
    const sections = document.querySelectorAll('section')
    const options = { threshold: 0.6 }

    sections.forEach((el) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const title = entry.target.id
          if (entry.isIntersecting) {
            this.currentA = title
          }
        })
      }, options)

      observer.observe(el)
    })
  },
  updated() {
    const sections = document.querySelectorAll('section')
    const options = { threshold: 0.6 }

    sections.forEach((el) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const title = entry.target.id
          if (entry.isIntersecting) {
            this.currentA = title
          }
        })
      }, options)

      observer.observe(el)
    })
  },
  methods: {
    isCurentA(title) {
      return this.currentA === title
    },
  },
}
</script>

<style scoped>
  .nav-container {
    position: fixed;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  nav {
    border: 3px solid;
    border-radius: 10px;
    padding: 10px;
    background-color: #fff;
  }
  nav a {
    font-size: 18px;
    font-weight: bold;
  }
  nav a.router-link-active {
    color: #42b983;
  }
  .division {
    padding: 0 10px;
  }
  .current-section-container {
    margin-top: 2px;
    border: 3px solid;
    border-radius: 10px;
    padding: 0 8px 8px;
    background-color: #fff;
  }
  .current-section-container ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .current-section-container ul li {
    padding-top: 8px;
    font-size: 12px;
    transition: .1s ease-in-out;
  }
  .current-section-container ul li:hover {
    transform: scale(1.1);
  }

  .current-section-container ul li:hover a{
    color: #42b983;
  }

  a.active{
    color: #42b983;
  }

  @media screen and (max-width: 400px){
    nav {
      border: 2px solid;
      padding: 5px;
    }
    nav a {
      font-size: 15px;
    }
    .current-section-container {
      border: 2px solid;
      padding: 0 3px 3px;
    }
    .current-section-container ul li {
      padding-top: 3px;
    }
    .current-section-container ul li a{
      font-size: 10px;
    }
  }
</style>
