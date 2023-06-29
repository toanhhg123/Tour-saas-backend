class Singleton {
  protected static _instance: Singleton

  public static Instance<TModel = unknown>() {
    return (this._instance ||
      (this._instance = new this())) as TModel
  }
}

export default Singleton
