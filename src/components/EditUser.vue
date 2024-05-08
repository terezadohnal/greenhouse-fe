<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" size="20">mdi-pencil</v-icon>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-account" title="User Information" rounded="xl">
        <v-card-text class="mt-4">
          <v-form v-model="formValid" lazy-validation ref="form">
            <v-text-field clearable variant="outlined" label="Name" v-model="name"
                          :rules="[rules.required, rules.name]"></v-text-field>
            <v-text-field clearable variant="outlined" label="E-mail" v-model="email"
                          :rules="[rules.required, rules.email]"></v-text-field>
            <v-text-field clearable variant="outlined" label="Username" v-model="username"
                          :rules="usernameRules"></v-text-field>
            <v-text-field clearable variant="outlined" label="Role" v-model="role"
                          :rules="[rules.required, rules.role]"></v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                variant="text"
                text="Update"
                @click="updateUser; isActive.value = false"
                color="dark-green"
            ></v-btn>
          </v-card-actions>


          <v-divider class="mx-2 mt-2"></v-divider>
          <v-expand-transition>
            <div v-if="expand" class="pt-2">
              <v-card-title>Enter new password</v-card-title>
              <v-text-field ref="pass" clearable variant="outlined" label="New password" v-model="password"
                            :rules="[rules.required, rules.password]"></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    variant="text"
                    text="Reset"
                    @click="passwordReset();expand = !expand; this.$refs.pass.reset()"
                    color="dark-green"
                ></v-btn>
              </v-card-actions>
            </div>
          </v-expand-transition>
          <v-card-actions>
            <v-btn
                variant="text"
                :text="!expand ? 'Reset password?' : 'Cancel'"
                @click="expand = !expand"
            ></v-btn>
          </v-card-actions>

        </v-card-text>

      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import {useUserStore} from "@/store/UserStore";
import {mapStores} from "pinia";

export default {
  name: "EditDialog",

  data() {
    return {
      name: this.user.first_name + ' ' + this.user.last_name,
      email: this.user.email,
      username: this.user.username,
      password: '',
      role: this.user.role,
      formValid: true,
      expand: false,

      rules: {
        required: value => !!value || 'Required.',
        length: value => (value && value.length >= 5) || 'At least 3 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        name: value => {
          const pattern = /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/;
          return pattern.test(value) || 'Enter both first and last name (each at least 3 characters long).'
        },
        password: value => {
          const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
          return pattern.test(value) || 'At least one number, uppercase and lowercase letter. Minimum 8 characters.'
        },
        role: value => {
          const pattern = /^(admin|user)$/;
          return pattern.test(value) || 'Role can only be "admin" or "user".';
        },
      },
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 5) || 'Username must be at least 5 characters',
      ],
    }
  },

  props: {
    user: Object
  },

  computed: {
    ...mapStores(useUserStore)
  },

  methods: {
    async updateUser() {
      // Split name into first name and last name
      const nameParts = this.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' '); // In case of multiple parts

      // Validate form
      await this.$refs.form.validate();
      if (!this.formValid) return;

      // Update user
      await useUserStore().editUser(this.user.id, firstName, lastName, this.email, this.username, this.role);
    },

    async passwordReset() {
      await useUserStore().resetPassword(this.user.id, this.password);
    },
  }
}
</script>

<style>

</style>