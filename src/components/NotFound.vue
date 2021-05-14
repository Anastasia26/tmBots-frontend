<template>
  <div class="container-fluid">
    <div class="not-found-page row align-items-center">
      <div class="col-xl-6 col-md-4 col-sm-12 title-section text-center">
        <p>404</p>
        <h3 class="title">{{$t('not_found_page')}}</h3>
      </div>
      <div class="col-xl-6 col-md-8 col-sm-12">
        <img src="../assets/img/dog.png"/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NotFound",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages'
        },
    }
</script>

<style lang="scss" scoped>
  .not-found-page {
    p {
      font-size: 100px;
      color: var(--subtitle-black-color);
    }
  }
  @media (max-width: 540px) {
    .not-found-page {
      img {
        width: 400px;
        display: flex;
        justify-content: center;
        margin: 0 auto;
      }
    }
  }
  @media (max-width: 440px) {
    .not-found-page {
      img {
        width: 300px;
        margin: 0 auto;
      }
    }
  }
</style>
