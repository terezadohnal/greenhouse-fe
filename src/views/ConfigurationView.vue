<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="tabs">
          <div :class="{ active: activeTab === 'rgbCamera' }" @click="activeTab = 'rgbCamera'">RGB Camera</div>
          <div :class="{ active: activeTab === 'hyperspectralCamera' }" @click="activeTab = 'hyperspectralCamera'">
            Hyperspectral Camera
          </div>
          <div :class="{ active: activeTab === 'acousticEmission' }" @click="activeTab = 'acousticEmission'">Acoustic
            Emission
          </div>
        </div>
        <v-card>
          <div class="tab-content">
            <div v-if="activeTab === 'rgbCamera'">
              <v-card-title class="headline">Measurement Configuration - RGB Camera</v-card-title>
              <v-table density="compact" colspan="2">
                <tbody>
                <tr>
                  <td class="align-center" colspan="2">
                    <div class="text-subtitle-1">Sampling Frequency (kHZ)</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-slider v-model="samplingFrequency" append-icon="mdi-sine-wave" thumb-color="dark-green" show-ticks="always"
                                  step="5" tick-size="3" thumb-label></v-slider>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
                <tr>
                  <td class="align-center" colspan="2">
                    <div class="text-subtitle-1">Number of RGB images</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-slider v-model="RGBimages" append-icon="mdi-image"
                                  thumb-color=#82C325 show-ticks="always" step="5"
                                  tick-size="3" thumb-label></v-slider>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
                <tr class="align-center">
                  <td class="align-center" colspan="1">
                    <div class="text-subtitle-1">Camera Activation</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-text-field class="my-2" label="Set camera start delay" v-model="time" :rules="[rules.timeFormat]"></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                  <td class="align-center" colspan="1">
                    <div>
                    <div class="text-subtitle-1" >Measurement Duration</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-text-field class="my-2" label="Enter the duration of the measurement" v-model="duration" :rules="[rules.timeFormat]"></v-text-field>
                      </v-col>
                    </v-row>
                    </div>
                  </td>
                </tr>
                </tbody>
              </v-table>
            </div>
            <div v-if="activeTab === 'hyperspectralCamera'">
              <v-card-title class="headline">Measurement Configuration - Hyperspectral Camera</v-card-title>
              <v-table density="compact" colspan="2">
                <tbody>
                <tr>
                  <td class="align-center" colspan="2">
                    <div class="text-subtitle-1">Sampling Frequency (kHZ)</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-slider v-model="samplingFrequencyH" append-icon="mdi-sine-wave" thumb-color="dark-green" show-ticks="always"
                                  step="5" tick-size="3" thumb-label></v-slider>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
                <tr>
                  <td class="align-center" colspan="2">
                    <div class="text-subtitle-1">Number of images</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-slider v-model="HyperImages" append-icon="mdi-image"
                                  thumb-color=#82C325 show-ticks="always" step="5"
                                  tick-size="3" thumb-label></v-slider>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
                <tr class="align-center">
                  <td class="align-center" colspan="1">
                    <div class="text-subtitle-1">Camera Activation</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-text-field class="my-2" label="Set camera start delay" v-model="timeHyper" :rules="[rules.timeFormat]"></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                  <td class="align-center" colspan="1">
                    <div>
                      <div class="text-subtitle-1" >Measurement Duration</div>
                      <v-row align="center">
                        <v-col cols="12">
                          <v-text-field class="my-2" label="Enter the duration of the measurement" v-model="durationHyper" :rules="[rules.timeFormat]"></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </td>
                </tr>
                </tbody>
              </v-table>
            </div>
            <div v-if="activeTab === 'acousticEmission'">
              <v-card-title class="headline">Measurement Configuration - Acoustic Emission</v-card-title>
              <v-table density="compact" colspan="2">
                <tbody>
                <tr>
                  <td class="align-center" colspan="2">
                    <div class="text-subtitle-1">Sampling Frequency (kHZ)</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-slider v-model="samplingFrequencyAE" append-icon="mdi-sine-wave" thumb-color="dark-green" show-ticks="always"
                                  step="5" tick-size="3" thumb-label></v-slider>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
                <tr>
                  <td class="align-center" colspan="2">
                    <div class="text-subtitle-1">Threshold (dB)</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-slider v-model="threshold" append-icon="mdi-chart-line"
                                  thumb-color=#82C325 show-ticks="always" step="5"
                                  tick-size="3" thumb-label></v-slider>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
                <tr>
                  <td class="align-center" colspan="2">
                    <div class="text-subtitle-1">Peak Definition Time (μs)</div>
                    <v-row align="center">
                      <v-col cols="12">
                        <v-slider v-model="pdt" append-icon="mdi-timer-outline" thumb-color="dark-green" show-ticks="always"
                                  step="5" tick-size="3" thumb-label></v-slider>
                      </v-col>
                    </v-row>
                  </td>
                </tr>
                <tr>
                  <td class="align-center" colspan="2">
                      <div class="text-subtitle-1" >Measurement Duration</div>
                      <v-row align="center">
                        <v-col cols="5">
                          <v-text-field class="my-2" label="Enter the duration of the measurement" v-model="durationAE" :rules="[rules.timeFormat]"></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ConfigurationView",
  data() {
    return {
      activeTab: 'rgbCamera',
      samplingFrequency: 40,
      RGBimages: 65,
      time: '00:30:00',
      duration: '2:30:00',
      samplingFrequencyH: 20,
      HyperImages: 45,
      timeHyper: '00:30:00',
      durationHyper: '2:30:00',
      samplingFrequencyAE: 50,
      threshold: 45,
      pdt: 40,
      durationAE: '2:30:00',
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
        timeFormat: value => /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(value) || 'Invalid time format. Please use HH:MM:SS',
      },
    }
  }
}
</script>

<style>
.tabs {
  display: flex;
}

.tabs div {
  padding: 10px;
  cursor: pointer;
  border: 0.5px solid rgba(204, 204, 204, 0.44);
  border-bottom: none;
  border-radius: 5px;
  margin-right: 2mm;
  background-color: #f2f2f2;
  transition: box-shadow 0.3s, opacity 0.3s, background-color 0.3s, height 0.3s;
}

.tabs div.active {
  font-weight: bold;
  border-radius: 5px 5px 0 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 1;
}

.text-subtitle-1 {
  margin-top: 10px;
}
</style>
