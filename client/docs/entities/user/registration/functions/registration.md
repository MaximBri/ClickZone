[**clickzone**](../../../../README.md)

***

[clickzone](../../../../README.md) / [entities/user/registration](../README.md) / registration

# Function: registration()

> **registration**(`userData`, `setError`, `closeRegisterWindow`): `Promise`\<`void`\>

Defined in: [src/entities/user/registration.ts:17](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/entities/user/registration.ts#L17)

Функция регистрации на основе логина, пароля.

## Parameters

### userData

[`userDataForRegister`](../../../../shared/types/interfaces/userDataForRegister.md)

объект с логином и паролем

### setError

`Dispatch`\<`SetStateAction`\<[`formDataSendInterface`](../../../../widgets/pop-ups/register/model/registerModel/interfaces/formDataSendInterface.md)\>\>

функция для установки какой-либо ошибки, показывается покажется пользователю

### closeRegisterWindow

() => `void`

функция для закрытия окна регистрации

## Returns

`Promise`\<`void`\>
