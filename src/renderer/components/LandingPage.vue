<template>
  <div >

    <v-layout column align-center justify-center>
    <img id="logo" src="~@/assets/vsv.png" alt="VSV" height="200" margin = "100">
    </v-layout>
    <main>
      
    <v-card class= "mx-auto"  width = "300px" >
      <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">VSV Logistics IO</div>
                      <div> V{{appVersion}}</div>
                    </v-card-title>
        <v-card-text>
    
          <p>
            VSV IO transforms the crappy io list from eplan. 
            To a nicely formated io list like they promised to make in the first time.
          </p>

                    </v-card-text>
                                    <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="open('https://www.linkedin.com/in/rien-verbeke-4b247211a')">
                    <v-icon>fa-linkedin</v-icon>
                  </v-btn>
                  <v-btn icon @click="open('mailto:rien.verbeke@ceratec.be?SUBJECT=CLEAN-IO-APP Bug')">
                    <v-icon>fa-envelope</v-icon>
                  </v-btn>
                  <v-btn icon @click="changeRoute('steps')">
                    <v-icon>fa-arrow-circle-right</v-icon>
                  </v-btn>
   
                </v-card-actions>
    </v-card>
    
    </main>
  </div>
</template>

<script>


  export default {
    data: function(){
      return{
         appVersion : this.$electron.remote.app.getVersion()
      }
    },
    mounted: function(){
      setTimeout(()=>{this.changeRoute('steps')},5000)
    },

    name: 'landing-page',

    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      changeRoute(path){
        console.log(path)
        this.$router.push(path)
      }
    }
  }
</script>

<style>
#logo{margin-top: 50px;
margin-bottom: 25px}

</style>
