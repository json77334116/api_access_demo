<template>
    <div>
        <div class="api-row">调用接口：{{api}}</div>
        <div class="result">返回结果：{{result}}</div>
        <div style="margin-top: 15px;">访问历史：</div>
        <ul class="log-container">
            <li>
                <span class="col header col1">序号</span>
                <span class="col header col2">返回状态</span>
                <span class="col header col3">返回结果</span>
                <span class="col header col4">耗时</span>
                <span class="col header col5">访问时间</span>
            </li>
            <li v-for="(item, idx) in callRecords" :key="idx">
                <span class="col col1">{{idx + 1}}</span>
                <span class="col col2">{{item.status}}</span>
                <span class="col col3">{{item.msg}}</span>
                <span class="col col4">{{item.time}}</span>
                <span class="col col5">{{item.calltime}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'AccessApi',
  data () {
    return {
      api: 'https://api.github.com/',
      callTime: null,
      interval: 5,
      result: null,
      callRecords: []
    }
  },
  props: {},
  created () {},
  mounted () {
    this.impleteAction()
  },
  methods: {
    impleteAction () {
      setTimeout(() => {
        this.callApi()
      }, this.interval * 1000)
    },
    callApi () {
      const me = this
      // console.log('callRecords:', me.callRecords);
      this.callTime = new Date()
      this.$axios.get(me.api).then(function (res) {
        me.processResult(res)
        me.impleteAction()
      }).catch(function (err) {
        me.result = err
        const obj = { status: 0, data: err }
        me.processResult(obj)
        me.impleteAction()
      })
    },
    processResult (res) {
      const me = this
      me.result = res.data
      me.callRecords.push({ status: res.status, msg: res.statusText, calltime: me.formatCallTime(), time: `用时：${me.formatUsedTime()}秒` })
    },
    formatCallTime () {
      let re = ''
      if (!this.callTime) return re
      const y = this.callTime.getFullYear()
      const m = this.callTime.getMonth() + 1
      const d = this.callTime.getDate()
      const h = this.callTime.getHours()
      const min = this.callTime.getMinutes()
      const sec = this.callTime.getSeconds()
      re = `${y}-${m}-${d} ${h}:${min}:${sec}`
      return re
    },
    formatUsedTime () {
      if (!this.callTime) this.callTime = new Date()
      const d = new Date()
      const t = (d.getTime() - this.callTime.getTime()) / 1000
      return Math.round(t * 1000) / 1000
    }
  }
}
</script>

<style scoped>
.api-row{
    border: 1px solid #ccc;
    padding: 10px;
}
.result{
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    height: auto;
    min-height: 237px;
    margin-top: 15px;
}
.log-container{
    display: table;
    border: 1px solid #ccc;
    width: 100%;
    min-height: 100px;
    padding: 10px;
}
.log-container li{
    display: table-row;
    padding: 0;
}
.log-container li span{
    display: table-cell;
    vertical-align: middle;
}
.log-container li span.header{
    font-weight: bold;
    height: 20px;
}
.log-container li span.col{
    padding: 5px;
    text-align: center;
}
.log-container li span.col1{
    width: 10%;
}
.log-container li span.col2{
    width: 10%;
}
.log-container li span.col3{
    width: 20%;
}
.log-container li span.col4{
    width: 20%;
}
/*.log-container li span.col5{
    width: 10%;
}*/
</style>
