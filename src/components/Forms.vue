<template>
  <div class="forms-wrapper">
    <h1>Корректировка ССД</h1>
    <hr>
    <h2>ID донесения - {{field.id_ves}}</h2>
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
      <div>
        <div>{{textAreaForms.note.name}}</div>
        <textarea cols="70" rows="6"></textarea>
      </div>
    </div>
    <div class="controls">
      <div @click="onFormsAvoid" class="controls__btn">Не сохранять</div>
      <div @click="onFormsSave" class="controls__btn">Сохранить</div>
    </div>
    field = {{field}}
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    inputForms: {
      "id_rank": {
        name: 'Категория',
        value: 'this.field.id_rank',
        formType: 'text'
      },
      "id_region": {
        name: 'Регион',
        value: '',
        formType: 'text'
      },
      "id_region_to": {
        name: 'Регион следования',
        value: '',
        formType: 'text'
      },
      "id_information_source": {
        name: 'Источник информации',
        value: '',
        formType: 'text'
      },
      "id_regime": {
        name: 'Код запаса',
        value: '',
        formType: 'text'
      },
      "permit": {
        name: 'Разрешение',
        value: '',
        formType: 'text'
      },
      "date": {
        name: 'Дата',
        value: '',
        formType: 'date'
      },
      "date_arrival": {
        name: 'Дата прибытия',
        value: '',
        formType: 'date'
      },
      "timestamp": {
        name: 'Дата, время',
        value: '',
        formType: 'datetime-local'
      },
      "datetime": {
        name: 'Дата, время 2',
        value: '',
        formType: 'datetime-local'
      },
    },
    textAreaForms: {
      note: {
        name: 'Примечание',
        value: ''
      }
    }
  }),
  methods: {
    onFormsSave() {
      console.log('inputForms ==', this.inputForms)
      this.$emit('closeForms')
    },
    onFormsAvoid() {
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