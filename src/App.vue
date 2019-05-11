<template>
  <div id="app">
    <h1>vue-curved-screen</h1>
    <curved-screen>
      <template #screen11>
        <img style="width: 100%; height: 100%;" src="./assets/test.png">
      </template>
      <template #screen12>
        <img style="width: 100%; height: 100%;" src="./assets/test.png">
      </template>
    </curved-screen>
  </div>
</template>

<script>
import CurvedScreen from './CurvedScreen'

export default {
  name: 'app',
  components: {
    CurvedScreen
  }
}
</script>

<style>
div, h1 {
  margin: 0;
  padding: 0;
}

body {
  background-color: #111;
}

h1 {
  width: 100%;
  height: 70px;
  line-height: 100px;
  text-align: center;
  color: #fff;
}

#app {
  width: 1200px;
  margin: 0 auto;
}

#app .screen-item {
  background-color: #0d1134;
}
</style>
