<template>
      <div v-if="results.length!=0" class="table-responsive">
        <h1 class="h2">{{heading}}</h1>
        <div>
            <b-table :items="results" 
            :fields="fields"
            responsive="sm"
            head-row-variant="dark"
            bordered
            striped
            ></b-table>
        </div>
    </div>
</template>

<script>
  export default {
      props:['heading', 'category', 'id'],
    data () {
      return {
        results:[],
        fields: ['url']
      }
    },
        created () {
          this.$resource('Tests/'+ this.id+'?'+ this.category +'=true').get().then(response => response.json())
          .then(response => this.results=response.result.results)
    }
  }
</script>
