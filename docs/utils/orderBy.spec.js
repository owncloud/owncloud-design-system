import orderBy from "./orderBy"

describe("orderBy.js", () => {

  it("should test orderBy function when collection is not null", () => {
    const collection = [{ id: 2 }, { id: 1 }]
    const result = orderBy(collection, "id")
    expect(result).toEqual([{ id: 1 }, { id: 2 }])
  })

  it("should test orderBy function when collection is null", () => {
    const collection = null
    const result = orderBy(collection, "id")
    expect(result).toEqual([])
  })
})
