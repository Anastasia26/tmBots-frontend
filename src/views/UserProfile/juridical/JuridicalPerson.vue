<template>
  <div :visible.sync="showInfo">
    <div class="juridical-person row">
      <div class="col-md-12">
        <JuridicalUserInfo/>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <QueryBalance/>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <UserPassword/>
      </div>
    </div>
  </div>
</template>

<script>
    import JuridicalUserInfo from "./JuridicalUserInfo";
    import QueryBalance from "../QueryBalance";
    import UserPassword from "../UserPassword";
    export default {
        name: "JuridicalPerson",
        computed: {
            showInfo: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            }
        },
        components: {UserPassword, JuridicalUserInfo, QueryBalance}
    }
</script>
