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
            <span v-if="ind !== 0"
                  @click="CHANGE_ORDER({name: th.name, nn: -1})">
              <
            </span>
            <span @click="SET_SORTING_TYPE(th.name)">{{th.title}}</span>
            <span v-if=" ind !== GET_TABLE_HEADERS.length - 1"
                  @click="CHANGE_ORDER({name: th.name, nn: 1})">
              >
            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(field, ind) of GET_TABLE_FIELDS" :key="ind + 'field'"
            @dblclick="onRedaction(field)"
        >
          <td v-for="(th, ind) of GET_TABLE_HEADERS" :key="ind + 'fieldName'">
            {{field[th.name]}}
          </td>
        </tr>
        </tbody>
      </table>
      
      <forms class="forms"/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import Forms from "@/components/Forms";

export default {
  components: {
    Forms
  },
  data: () => ({
    isDefaultTheme: false
  }),
  computed: {
    ...mapGetters([
      'GET_DATA',
      'GET_TABLE_HEADERS',
      'GET_TABLE_FIELDS'
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
      'FETCH_DATA',
      'CHANGE_ORDER'
    ]),
    ...mapMutations([
      'SET_SORTING_TYPE'
    ]),
    onThemeChange() {
      document.body.classList.toggle('theme-type__lite')
      this.isDefaultTheme = !this.isDefaultTheme
    },
    onRedaction(field) {
      console.log('field ==', field)
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
  max-width: 1600px;
  min-width: 1400px;
  margin: 20px auto;
  
  header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    
    .btn_header {
      max-width: 120px;
      margin: 10px 0 10px auto;
      
      &:hover {
        cursor: pointer;
        color: $SimplePageHover;
      }
    }
  }
  
  table {
    width: 100%;
    user-select: none;
    
    caption {
      padding: 10px;
      text-transform: uppercase;
    }
    
    tr th {
      border-top: 1px $mainColor solid;
      border-bottom: 1px $mainColor solid;
      cursor: pointer;
      
      &:not(:first-child) :nth-child(2) {
        padding: 5px 5px;
      }
      &:not(:first-child) :first-child, :last-child {
        border: $mainColor 1px solid;
        border-radius: 90%;
        
        &:hover {
          background: $liteHover;
        }
      }
      &:last-child :last-child {
        border: none;
      }
      
    }
    
    tr td {
      padding-right: 5px;
  
      &:hover {
        background: $liteHover;
        cursor: pointer;
      }
    }
    
    tr:first-child td{
      padding-top: 10px;
    }
  }
  
  .forms {
    position: absolute;
    left: 60px;
    top: 100px;
    border: #777777 1px solid;
  }
}
</style>
