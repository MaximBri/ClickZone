[**clickzone**](../../../../README.md)

***

[clickzone](../../../../README.md) / [entities/user/authorization](../README.md) / authorization

# Function: authorization()

> **authorization**(`data`): `Promise`\<`void`\>

Defined in: [src/entities/user/authorization.ts:18](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/entities/user/authorization.ts#L18)

Функция авторизации на основе логина, пароля

## Parameters

### data

#### appDispatch

`ThunkDispatch`\<\{ `containers`: \{ `activeContainer`: `null` \| [`ContainerInterface`](../../../../shared/types/interfaces/ContainerInterface.md) & `object`; `allContainers`: [`ContainerInterface`](../../../../shared/types/interfaces/ContainerInterface.md)[]; `data`: [`ContainerSliceInterface`](../../../../shared/types/interfaces/ContainerSliceInterface.md)[]; `keys`: `number`; \}; `dialyRewards`: \{ `allDays`: `number`; `canGetReward`: `boolean`; `currentDay`: `null` \| `number`; `data`: [`dailyRewardInterface`](../../daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md)[]; `hoursToNextReward`: `number`; \}; `miglioramenti`: \{ `data`: [`miglioramentiInterface`](../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)[]; \}; `miglioramentiClicks`: \{ `data`: `null` \| [`miglioramentiInterface`](../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md); \}; `notifications`: \{ `data`: [`notificationDataInterface`](../../../../shared/types/interfaces/notificationDataInterface.md)[]; \}; `user`: [`userDataInterface`](../../../../shared/types/interfaces/userDataInterface.md); `windows`: \{ `auth`: `boolean`; `dailyReward`: `boolean`; `improvements`: `boolean`; `inProcess`: `boolean`; `miglioramentiClick`: `null` \| `number`; `register`: `boolean`; `tutorials`: \{ `clicker`: `boolean`; `randomizer`: `boolean`; `rewards`: `boolean`; \}; \}; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

#### closeAuthWindow

() => `void`

#### login

`string`

#### password

`string`

#### setError

`Dispatch`\<`SetStateAction`\<[`authErrorInterface`](../../../../shared/types/interfaces/authErrorInterface.md)\>\>

#### setIsLoaded

`Dispatch`\<`SetStateAction`\<`boolean`\>\>

## Returns

`Promise`\<`void`\>
