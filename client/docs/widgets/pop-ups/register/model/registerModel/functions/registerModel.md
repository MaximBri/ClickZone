[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [widgets/pop-ups/register/model/registerModel](../README.md) / registerModel

# Function: registerModel()

> **registerModel**(): `object`

Defined in: [src/widgets/pop-ups/register/model/registerModel.ts:26](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/widgets/pop-ups/register/model/registerModel.ts#L26)

Функция отвечает за всю логику для окна регистрации. Включает в себя функции для проверки, можно ли отправить данные на бэкенд (проверка ограничений), функцию для отправки данных на бэкенд, функции для открытия окна авторизации и закрытия окна регистрации.

## Returns

### canSend

> **canSend**: `boolean`

### closeRegisterWindow()

> **closeRegisterWindow**: () => `void`

Функция отвечает за закрытия окна регистрации, дополнительно выполняется код для плавности выключения

#### Returns

`void`

### error

> **error**: [`formDataSendInterface`](../interfaces/formDataSendInterface.md)

### formData

> **formData**: [`formDataInterface`](../interfaces/formDataInterface.md)

### inProcess

> **inProcess**: `boolean`

### loading

> **loading**: `boolean`

### onChangeData()

> **onChangeData**: (`key`, `value`) => `void`

Функция отвечает за синхронизацию данных пользователя в форме и в компоненте

#### Parameters

##### key

ключ, отвечающий за название поля, которое будет обновлено

`""` | `"login"` | `"pass"` | `"repeatPass"`

##### value

`string`

новое значение, которое будет установлено в объект с данными пользователя

#### Returns

`void`

### openAuthWindow()

> **openAuthWindow**: () => `void`

Функция отвечает за открытие окна авторизации и закрытия окна регистрации. Дополнительно выполняется код, отвечающий за плавность переключения

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

Функция отвечает за отправку данных. В начале проверяет, можно ли отправить их (выполнены ли все условия). Если да, то отправляет данные на бэкенд

#### Returns

`void`
