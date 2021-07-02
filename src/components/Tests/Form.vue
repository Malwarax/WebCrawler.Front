<template>
  <div>
    <form class="pt-3" @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="p-2">
            <label for="url" class="col-form-label">Enter a website</label>
        </div>
        <div class="p-2 flex-fill">
          <input type="text"
          id="url"
          class="form-control"
          :class="{'is-invalid': $v.url.$error}"
          @blur="$v.url.$touch()"
          v-model="url"
          placeholder="https://www.example.com/">

          <div class="invalid-feedback" v-if="!$v.url.required">Website field is required</div>
          <div class="invalid-feedback" v-if="!$v.url.url">Invalid Url. The format of the Url could not be determined.</div>
          <div class="invalid-feedback" v-if="!$v.url.serverValidation">{{serverMessage}}</div>
        </div>
        <div class="p-2">
            <button type="submit" class="btn btn-dark" >Submit</button>
        </div>
    </div>
    </form>

  <div>
    <b-modal id="bv-modal-crawl" hide-footer centered  hide-header-close>
    <template #modal-title>
      <h3>Web Crawler</h3>
    </template>
    <div class="d-block text-center">
      Crawling website. It will take some time...
      <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
    </div>
  </b-modal>
</div>

  </div>
</template>

<script>
import { required, url} from 'vuelidate/lib/validators'
import {eventEmitter} from '../../main'
export default {
  data () {
    return {
      url: '',
      serverValidation:true,
      serverMessage:'',
    }
  },
  methods: {
    onSubmit (event) {
      this.serverValidation=true;
      this.$v.$touch()
      if(this.$v.$invalid)
        {
        return
        }
      else
      {
        this.sendNewTest(event)
      }
    },
    sendNewTest(event){
        this.$bvModal.show('bv-modal-crawl')
        this.resource.save({url:this.url}).then(response => response.json())
          .then(response =>
          {
              if(response.isSuccessful==true)
              {
                  this.$bvModal.hide('bv-modal-crawl')
                  event.target.reset()
                  eventEmitter.$emit('websiteCrawled')
              }
              else
              {
                  this.$bvModal.hide('bv-modal-crawl')
                  this.serverValidation=false
                  this.serverMessage=response.errors
              }
          })
    }
  },
  validations: {
    url: {
      required,
      url,
      serverValidation:function(){
        return this.serverValidation
      }
    },
  },
  created(){
    this.resource = this.$resource('Tests')
  }
}
</script>