module.exports = class UserDto {
  id
  isActivated
  constructor(model) {
    this.id = model._id
    this.isActivated = model.isActivated
  }
}
