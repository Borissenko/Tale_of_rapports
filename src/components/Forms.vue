<template>
  <div class="forms-wrapper">
    <h1>Корректировка ССД</h1>
    <hr>
    <h2>ID донесения - {{row.id_ves}}</h2>
    <div>
      <div v-for="(form, ind) of inputForms.filter(form => form.formType !== 'textarea')"
           :key="ind + 'input'"
           class="field"
      >
        {{form.title}}
        <input :type="form.formType"
               v-model="form.value"
               :placeholder="form.title"
        >
      </div>
      
      <div v-for="(form, ind) of inputForms.filter(form => form.formType === 'textarea')"
           :key="ind + 'textarea'"
      >
        <div>{{form.title}}</div>
        <textarea cols="70" rows="6"
                  v-model="form.value"
        />
      </div>
    </div>
    <div class="controls">
      <div @click="onFormsAction(0)" class="controls__btn">Не сохранять</div>
      <div @click="onFormsAction(1)" class="controls__btn">Сохранить</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'GET_TABLE_HEADERS'
    ])
  },
  data: () => ({
    inputForms: []
  }),
  methods: {
    ...mapMutations([
      'REFRESH_RAPPORT'
    ]),
    onFormsAction(type) {  //в каком формате получили, в таком же формате и отдаем
      if (type === 1) {
        let refreshedField = {
          id_ves: this.row.id_ves
        }
        for (let field of this.inputForms) {
          if(field.formType === 'datetime-local') {
            refreshedField[field.name] = field.value.replace(/T/, ' ')
          } else {
            refreshedField[field.name] = field.value
          }
        }
        this.REFRESH_RAPPORT(refreshedField)
      }
      this.$emit('closeForms')
    }
  },
  created() {
    let inputTypeConverting = {
      "NUM": 'text',
      "STR": 'text',
      "DATE": 'date',
      "DTIME": 'datetime-local',
      "TAREA": 'textarea'
    }
    
    for (let header of this.GET_TABLE_HEADERS) {
      if (header.name !== 'id_ves') {
        let value = ''
        if (header.type === 'DTIME') {
          value = this.row[header.name].replace(/\s/g, 'T').split('Z')[0]
        } else {
          value = this.row[header.name]
        }
        
        this.inputForms.push({
          name: header.name,
          title: header.title,
          value,
          formType: inputTypeConverting[header.type]
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.forms-wrapper {
  width: 100%;
  height: 100%;
  background: $grey;
  padding: 0 20px;
  
  .field {
    width: 100%;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  textarea {
    width: 100%;
    resize: none;
  }
}
</style>