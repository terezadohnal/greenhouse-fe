<template>
  <v-dialog v-model="dialog" max-width="700" variant="outlined">
    <template v-slot:activator="{ props: activatorProps }">
      <div v-bind="activatorProps">
        <span v-if="type === 'schedule'">Schedule</span>
        <span v-else>Right now</span>
      </div>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        v-if="type === 'schedule'"
        title="Schedule measurement"
        rounded="xl"
      >
        <div>
          <v-icon
            @click="closeDialog()"
            style="position: absolute; top: 20px; right: 20px"
            >mdi mdi-close</v-icon
          >
        </div>

        <v-card-text class="subtitle text-dark-green"
          >Select type of measurement</v-card-text
        >
        <v-row justify="center">
          <v-select
            style="max-width: 80%"
            clearable
            chips
            label="Type"
            :items="['RGB camera', 'Hyperspectral camera', 'Acoustic emission']"
            multiple
            variant="outlined"
            :rules="[rules.required]"
          ></v-select>
        </v-row>

        <!-- Date and time pickers -->
        <v-row justify="center">
          <v-time-picker
            class="text-dark-green"
            v-model="selectedTime"
            format="24hr"
            scrollable
            title="Select date and time"
          ></v-time-picker>
          <v-date-picker title="" v-model="selectedDate"></v-date-picker>
        </v-row>

        <v-row justify="center" class="mb-2">
          <v-alert
            max-width="80%"
            v-model="showAlert"
            closable
            title="Please fill in the date and time!"
            type="error"
            variant="tonal"
          ></v-alert>
        </v-row>

        <!-- Button to schedule measurement -->
        <v-card-actions class="justify-center">
          <v-btn
            @click="scheduleMeasurement()"
            color="white"
            rounded="xl"
            class="bg-dark-green mb-2"
            style="width: 300px"
          >
            Schedule measurement
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else title="Start measurement now" rounded="xl">
        <div>
          <v-icon
            @click="closeDialog()"
            style="position: absolute; top: 20px; right: 20px"
            >mdi mdi-close</v-icon
          >
        </div>

        <v-col>
          <v-col>
            <p class="text-h6">Acoustic emissions</p>
            <v-divider class="py-2" />
            <div class="d-flex ga-5">
              <v-btn
                color="dark-green"
                rounded="xl"
                :disabled="this.measurementStore.recordingMode === 2"
                @click="startAcousticMeasurement()"
              >
                Start
              </v-btn>
              <v-btn
                color="white"
                rounded="xl"
                :disabled="this.measurementStore.recordingMode !== 2"
                @click="pauseAcousticMeasurement()"
              >
                Pause
              </v-btn>
              <v-btn
                color="red"
                rounded="xl"
                :disabled="this.measurementStore.recordingMode !== 2"
                @click="stopAcousticMeasurement()"
              >
                Stop
              </v-btn>
            </div>
          </v-col>
          <v-col>
            <p class="text-h6">RGB camera</p>
            <v-divider class="py-2" />
            <div>
              <v-btn
                color="dark-green"
                rounded="xl"
                @click="startRGBMeasurement()"
              >
                Start
              </v-btn>
            </div>
          </v-col>

          <v-row justify="center" class="my-2">
            <v-alert
              max-width="80%"
              v-model="showAlert"
              closable
              title="Recording failed! Please try again."
              type="error"
              variant="tonal"
            ></v-alert>
          </v-row>
        </v-col>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapStores } from 'pinia';
import { useMeasurementStore } from '@/store/MeasurementStore';
export default {
  name: 'NewMeasurementDialog',

  props: {
    type: String,
  },

  data() {
    return {
      dialog: false,
      selectedDate: null,
      selectedTime: null,
      panel: null,
      showAlert: false,
      errorMessage: null,
      rules: {
        required: (value) => !!value || 'Required.',
      },
    };
  },
  computed: {
    ...mapStores(useMeasurementStore),
  },
  methods: {
    scheduleMeasurement() {
      //TODO
      if (this.selectedDate && this.selectedTime) {
        this.dialog = false;
        this.showAlert = false;
        this.selectedDate = null;
        this.selectedTime = null;
      } else {
        this.showAlert = true;
      }
    },

    async startAcousticMeasurement() {
      await this.measurementStore.startAEMeasurement();

      if (this.measurementStore.error) {
        this.showAlert = true;
        this.errorMessage = this.measurementStore.error;
      }
    },

    async pauseAcousticMeasurement() {
      await this.measurementStore.pauseAEMeasurement();
    },

    async stopAcousticMeasurement() {
      await this.measurementStore.stopAEMeasurement();

      if (this.measurementStore.error) {
        this.showAlert = true;
        this.errorMessage = this.measurementStore.error;
      }
    },

    async startRGBMeasurement() {
      await this.measurementStore.startRGBMeasurement();

      if (this.measurementStore.error) {
        this.showAlert = true;
        this.errorMessage = this.measurementStore.error;
      }
    },

    closeDialog() {
      this.selectedDate = null;
      this.selectedTime = null;
      this.dialog = false;
      this.showAlert = false;
    },
  },
};
</script>

<style>
.v-card-actions {
  height: 50px;
  margin: 1%;
}

.v-date-picker .v-date-picker-header__content {
  font-size: 22px;
}

.v-time-picker .v-time-picker-controls__time__btn.v-btn--density-default.v-btn {
  width: 74px;
  height: 63px;
  font-size: 27px;
}

.v-time-picker .v-time-picker-controls__time__separator {
  font-size: 38px;
  height: 80px;
  width: 22px;
  text-align: center;
}

.v-time-picker .v-time-picker-controls {
  margin-bottom: 10px;
}
</style>
