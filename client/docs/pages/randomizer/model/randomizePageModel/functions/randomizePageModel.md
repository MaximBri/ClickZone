[**clickzone**](../../../../../README.md)

***

[clickzone](../../../../../README.md) / [pages/randomizer/model/randomizePageModel](../README.md) / randomizePageModel

# Function: randomizePageModel()

> **randomizePageModel**(`dispatch`): `object`

Defined in: [src/pages/randomizer/model/randomizePageModel.ts:10](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/pages/randomizer/model/randomizePageModel.ts#L10)

Функция для управления данными о режиме "Рандомайзер". Если в хранилище нет контейнеров, то они будут запрошены

## Parameters

### dispatch

`ThunkDispatch`\<\{ `containers`: \{ `activeContainer`: `null` \| [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md) & `object`; `allContainers`: [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md)[]; `data`: [`ContainerSliceInterface`](../../../../../shared/types/interfaces/ContainerSliceInterface.md)[]; `keys`: `number`; \}; `dialyRewards`: \{ `allDays`: `number`; `canGetReward`: `boolean`; `currentDay`: `null` \| `number`; `data`: [`dailyRewardInterface`](../../../../../entities/user/daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md)[]; `hoursToNextReward`: `number`; \}; `miglioramenti`: \{ `data`: [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)[]; \}; `miglioramentiClicks`: \{ `data`: `null` \| [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md); \}; `notifications`: \{ `data`: [`notificationDataInterface`](../../../../../shared/types/interfaces/notificationDataInterface.md)[]; \}; `user`: [`userDataInterface`](../../../../../shared/types/interfaces/userDataInterface.md); `windows`: \{ `auth`: `boolean`; `dailyReward`: `boolean`; `improvements`: `boolean`; `inProcess`: `boolean`; `miglioramentiClick`: `null` \| `number`; `register`: `boolean`; `tutorials`: \{ `clicker`: `boolean`; `randomizer`: `boolean`; `rewards`: `boolean`; \}; \}; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

глобальный объект для управления состоянием хранилища

## Returns

`object`

### allContainers

> **allContainers**: [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md)[]

### userAuth

> **userAuth**: `null` \| `boolean`

### userContainers

> **userContainers**: [`ContainerSliceInterface`](../../../../../shared/types/interfaces/ContainerSliceInterface.md)[]

### userKeys

> **userKeys**: `number`
