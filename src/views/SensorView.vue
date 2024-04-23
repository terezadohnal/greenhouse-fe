<template>
  <v-app class="white-background">
    <div class="button">
      <v-btn variant="tonal" class="bg-light-green text-center" @click="addSensor">
        Přidat senzor
      </v-btn>
    </div>

    <div class="lists">
      <v-container>
        <v-card class="mx-auto" max-width="600">
          <v-list lines="one" bg-color="white">
            <v-list-item v-for="(sensor, index) in sensors" :key="index">
              <v-list-item-content class="flex-grow-1">
                <div class="title">{{ sensor.title }}</div>
                <div class="description">{{ sensor.description }}</div>
              </v-list-item-content>
              <v-list-item-action class="d-flex justify-end align-center">
                <div class="icons-container">
                  <div class="pencil">
                    <v-btn variant="plain">
                      <svg-icon type="mdi" :path="sensor.pencil"></svg-icon>
                    </v-btn>
                  </div>
                  <div class="trash">
                    <v-btn variant="plain">
                      <svg-icon type="mdi" :path="sensor.trash"></svg-icon>
                    </v-btn>
                  </div>
                  <div class="switch" :class="{ 'active': sensor.active }">
                    <v-btn variant="plain" @click="toggleSensor(index)">
                      <svg-icon type="mdi" :path="sensor.switch"></svg-icon>
                    </v-btn>
                  </div>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPencil, mdiTrashCanOutline, mdiToggleSwitchOutline } from '@mdi/js';


export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data: () => ({
    sensors: [
      {
        title: 'Sensor 1',
        description: 'Popis senzoru 1',
        pencil: mdiPencil,
        trash: mdiTrashCanOutline,
        switch: mdiToggleSwitchOutline,
        active: false
      },
      {
        title: 'Sensor 2',
        description: 'Popis senzoru 2',
        pencil: mdiPencil,
        trash: mdiTrashCanOutline,
        switch: mdiToggleSwitchOutline,
        active: false
      },
      {
        title: 'Sensor 3',
        description: 'Popis senzoru 3',
        pencil: mdiPencil,
        trash: mdiTrashCanOutline,
        switch: mdiToggleSwitchOutline,
        active: false
      },
    ]
  }),
  methods: {
    addSensor() {
      const newSensor = {
        title: `Sensor ${this.sensors.length + 1}`,
        description: `Popis senzoru ${this.sensors.length + 1}`,
        pencil: mdiPencil,
        trash: mdiTrashCanOutline,
        switch: mdiToggleSwitchOutline,
        active: false
      };
      this.sensors.push(newSensor);
    },
    toggleSensor(index) {
      this.sensors[index].active = !this.sensors[index].active;
    }
  }
}
</script>

<style scoped>
.button {
  height: 100px;
  margin: 20px;
  text-align: right;
}

.lists {
  text-align: center;
}

.white-background {
  background-color: #fff;
}

.v-list-item {
  border-color: black;
  border-style: solid;
}

.icons-container {
  display: flex;
}

.pencil,
.trash,
.switch {
  margin-left: 10px;
}

.switch.active svg {
  color: green;
}

.title {
  font-weight: bold;
  text-align: left;
}

.description {
  margin-top: 5px;
  text-align: left;
}

.align-center {
  align-items: center;
}
</style>
