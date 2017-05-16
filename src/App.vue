<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to the social media aggregator!'
        }
    }


}
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #2c3e50;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
    color: #2c3e50;
    background-color: #2c3e50;
}
input {
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.3rem;
    border: 0;
    border-radius: 3px;
    background: #fff;
}
</style>
