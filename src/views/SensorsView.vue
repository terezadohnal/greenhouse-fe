<script>
export default {
  name: 'SettingsView',
  data() {
    return {
      sensors: [
        { label: 'Sensor 1', description: 'This sensor is used for...' },
        { label: 'Sensor 2', description: 'This sensor is used for...' },
        { label: 'Sensor 3', description: 'This sensor is used for...' },
        { label: 'Sensor 4', description: 'This sensor is used for...' },
        { label: 'Sensor 5', description: 'This sensor is used for...' },
      ],
      activeTab: 'rgbCamera',
    };
  },
};
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="tabs">
          <div :class="{ active: activeTab === 'rgbCamera' }" @click="activeTab = 'rgbCamera'">RGB Camera</div>
          <div :class="{ active: activeTab === 'hyperspectralCamera' }" @click="activeTab = 'hyperspectralCamera'">
            Hyperspectral Camera
          </div>
          <div :class="{ active: activeTab === 'acousticEmission' }" @click="activeTab = 'acousticEmission'">Acoustic
            Emission
          </div>
        </div>
        <v-card>
          <div class="tab-content" style="margin: 2%">
            <div v-if="activeTab === 'rgbCamera'">
              <v-card-title class="subtitle">List of sensors</v-card-title>
              <v-row justify="">
                
                <v-col cols="15" sm="12" md="20">

                    <v-table height="320px" density="comfortable">
                      <tbody>
                        <tr class="body_text" v-for="sensor in sensors" :key="sensor.id">
                          <td class="font-weight-bold">{{ sensor.label }}</td>
                          <td>{{ sensor.description }}</td>
                          <td align="right" class="edit-icon-cell">
                            <v-icon @click="switchSensor">mdi mdi-trash-can-outline</v-icon>
                        </td>
                          <td class="switch"><v-switch color="dark-green" label="" style="margin-top: 20px;"></v-switch></td>
                        </tr>
                      </tbody>
                    </v-table>
                  
                </v-col>
              </v-row>
            
            </div>
            <div v-if="activeTab === 'hyperspectralCamera'">
              <v-card-title class="subtitle">List of sensors</v-card-title>
            </div>
            <div v-if="activeTab === 'acousticEmission'">
              <v-card-title class="subtitle">List of sensors</v-card-title>
            </div>
          </div>
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

.switch{
  padding: 0px;
}
</style>
