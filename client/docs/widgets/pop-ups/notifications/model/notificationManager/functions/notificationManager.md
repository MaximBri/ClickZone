[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [widgets/pop-ups/notifications/model/notificationManager](../README.md) / notificationManager

# Function: notificationManager()

> **notificationManager**(`dispatch`, `message`, `type`): `void`

Defined in: [src/widgets/pop-ups/notifications/model/notificationManager.ts:11](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/widgets/pop-ups/notifications/model/notificationManager.ts#L11)

Функция отвечает за добавление нового уведомления по входным параметрам и его автоматическое удаление через 3 секунды

## Parameters

### dispatch

`ThunkDispatch`\<\{ `containers`: \{ `activeContainer`: `null` \| [`ContainerInterface`](../../../../../../shared/types/interfaces/ContainerInterface.md) & `object`; `allContainers`: [`ContainerInterface`](../../../../../../shared/types/interfaces/ContainerInterface.md)[]; `data`: [`ContainerSliceInterface`](../../../../../../shared/types/interfaces/ContainerSliceInterface.md)[]; `keys`: `number`; \}; `dialyRewards`: \{ `allDays`: `number`; `canGetReward`: `boolean`; `currentDay`: `null` \| `number`; `data`: [`dailyRewardInterface`](../../../../../../entities/user/daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md)[]; `hoursToNextReward`: `number`; \}; `miglioramenti`: \{ `data`: [`miglioramentiInterface`](../../../../../clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)[]; \}; `miglioramentiClicks`: \{ `data`: `null` \| [`miglioramentiInterface`](../../../../../clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md); \}; `notifications`: \{ `data`: [`notificationDataInterface`](../../../../../../shared/types/interfaces/notificationDataInterface.md)[]; \}; `user`: [`userDataInterface`](../../../../../../shared/types/interfaces/userDataInterface.md); `windows`: \{ `auth`: `boolean`; `dailyReward`: `boolean`; `improvements`: `boolean`; `inProcess`: `boolean`; `miglioramentiClick`: `null` \| `number`; `register`: `boolean`; `tutorials`: \{ `clicker`: `boolean`; `randomizer`: `boolean`; `rewards`: `boolean`; \}; \}; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

глобальная функция для управления хранилищем

### message

`string`

сообщение, которое будет показано в уведомлении

### type

[`notificationsErrorsTypes`](../../../../../../shared/types/type-aliases/notificationsErrorsTypes.md)

тип сообщения: error, warning, success

## Returns

`void`
