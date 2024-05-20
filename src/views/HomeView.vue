<template>
  <v-container fluid>
    <div class="filter_wrapper">
      <v-container>
        <v-menu open-on-click>
          <!-- Category filter-->
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              color="dark-green"
              v-bind="props"
              @click="toggleMenu('categoryMenuOpen')"
            >
              <span>{{ selectedCategory }}</span>
              <v-icon :class="{ 'rotate-180': categoryMenuOpen }" class="ml-1"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(category, index) in categories"
              :key="index"
              @click="
                selectItem(category, 'selectedCategory', 'categoryMenuOpen')
              "
            >
              <v-list-item-title>{{ category }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-click>
          <!-- Date filter-->
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              color="dark-green"
              v-bind="props"
              @click="toggleMenu('dateMenuOpen')"
            >
              <span>{{ selectedTimeFilter }}</span>
              <v-icon :class="{ 'rotate-180': dateMenuOpen }" class="ml-1"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(time, index) in times"
              :key="index"
              @click="selectItem(time, 'selectedTimeFilter', 'dateMenuOpen')"
            >
              <v-list-item-title>{{ time }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </div>

    <v-container>
      <!-- Start measure-->
      <div class="new_measurement">
        <v-menu open-on-click style="cursor: pointer">
          <template v-slot:activator="{ props }">
            <v-btn
              color="dark-green"
              v-bind="props"
              @click="toggleMenu('measureMenuOpen')"
            >
              <span class="text-white"> Measure</span>
              <v-icon
                color="white"
                :class="{ 'rotate-180': measureMenuOpen }"
                class="ml-1"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <new-measurement-dialog @rgb-photos="assignPhotos" type="now" />
            </v-list-item>
            <v-list-item>
              <new-measurement-dialog type="schedule" />
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>

    <v-row v-if="photosRGB?.length > 0" justify="center"> <!-- Table of measurements-->
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4">
          <v-card-title class="headline">History of measurements</v-card-title>
          <v-table height="400px" density="comfortable">
            <tbody>
              <tr v-for="measurement in measurements" :key="measurement.id">
                <td class="font-weight-bold">
                  Measurement {{ measurement.order }}
                </td>
                <td>{{ measurement.date }}</td>
                <td align="right">
                  <measurement-detail
                    :measurement="measurement"
                  ></measurement-detail>
                </td>
                <td align="center">
                  <v-icon @click="downloadMeasurement(item.label)"
                    >mdi-download</v-icon
                  >
                </td>
              </tr>
            <tr v-for="item in rgbData" :key="item.label">
              <td class="font-weight-bold">{{ item.label }}</td>
              <td>{{ item.value }}</td>
              <td align="right">
                <measurement-detail :measurement="item"></measurement-detail>
              </td>
              <td align="center">
                <v-icon @click="download(item)">mdi-download</v-icon>
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
  </v-container>
</template>

<script>
import NewMeasurementDialog from '@/components/NewMeasurementDialog.vue';
import { useMeasurementStore } from '@/store/MeasurementStore';
import MeasurementDetail from "@/components/MeasurementDetail.vue";
import Config from "@/config";
import {mapStores} from "pinia";


export default {
  name: 'HomeView',
  computed: {

    ...mapStores(useMeasurementStore),

    measurements() {
      return useMeasurementStore().measurements;
    },
  },
  data() {
    return {
      rgbData: [],
      measureMenuOpen: false,
      categoryMenuOpen: false,
      categorySelected: false,
      categories: [
        'All categories',
        'RGB camera',
        'Hyperspectral camera',
        'Acoustic Emission',
      ],
      selectedCategory: 'All categories',
      dateMenuOpen: false,
      dateSelected: false,
      photosRGB: [],
      loading: false,
      times: ['From newest', 'From oldest', 'Custom period'],
      selectedTimeFilter: 'From newest',
    };

  },

  components: {
    MeasurementDetail,
    NewMeasurementDialog,
  },

  async created() {
    await useMeasurementStore().loadAll()
    this.photosRGB = await this.measurementStore.getRGBPhotos()
    this.assignCorrectData(this.photosRGB)
  },

  methods: {
    toggleMenu(menu) {
      this[menu] = !this[menu];
    },

    parseCustomDateString(dateString) {
      // Split the date and time components
      const datePart = dateString.split('-').slice(0, 3).join('-');
      const timePart = dateString.split('-').slice(3).join(':');
      return new Date(`${datePart}T${timePart}`);
    },

    async assignCorrectData(photos) {
      this.rgbData = []
      if (Array.isArray(photos) && photos.length > 0) {
        photos.map((photo, index) => {
          this.rgbData.push({label: `RGB measurement ${index} `, value: photo.replace(/_\d+\.png$/, ''), photo: photo})
          // sort by value
          this.rgbData.sort((b, a) => {
            const dateA = this.parseCustomDateString(a.value);
            const dateB = this.parseCustomDateString(b.value);
            return dateA - dateB;
          });
        })
      }
    },

    selectItem(item, selection, menu) {
      this[selection] = item;
      this[menu] = false;
      this.categorySelected = true;
    },

    assignPhotos(photos) {
      this.assignCorrectData(photos)
    },

    download(photo) {
      const link = Config.backendUrl + '/rgb-photos/' + photo.photo
      window.open(link)
    },

    async measureRGB() {
      this.loading = true
      this.photosRGB = await this.measurementStore.measureTestRGB()
      this.assignCorrectData(this.photosRGB)
      this.loading = false
    },

    getImage(photo) {
      return Config.backendUrl + '/rgb-photos/' + photo
    }
  }
}
</script>

<style>
</style>
