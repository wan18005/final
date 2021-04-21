<template>
  <div id="app">
    <header id="header">
      <h1>Ruby Art</h1>
      <nav>
        <router-link to="/"><i class="fas fa-home"></i></router-link>
        <router-link to="/dashboard"><i class="fas fa-user"></i></router-link>
      </nav>
    </header>
   
    <router-view />

    <footer id="bottom">
      <h1>help</h1>
      <nav>
        <router-link to="/admin"><i class="fas fa-tools"></i></router-link>
        <router-link to="/about"><i class="fas fa-info-circle"></i></router-link>
      </nav>
    </footer>
    
  </div>
  
</template>

<style>

 html {
  box-sizing: border-box;
}

body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 200px;
}

#header {
  /* Semi-circle */
  margin: 0 1em 1em 0;
  height: 100px;
  width: 200px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #89AbE3FF;
  text-align: center;
 
}

#bottom {
  /* Semi-circle */
  margin: 0 0 0 0;
  height: 100px;
  width: 200px;
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  bottom: 0%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #89AbE3FF;
  text-align: center;
  
}

nav {
  display: flex;
  justify-content: center;
}

h1 {
  color: #fff;
  font-size: 18px;
  
}

h2 {
  font-size: 1.5em;
  font-weight: bolder;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

#bottom .fas,.far {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.pure-button-primary {
  background-color: #277E8E;
}


</style>
