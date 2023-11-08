<template>
  <DefaultHeader @connectEvent="connectEvent"/>
  <div v-if="connect">
    <LineaTutorial />
  </div>
  <div  v-else class="example">
    <NoConnect />
  </div>
</template>

<script setup >
import DefaultHeader from './components/DefaultHeader.vue'
import NoConnect from "@/components/NoConnect";
import LineaTutorial from "@/components/LineaTutorial"
import {ref} from "vue";
const connect = ref(false)
const connectEvent = (value) => {
  connect.value = value
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
}
body {
  margin: 0;
}
.example {
  text-align: center;
  margin-top: 100px;
}
</style>
