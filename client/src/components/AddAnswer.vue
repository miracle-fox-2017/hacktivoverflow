<template>
  <div>

    <div class="ui form">
      <div class="field">
        <label>Answer Question</label>
        <textarea rows="2"></textarea>
      </div>
      <div class="field">
        <button class="ui primary button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['questionId']
}
</script>

<style>

</style>
