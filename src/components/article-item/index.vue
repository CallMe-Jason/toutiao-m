<template>
  <!-- <van-cell class="article-item" :to="'/article/' + article.art_id"> -->
  <!-- <van-cell class="article-item" :to="`/article/${article.art_id}`"> -->
  <van-cell
    class="article-item"
    :to="{
      // 根据路由名称跳转
      name: 'article',
      // 传递参数，属性名要求是配置路由时路径中指定的名称，path: '/article/:articleId',
      params: {
        articleId: article.art_id
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <!-- 三张图片的情况 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="img" fit="cover" class="cover-item-img" />
        </div>
      </div>
      <!-- 文章信息 -->
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右侧一张图片的情况 -->
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  created() {
    // console.log(this.article);
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // 右侧的一张图片
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 100%;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
