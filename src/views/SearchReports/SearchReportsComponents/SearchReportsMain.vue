<template>
  <div class="container-fluid">
    <SearchReportsHeader/>
    <SearchMainContent/>
  </div>
</template>

<script>
    import SearchReportsHeader from "./SearchReportsHeader";
    import SearchMainContent from "../SearchMainContent";
    export default {
        name: "SearchReportsMain",
        components: {SearchMainContent, SearchReportsHeader}
    }
</script>
