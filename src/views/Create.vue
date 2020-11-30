<template>
  <div>
    <div class="row">
      <div class="col s6 offset-s3">
        <h1>Create</h1>
        <form @submit.prevent ="submitHandler">
          <div class="input-field">
            <input id="title" v-model = "title" type="text" class="validate" required />
            <label for="title">Title</label>
          </div>
          <div class="input-field">
            <textarea v-model = "description" id="description" class="materialize-textarea validate" required maxlength="2048"></textarea>
            <label for="description">Description</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
        </div>
        <div class="chips" ref="chips"></div>
        <input placeholder="Date" type="text" ref="datepicker" class="datepicker">
        <button type ="submit" class = "btn">Create task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:'',
      description:'',
      chips: null,
      date: null
    }
  },
  methods: {
    submitHandler(){
      const task = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        status: 'active',
        tags: this.chips.chipsData,
        date: this.date.date
      }
      this.$store.dispatch('createTask',task);
      this.$router.push('/list');

    }
  },
  mounted(){
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder:'Tags'
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      setDefaultDate:true,
      defaultDate: new Date()
    });
  
  },
  destroyed(){
    if(this.date && this.date.destroy){
      this.date.destroy()
    }

    if(this.chips && this.chips.destroy){
      this.chips.destroy()
    }
  }
};
</script>

<style scoped>
</style>
