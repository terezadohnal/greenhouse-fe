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

    <v-row v-if="photosRGB.length > 0" justify="center"> <!-- Table of measurements-->
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4">
          <v-card-title class="headline">History of RGB measurements</v-card-title>
          <v-table height="400px" density="comfortable">
            <tbody>
            <tr v-for="item in rgbData" :key="item.label">
              <td class="font-weight-bold">{{ item.label }}</td>
              <td>{{ item.value }}</td>
              <td align="right">
                <measurement-detail :measurement="item"></measurement-detail>
              </td>
              <td align="center">
                <v-icon @click="downloadMeasurement(item.label)">mdi-download</v-icon>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4">
          <v-card-title class="headline">There are no measurements at this time</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn variant="outlined" @click="measureRGB">
          Measure RGB
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="photo in photosRGB">
        <v-img
          :src="getImage(photo)"
          aspect-ratio="1"
          class="grey lighten-2"
        >

        </v-img>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import MeasurementDetail from "@/components/MeasurementDetail.vue";
import NewMeasurementDialog from "@/components/NewMeasurementDialog.vue";
import measurementDetail from "@/components/MeasurementDetail.vue";
import { useMeasurementStore } from "@/store/MeasurementStore";
import {mapStores} from "pinia";
import Config from "@/config";

export default {
  name: "HomeView",
  computed: {

    ...mapStores(useMeasurementStore),

  },

  data() {
    return {
      rgbData: [],
      measureMenuOpen: false,
      categoryMenuOpen: false,
      categorySelected: false,
      categories: ["All categories", "RGB camera", "Hyperspectral camera", "Acoustic Emission"],
      selectedCategory: "All categories",
      dateMenuOpen: false,
      dateSelected: false,
      times: ["From newest", "From oldest", "Custom period"],
      selectedTimeFilter: "From newest",
      photosRGB: [],
      loading: false
    };

  },

  components: {
    MeasurementDetail, NewMeasurementDialog
  },

  async created() {
    this.photosRGB = await this.measurementStore.getRGBPhotos()
    console.log(this.photosRGB)
    this.photosRGB.map((photo, index) => {
      this.rgbData.push({label: `RGB measurement ${index} `, value: photo})
    })
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

    async measureRGB() {
      this.loading = true
      this.photosRGB = await this.measurementStore.measureTestRGB()
      this.rgbData = []
      this.photosRGB.map((photo, index) => {
        this.rgbData.push({label: `RGB measurement ${index} `, value: photo})
      })
      this.loading = false
    },

    getImage(photo) {
      console.log(Config.backendUrl + '/rgb-photos/' + photo)
      return Config.backendUrl + '/rgb-photos/' + photo
    }
  }
}
</script>

<style>
</style>
