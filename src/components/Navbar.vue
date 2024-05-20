<template>
  <nav>
    <v-app-bar flat color="dark-green">
      <v-app-bar-title class="mx-2 hidden-md-and-down">
        <span class="font-weight-bold nav_element">Acoustic</span>
        <span class="nav_element">Emission</span>
      </v-app-bar-title>

      <div class="hidden-sm-and-down">
        <v-btn :to="{ name: 'home' }" class="mr-2 ml-12">
          <span class="nav_element">Measurements</span>
        </v-btn>
        <v-btn :to="{name: 'config'}" class="mx-2">
          <span class="nav_element">Configuration</span>
        </v-btn>
        <v-btn :to="{ name: 'sensors' }" class="mx-2">
          <span class="nav_element">Sensors</span>
        </v-btn>
        <v-btn :to="{name: 'settings'}" class="mx-2">
          <span class="nav_element">Settings</span>
        </v-btn>
      </div>

      <v-spacer class="hidden-md-and-down"></v-spacer>

      <v-switch color="black" v-model="mode" value="test" @change="changeMode" class="mr-4" hide-details label="Test mode" inset></v-switch>

      <v-menu anchor="bottom end" v-model="userMenuShown">
        <template v-slot:activator="{ props }">
          <v-btn color="black" icon="mdi-account-circle" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item v-if="isAuthenticated" @click="logout()">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
import { useUserStore } from '@/store/UserStore';
import { useModeStore} from "@/store/ModeStore";
import { mapStores } from 'pinia';

export default {
  name: 'Navbar',

  data() {
    return {
      userMenuShown: false,
      mode: ""
    };
  },

  created() {
    this.mode = useModeStore().getMode
    console.log(this.mode)
  },

  computed: {
    ...mapStores(useUserStore),
    ...mapStores(useModeStore),

    isAuthenticated() {
      return useUserStore().isAuthenticated;
    },


  },

  methods: {
    logout() {
      useUserStore().logout();
      this.$router.push({ name: 'landing' });
      this.userMenuShown = false;
    },

    changeMode() {
      useModeStore().setMode(this.mode === "test" ? "test" : "production");

    }
  },
};
</script>

<style></style>
