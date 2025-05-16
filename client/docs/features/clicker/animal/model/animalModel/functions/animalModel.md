[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [features/clicker/animal/model/animalModel](../README.md) / animalModel

# Function: animalModel()

> **animalModel**(): `object`

Defined in: [src/features/clicker/animal/model/animalModel.ts:16](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/features/clicker/animal/model/animalModel.ts#L16)

Функция для отрисовки компонента с фигрукой, по которой кликает пользователь. Включает в себя логику по отрисовыванию кликов с начислением монет, смену уровней

## Returns

### addCoins()

> **addCoins**: (`event`) => `void`

Функция для добавления монет после клика и отрисовки самого результата: появление в месте клика информации о начислении монет

#### Parameters

##### event

`MouseEvent`\<`HTMLButtonElement`, `MouseEvent`\>

событие клика на фигурку

#### Returns

`void`

### buttonRef

> **buttonRef**: `RefObject`\<`null` \| `HTMLButtonElement`\>

### clicks

> **clicks**: `object`[]

### coinsToNextLevel

> **coinsToNextLevel**: `string`

### countCoinsOnClick

> **countCoinsOnClick**: `number`

### pet

> **pet**: [`animalInterface`](../../../../../../pages/home/model/animalsList/interfaces/animalInterface.md)
