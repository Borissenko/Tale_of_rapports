<template>
  <div class="forms-wrapper">
    <h1>Корректировка ССД</h1>
    <hr>
    <h2>ID донесения - {{row.id_ves}}</h2>
    <div>
      <div v-for="(form, key, ind) of inputForms"
           :key="ind + 'num'"
           class="field"
      >
        {{form.name}}
        <input :type="form.formType"
               v-model="form.value"
               :placeholder="form.name"
        >
      </div>
<!--      <div>-->
<!--        <div>{{textAreaForms.note.name}}</div>-->
<!--        <textarea cols="70" rows="6"-->
<!--                  v-model="textAreaForms.note.value"-->
<!--        ></textarea>-->
<!--      </div>-->
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
    ]),
  },
  data: () => ({
    inputForms: {},
    textAreaForms: {}
    // inputFo: {
    //   "id_rank": {
    //     name: 'Категория',
    //     value: '',
    //     formType: 'text'
    //   },
    //   "id_region": {
    //     name: 'Регион',
    //     value: '',
    //     formType: 'text'
    //   },
    //   "id_region_to": {
    //     name: 'Регион следования',
    //     value: '',
    //     formType: 'text'
    //   },
    //   "id_information_source": {
    //     name: 'Источник информации',
    //     value: '',
    //     formType: 'text'
    //   },
    //   "id_regime": {
    //     name: 'Код запаса',
    //     value: '',
    //     formType: 'text'
    //   },
    //   "permit": {
    //     name: 'Разрешение',
    //     value: '',
    //     formType: 'text'
    //   },
    //   "date": {
    //     name: 'Дата',
    //     value: '',
    //     formType: 'date'
    //   },
    //   "date_arrival": {
    //     name: 'Дата прибытия',
    //     value: '',
    //     formType: 'date'
    //   },
    //   "timestamp": {  //
    //     name: 'Дата, время',
    //     value: '',
    //     formType: 'datetime-local'
    //   },
    //   "datetime": {
    //     name: 'Дата, время 2',
    //     value: '',
    //     formType: 'datetime-local'
    //   }
    // },
    // textAreaFo: {
    //   note: {
    //     name: 'Примечание',
    //     value: ''
    //   }
    // }
  }),
  created() {
    let inputTypeConverting = {
      "NUM": 'text',
      "STR": 'text',
      "DATE": 'date',
      "DTIME": 'datetime-local',
      "TAREA": 'textarea'
    }
    
    for(let header of this.GET_TABLE_HEADERS) {
      if(header.type !== 'TAREA') {
        this.inputForms[header.name] = {
          name: header.title,
          value: this.row[header.name],
          formType: inputTypeConverting[header.type]
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'REFRESH_RAPPORT'
    ]),
    onFormsAction(type) {  //в каком формате взяли, в таком же формате и отдаем
      if (type === 1) {
        let refreshedField = {
          id_ves: this.field.id_ves
        }
        
        for (let key in this.field) {
          if (this.field.hasOwnProperty(key) && (key in this.inputForms)) {
            refreshedField[key] = this.inputForms[key].value
          }
        }
        // this.REFRESH_RAPPORT(refreshedField)
      }
      this.$emit('closeForms')
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
  
  .controls {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    
    &__btn {
      padding: 5px;
      border: $darkGrey 1px solid;
      color: $mainColor;
      cursor: pointer;
      
      &:hover {
        color: $mainColorHover;
      }
    }
  }
}
</style>