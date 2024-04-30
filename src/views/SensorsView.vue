<script>
export default {
  name: 'SettingsView',
  data() {
    return {
      sensors: [
        { label: 'Sensor 1', description: 'xxx' },
        { label: 'Sensor 2', description: 'xxx' },
        { label: 'Sensor 3', description: 'xxx' },
        { label: 'Sensor 4', description: 'xxx' },
        { label: 'Sensor 5', description: 'xxx' },
      ],
    };
  },
};
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Sensors</v-card-title>
          <v-table height="200px">
            <tbody>
              <tr v-for="item in sensors" :key="item.label">
                <td>{{ item.label }}:</td>
                <td>{{ item.description }}</td>
                <td class="edit-icon-cell">
                  <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
v-table {
  width: 100%;
  max-width: 400px; /* Adjust as needed */
}
</style>
