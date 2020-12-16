<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title">我的频道</div>
     <van-button class="edit-btn" type="danger" plain round size="mini" @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
         v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
      <van-icon v-show="isEdit && !fixedChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
      <span class="text" slot="text" :class="{ active: index === active }">
        {{channel.name}}
      </span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        @click="onAddChannel(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels,addUserChannel,deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑状态的显示
      fixedChannels: [0] // 固定频道，不允许删除
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // console.log(channel.id);
          await deleteUserChannel(channel.id)
          this.$toast('删除成功')
      } else {
         setItem('TOUTIAO_CHANNELS',this.myChannels)
      }
      } catch (err) {
        // this.$toast('操作失败，请稍后重试',err)
        console.log(err);
      }
    },
    onMyChannelClick(channel,index){
      if(this.isEdit){
        if(this.fixedChannels.includes(channel.id)) {
          return
        }
        if((index <= this.active)) {
          this.$emit('update-active', this.active - 1)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(channel)
      }else {
         this.$emit('update-active', index,false)
      }
    },
    async onAddChannel(channel){
      this.myChannels.push(channel)
      if(this.user) {
        // console.log(1);
        try {
          await addUserChannel({
          id: channel.id,
          seq:this.myChannels.length 
        })
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      }else {
        setItem('TOUTIAO_CHANNELS',this.myChannels)
      }
    },
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        // console.log(this.allChannels);
      } catch {
        this.$toast('获取数据失败')
      }
    }
  },
  computed: {
      ...mapState(['user']),
     recommendChannels() {
      // filter 把符合条件的元素返回到新数组
      return this.allChannels.filter(channel => {
        // find 找到符合条件的第一个就返回，后面就不再查找！
        return !this.myChannels.find(myChannel => myChannel.id === channel.id)
      })
    }
  }
};
</script>
<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
}
 /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
 /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
.active {
        color: red;
      }
</style>