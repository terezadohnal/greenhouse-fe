<template>
  <div class="ma-4 pa-4">
    <v-card class="mx-auto my-8" variant="tonal" height="500px" width="500px" color="card_color-darken-4" rounded="xl"
            style="display:flex; flex-direction:column">
      <v-form class="mx-4" v-model="formValid" lazy-validation ref="form" align="center" justify="center">
        <v-row class="mt-10">
          <v-col cols="6">
            <v-text-field
                label="First Name"
                v-model="firstName"
                :rules="[rules.required, rules.length]"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
                label="Last Name"
                v-model="lastName"
                :rules="[rules.required, rules.length]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
            class="my-2"
            label="Username"
            v-model="username"
            :rules="usernameRules"
        ></v-text-field>
        <v-text-field
            class="my-2"
            label="Password"
            v-model="password"
            type="password"
            :rules="[rules.required, rules.password]"
        ></v-text-field>

        <v-btn class="mx-2" @click="register()" color="dark-green">Register</v-btn>
        <v-btn class="mx-2" id="clear" @click="clear">Clear</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "SigninView",

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        password: value => {
          const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
          return pattern.test(value) || 'At least one number, uppercase and lowercase letter. Minimum 8 characters.'
        },
        length: value => (value && value.length >= 5) || 'At least 5 characters',
      },
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 5) || 'Username must be at least 5 characters',
      ],
      formValid: true
    }
  },

  computed: {
  },

  methods: {
    async register(){
      await this.$refs.form.validate();
      if (!this.formValid) return;
      // add the rest after creating userStore
    },

    clear () {
      this.$refs.form.reset()
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.username = ''
      this.password = ''
    },
  }
}
</script>

<style>

</style>
