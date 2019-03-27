<script>
export default {
  name: "loader-to-loading",
}
</script>
<docs>
```jsx
    <template>
        <div>
            <p>
                {{info}}
            </p>
            <oc-progress v-if="state >= 0" :value="state" :max="max" />
            <oc-loader v-else />
        </div>
    </template>
    <script>
    export default {
        data () {
            return {
                state : -1,
                max : 10
            }
        },
        methods : {
            load() {
                let step = setInterval( () => {
                    if (this.state === this.max)
                        clearInterval(step)

                    this.state++
                }, 1000)
            }
        },
        mounted () {
            setTimeout(() => {
                this.load()
            }, 4500)
        },
        computed : {
            info () {
                return (this.state >= 0) ? 'Loading' : 'Loader (indeterminate)'
            }
        }
    }
    </script>
```
</docs>
