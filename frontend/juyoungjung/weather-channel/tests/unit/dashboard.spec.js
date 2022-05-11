import { shallowMount } from '@vue/test-utils'
import DashBoard from '@/views/DashBoard.vue'

describe('DashBoard.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'The Weather Channel with Vue'
    const wrapper = shallowMount(DashBoard, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
