[**clickzone**](../../../../../README.md)

***

[clickzone](../../../../../README.md) / [app/layouts/model/mainLayoutModel](../README.md) / mainLayoutModel

# Function: mainLayoutModel()

> **mainLayoutModel**(`dispatch`): `object`

Defined in: [src/app/layouts/model/mainLayoutModel.ts:26](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/app/layouts/model/mainLayoutModel.ts#L26)

Функция с общей логикой для всего приложения. Включает в себя систему синхронизации ресурсов, отправки запроса на сихронизацию при закрытии вкладки, получение данных из режима "Кликер", начисление наград

## Parameters

### dispatch

`ThunkDispatch`\<\{ `containers`: \{ `activeContainer`: `null` \| [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md) & `object`; `allContainers`: [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md)[]; `data`: [`ContainerSliceInterface`](../../../../../shared/types/interfaces/ContainerSliceInterface.md)[]; `keys`: `number`; \}; `dialyRewards`: \{ `allDays`: `number`; `canGetReward`: `boolean`; `currentDay`: `null` \| `number`; `data`: [`dailyRewardInterface`](../../../../../entities/user/daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md)[]; `hoursToNextReward`: `number`; \}; `miglioramenti`: \{ `data`: [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)[]; \}; `miglioramentiClicks`: \{ `data`: `null` \| [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md); \}; `notifications`: \{ `data`: [`notificationDataInterface`](../../../../../shared/types/interfaces/notificationDataInterface.md)[]; \}; `user`: [`userDataInterface`](../../../../../shared/types/interfaces/userDataInterface.md); `windows`: \{ `auth`: `boolean`; `dailyReward`: `boolean`; `improvements`: `boolean`; `inProcess`: `boolean`; `miglioramentiClick`: `null` \| `number`; `register`: `boolean`; `tutorials`: \{ `clicker`: `boolean`; `randomizer`: `boolean`; `rewards`: `boolean`; \}; \}; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

глобальная функция для управления хранилищем

## Returns

`object`

### isLoadedClickerData

> **isLoadedClickerData**: `null` \| `boolean`
