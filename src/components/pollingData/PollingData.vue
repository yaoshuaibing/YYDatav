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
        <div class="polling-body-cell-wapper" v-for="(data, index) in showData" :key="index" ref="bodyCell">
          <div class="polling-cell" v-for="(field, i) in headerFileds" :key="i"
            :style="{flexBasis: cellWidth + '%', height: 150/rowSize + 'px' }">
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
  data () {
    return {
      dataField: ["name", "num"],
      header: [
        {
          name: "产品",
          prop: "name"
        },
        {
          name: "数据",
          prop: "num"
        }
      ],
      datas: [
        {
          name: "活着",
          num: "1"
        },
        {
          name: "这就是生活",
          num: "2"
        },
        {
          name: "这就是美丽",
          num: "3"
        },
        {
          name: "这就是明",
          num: "4"
        }
      ],
      rowSize: 3,
      showList: [0]
    }
  },
  created () {
    this.initShowList()
  },
  computed: {
    cellWidth () {
      return 100 / this.dataField.length
    },
    calcRowSize () {
      return this.rowSize > this.datas.length ? this.datas.length - 1 : this.rowSize
    },
    showData () {
      const { showList, datas } = this
      const showData = showList.map(item => datas[item])
      return showData;
    },
    headerFileds() {
      // 从 header 数据中获取表头和数据的对应属性
      return this.header.map( item => item.prop )
    }
  },
  mounted () {
    this.scroll()
  },
  methods: {
    scroll () {
      // 开启滚动
      const container = this.$refs.pollingBody
      const firstElm = this.$refs.bodyCell[0]
      const timer = animation(() => {
        const height = getRect(firstElm).height
        const top = parseInt(container.style.top)
        if (top <= -(height-1)) {
          this.$nextTick(() => {
            container.style.top = 0
            this.changeShowList()
            timer()
            const timer1 = animation( () => {
              this.scroll()
              timer1()
            }, 500 )
          })
        } else {
          this.$nextTick(() => {
            container.style.top = top - 1 + "px"
          })
        }
      }, 20)
    },
    changeShowList () {
      const len = this.datas.length;
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


}
</script>

<style>
.polling-data-header {
  border: 1px solid #333;
}
.polling-body-cell-wapper {
  border-bottom: 1px solid #333;
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
}
.polling-cell:last-child {
  border-right-width: 0px;
}
.polling-data-body {
  position: relative;
}
.polling-data {
  overflow: hidden;
}
.polling-data-body {
  height: 150px;
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
  height: 150px;
  z-index: -11;
}
</style>