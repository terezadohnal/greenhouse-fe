<script>

export default {
  name: "SettingsView",
    data() {
      return {
        userData: [
          { label: 'Name', value: 'xxx' },
          { label: 'Email Address', value: 'xx' },
          { label: 'Username', value: 'xx' },
          { label: 'Password', value: '********' },
          { label: 'Role', value: 'admin' },
        ],
        roleData: [
          { name: 'Lena Todosijević', role: 'user' },
          { name: 'Kateřina Dvořáková', role: 'user' },
          { name: 'Tereza Dohnalová', role: 'user' },
          { name: 'Juraj Křiššak', role: 'user' },
          { name: 'Eliška Chylíková', role: 'admin' },
        ]
      };
    }
}

</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">User Settings</v-card-title>
          <v-table density="compact">
            <tbody>
            <tr v-for="item in userData" :key="item.label">
              <td>{{ item.label }}:</td>
              <td>{{ item.value }}</td>
              <td class="edit-icon-cell"><v-icon @click="editItem(item)">mdi-pencil</v-icon></td>
            </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Permission Settings</v-card-title>
          <v-table height="200px">
            <tbody>
            <tr v-for="item in roleData" :key="item.name">
              <td>{{ item.name }}:</td>
              <td>{{ item.role }}</td>
              <td class="edit-icon-cell"><v-icon @click="editItem(item)">mdi-pencil</v-icon></td>
            </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>



<style>

v-table {
  width: 100%;
  max-width: 400px;
}

</style>