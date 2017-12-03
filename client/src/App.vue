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
</style>
