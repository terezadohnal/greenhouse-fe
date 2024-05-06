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
        <v-card elevation="4">
          <v-card-title class="subtitle">Sensors</v-card-title>
          <v-table height="220px" density="comfortable">
            <tbody>
              <tr class="body_text" v-for="sensor in sensors" :key="sensor.id">
                <td>{{ sensor.label }}</td>
                <td>{{ sensor.description }}</td>
                <td align="right" class="edit-icon-cell">
                  <v-icon size="20" @click="editItem(item)">mdi-pencil</v-icon>
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
