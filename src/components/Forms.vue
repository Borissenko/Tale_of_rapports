<template>
  <div class="forms-wrapper">
    <h1>Корректировка ССД</h1>
    inputForms = {{inputForms}}
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
  computed: {
    inputForms: {
      get() {
        return {
          "id_rank": {
            name: 'Категория',
            value: this.field.id_rank,
            formType: 'text'
          },
          "id_region": {
            name: 'Регион',
            value: this.field.id_region,
            formType: 'text'
          },
          "id_region_to": {
            name: 'Регион следования',
            value: this.field.id_region_to,
            formType: 'text'
          },
          "id_information_source": {
            name: 'Источник информации',
            value: this.field.id_information_source,
            formType: 'text'
          },
          "id_regime": {
            name: 'Код запаса',
            value: this.field.id_regime,
            formType: 'text'
          },
          "permit": {
            name: 'Разрешение',
            value: this.field.permit,
            formType: 'text'
          },
          "date": {
            name: 'Дата',
            value: this.field.date,
            formType: 'date'
          },
          "date_arrival": {
            name: 'Дата прибытия',
            value: this.field.date_arrival,
            formType: 'date'
          },
          "timestamp": {
            name: 'Дата, время',
            value: this.field.timestamp,
            formType: 'datetime-local'
          },
          "datetime": {
            name: 'Дата, время 2',
            value: this.field.datetime,
            formType: 'datetime-local'
          },
        }
      },
      set(val) {
        console.log('val ==', val)
      }
    },
    textAreaForms() {
      return {
        note: {
          name: 'Примечание',
          value: this.field.note,
        }
      }
    }
  },
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