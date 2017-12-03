<template lang="html">
  <div class="well wll-sm">
    <h3>Question List</h3>
    <div class="panel panel-default">
      <div class="panel-heading">
        <router-link :to="{ path: '/question/1', params: {} }">
          <h4>programming black magic</h4>
        </router-link>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <p>Vote: 10</p>
            <p>Answer: 5</p>
          </div>
          <div class="col-md-9 col-sm-9">
            <p>By: capung tempur</p>
            <p>On: Wednesday, 12 Dec, 2017</p>
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading"><h4>Cara ngoding yang bener</h4></div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <p>Vote: 10</p>
            <p>Answer: 5</p>
          </div>
          <div class="col-md-9 col-sm-9">
            <p>By: capung tempur</p>
            <p>On: Wednesday, 12 Dec, 2017</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
