<template>

  <v-data-table
    :headers="headers"
    :items="getData"
  
   
  >
    <template slot="items" slot-scope="props" >
      <td :class="{'green lighten-3': props.item.changed}">{{ props.item.text}}</td>
       <td :class="{'green lighten-3': props.item.changed}">{{ props.item.io}}</td>
        <td :class="{'green lighten-3': props.item.changed}">{{ props.item.comment}}</td>
    </template>
  </v-data-table>

</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data () {
      return {
        headers: [
          { text: 'Tag', value: 'Tag' },
          { text: 'Adress', value: 'Adress' },
          { text: 'Comment', value: 'Comment' },


        ]
        }
        },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      "getData"
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
