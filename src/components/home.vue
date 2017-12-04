<template>
  <div>
    <HeaderTop/>
    <router-view/>
  </div>
</template>
<script>
import HeaderTop from "./component-header";
export default {
  components:{
    HeaderTop
  },
  beforeCreate(){
    this.$store.dispatch("getAllPost");
  }
}
</script>
