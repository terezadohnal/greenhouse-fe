<template>
  <nav>
    <v-app-bar flat color="white">
      <v-app-bar-title class="mx-2 hidden-md-and-down">
        <span class="font-weight-bold nav_element">Acoustic</span>
        <span class="nav_element">Emission</span>
      </v-app-bar-title>

      <div class="hidden-sm-and-down">
        <v-btn class="mr-2">
          <span class="nav_element">Home</span>
        </v-btn>
        <v-btn class="mx-2">
          <span class="nav_element">Sensors</span>
        </v-btn>
        <v-btn class="mx-2">
          <span class="nav_element">Settings</span>
        </v-btn>
      </div>

      <v-spacer class="hidden-md-and-down"></v-spacer>

      <v-btn
          color="black"
          icon="mdi-account-circle"
          v-bind="props"
      ></v-btn>

    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.nav_element {
  font-family: "Outfit", sans-serif;
  font-size: 24px;
  line-height: 27px;
  text-transform: capitalize;
  color: #40242b;
  font-weight: normal;
}
</style>