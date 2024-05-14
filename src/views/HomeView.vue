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
              <new-measurement-dialog type="now" />
            </v-list-item>
            <v-list-item>
              <new-measurement-dialog type="schedule" />
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
              <tr v-for="item in userData" :key="item.label">
                <td class="font-weight-bold">{{ item.label }}</td>
                <td>{{ item.value }}</td>
                <td align="right">
                  <measurement-detail></measurement-detail>
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
import MeasurementDetail from '@/components/MeasurementDetail.vue';
import NewMeasurementDialog from '@/components/NewMeasurementDialog.vue';
import measurementDetail from '@/components/MeasurementDetail.vue';

export default {
  name: 'HomeView',
  computed: {
    measurementDetail() {
      return measurementDetail;
    },
  },
  data() {
    return {
      userData: [
        { label: 'Measurement 1', value: '2024/04/05' },
        { label: 'Measurement 2', value: '2024/04/05' },
        { label: 'Measurement 3', value: '2024/04/05' },
        { label: 'Measurement 4', value: '2024/04/05' },
        { label: 'Measurement 5', value: '2024/04/05' },
        { label: 'Measurement 6', value: '2024/04/05' },
        { label: 'Measurement 7', value: '2024/04/05' },
        { label: 'Measurement 8', value: '2024/04/05' },
        { label: 'Measurement 9', value: '2024/04/05' },
        { label: 'Measurement 10', value: '2024/04/05' },
      ],

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
      times: ['From newest', 'From oldest', 'Custom period'],
      selectedTimeFilter: 'From newest',
    };
  },

  components: {
    MeasurementDetail,
    NewMeasurementDialog,
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
  },
};
</script>

<style></style>
