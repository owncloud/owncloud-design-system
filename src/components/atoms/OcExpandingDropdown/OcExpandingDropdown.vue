<template>
  <div>
    <div class="dropdown" :class="{ active: dropdownVisible }">
			<oc-button
				appearance="raw"
				variation="inverse"
				class="dropdown-button"
				@click="toggleDropdown"
			>
				<oc-icon name="grid" size="large" class="oc-flex" />
			</oc-button>
      <transition name="slide">
        <div class="dropdown-content" v-if="dropdownVisible">
          <div style="width: 300px; padding: 10px">
						<slot />
					</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "OcExpandingDropdown",
  status: "ready",
  release: "0.0.1",
  setup() {
    const dropdownVisible = ref(false);
    const buttonText = ref('Toggle Dropdown');

    const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
    };

    return {
      dropdownVisible,
      buttonText,
      toggleDropdown,
    };
  },
};
</script>

<style lang="scss">
.dropdown {
  position: relative;
  display: inline-block;
  filter: none;
  transition: opacity 0.5s;
}
.dropdown.active {
  filter: drop-shadow(0px 2px 4px #232323);
}
.dropdown.active > .dropdown-button {
  border-bottom-left-radius:0px;
  border-bottom-right-radius:0px;
}
.dropdown-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  height: 45px;
  width: 45px;
  border-radius: 5px;
  transition: all 0.55s;
  z-index: 1;
}
.dropdown-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  background-color: #4f4f4f;
  transition: all 0.01s linear;
  transition-delay: 0s;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  z-index: -1;
}

.dropdown.active > .dropdown-button::before {
  height: 45px;
}
.dropdown:not(.active) > .dropdown-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background-color: #4f4f4f;
  height: 0px;
  z-index: -1;
}
.dropdown-button i {
  font-size: 22px;
}
.dropdown-content {
  position: absolute;
  top: 45px;
  left: 0;
  padding: 10px;
  color: #cccccc;
  background-color: #4f4f4f;
  overflow: visible;
  z-index: 999999;
  border-bottom-left-radius: 5px;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

.slide-enter-active {
	transition: all 0.125s;
	transition-delay: 0.02s;
	transition-timing-function: ease-out;
}

.slide-leave-active {
	transition-duration: 0.1s;
}

.slide-enter-to, .slide-leave {
	max-height: 100px;
	max-width: 300px;
	overflow: hidden;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}

.slide-enter, .slide-leave-to {
	overflow: hidden;
	max-height: 2px;
	max-width: 45px;
	border-radius: 0px;
}
</style>

<docs>
```js
<div style="background: #dddddd; height: 200px; background-color: #292929;">
  <oc-expanding-dropdown>
		<span>Hello World Hello World Hello World</span><br/>
		<span>Hello World Hello World</span><br/>
		<span>Hello World</span><br/>
		<span>Hello World</span><br/>
	</oc-expanding-dropdown>
</div>
```
</docs>
