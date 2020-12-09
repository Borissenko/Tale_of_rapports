<template>
  <div>
    <div v-if="Object.keys(GET_DATA).length === 0" @click="FETCH_DATA" class="introduction">
      Обработать данные
    </div>
    <div v-else class="wrapper">
      GET_DATA = {{GET_DATA}}
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'GET_DATA'
    ])
  },
  methods: {
    ...mapActions([
      'FETCH_DATA'
    ])
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
    color: blue;
  }
}

</style>
