[**clickzone**](../../../../README.md)

***

[clickzone](../../../../README.md) / [shared/api/auth](../README.md) / authApi

# Variable: authApi

> `const` **authApi**: `object`

Defined in: [src/shared/api/auth.ts:7](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/shared/api/auth.ts#L7)

Глобальный объект с методами для авторизации, регистрации

## Type declaration

### logout()

> **logout**: () => `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

Метод для выхода игрока из аккаунта

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>

### sendAuth()

> **sendAuth**: (`login`, `password`) => `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

Метод для отправки авторизации на бэкенд

#### Parameters

##### login

`string`

логин пользователя

##### password

`string`

пароль пользователя

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>

### sendRegister()

> **sendRegister**: (`login`, `password`) => `Promise`\<`AxiosResponse`\<`any`, `any`\>\>

Метод для отправки запроса на регистрацию

#### Parameters

##### login

`string`

логин пользователя

##### password

`string`

пароль пользователя

#### Returns

`Promise`\<`AxiosResponse`\<`any`, `any`\>\>
