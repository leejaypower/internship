import { shallowMount } from '@vue/test-utils'
import SignInPage from '@/views/signInPage/SignInPage.vue'

describe('SignInPage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SignInPage, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
