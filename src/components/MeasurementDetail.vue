<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" size="20">mdi-eye-outline</v-icon>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card rounded="xl">
        <v-row justify="space-between" class="align-center">
          <v-col class="pr-4" cols="auto">
            <v-card-title class="text-h5">Measurement Information</v-card-title>
          </v-col>
          <v-col class="pr-6" cols="auto">
            <v-icon @click="() => (isActive.value = false)" size="30"
              >mdi-close</v-icon
            >
          </v-col>
        </v-row>
        <v-list lines="two" class="ml-2">
          <v-list-item
            v-if="measurement.label || measurement.order"
            title="Title"
            :subtitle="measurement.label ?? 'Measurement ' + measurement.order"
          ></v-list-item>
          <v-list-item
            v-if="measurement.value || measurement.date"
            title="Date"
            :subtitle="
              'This measurement took place on: ' +
              (measurement.value ?? measurement.date)
            "
          ></v-list-item>
          <v-list-item
            title="Type of measurement"
            :subtitle="
              measurement.label?.includes('RGB')
                ? 'RGB'
                : measurement.label?.includes('Hyperspectral')
                ? 'Hyperspectral camera'
                : 'Acoustic Emission'
            "
          ></v-list-item>
          <v-list-item title="Images">
            <v-img
              aspect-ratio="1"
              class="grey lighten-2"
              :src="getImage(measurement.photo)"
            ></v-img>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mr-2 mb-2"
            variant="tonal"
            color="dark-green"
            text="Download"
            @click="
              download(measurement.photo);
              isActive.value = false;
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { useMeasurementStore } from '@/store/MeasurementStore';
import { mapStores } from 'pinia';
import Config from '@/config';

export default {
  name: 'MeasurementDetail',

  data() {
    return {
      opened: false,
    };
  },

  props: {
    measurement: Object,
  },

  computed: {
    ...mapStores(useMeasurementStore),
  },

  methods: {
    async download(url) {
      const link = Config.backendUrl + '/rgb-photos/' + url;
      window.open(link);
    },

    getImage(photo) {
      return Config.backendUrl + '/rgb-photos/' + photo;
    },
  },
};
</script>
<style></style>
