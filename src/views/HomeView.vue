<script>
export default {
	name: "HomeView",
  data() {
      return {
        userData: [
          { label: 'Measurement 1', value: 'This measurement took place on...' },
          { label: 'Measurement 2', value: 'This measurement took place on...' },
          { label: 'Measurement 3', value: 'This measurement took place on...' },
          { label: 'Measurement 4', value: 'This measurement took place on...' },
          { label: 'Measurement 5', value: 'This measurement took place on...' },
          { label: 'Measurement 6', value: 'This measurement took place on...' },
          { label: 'Measurement 7', value: 'This measurement took place on...' },
          { label: 'Measurement 8', value: 'This measurement took place on...' },
          { label: 'Measurement 9', value: 'This measurement took place on...' },
          { label: 'Measurement 10', value: 'This measurement took place on...' },
    
        ],
       
     
      itemsPerPage: 5,
      totalItems: 10,
      selectedDate: null,
      selectedTime: null,
      dialog: false,
      panel: null,
      showAlert: false,
      menuOpen: false,
      };
      
    },
    computed: {
      menuIcon() {
      return this.menuOpen ? 'mdi mdi-chevron-up' : 'mdi-chevron-down';
    },
    },
    methods: {
     
      startMeasurement() {
        //TODO
      },
      scheduleMeasurement() {
        //TODO
        
       
       

        if (this.selectedDate && this.selectedTime) {
        console.log(this.selectedDate);
        console.log(this.selectedTime);
        this.dialog = false;
        this.showAlert = false;
        selectedDate = null;
        selectedTime = null;
      } else {
        this.showAlert = true;
      }
      },
      downloadMeasurement(measurement) {
        console.log(measurement);
        //TODO
      },
      viewDetail(measurement) {
        console.log(measurement);
        //TODO
      },
      closeDialog(){
        this.selectedDate = null;
        this.selectedTime = null;
        this.dialog = false;
        this.showAlert = false;
        
      },
    }
}
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <!-- Search icon
      <v-col class="text-end">
        <v-icon @click="" color="grey-lighten-1">mdi mdi-magnify</v-icon>
      </v-col>
      -->
      <!-- Expansion panel for data filtering -->
      <v-expansion-panels>
        <v-expansion-panel title="Filter data" text="Filtering data to be done..."></v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <!-- Card title -->
          <v-card-title class="headline">Measurements</v-card-title>

          <!-- Table of measurements -->
          <v-table density="compact">
            <tbody>
              <tr v-for="item in userData" :key="item.label">
                <!-- Measurement label -->
                <td style="display: block;" class="font-weight-bold">{{ item.label }}</td>

                <!-- Measurement value -->
                <td>{{ item.value }}</td>

                <!-- View and download icons -->
                <td class="edit-icon-cell">
                  <v-icon @click="viewDetail(item.label)" color="grey-lighten-1">mdi mdi-eye-outline</v-icon>
                </td>
                <td class="edit-icon-cell">
                  <v-icon @click="downloadMeasurement(item.label)" color="grey-lighten-1">mdi mdi-download</v-icon>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

     <!-- Button to start measurement -->
    <v-menu
      transition="slide-y-transition"  v-model="menuOpen">
      <template v-slot:activator="{ props }">
        <div style="padding: 12px">
          <v-btn color="dark-green" v-bind="props">
            <span class = "text-white"> Measure</span>
            <v-icon color="white">{{ menuIcon }}</v-icon>
          </v-btn>
        </div>
      </template>

      <v-list>
            <v-list-item style="cursor: pointer;">
              <v-list-item-title>Right now</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog = true" style="cursor: pointer;" >
              <v-list-item-title >Schedule</v-list-item-title>   
            </v-list-item>
        </v-list>
    </v-menu>
  
    </v-row>

   <!-- Dialog for date and time selection -->
   <v-dialog v-model="dialog" class="mx-auto" max-width="800" variant="outlined">
      <v-card>
        <!-- Close icon positioned at the top right corner -->
        <div style="position: relative;">
          <v-icon @click="closeDialog()" color="grey-lighten-1" style="position: absolute; top: 15px; right: 15px;">mdi mdi-close</v-icon>
        </div>

        <!-- Title for date and time selection -->
        <h2 style="margin: 2% 5% 1% 5%;">Select date and time</h2>

        <!-- Date and time pickers -->
        <v-row justify="center">
          <v-date-picker title="" v-model="selectedDate"></v-date-picker>
          <v-time-picker
            v-model="selectedTime"
            :allowed-hours="allowedHours"
            :allowed-minutes="allowedMinutes"
            format="24hr"
            scrollable
            title=""
            style=" padding: 10px;"
          ></v-time-picker>
        </v-row>
        <v-alert v-model="showAlert" type="error" dismissible style="margin: 10px">
          Please fill in the date and time!
        </v-alert>

        <!-- Button to schedule measurement -->
        <v-card-actions class="justify-center">
          <v-btn @click="scheduleMeasurement()" color="white" rounded="xl" class=" bg-dark-green" style="width: 300px;">Schedule measurement</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  
</template>

<style>
.bily-text {
  color: white;
}

.v-picker-title{
  height: 0;
}

/*
.v-date-picker-month__day--selected .v-btn {
  background-color: green;
}

*/


.v-card-actions {
  height: 50px;
  margin: 1%;
}

.v-date-picker .v-date-picker-header__content {
  font-size: 22px;
}

.v-time-picker .v-time-picker-controls__time__btn.v-btn--density-default.v-btn{
  width: 74px;
    height: 63px;
    font-size: 27px;
}


.v-time-picker .v-time-picker-controls__time__separator{
     font-size: 38px;
    height: 80px;
    width: 22px;
    text-align: center;
}

.v-time-picker .v-time-picker-controls{
  margin-bottom: 10px;
}
/*
.v-time-picker .v-picker{
  padding: 10px;
}
*/
</style>