[**clickzone**](../../../../../README.md)

***

[clickzone](../../../../../README.md) / [entities/user/containers/buyContainer](../README.md) / buyContainer

# Function: buyContainer()

> **buyContainer**(`dispatch`, `userFinances`, `data`, `moneys`): `Promise`\<`void`\>

Defined in: [src/entities/user/containers/buyContainer.ts:21](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/entities/user/containers/buyContainer.ts#L21)

Функция для покупки контейнера. Определяет, за какую валюту покупается контейнер, делает запрос к бэкенду на покупку

## Parameters

### dispatch

`ThunkDispatch`\<\{ `containers`: \{ `activeContainer`: `null` \| [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md) & `object`; `allContainers`: [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md)[]; `data`: [`ContainerSliceInterface`](../../../../../shared/types/interfaces/ContainerSliceInterface.md)[]; `keys`: `number`; \}; `dialyRewards`: \{ `allDays`: `number`; `canGetReward`: `boolean`; `currentDay`: `null` \| `number`; `data`: [`dailyRewardInterface`](../../../daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md)[]; `hoursToNextReward`: `number`; \}; `miglioramenti`: \{ `data`: [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)[]; \}; `miglioramentiClicks`: \{ `data`: `null` \| [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md); \}; `notifications`: \{ `data`: [`notificationDataInterface`](../../../../../shared/types/interfaces/notificationDataInterface.md)[]; \}; `user`: [`userDataInterface`](../../../../../shared/types/interfaces/userDataInterface.md); `windows`: \{ `auth`: `boolean`; `dailyReward`: `boolean`; `improvements`: `boolean`; `inProcess`: `boolean`; `miglioramentiClick`: `null` \| `number`; `register`: `boolean`; `tutorials`: \{ `clicker`: `boolean`; `randomizer`: `boolean`; `rewards`: `boolean`; \}; \}; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

глобальная функция для смены состояния хранилища

### userFinances

количество монет и алмазов

#### coins

`number`

#### diamonds

`number`

### data

[`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md)

сам контейнер, который покупается

### moneys

`boolean`

контейнер покупается за монеты или за алмазы

## Returns

`Promise`\<`void`\>
