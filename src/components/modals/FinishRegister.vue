<template>
  <Dialog :visible.sync="showfinish" :modal="true">
    <div class="form">
      <div class="container form-panel">
        <div class="form-header text-center">
          <img src="../../assets/img/mailbox.png">
        </div>
        <div class="main-form mt-5 text-center">
          <h2 class="title">{{$t('title')}}</h2>
          <p class="mt-3">{{$t('subtitle')}} - {{email}}</p>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
    import Dialog from 'primevue/dialog';

    export default {
        name: "FinishRegister",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.finish_register'
        },
        props: {
            show: {
                type: Boolean,
                required: true,
            },
            email: String,
        },
        data: function () {
            return {
                checked: 'false',
                displayBasic: false,
                displayModal: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false
            }
        },
        computed: {
            showfinish: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            }
        },
        components: {Dialog}
    }
</script>

