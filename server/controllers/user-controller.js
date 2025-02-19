const UserService = require('../service/user-service')

class UserController {
  async registration(req, res, next) {
    try {
      const { password, login } = req.body

      if (login.length < 4) {
        return res.status(400).json({
          message: 'Логин не должен быть короче 4 символов',
          field: 'login',
        })
      }

      if (password.length < 4) {
        return res.status(400).json({
          message: 'Пароль не должен быть короче 4 символов',
          field: 'password',
        })
      }

      console.log({ password, login })
      const userData = await UserService.registartion(password, login)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      console.error(error)

      if (error.message === 'Логин занят') {
        return res.status(422).json({
          message: error.message,
          field: 'login',
        })
      }

      return res.status(500).json({
        message: 'Произошла ошибка на сервере',
      })
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
