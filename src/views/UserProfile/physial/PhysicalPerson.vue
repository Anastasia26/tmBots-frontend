<template>
  <div class="physical-person" :visible.sync="showInfo">
    <PhysicalUserInfo/>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-4">
        <QueryBalance/>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4">
        <UserPassword/>
      </div>
    </div>
  </div>
</template>

<script>
    import PhysicalUserInfo from "./PhysicalUserInfo";
    import QueryBalance from "../QueryBalance";

    import UserPassword from "../UserPassword";
    export default {
        name: "PhysicalPerson",
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
        components: {UserPassword, PhysicalUserInfo, QueryBalance}
    }
</script>
