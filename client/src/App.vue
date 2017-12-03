<template>
  <div id="app">
    <MainHeader></MainHeader>
    <router-view/>

    <LoginModal></LoginModal>
    <RegisterModal></RegisterModal>
    <QuestionModal></QuestionModal>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import LoginModal from '@/components/LoginModal'
import RegisterModal from '@/components/RegisterModal'
import QuestionModal from '@/components/QuestionModal'

export default {
  name: 'app',
  components: {
    MainHeader,
    LoginModal,
    RegisterModal,
    QuestionModal,
  }
}
</script>

<style>
#app {

}

.vote-list li{
  margin-right: 0;
}

.site-title {
  font-size: 3rem;
}

.vote-area {
  border-top: 1px solid #ccc;
  padding: 1rem 0;
  margin: 1rem 0;
}

.content-tile {
  margin-top: 0;
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
}

.content-title, a {
  color: #FF5722;
}

a:hover, a:focus {
  text-decoration: none;
}

.widget-title {
  margin-top: 0;
  font-size: 2rem;
}

.small-mr{
  margin-right: 0.7rem;
}

.small-ml{
  margin-left: 0.7rem;
}

</style>
