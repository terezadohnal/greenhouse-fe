<template>
  <v-container fluid>
    <div class="filter_wrapper">
      <v-row>
        <v-col md="3">
          <!-- Category filter-->
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Category"
            item-title="text"
            item-value="value"
            variant="underlined"
            hide-details
            dense
          />
        </v-col>
        <!-- Date filter-->
        <v-col md="3">
          <v-select
            v-model="selectedTimeFilter"
            :items="timeOrder"
            label="Date"
            item-title="text"
            item-value="value"
            variant="underlined"
            dense
          />
        </v-col>
      </v-row>
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

    <v-row
      v-if="!filteredMeasurements.length || !rgbData.length"
      justify="center"
    >
      <!-- Table of measurements-->
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="4">
          <v-card-title class="headline">History of measurements</v-card-title>
          <v-table height="400px" density="comfortable">
            <tbody>
              <tr
                v-for="measurement in filteredMeasurements"
                :key="measurement.id"
              >
                <td class="font-weight-bold">
                  Measurement {{ measurement.order }}
                </td>
                <td>{{ measurement.measure }}</td>
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
          <v-card-title class="headline"
            >There are no measurements at this time</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewMeasurementDialog from '@/components/NewMeasurementDialog.vue';
import MeasurementDetail from '@/components/MeasurementDetail.vue';
import { mapActions, mapState } from 'pinia';
import { useMeasurementStore } from '@/store/MeasurementStore';
import { categories, timeOrder } from '../helpers/constants';
import Config from '@/config';

export default {
  name: 'HomeView',
  components: {
    MeasurementDetail,
    NewMeasurementDialog,
  },
  data() {
    return {
      rgbData: [],
      measureMenuOpen: false,
      categoryMenuOpen: false,
      categorySelected: false,
      dateMenuOpen: false,
      dateSelected: false,
      categories,
      selectedCategory: 'ALL',
      timeOrder,
      selectedTimeFilter: 'DESC',
      photosRGB: [],
      loading: false,
    };
  },

  computed: {
    ...mapState(useMeasurementStore, ['measurements']),

    filteredMeasurements() {
      let filtered = this.measurements;

      console.log({ measurement: this.measurements });

      // Filter by category
      if (this.selectedCategory === 'RGB') {
        filtered = filtered.filter((measurement) => measurement.isCamera);
      } else if (this.selectedCategory === 'AE') {
        filtered = filtered.filter((measurement) => measurement.isAcoustic);
      } else if (this.selectedCategory === 'HS') {
        filtered = [];
      }

      // Sort by date (measure)
      if (this.selectedTimeFilter === 'DESC') {
        filtered = filtered.sort(
          (a, b) => new Date(b.measure) - new Date(a.measure)
        );
      } else if (this.selectedTimeFilter === 'ASC') {
        filtered = filtered.sort(
          (a, b) => new Date(a.measure) - new Date(b.measure)
        );
      }

      return filtered;
    },
  },

  methods: {
    ...mapActions(useMeasurementStore, [
      'loadAll',
      'measureTestRGB',
      'getRGBPhotos',
    ]),
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
      this.rgbData = [];
      if (photos) {
        photos.map((photo, index) => {
          this.rgbData.push({
            label: `RGB measurement ${index} `,
            value: photo.replace(/_\d+\.png$/, ''),
            photo: photo,
          });
          // sort by value
          this.rgbData.sort((b, a) => {
            const dateA = this.parseCustomDateString(a.value);
            const dateB = this.parseCustomDateString(b.value);
            return dateA - dateB;
          });
        });
      }
    },

    selectItem(item, selection, menu) {
      this[selection] = item;
      this[menu] = false;
      this.categorySelected = true;
    },

    assignPhotos(photos) {
      this.assignCorrectData(photos);
    },

    download(photo) {
      const link = Config.backendUrl + '/rgb-photos/' + photo.photo;
      window.open(link);
    },

    async measureRGB() {
      this.loading = true;
      this.photosRGB = await this.measureTestRGB();
      this.assignCorrectData(this.photosRGB);
      this.loading = false;
    },

    getImage(photo) {
      return Config.backendUrl + '/rgb-photos/' + photo;
    },
  },

  async created() {
    this.photosRGB = await this.getRGBPhotos();
    this.assignCorrectData(this.photosRGB);
  },

  async mounted() {
    await this.loadAll();
  },
};
</script>

<style></style>
