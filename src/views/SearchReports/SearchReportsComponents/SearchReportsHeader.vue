<template>
  <div class="user-search-header">
    <div class="mt-4 row">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <h3 class="title pr-4">{{$t('title')}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SearchReportsHeader",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.all_search_results_reports'
        },
    }
</script>

<style>
    .id-title {
        color: var(--dark-grey-color);
        font-size: 28px;
        font-weight: 700;
    }
</style>
