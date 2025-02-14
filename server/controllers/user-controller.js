const UserService = require('../service/user-service')

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, login } = req.body
      console.log({ email, password, login })
      const userData = await UserService.registartion(email, password, login)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      console.error(error)
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {}
  }
  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async activate(req, res, next) {
    try {
    } catch (error) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }
  async getUsers(req, res, next) {
    try {
      res.json(['Вася', 'Петя'])
    } catch (error) {}
  }
}

module.exports = new UserController()
