<template>
  <div id="app">
      <div id="navbar">
          <ul>
            <li><a href="#" class="active">Content Homepage</a></li>
            <li><a href="#">Smash</a></li>
            <li><a href="#">LoL</a></li>
            <li><a href="#">DotA</a></li>
            <li style="float:right"><a href="#">About</a></li>
        </ul>
      </div>
    <router-view>
    </router-view>
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
html {
    background-color: #334D5C;
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    background-color: #334D5C;
    margin: 0;
    padding: 0;

}


.page-title {
    text-align: center;
    color: white;
    padding-top: 10px;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
    background-color: #334D5C;
}
input {
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.3rem;
    border: 0;
    border-radius: 3px;
    background: #fff;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #45B29D;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-weight: 700;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
    background-color: #111;
}

.active {
    background-color: #334D5C;
}
</style>
