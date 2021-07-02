<template>
  <div class="mt-5">
      <app-response-table class="mt-5" :id="id"></app-response-table>
      <app-urls-table class="mt-5" heading="URLs NOT FOUND AT WEBSITE" category="InSitemap" :id="id"></app-urls-table>
      <app-urls-table class="mt-5" heading="URLs NOT FOUND AT SITEMAP" category="InWebsite" :id="id"></app-urls-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: this.$route.params['id'], 
      }
    },
    watch: {
      $route (toR, fromR) {
        this.id = toR.params['id']
      }
    },
  }
</script>