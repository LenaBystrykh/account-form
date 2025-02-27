<template>
  <FormField @delete-row="deleteRow" />
  <FormField @delete-row="deleteRow" />
</template>

<script setup lang="ts">
import FormField from './components/FormField.vue';

function deleteRow() {
  console.log('delete row')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
