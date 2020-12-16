<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text,index) in suggestions" :key="index" @click="$emit('search', text)">
      <div v-html="highlight(text)" slot="title"></div>
    </van-cell>
  </div>
</template>

<script>
import _ from 'loadsh'
import { getSearchSuggestions } from '@/api/search'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    searchText: {
      // handler (value) {
      //   //  console.log(value)
      //   this.loadSearchSuggestions(value)
      // },
      handler: _.debounce(function(value){
        this.loadSearchSuggestions(value)
      },200),
      immediate: true
    }
  },
  methods: {
    highlight (text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span class="active">${this.searchText}</span>`)
    },
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
        console.log(this.suggestions);
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>