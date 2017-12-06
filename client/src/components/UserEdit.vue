<template>
  <div class="box" v-if="user._id == login.user_id || user._id == is_user">
    <article class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <h2 class="title">Your profile edit page</h2>
        <br/>
          <ul class="form-list">
            <li class="form-list__row">
              <label>Name</label>
              <input class="input" v-model="user.name" type="text"></input>
            </li>
            <li class="form-list__row">
              <label>Username</label>
              <input class="input" v-model="user.username" type="text"></input>
            </li>
            <li class="form-list__row">
              <label>Password</label>
              <input class="input" v-model="user.password" type="password"></input>
            </li>
            <li class="form-list__row">
              <label>Email</label>
              <input class="input" v-model="user.email" type="email"></input>
            </li>
            <li>
              <button @click="updateUsers" type="submit" class="button is-warning">Save Profile</button>
            </li>
          </ul>
      </div>
    </article>
  </div> <!-- END: .modal__content -->
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'userEdit',
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
      'updateUser'
    ]),
    updateUsers () {
      let loginCheck = localStorage.getItem('token')
      if(!loginCheck) {
        alert('You must be Login to Delete yout account this Question')
      } else {
        console.log(this.user.name)
        this.updateUser({
          ...this.user,
          id: this.id
        })
        this.$router.push(`/user/detail/${this.id}`)
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

<style scoped>
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
