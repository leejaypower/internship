<template>
  <v-row>
    <v-col class="d-flex justify-center my-6">
      <v-lazy
        transition="slide-x-transition"
      >
        <v-card
          height="275"
          :href="'https://data.kma.go.kr/normals/index.do'"
          target="_blank"
          elevation="8"
          hover
        >
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <img
                width="100%"
                src="@/assets/images/kma-main-page.png"
                alt="kma-sites"
                v-bind="attrs"
                v-on="on"
              >
            </template>
            <span>기후평년값에 대해 더 자세히 알아보러 가기</span>
          </v-tooltip>
        </v-card>
      </v-lazy>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'KMAMainPageCard',
}
</script>
