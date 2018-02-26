<template>
<v-card class="mb-5" height="300px">
  <v-container fluid>
    <v-layout row>
      
        <v-text-field
          name="TagTable"
          label="TagTable"
           v-model="name"
        ></v-text-field>
  
    </v-layout>
    <v-layout row>
        <v-btn :disabled="name==''"  color="primary" large @click.native="saveFileDialog()">
           Save
        </v-btn>
      </v-layout> 
  </v-container>
  </v-card>


</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    name: {
      get: function() {
        return this.$store.state.ioFile.tagTable;
      },
      set: function(newTagTable) {
        this.$store.commit("SET_TAG_TABLE", newTagTable);
      }
    },

    ...mapGetters([
      "getTagTable",
      "getOutputDir"
      // ...
    ])
  },
  methods: {
    ...mapActions(["setDirAction", "saveFileDialog"])
  }
};
</script>

<style>

</style>
