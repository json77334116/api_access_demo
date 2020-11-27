import Vue from 'vue'
import axios from 'axios'
import { expect } from 'chai'
// import { shallowMount } from '@vue/test-utils'
import AccessApi from '@/components/AccessApi.vue'

describe('测试AccessApi.vue', () => {
  it('测试异步调用API', (done) => {
    // const wrapper = shallowMount(AccessApi)
    const AccessApiIst = Vue.extend(AccessApi)
    const ist = new AccessApiIst()
    axios.get('https://api.github.com/').then(function (res) {
      expect(res).to.be('object')
      ist.processResult(res)
    }).catch(function (err) {
      const obj = { status: 0, data: err }
      ist.processResult(obj)
    }).then(done, done)
  })
})
