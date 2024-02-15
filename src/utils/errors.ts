const createErrorFactory = function (name: string){
  return class extends Error {
    status: number

    constructor(message: string, status: number = 400) {
      super(message)
      this.name = name
      this.status = status
    }
  }
}

export const ResponseError = createErrorFactory('ResponseError')