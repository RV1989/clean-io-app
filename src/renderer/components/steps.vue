<template>
  <v-stepper :value="getStep">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="getStep > 1">Select File</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="getStep > 2">Preview</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Save</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <step1/>
        <v-btn color="primary" @click.native="setStepAction(2)">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <step2/>
        <v-btn  flat  @click.native="setStepAction(1)">Back</v-btn>
        <v-btn color="primary" @click.native="setStepAction(3)">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <step3/>
        <v-btn  flat  @click.native="setStepAction(2)">Back</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import step1 from './step1.vue'
import step2 from './step2.vue'
import step3 from './step3.vue'
import {mapGetters,mapActions}from 'vuex'
  export default {
    components: { step1,step2,step3 },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'getStep', 
      // ...
    ])
  },

   methods: {
    ...mapActions(['setStepAction',]),
  }
  }
</script>