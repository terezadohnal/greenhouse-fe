<template>
  <v-container fluid fill-height class="ma-0 pa-0">
    <div class="fullscreen-image pt-16">
      <v-row align="center" justify="center" fill-height class="mt-20">
        <!-- Empty Column -->
        <v-col cols="6"></v-col>

        <!-- Title Column -->
        <v-col cols="6">
          <div class="landing_page_title">
            <span>Acoustic</span><br />
            <span class="pl-8">Emission</span>
          </div>

          <div align="center" class="mt-10 mr-16">
            <v-btn
              rounded="xl"
              size="large"
              :to="{ name: 'login' }"
              color="almost-white"
              style="width: 300px"
              >Log in</v-btn
            ><br />
            <v-btn
              :to="{ name: 'signin' }"
              rounded="xl"
              size="large"
              class="mt-6"
              color="almost-white"
              style="width: 300px"
              >Create new account</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'LandingView',
};
</script>

<style>
.fullscreen-image {
  background-image: url('@/assets/loading_image.png');
  background-position: center;
  background-size: cover;
  height: 100vh;
  opacity: 90%;
}
</style>
