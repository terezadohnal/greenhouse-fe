<template>
  <v-container fluid>
    <div class="filter_wrapper">
      <v-container>
        <v-menu open-on-click> <!-- Category filter-->
          <template v-slot:activator="{ props }">
            <v-btn variant="text" color="dark-green" v-bind="props" @click="toggleMenu('categoryMenuOpen')">
              <span>{{ selectedCategory }}</span>
              <v-icon :class="{ 'rotate-180': categoryMenuOpen }" class="ml-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(category, index) in categories" :key="index"
                         @click="selectItem(category, 'selectedCategory', 'categoryMenuOpen')">
              <v-list-item-title>{{ category }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-click> <!-- Date filter-->
          <template v-slot:activator="{ props }">
            <v-btn variant="text" color="dark-green" v-bind="props" @click="toggleMenu('dateMenuOpen')">
              <span>{{ selectedTimeFilter }}</span>
              <v-icon :class="{ 'rotate-180': dateMenuOpen }" class="ml-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(time, index) in times" :key="index"
                         @click="selectItem(time, 'selectedTimeFilter', 'dateMenuOpen')">
              <v-list-item-title>{{ time }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </div>

    <v-container> <!-- Start measure-->
      <div class="new_measurement">
        <v-menu open-on-click style="cursor: pointer;">
          <template v-slot:activator="{ props }">
            <v-btn color="dark-green" v-bind="props" @click="toggleMenu('measureMenuOpen')">
              <span class="text-white"> Measure</span>
              <v-icon color="white" :class="{ 'rotate-180': measureMenuOpen }" class="ml-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Right now</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <new-measurement-dialog></new-measurement-dialog>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>

    <v-row justify="center"> <!-- Table of measurements-->
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4">
          <v-card-title class="headline">History of measurements</v-card-title>
          <v-table height="400px" density="comfortable">
            <tbody>
            <tr v-for="measurement in measurements">
              <td class="font-weight-bold">Measurement {{ measurement.order }}</td>
              <td>{{ measurement.date }}</td>
              <td align="right">
                <measurement-detail :measurement="measurement"></measurement-detail>
              </td>
              <td align="center">
                <v-icon @click="download(measurement.name)">mdi-download</v-icon>
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
import NewMeasurementDialog from "@/components/NewMeasurementDialog.vue";
import MeasurementDetail from "@/components/MeasurementDetail.vue";
import {mapStores} from "pinia";
import {useMeasurementStore} from "@/store/MeasurementStore";
import axios from "axios";
import config from "@/config";

export default {
  name: "HomeView",
  computed: {
    ...mapStores(useMeasurementStore),

    measurements() {
      return useMeasurementStore().measurements
    }
  },
  data() {
    return {
      measureMenuOpen: false,
      categoryMenuOpen: false,
      categorySelected: false,
      categories: ["All categories", "RGB camera", "Hyperspectral camera", "Acoustic Emission"],
      selectedCategory: "All categories",
      dateMenuOpen: false,
      dateSelected: false,
      times: ["From newest", "From oldest", "Custom period"],
      selectedTimeFilter: "From newest",
    };

  },

  components: {
    MeasurementDetail, NewMeasurementDialog
  },

  created() {
    useMeasurementStore().loadAll()
  },

  methods: {
    toggleMenu(menu) {
      this[menu] = !this[menu];
    },
    selectItem(item, selection, menu) {
      this[selection] = item;
      this[menu] = false;
      this.categorySelected = true;
    },
    async download(fileName) {
      try {
        await axios.get(`${config.backendUrl}/data/download_data_FileResponse?measurement=${fileName}`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/x-zip-compressed' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          URL.revokeObjectURL(link.href)
        }).catch(console.error)
      } catch (error) {
        console.error('Download failed:', error);
        throw new Error('Cannot download measurement');
      }
    },
  }
}
</script>

<style>
</style>
