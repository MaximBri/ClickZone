[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [features/clicker/miglioramenti/model/miglioramentiModel](../README.md) / miglioramentiModel

# Function: miglioramentiModel()

> **miglioramentiModel**(`improvement`): `object`

Defined in: [src/features/clicker/miglioramenti/model/miglioramentiModel.ts:23](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/features/clicker/miglioramenti/model/miglioramentiModel.ts#L23)

Функция с основной логикой для улучшений в окне с покупкой улучшений. Отслеживает имеющиеся у пользователя постоянные улучшения, и если они уже есть, не даёт приобрести их снова. Одноразовые улучшения можно покупать сколько угодно раз

## Parameters

### improvement

[`miglioramentiInterface`](../../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)

## Returns

### buyImprovement()

> **buyImprovement**: (`id`) => `Promise`\<`void`\>

Функция для покупки улучшения по его id. Проверяет, что у пользователя достаточно ресурсов для покупки. Отправляет запрос на покупку. Если покупка прошла успешно, начисляет улучшение, показывает уведомление об успешной покупке. Если во время покупки произошла ошибка, то показывается уведомление с ошибкой.

#### Parameters

##### id

`number`

id улучшения, которое хочет купить пользователь

#### Returns

`Promise`\<`void`\>

### haveThisMiglioramenti

> **haveThisMiglioramenti**: `undefined` \| `boolean`
