import { EVENT_THEAD_CLICKED } from "../helpers/constants"
import "./sort.scss"

const SORT_DIRECTION_ASC = "asc"
const SORT_DIRECTION_DESC = "desc"

export default {
  data: () => ({
    sortBy: null,
    sortDir: SORT_DIRECTION_ASC,
  }),
  created() {
    if (this.isSortable) {
      this.$on(EVENT_THEAD_CLICKED, this.handleSort)
    }
  },
  computed: {
    sortedData() {
      if (!this.isSortable || !this.sortBy) {
        return
      }

      return [...this.data].sort((a, b) => {
        let aValue = a[this.sortBy]
        let bValue = b[this.sortBy]
        const modifier = this.sortDir === SORT_DIRECTION_ASC ? 1 : -1

        const { sortable } = this.fields.find(f => f.name === this.sortBy)

        if (sortable) {
          if (typeof sortable === "string") {
            const genArrComp = vals => {
              return vals.map(val => val[sortable]).join("")
            }

            aValue = genArrComp(aValue)
            bValue = genArrComp(bValue)
          } else if (typeof sortable === "function") {
            aValue = sortable(aValue)
            bValue = sortable(bValue)
          }
        }

        if (!isNaN(aValue) && !isNaN(bValue)) {
          return (aValue - bValue) * modifier
        }

        if (aValue < bValue) return -1 * modifier
        if (aValue > bValue) return modifier

        return 0
      })
    },
    isSortable() {
      return this.fields.some(f => f.sortable)
    },
  },
  methods: {
    fieldIsSortable({ sortable }) {
      return !!sortable
    },
    handleSort(field) {
      if (!this.fieldIsSortable(field)) {
        return
      }

      if (field.name === this.sortBy) {
        this.sortDir =
          this.sortDir === SORT_DIRECTION_ASC ? SORT_DIRECTION_DESC : SORT_DIRECTION_ASC
        return
      }

      this.sortBy = field.name
    },
    extractSortThProps(props, field) {
      if (!this.fieldIsSortable(field)) {
        return
      }

      let sort = "none"
      if (this.sortBy === field.name) {
        sort = this.sortDir === SORT_DIRECTION_ASC ? "descending" : "ascending"
      }
      props["aria-sort"] = sort
    },
  },
}
