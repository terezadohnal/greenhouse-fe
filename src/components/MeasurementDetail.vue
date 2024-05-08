<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" size="20">mdi-eye-outline</v-icon>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Measurement Information" rounded="xl">

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

<script>
//import {useMeasurementStore} from "@/store/MeasurementStore";
//import {mapStores} from "pinia";

export default {
  name: "MeasurementDetail",

  data() {
    return {}
  },

  props: {
    measurement: Object
  },

  computed: {
    //...mapStores(useMeasurementStore)
  },

  methods: {
    async download(measurement) {
    },
  }
}
</script>

<style>

</style>