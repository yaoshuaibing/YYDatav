<template>
  <div class="polling-data">
    <!--头部-->
    <div class="polling-data-header">
      <div class="polling-title-cell">
        <div class="polling-cell" v-for="head in header" :key="head.name" :style="{'flex-basis': cellWidth + '%' }">
          <span>{{head.name}}</span>
        </div>
      </div>
    </div>
    <!--身体-->
    <div class="polling-data-body">
      <div class="polling-body-wapper" ref="pollingBody" style="top: 0">
        <div class="polling-body-cell-wapper" v-for="(data, index) in showData" :key="index" ref="bodyCell" :style="{height: `calc( 100% / ${ rowSize })`}">
          <div class="polling-cell" v-for="(field, i) in headerFileds" :key="i"
            :style="{flexBasis: cellWidth + '%' }">
            <span>{{data[field]}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRect } from "../../utils/domOpt";
import { animation } from "../../utils/clock";
export default {
  name: 'polling-data',
  props: {
    rowSize: {
      require: true,
      type: Number,
      default: 3
    },
    header: {
      require: true,
      type: Array,
      default: () => []
    },
    data: {
      require: true,
      type: Array,
      default: () => []
    },
    delay: {  // 全部数据滚动完毕停留时间, 单位是毫秒
      type: Number,
      default: 0
    },
    everyDelay: {  // 每条滚动到顶部时的停留时间，单位时毫秒
      type: Number,
      default: 200
    },
    pollingSpeed: { // 每条滚动的时间间隔
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      showList: [0],
      delayTimer: null,
      pollingSpeedTimer: null,
      everyDelayTimer: null
    }
  },
  created () {
    this.initShowList()
  },
  computed: {
    cellWidth () {
      return 100 / this.headerFileds.length
    },
    calcRowSize () {
      return this.rowSize > this.data.length ? this.data.length - 1 : this.rowSize
    },
    showData () {
      const { showList, data } = this
      const showData = showList.map(item => data[item])
      return showData;
    },
    headerFileds () {
      // 从 header 数据中获取表头和数据的对应属性
      return this.header.map(item => item.prop)
    }
  },
  mounted () {
    if (this.calcRowSize === this.rowSize) {
      // 此时说明数据条数比传递进来的 rowSize 大
      this.scroll()
    }
  },
  methods: {
    scroll () {
      // 开启滚动
      const { delay, everyDelay, pollingSpeed } = this
      const container = this.$refs.pollingBody
      const firstElm = this.$refs.bodyCell[0]
      this.pollingSpeedTimer = animation(() => {
        const height = getRect(firstElm).height
        const realSpeed = height / pollingSpeed
        const top = parseFloat(container.style.top)
        if (top <= -(height - 1)) {
          this.$nextTick(() => {
            container.style.top = 0
            this.changeShowList()
            this.pollingSpeedTimer()
            if (this.showList[this.showList.length - 2] === this.data.length - 1) {
              // 此时最后条数据出现在了屏幕上
              this.delayTimer = animation( ()=> {
                this.scroll()
                this.delayTimer()
              }, delay )
            } else {
              // 这里控制每条数据的停留时间
              this.everyDelayTimer = animation(() => {
                this.scroll()
                this.everyDelayTimer()
              }, everyDelay)
            }
          })
        } else {
          this.$nextTick(() => {
            container.style.top = top - realSpeed + "px"
          })
        }
      }, 1)
    },
    changeShowList () {
      const len = this.data.length;
      this.showList = this.showList.map(item => {
        let i = item + 1
        if (i >= len) {
          return 0
        }
        return i
      })
    },
    initShowList () {
      console.log(this.calcRowSize);
      this.showList = new Array(this.calcRowSize + 1).fill(1).map((item, index) => index)
    }
  },
  destroyed () {
    this.delayTimer && this.delayTimer()
    this.pollingSpeedTimer && this.pollingSpeedTimer()
    this.everyDelayTimer && this.everyDelayTimer()
  },
}
</script>

<style>
.polling-data{
  height: 100%;
}
.polling-data-header {
  border: 1px solid #333;
  z-index: 33;
  position: relative;
}
.polling-body-cell-wapper {
  border-bottom: 1px solid #333;
  height: 100%;
}
.polling-body-cell-wapper:last-child {
  border-bottom-width: 0;
}
.polling-body-cell-wapper,
.polling-title-cell {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: #efeffe;
}
.polling-body-wapper {
  border: 1px solid #333;
  border-top-width: 0;
}
.polling-cell {
  text-align: center;
  border-right: 1px solid #333;
  color: #fff;
}
.polling-cell:last-child {
  border-right-width: 0px;
}
.polling-data-body {
  position: relative;
  height: calc( 100% - 24px );
}
.polling-data {
  overflow: hidden;
}
.polling-data-body {
  border: 1px solid #333;
  border-top-width: 0;
}
.polling-body-wapper {
  border-width: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
}
</style>