<template>
  <v-dialog v max-width="500">
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
            <v-icon @click="() => isActive.value = false" size="30">mdi-close-circle</v-icon>
          </v-col>
        </v-row>
        <v-list lines="two" class="ml-2">
          <v-list-item title="Title" subtitle="Measurement 1"></v-list-item>
          <v-list-item title="Date" :subtitle="'This measurement took place on: '+ 'date'"></v-list-item>
          <v-list-item title="Type of measurement" subtitle="type"></v-list-item>
          <v-list-item title="Images"> <!--v-if="measurement.type === 'RGB'"-->
            <v-img class="mt-2" src='@/assets/loading_image.png'></v-img>
          </v-list-item>
        </v-list>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="mr-2 mb-2"
              variant="tonal"
              color="dark-green"
              text="Download"
              @click="download(measurement); isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script >
//import {useMeasurementStore} from "@/store/MeasurementStore";
//import {mapStores} from "pinia";

export default {
  name: "MeasurementDetail",

  data() {
    return {
      opened: false,
    }
  },

  props: {
    measurement: Object,
  },

  computed: {
    //...mapStores(useMeasurementStore)
  },

  created() {
    console.log(this.measurement)
  },

  methods: {
    async download(measurement) {
    },
  }
}
</script>

<style>

</style>