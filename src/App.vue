<template>
  <div>
    <div v-if="Object.keys(GET_DATA).length === 0" @click="FETCH_DATA" class="introduction">
      Обработать данные
    </div>
    <div v-else class="wrapper">
      <hr>
      <header>
        <h1>{{GET_DATA.PageTitle}}</h1>
        <div @click="onThemeChange" class="btn_header">Сменить тему на
          {{isDefaultTheme ? 'загруженную' : 'стандартную'}}
        </div>
      </header>
      <hr>
      <h2>{{GET_DATA.H1Content}}</h2>
      <table>
        <caption>{{GET_DATA.TableName}}</caption>
        <thead>
        <tr>
          <th v-for="(th, ind) of GET_TABLE_HEADERS" :key="ind + 'th'">
            {{th}}
          </th>
        </tr>
        </thead>
      </table>
    
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
      'GET_DATA',
      'GET_TABLE_HEADERS'
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

.introduction {
  width: 200px;
  margin: 100px auto;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  
  &:hover {
    color: $mainColorHover;
  }
}

.theme-type__lite {
  background: $SimplePageBackground;
  color: $SimplePageColor;
}

.wrapper {
  max-width: 700px;
  margin: 20px auto;
  
  header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    
    .btn_header {
      max-width: 120px;
      margin: 10px 0 10px auto;
      font-size: 11px;
      font-weight: 300;
      
      &:hover {
        cursor: pointer;
        color: $SimplePageHover;
      }
    }
  }
}
</style>
