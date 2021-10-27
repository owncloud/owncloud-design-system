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
      this.sortBy = this.firstSortableField
      this.$on(EVENT_THEAD_CLICKED, this.handleSort)
    }
  },
  computed: {
    sortedData() {
      if (!this.isSortable || !this.sortBy) {
        return
      }
      if (this.sortBy === "name") {
        const folders = [...this.data.filter(i => i.type === "folder")].sort((a, b) =>
          this.sortData(a, b)
        )
        const files = [...this.data.filter(i => i.type !== "folder")].sort((a, b) =>
          this.sortData(a, b)
        )
        if (this.sortDir === SORT_DIRECTION_ASC) {
          return folders.concat(files)
        }
        return files.concat(folders)
      }
      return [...this.data].sort((a, b) => this.sortData(a, b))
    },
    isSortable() {
      return this.fields.some(f => f.sortable)
    },
    firstSortableField() {
      const sortableFields = this.fields.filter(f => f.sortable).map(f => f.name)
      if (sortableFields) {
        return sortableFields[0]
      }
      return null
    },
  },
  methods: {
    sortData(a, b) {
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
      const userLang = navigator.language || navigator.userLanguage
      const compare = aValue
        .toString()
        .localeCompare(bValue.toString(), userLang, { sensitivity: "base" })
      return compare * modifier
    },
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
