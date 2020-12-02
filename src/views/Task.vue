<template>
  <div>
    <div class="row">
      <div class="col s6 offset-s3" v-if = "task">
        <h1>{{task.title}}</h1>
        <form @submit.prevent ="submitHandler">
          <div class="input-field">
            <textarea style="min-height: 100px" v-model = "description" id="description" class="materialize-textarea validate" required maxlength="2048"></textarea>
            <label for="description">Description</label>
            <span class="character-counter" style="float: right; font-size: 12px;">{{description.length}}/2048</span>
        </div>
        <div class="chips" ref="chips"></div>
        <input placeholder="Date" type="text" ref="datepicker" class="datepicker">
        <button :disabled="this.task.status === 'completed'" style = "margin-right:1rem;" type ="submit" class = "btn blue darken">Update</button>
        <button :disabled="this.task.status === 'completed'" class = "btn" @click = "completeTask">Complete</button>
        </form>
      </div>
      <h1 class="col s6 offset-s3" v-else>Task doesn't exist!</h1>
    </div>
  </div>
</template>

<script>
export default {
    data(){
    return{
      description:'',
      chips: null,
      date: null
    }
  },
   methods: {
    submitHandler(){
      this.$store.dispatch('updateTask',{
        id: this.task.id,
        description: this.description,
        date: this.date.date
      });
      this.$router.push('/list');

    },
    completeTask(){
     this.$store.dispatch('completeTask',this.task.id);
     this.$router.push('/list');
    }
  },
  computed: {
    task(){
      return this.$store.getters.taskById(+this.$route.params.id)
    }
  },
  mounted(){
    this.description = this.task.description;
    this.date = this.task.date;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder:'Tags',
      data: this.task.tags
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      setDefaultDate:true,
      defaultDate: new Date(this.task.date)
    });

    setTimeout(() => M.updateTextFields(),0)
  
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

@media screen and (max-width: 568px){
  h1 {
    font-size: 40px;
  }

  .btn {
    margin:0px 0px 1rem 0px
  }
}

</style>