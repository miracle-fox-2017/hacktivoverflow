<template lang="html">
  <div class="container">
    <form class="form-horizontal">
      <fieldset>
        <legend>Ask Question</legend>
        <div class="form-group">
          <label for="title" class="col-lg-2 control-label">Title</label>
          <div class="col-lg-10">
            <input class="form-control" id="title" placeholder="Title" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="image" class="col-lg-2 control-label">Image Url</label>
          <div class="col-lg-10">
            <input class="form-control" id="image" placeholder="http://image.url/this_is_jpg.jpg" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="question" class="col-lg-2 control-label">Question explanation</label>
          <div class="col-lg-10">
            <textarea class="form-control" rows="3" id="question"></textarea>
            <span class="help-block">Please ask a clear question.</span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="reset" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
