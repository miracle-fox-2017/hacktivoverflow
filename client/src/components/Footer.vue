<template>
  <div class="footer">
    <div class="ui container">
      <div class="ui grid stackable">
        <div class="four wide column">
          <img class="ui image fluid" src="../assets/img/logo-footer.png" alt="logo" style="width:200px;">
        </div>
        <div style="margin-top: 10px;" class="seven wide column">
          <div class="ui grid">
            <div style="text-align: left;" class="eight wide column">
              <div class="ui header">
                <h3>Hacktiv Overflow</h3>
              </div>
              <div class="ui list">
                <a class="item">Questions</a>
                <a class="item">Users</a>
              </div>
            </div>
            <div style="text-align: left;" class="eight wide column">
              <div class="ui header">
                <h3>Account Detail</h3>
              </div>
              <div class="ui list">
                <router-link to="/myaccount" class="item">My Account</router-link>
              </div>
            </div>

          </div>
        </div>
        <div class="five wide column">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .footer {
    background: #0d0d0d;
    height: 200px;
    margin-top: 80px;
    padding-top: 30px;
    color: #ddd;
  }

  .footer h3 {
    color: #ddd;
  }
</style>
