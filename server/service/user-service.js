const UserModel = require('../models/user-models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
// const mailService = require('../service/mail-service')
const tokenService = require('../service/token-service')
const UserDto = require('../dtos/user-dto')

class UserService {
  async registartion(password, login) {
    const candidate = await UserModel.findOne({ login })

    if (candidate) {
      throw new Error('Логин занят')
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()

    const user = await UserModel.create({
      password: hashPassword,
      login,
      activationLink,
    })
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}api/activate/${activationLink}`
    // )

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

module.exports = new UserService()
