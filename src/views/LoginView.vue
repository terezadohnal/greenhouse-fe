<template>
  <div class="ma-4 pa-4">
    <v-card class="mx-auto my-8" variant="tonal" height="400px" width="420px" color="card_color-darken-4" rounded="xl"
            style="display:flex; flex-direction:column">
      <v-form class="mx-4" v-model="formValid" lazy-validation ref="form" align="center" justify="center">
        <v-text-field
            class="mt-10"
            label="Username"
            v-model="username"
            :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
            class="my-2"
            label="Password"
            v-model="password"
            type="password"
            :rules="[rules.required]"
        ></v-text-field>
        <v-btn @click="login()" color="dark-green" class="mb-8">Log me in</v-btn>
      </v-form>

      <br>
      <div align="center" justify="center">
        Don't have an account?<br>
        <v-btn class="mt-1" rounded="xl" flat variant="outlined" color="dark-green" :to="{name: 'signin'}">Create new account</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "@/store/UserStore";

export default {
  name: "LoginView",

  data() {
    return {
      username: '',
      password: '',
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async login(){
      await this.$refs.form.validate();
      if (!this.formValid) return;

      await useUserStore().login(this.username, this.password)

      if (!useUserStore().error) {
        this.$router.push(useUserStore().afterLoginRoute ?? {name: 'home'})
        useUserStore().setAfterLoginRoute(null)
      }
    }
  }
}
</script>

<style scoped>
</style>
