import { createLocalVue, mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import { useIsVisible } from './index'

const localVue = createLocalVue()

const mockIntersectionObserver = () => {
  jest.useFakeTimers()

  const enable = () => {
    const mock = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn()
    }

    window.IntersectionObserver = jest.fn().mockImplementation(() => mock)

    return {
      mock,
      callback: (args, fastForward = 0) => {
        window.IntersectionObserver.mock.calls[0][0](args)
        jest.advanceTimersByTime(fastForward)
      }
    }
  }

  const disable = () => {
    delete window.IntersectionObserver
  }

  return { enable, disable }
}

const createWrapper = (options = {}) =>
  mount(
    {
      template: `
      <div>
      <div ref="target">{{ isVisible }}</div>
      </div>`,
      setup: () => {
        const target = ref()
        const { isVisible } = useIsVisible({ ...options, target })

        return {
          isVisible,
          target
        }
      }
    },
    {
      localVue
    }
  )

describe('useIsVisible', () => {
  const { enable: enableIntersectionObserver, disable: disableIntersectionObserver } =
    mockIntersectionObserver()

  it('is visible by default if browser does not support IntersectionObserver', () => {
    disableIntersectionObserver()
    const wrapper = createWrapper()
    expect(wrapper.vm.$refs.target.innerHTML).toBe('true')
  })

  it('observes the target', async () => {
    const { mock: observerMock } = enableIntersectionObserver()
    createWrapper()
    await nextTick()

    expect(observerMock.observe).toHaveBeenCalledTimes(1)
  })

  it('only shows once and then gets unobserved if the the composable is in the default show mode', async () => {
    const { mock: observerMock, callback: observerCallback } = enableIntersectionObserver()
    const wrapper = createWrapper()

    await nextTick()
    expect(wrapper.vm.$refs.target.innerHTML).toBe('false')

    observerCallback([{ isIntersecting: true }])
    await nextTick()
    expect(wrapper.vm.$refs.target.innerHTML).toBe('true')
    expect(observerMock.unobserve).toHaveBeenCalledTimes(1)
  })

  it('shows and hides multiple times if the the composable is in showHide mode', async () => {
    const { mock: observerMock, callback: observerCallback } = enableIntersectionObserver()
    const wrapper = createWrapper({ mode: 'showHide' })

    await nextTick()
    expect(wrapper.vm.$refs.target.innerHTML).toBe('false')

    observerCallback([{ isIntersecting: true }])
    await nextTick()
    expect(wrapper.vm.$refs.target.innerHTML).toBe('true')
    expect(observerMock.unobserve).toHaveBeenCalledTimes(0)
  })

  it('disconnects the observer before component gets unmounted', () => {
    const { mock: observerMock } = enableIntersectionObserver()
    const wrapper = createWrapper()

    expect(observerMock.disconnect).toHaveBeenCalledTimes(0)
    wrapper.vm.$destroy()
    expect(observerMock.disconnect).toHaveBeenCalledTimes(1)
  })
})
