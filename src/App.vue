<template>
  <v-app>
    <Navbar/>
    <v-main>
		<router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'App',
  components: {Navbar},

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
  text-transform: capitalize;
  color: #40242b;
  font-weight: normal;
}

</style>
