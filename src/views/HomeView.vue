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
              <v-list-item-title>Right now</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <new-measurement-dialog></new-measurement-dialog>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>

    <v-row justify="center">
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
            </tbody>
          </v-table>
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

export default {
  name: 'HomeView',
  components: {
    MeasurementDetail,
    NewMeasurementDialog,
  },
  data() {
    return {
      measureMenuOpen: false,
      categoryMenuOpen: false,
      categorySelected: false,
      dateMenuOpen: false,
      dateSelected: false,
      categories,
      selectedCategory: 'ALL',
      timeOrder,
      selectedTimeFilter: 'DESC',
    };
  },

  computed: {
    ...mapState(useMeasurementStore, ['measurements']),

    filteredMeasurements() {
      let filtered = this.measurements;

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
    ...mapActions(useMeasurementStore, ['loadAll']),
    toggleMenu(menu) {
      this[menu] = !this[menu];
    },
  },

  async mounted() {
    await this.loadAll();
  },
};
</script>

<style></style>
