<template>
  <div id="app">
    <NavBar></NavBar>
    <Home/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Home from '@/components/Home'
export default {
    name: 'app',
    components: {
      NavBar,
      Home
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed|Roboto');
#app {
  font-family: 'Barlow Condensed','Roboto', sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-decoration-style: none!important;
  background-color: #fff!important;
}
.notification a:not(.button) {
  color: currentColor;
  text-decoration: none!important;
}
.label {
  color: #fff!important;
}
.contai {
  margin: 0;
  position: relative;
}

@media screen and (min-width: 1024px) {
  .contai {
    max-width: 100%;
    width: 100%;
    padding: 0 300px 0 300px;
    margin: 0;
  }
  .contai.is-fluid {
    margin-left: 0;
    margin-right: 0;
    max-width: none;
    width: auto;
  }
}

@media screen and (max-width: 1215px) {
  .contai.is-widescreen {
    max-width: auto;
    width: auto;
  }
}

@media screen and (max-width: 1407px) {
  .contai.is-fullhd {
    max-width: auto;
    width: auto;
  }
}

@media screen and (min-width: 1216px) {
  .contai {
    max-width: auto;
    width: auto;
  }
}

@media screen and (min-width: 1408px) {
  .contai {
    max-width: auto;
    width: auto;
  }
}
.navbar > .contai {
  -webkit-box-align: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 3.25rem;
  width: 100%;
}
@media screen and (max-width: 1023px) {
  .navbar > .contai {
    display: block;
  }
  .navbar-brand .navbar-item,
  .navbar-tabs .navbar-item {
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .navbar-menu {
    background-color: transparent;
    -webkit-box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
            box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
    padding: 0.5rem 0;
  }
  .navbar-menu.is-active {
    display: block;
  }
  .navbar.is-fixed-bottom-touch, .navbar.is-fixed-top-touch {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-touch {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-touch.has-shadow {
    -webkit-box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
            box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
  }
  .navbar.is-fixed-top-touch {
    top: 0;
  }
  .navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {
    -webkit-overflow-scrolling: touch;
    max-height: calc(100vh - 3.25rem);
    overflow: auto;
  }
  html.has-navbar-fixed-top-touch {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-touch {
    padding-bottom: 3.25rem;
  }
}
.outer {
  display: block;
  text-align: center;
}
.tengah {
  text-align: center;
}

/*** Base Caption Styles ***/
figure.embed,
figure.embed-top,
figure.overlay,
figure.embed-over {
    display: inline-block;
    text-align: initial;
    vertical-align: top;
    position: relative;
    margin: 0.5em;
    font-size: 0.8em;
    overflow: hidden;
}
figure.embed img,
figure.embed-top img,
figure.overlay img,
figure.embed-over img {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
figure.embed figcaption,
figure.embed-top figcaption,
figure.overlay figcaption,
figure.embed-over figcaption {
    width: 100%;
    padding: 0.5em;
    /* neutral theme */
    color: rgba(50,50,50,1.0);
}
div.stars {
  width: 120px;
  display: inline-block;
}

input.star { display: none; }

label.star {
  float: left;
  padding: 2px;
  font-size: 20px;
  color: #444;
  transition: all .2s;
}

input.star:checked ~ label.star:before {
  content: '\f005';
  color: #FD4;
  transition: all .25s;
}

input.star-5:checked ~ label.star:before {
  color: #FE7;
  text-shadow: 0 0 20px #952;
}

input.star-1:checked ~ label.star:before { color: #F62; }

label.star:hover { transform: rotate(-15deg) scale(1.3); }

label.star:before {
  content: '\f006';
  font-family: FontAwesome;
}
</style>
