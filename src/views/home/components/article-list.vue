<template>
  <div class="article-list">
    <van-pull-refresh v-model="isreFreshLoading" @refresh='onRefresh' :success-text="refreshSuccessText">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync='error'
      error-text="请求失败稍后再试"
    >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态，默认不 loading
      finished: false, // 数据是否加载完成
      timestamp: null,
      error: false,//控制失败的提示状态
      isreFreshLoading:false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async onRefresh(){
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          // 请求数据的页码，请求第 1 页数据，用当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求的返回值中给出
          timestamp: Date.now(),
          with_top: 1 // 是否包含置顶
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.refreshSuccessText = `更新了${results.length}条数据`

        this.isreFreshLoading = false
      } catch (err) {
        // console.log('请求失败');
        this.isreFreshLoading = false
        this.refreshSuccessText = '更新失败请稍后再试'
      }
      // console.log(123);
      
    },
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 ID
          // 请求数据的页码，请求第 1 页数据，用当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求的返回值中给出
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶
        })
        //  if (Math.random() > 0.5) {
        //   JSON.parse('xxx')
        // } 
       
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        // 2. 把请求结果数据放到 list 数组中
        this.loading = false
        // 3. 本次数据加载完毕后要把 loading 设置为 false，loading 关闭后才能触发下一次的加载更多
        // this.loading = false
        if(results.length) {
          //更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          //没有数据了，将finished设置为true
          this.finished = true
        }
        // 4. 数据加载完毕后，要把 finished 设置为 true，不再触发加载更多了
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>