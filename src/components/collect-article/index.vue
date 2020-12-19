<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value,
    }"
    :loading='loading'
    @click="onCollect"
  ></van-button>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: "CollectArticle",
  data() {
    return {
      loading: false
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      // console.log(1);
      this.loading = true
      try {
        if (this.value) {
          //已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏，添加收藏
          await addCollect(this.articleId)
        }
        this.$emit('input',!this.value)
        this.$toast.success(!this.value ? '收藏成功': '取消收藏')
      } catch (err) {
        this.$toast.fail('操作失败请重试')
      }
      this.loading = false
    }
  }
};
</script>

<style lang='less' scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>