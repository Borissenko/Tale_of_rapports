<template>
  <div>
    <div v-if="Object.keys(GET_DATA).length === 0" @click="FETCH_DATA" class="introduction">
      Обработать данные
    </div>
    <div v-else class="wrapper">
      <hr>
      <div class="header">
        <div class="header__title">{{GET_DATA.PageTitle}}</div>
        <div @click="onThemeChange" class="header__btn">Сменить тему на
          {{isDefaultTheme ? 'загруженную' : 'стандартную'}}
        </div>
      </div>
      <hr>
      <h1>{{GET_DATA.H1Content}}</h1>
      <tabletitle>{{GET_DATA.TableName}}</tabletitle>
      
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    isDefaultTheme: false,
  }),
  computed: {
    ...mapGetters([
      'GET_DATA'
    ]),
  },
  watch: {
    'GET_DATA.PageTemplate'(value) {
      //под "шаблоном оформления" здесь подразумевается цветовая схема страницы
      if (value != null)
        document.body.classList.toggle('theme-type__lite')
    }
  },
  methods: {
    ...mapActions([
      'FETCH_DATA'
    ]),
    onThemeChange() {
      document.body.classList.toggle('theme-type__lite')
      this.isDefaultTheme = !this.isDefaultTheme
    }
  }
}
</script>

<style lang="scss">
body {
  background: #e9ecec;
  color: #3f8657;
}

.introduction {
  width: 200px;
  margin: 100px auto;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  
  &:hover {
    color: #0bb7ce;
  }
}

.theme-type__lite {
  background: beige;
  color: #777777;
}

h1 {
  margin: 0;
  padding: 0;
  font-size: 18px;
}

.wrapper {
  max-width: 700px;
  margin: 20px auto;
  
  .header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    //justify-content: space-between;
    font-size: 22px;
    font-weight: bold;
    text-transform: uppercase;
    
    &__btn {
      max-width: 120px;
      margin: 10px 0 10px auto;
      font-size: 11px;
      font-weight: 300;
      
      &:hover {
        cursor: pointer;
        color: #3b3636;
      }
    }
  }
}
</style>
