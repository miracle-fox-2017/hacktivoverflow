<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <h2 class="title">Your profile details</h2>
        <br/>
          <ul class="form-list">
            <li class="form-list__row">
              <label>Name</label>
              <h1>{{user.name}}</h1>
            </li>
            <li class="form-list__row">
              <label>Username</label>
              <h1>{{user.username}}</h1>
            </li>
            <li class="form-list__row">
              <label>Email</label>
              <h1>{{user.email}}</h1>
            </li>
            <li class="form-list__row">
              <label>Gender</label>
              <h1>{{user.gender}}</h1>
            </li>
            <li class="form-list__row">
              <label>Register Date</label>
              <h1>{{user.createdAt}}</h1>
            </li>
            <li v-if="user._id == login.user_id || user._id == is_user">
              <button @click="deleteUsers" onclick="return confirm('Are you sure you want to delete this Account?');" type="submit" class="button is-warning">Don't delete account please</button>
            </li>
          </ul>
      </div>
    </article>
  </div> <!-- END: .modal__content -->
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'UserDetail',
  props: ['id'],
  data () {
    return {
      is_user: ''
    }
  },
  mounted () {
    this.detailUser(this.id)
  },
  computed: {
    ...mapState([
      'user',
      'login'
    ]),
  },
  methods: {
    ...mapActions([
      'detailUser',
      'deleteUser',
      'clearSession'
    ]),
    deleteUsers () {
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Delete yout account this Question')
      } else {
        this.deleteUser(this.id)
        localStorage.clear()
        this.clearSession()
        this.$router.push('/')
      }
    }
  },
  created () {
    // this.liked()
    let parsing = localStorage.getItem('user_id')
    if (parsing) {
      this.is_user = parsing
    }
  },
}
</script>

<style>
  .visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px; }

body {
  font-family: 'Open Sans', sans-serif;
  color: #1a1a1a;
  background-color: #f0f0f0; }

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  font-weight: 600; }


.button--transparent {
  background: transparent;
  border: 0;
  outline: 0; }

.button--close {
  position: absolute;
  top: 10px;
  left: 10px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: center;
      justify-content: center;
  width: 30px;
  height: 30px;
  color: #ffffff;
  border-radius: 50%;
  transition: all .25s;
  z-index: 10; }
  .button--close svg {
    width: 20px;
    height: 20px; }
    .button--close svg * {
      fill: currentColor; }
  .button--close:hover, .button--close:active, .button--close:focus {
    color: #fbcf34;
    background-color: #ffffff;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1); }

.button--info {
  position: absolute;
  top: 0;
  right: 0; }

input {
  width: calc(100% - 10px);
  min-height: 30px;
  padding-left: 5px;
  padding-right: 5px;
  letter-spacing: .5px;
  border: 0;
  border-bottom: 2px solid #f0f0f0; }
  input:valid {
    border-color: #f29d38; }
  input:focus {
    outline: none;
    border-color: #fbcf34; }

.form-list {
  padding-left: 0;
  list-style: none; }
  .form-list__row {
    margin-bottom: 25px; }
    .form-list__row label {
      position: relative;
      display: block;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: .5px;
      color: #939393; }
    .form-list__row--inline {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
          justify-content: space-between; }
      .form-list__row--inline > :first-child {
        -ms-flex: 2;
            flex: 2;
        padding-right: 20px; }
      .form-list__row--inline > :nth-child(2n) {
        -ms-flex: 1;
            flex: 1; }
  .form-list__input-inline {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
        justify-content: space-between; }
    .form-list__input-inline > * {
      width: calc(50% - 10px - 10px); }
  .form-list__row--agree {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 12px; }
    .form-list__row--agree label {
      font-weight: 400;
      text-transform: none;
      color: #676767; }
    .form-list__row--agree input {
      width: auto;
      margin-right: 5px; }

</style>
