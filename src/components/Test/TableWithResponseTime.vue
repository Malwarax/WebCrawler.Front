<template>
<div>
  <div class="border-bottom mb-5">
      <h1 class="h2">{{details.url}}</h1>
  </div>
  <h2 class="h2">PERFORMANCE</h2>
  <div >
        <b-table :items="details.results" 
        :fields="fields"
        responsive="sm"
        head-row-variant="dark"
        bordered
        striped
        >
            <template #cell(url)="data">
                {{ data.item.url }}
            </template>

            <template #cell(responseTime)="data">
                {{ data.item.responseTime }}
            </template>
        </b-table>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="pageSize"
      @change="loadDetails"
      align="center"
      size="lg"
      pills>
    ></b-pagination>
</div>

</template>

<script>
  export default {
      props:['id'],
    data () {
      return {
        fields: [
          'url',
          { key: 'responseTime', label: 'Timing', class: 'text-center' },
        ],
        currentPage:1,
        rows:0,
        pageSize:10,
        details:{}
      }
    },
    
    methods:{
    loadDetails (newPage) {
        this.$resource('Tests/'+this.id+'?InSitemap=true&InWebsite=true'+'&Page='+newPage+'&PageSize='+this.pageSize).get().then(response => response.json())
          .then(details => this.details=details.result)
      },
    },

    created () {
        this.$resource('Tests/'+ this.id+'/count').get().then(response => response.json())
          .then(count => this.rows=count.result)
        this.loadDetails(1)
    }
  }
</script>