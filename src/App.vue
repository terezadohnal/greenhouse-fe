<template>
  <v-app>
    <Navbar v-if="isAuthenticated"/>
    <v-main>
		<router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/UserStore.js";

export default {
  name: 'App',
  components: {Navbar},

  computed: {
    ...mapStores(useUserStore),

    isAuthenticated() {
      return useUserStore().isAuthenticated
    },
  },

  data () {
	return {
	  //
	}
  },
}

</script>

<style>
.nav_element {
  font-family: "Outfit", sans-serif;
  font-size: 24px;
  line-height: 27px;
  color: #323232;
  text-transform: capitalize;
  font-weight: normal;
}

.landing_page_title {
  font-family: "Outfit", sans-serif;
  font-size: 90px;
  text-transform: capitalize;
  color:#FAFFF3;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 2px 2px 2px #323232;
}

.body_text {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 27px;
  color: #323232;
}

.subtitle {
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  line-height: 27px;
  color: #323232;
  font-weight: bolder;
  letter-spacing: 1px;
}

</style>
