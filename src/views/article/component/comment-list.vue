<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync='error'
  error-text="加载失败，请点击重试"
>
  <comment-item v-for="(item,index) in list" :key="index" :comment='item'/>
</van-list>

</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
// import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    // CommentItem
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      error:false,
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  created () {
    this. onLoad()
  },
  methods: {
     async onLoad() {
       console.log(this.source);
       try {
         const { data } = await getComments({
           type: 'a',
           source: this.source,
           offset: this.offset,
           limit: this.limit
         })
        //  console.log(data);
         const { results } = data.data
        //  console.log(results);
         this.list.push(...results)

        this.$emit('onload-success',data.data)

         this.loading = false
         if (results.length) {
           this.offset = data.data.last_id
         } else {
           this.finished = true
         }
       } catch (err) {
         this.error = true
         this.loading = false
       }
       //1.请求获取数据
       //2.请求数据添加到列表中
      //3.将loading设置为false
      //4.判断是否还有数据，
      // 有就更新获取下一页的数据，
      // 没有就把finished设置为结束
       
     }
  }
}
</script>

<style lang='less' scoped>

</style>