<template>
  <v-carousel
    cycle
    interval="4000"
    height="120"
    hide-delimiters
    hide-delimiter-background
    show-arrows-on-hover
  >
    <template
      v-for="(info, index) in environmentalOrganizationInfoList"
    >
      <v-carousel-item
        v-if="responseItemShow(index)"
        :key="info.name"
      >
        <v-row>
          <template v-for="(_, i) in columns">
            <template v-if="(index + i) < environmentalOrganizationInfoList.length">
              <v-col
                :key="i"
                class="d-flex justify-center align-center"
              >
                <v-card
                  class="ml-2 d-flex justify-center align-center"
                  hover
                  width="300"
                  height="100"
                  elevation="8"
                  :href="environmentalOrganizationInfoList[index+i].site_url"
                  target="_blank"
                >
                  <div>
                    <v-img
                      width="150"
                      :src="environmentalOrganizationInfoList[index+i].logo_url"
                      :alt="`${environmentalOrganizationInfoList[index+i].name}-logo`"
                    />
                  </div>
                </v-card>
              </v-col>
            </template>
          </template>
        </v-row>
      </v-carousel-item>
    </template>
  </v-carousel>
</template>
<script>
import { environmentalOrganizationInfoList } from '@/data'

export default {
  name: 'EnvironmentalOrganizationCardGroup',
  data: () => ({
    environmentalOrganizationInfoList,
  }),
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.lg) {
        return 4
      }

      if (this.$vuetify.breakpoint.md) {
        return 3
      }

      if (this.$vuetify.breakpoint.sm) {
        return 2
      }

      return 1
    },
  },
  methods: {
    responseItemShow(index) {
      return (index + 1) % this.columns === 1 || this.columns === 1
    },
  },
}
</script>
