[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [widgets/pop-ups/auth/model/authModel](../README.md) / authModel

# Function: authModel()

> **authModel**(): `object`

Defined in: [src/widgets/pop-ups/auth/model/authModel.ts:19](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/widgets/pop-ups/auth/model/authModel.ts#L19)

Функция отвечает за всю логику авторизации: контроль полей ввода: логин, пароль, состояние загрузки, отправку запроса на бэкенд.

## Returns

### canSend

> **canSend**: `boolean`

### closeAuthWindow()

> **closeAuthWindow**: () => `void`

Функция для закрытия всплывающего окна с авторизаций. Создаёт плавное закрытие, либо переход к окну регистрации

#### Returns

`void`

### error

> **error**: [`authErrorInterface`](../../../../../../shared/types/interfaces/authErrorInterface.md)

### form

> **form**: `object`

#### form.login

> **login**: `string`

#### form.pass

> **pass**: `string`

#### form.setLogin

> **setLogin**: `Dispatch`\<`SetStateAction`\<`string`\>\>

#### form.setPass

> **setPass**: `Dispatch`\<`SetStateAction`\<`string`\>\>

### inProcess

> **inProcess**: `boolean`

### isLoaded

> **isLoaded**: `boolean`

### openRegisterWindow()

> **openRegisterWindow**: () => `void`

Функция отвечает за открытие всплывающего окна регистрации и закрытия окна авторизации

#### Returns

`void`

### refs

> **refs**: `object`

#### refs.background

> **background**: `RefObject`\<`null` \| `HTMLDivElement`\>

#### refs.body

> **body**: `RefObject`\<`null` \| `HTMLElement`\>

### sendForm()

> **sendForm**: () => `void`

Функция для вызова функции авторизации. Ещё раз проверяет все отправляемые данные на необходимые условия, если что-то не так, показывает ошибку пользователю

#### Returns

`void`
