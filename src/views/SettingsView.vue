<template>
  <v-container fluid class="mt-8">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4">
          <v-card-title class="subtitle">User Settings</v-card-title>
          <v-table density="comfortable">
            <tbody>
            <tr class="body_text">
              <td>Name:</td>
              <td>{{ userStore.user.firstName }} {{ userStore.user.lastName }}</td>
            </tr>
            <tr class="body_text">
              <td>Email:</td>
              <td>{{ userStore.user.email }}</td>
            </tr>
            <tr class="body_text">
              <td>Username:</td>
              <td>{{ userStore.user.username }}</td>
            </tr>
            <tr class="body_text">
              <td>Role:</td>
              <td>{{ userStore.user.role }}</td>
            </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid v-if="userStore.user.role === 'admin'">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4">
          <v-card-title class="subtitle">Permission Settings</v-card-title>
          <v-table height="220px" density="comfortable">
            <tbody>
            <tr class="body_text" v-for="oneUser in users" :key="oneUser.id">
              <td>{{ oneUser.first_name }} {{ oneUser.last_name }}</td>
              <td>{{ oneUser.role }}</td>
              <td align="right" class="edit-icon-cell">
                <edit-dialog :user="oneUser"></edit-dialog>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {useUserStore} from "@/store/UserStore";
import {mapStores} from "pinia";
import EditDialog from "@/components/EditUser.vue";
export default {
  name: "SettingsView",
  data() {
    return {};
  },

  components: {
    EditDialog
  },

  computed: {
    ...mapStores(useUserStore),

    users() {
      return useUserStore().users
    }
  },

  created() {
    useUserStore().loadAll()
  }
}
</script>

<style>
v-table {
  width: 100%;
  max-width: 400px;
}
</style>