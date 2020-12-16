<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-from">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false" 
      />
    </form>
     <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="value"/>
    <!-- 联想建议 -->
    <search-suggestion v-else-if="value" :search-text="value" @search="onSearch"/>
     <!-- 搜索历史 -->
    <search-history v-else/>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      value: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },
  methods: {
    onSearch (val) {
      console.log(val);
        this.value = val
        this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
}
.search-from {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>