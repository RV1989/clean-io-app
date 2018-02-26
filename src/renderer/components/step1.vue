<template>
 <v-card class="mb-5" height="300px">
  <v-container fluid>
    <v-layout row>
        <v-text-field
          name="FileInput"
          label="File"
          :value="getDir"
        ></v-text-field>
        <v-btn large @click.native="openFileDialog()">
            <v-icon>fa-file</v-icon>
        </v-btn>
      
    </v-layout>
  </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getDir"
      // ...
    ])
  },
  methods: {
    ...mapActions(["setDirAction", "openFileDialog"])
  }
};
</script>

<style>

</style>
