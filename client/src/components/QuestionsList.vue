<template>
  <table class="table">
    <thead>
      <tr>
        <th><abbr title="Position">Like</abbr></th>
        <th>Title</th>
        <th><abbr title="Played">Answer</abbr></th>
        <th>Rating</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th><abbr title="Position">Like</abbr></th>
        <th>Title</th>
        <th><abbr title="Played">Answer</abbr></th>
        <th>Rating</th>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <th><span class="icon is-small"><i class="fa fa-heart"></i>2</span></th>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.</td>
        <td class="tengah"><i>38</i><br>answer</td>
        <td>
          <div class="stars">
            <form action="">
              <input class="star star-5" id="star-5" type="radio" name="star"/>
              <label class="star star-5" for="star-5"></label>
              <input class="star star-4" id="star-4" type="radio" name="star"/>
              <label class="star star-4" for="star-4"></label>
              <input class="star star-3" id="star-3" type="radio" name="star"/>
              <label class="star star-3" for="star-3"></label>
              <input class="star star-2" id="star-2" type="radio" name="star"/>
              <label class="star star-2" for="star-2"></label>
              <input class="star star-1" id="star-1" type="radio" name="star"/>
              <label class="star star-1" for="star-1"></label>
            </form>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'QuestionsList'
}
</script>

<style>

</style>
