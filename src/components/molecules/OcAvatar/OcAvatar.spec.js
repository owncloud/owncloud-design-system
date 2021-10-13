import { mount } from "@vue/test-utils"
import OcAvatar from "../avatars./OcAvatar/OcAvatar.vue"

describe("OcAvatar", () => {
  const selectors = {
    initials: ".avatarInitials",
  }
  function getWrapperWithProps(props) {
    return mount(OcAvatar, {
      propsData: {
        ...props,
      },
    })
  }
  describe("prop value", () => {
    describe("when src is set", () => {
      let wrapper
      beforeEach(() => {
        wrapper = getWrapperWithProps({
          src: "http://some-image.jpg",
        })
      })
      it("should render oc image", () => {
        const imageElement = wrapper.find("img")
        expect(imageElement.exists()).toBeTruthy()
        expect(imageElement.attributes("src")).toBe("http://some-image.jpg")
      })
      it("should not render user initial", () => {
        expect(wrapper.find(selectors.initials).exists()).toBeFalsy()
      })
      it("should not render background", () => {
        expect(wrapper.attributes("style")).not.toContain("background-color: ")
      })
    })
    describe("when username is set", () => {
      it.each`
        username                   | expected_initial
        ${"."}                     | ${"."}
        ${"१२३ ४५६"}               | ${"१४"}
        ${"अंशु वर्मा"}            | ${"अव"}
        ${"किरण पराजुली"}          | ${"कप"}
        ${"Kiran पराजुली"}         | ${"Kप"}
        ${"किरण Parajuli"}         | ${"कP"}
        ${"test"}                  | ${"T"}
        ${"Test"}                  | ${"T"}
        ${"1Test"}                 | ${"1"}
        ${"test user"}             | ${"TU"}
        ${"test User"}             | ${"TU"}
        ${"Test User"}             | ${"TU"}
        ${"1234 5678"}             | ${"15"}
        ${"test-user"}             | ${"TU"}
        ${"test -user"}            | ${"TU"}
        ${"test - user"}           | ${"TU"}
        ${"test user one"}         | ${"TUO"}
        ${"test-user-one"}         | ${"TUO"}
        ${"test user one primary"} | ${"TUO"}
        ${"test User One Primary"} | ${"UOP"}
        ${"testUser One Primary"}  | ${"TOP"}
      `("should render user initials for username $username", ({ username, expected_initial }) => {
        const wrapper = getWrapperWithProps({
          userName: username,
        })
        const userInitialElement = wrapper.find(selectors.initials)
        expect(userInitialElement.exists()).toBeTruthy()
        expect(userInitialElement.text()).toBe(expected_initial)
      })
    })
    describe("when width is set", () => {
      let wrapper
      beforeEach(() => {
        wrapper = getWrapperWithProps({
          width: 100,
        })
      })
      it("should set width and height of the avatar wrapper", () => {
        expect(wrapper.attributes("style")).toContain("width: 100px; height: 100px;")
      })
      it("should determine font size and line height", () => {
        expect(wrapper.attributes("style")).toContain("line-height: 105px;")
        expect(wrapper.attributes("style")).toContain("font-size: 40px;")
      })
    })
    describe("accessibleLabel", () => {
      it("should not be set when value is empty string", () => {
        const wrapper = getWrapperWithProps({
          accessibleLabel: "",
        })
        expect(wrapper.attributes("aria-label")).toBeFalsy()
        expect(wrapper.attributes("role")).toBeFalsy()
        expect(wrapper.attributes("aria-hidden")).toBe("true")
        expect(wrapper.attributes("focusable")).toBe("false")
      })
      it("should be set when value is not empty string", () => {
        const wrapper = getWrapperWithProps({
          accessibleLabel: "test label",
        })
        expect(wrapper.attributes("aria-label")).toBe("test label")
        expect(wrapper.attributes("role")).toBe("img")
        expect(wrapper.attributes("aria-hidden")).toBeFalsy()
        expect(wrapper.attributes("focusable")).toBeFalsy()
      })
    })
  })
})
