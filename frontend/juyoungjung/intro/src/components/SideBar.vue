<template>
  <v-container class="sidebar_wrapper">
    <div :class="sectionsMenuClass">
      <span
        v-for="(name, index) in subMenuName"
        :key="index"
        class="menu-point"
        :class="{ active: name.eng === activeSectionName }"
      />
    </div>
    <v-row justify="center">
      <div>
        <ul>
          <li
            v-for="(name, index) in subMenuName"
            :key="name.eng"
            :class="subMenuClass"
          >
            <v-btn
              :dark="isSelfPage"
              :light="!isSelfPage"
              text
              x-small
              @click="changeMenuPointClassActive(index)"
            >
              <a
                v-if="isKor"
                :href="`#${name.eng}`"
              >
                {{ name.kor }}
              </a>
              <a
                v-else
                :href="`#${name.eng}`"
              >
                {{ name.eng }}
              </a>
            </v-btn>
          </li>
        </ul>
      </div>
    </v-row>
    <v-row justify="center">
      <router-link :to="`/${titleMenuName.eng}`">
        <v-btn
          :dark="isSelfPage"
          :light="!isSelfPage"
          text
          x-small
          class="title-menu-btn"
        >
          <p v-if="isKor">
            {{ titleMenuName.kor }}
          </p>
          <p v-else>
            {{ titleMenuName.eng }}
          </p>
          <v-icon> mdi-import </v-icon>
        </v-btn>
      </router-link>
    </v-row>
  </v-container>
</template>
<script>
import { SelfIntroMenu, BarogoIntroMenu } from '../data'

export default {
  name: 'SideBar',
  props: {
    isKor: Boolean,
  },
  data() {
    return {
      isSelfPage: true,
      titleMenuName: BarogoIntroMenu.title,
      subMenuName: SelfIntroMenu.sub,
      sectionObserver: null,
      activeSectionName: 'LandingPage',
    }
  },
  computed: {
    sectionsMenuClass() {
      return `sections-menu ${!this.isSelfPage ? 'barogo' : ''}`
    },
    subMenuClass() {
      return `sub-menu ${!this.isSelfPage ? 'barogo' : ''}`
    },
  },
  created() {
    if (this.$route.path === '/BarogoIntro') {
      this.isSelfPage = false
      this.titleMenuName = SelfIntroMenu.title
      this.subMenuName = BarogoIntroMenu.sub
    } else {
      this.titleMenuName = BarogoIntroMenu.title
      this.subMenuName = SelfIntroMenu.sub
    }
  },
  mounted() {
    this.observeSections()
  },
  methods: {
    changeMenuPointClassActive(index) {
      this.activeSectionName = this.subMenuName[index].eng
    },
    observeSections() {
      this.sectionObserver?.disconnect()

      const options = {
        rootMargin: '0px 0px',
        threshold: 1,
      }

      this.sectionObserver = new IntersectionObserver(
        this.sectionObserverHandler,
        options,
      )

      const sections = document.getElementsByTagName('section')

      for (let id = 0; id < sections.length; id += 1) {
        this.sectionObserver?.observe(sections[id])
      }
    },
    sectionObserverHandler(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id
          this.activeSectionName = targetId
          if (this.$route.hash !== `#${this.activeSectionName}`) {
            this.$router.push({ name: this.$route.name, hash: `#${this.activeSectionName}` })
          }
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>

.sidebar_wrapper {
  padding: 24px;
  position: fixed;
  top: 150px;
  right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 130px;
  z-index: 1;
}

.sections-menu {
  position: fixed;
  right: 135px;
  top: 145px;
}

.menu-point {
  width: 2px;
  height: 2px;
  border-radius: 100%;
  background-color: #fff;
  display: block;
  margin: 1.89rem 0;
  opacity: 0;
  transition: 0.4s ease all;
  cursor: pointer;
}

.sections-menu .menu-point.active {
  opacity: 1;
  transform: scale(1.5);
}

.sections-menu.barogo .menu-point {
  background-color: #3f51b5;
}

.sub-menu {
  a {
    color: #fff;
  }
}

.sub-menu.barogo {
  a {
    color: #3f51b5;
  }
}

.v-application p {
  margin: 0;
}

ul {
  padding: 0;
  list-style-type: none;
  li {
    padding: 5px 0;
  }
}

.title-menu-btn {
  margin-top: 14px;

  p {
    margin-right: 5px;
  }
}

@media screen and (max-width: 1200px) {
  h1 {
    font-size: 2.5em;
  }
}
</style>
