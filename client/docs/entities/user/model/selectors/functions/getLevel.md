[**clickzone**](../../../../../README.md)

***

[clickzone](../../../../../README.md) / [entities/user/model/selectors](../README.md) / getLevel

# Function: getLevel()

> **getLevel**(`state`): `number`

Defined in: [src/entities/user/model/selectors.ts:3](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/entities/user/model/selectors.ts#L3)

## Parameters

### state

#### containers

\{ `activeContainer`: `null` \| [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md) & `object`; `allContainers`: [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md)[]; `data`: [`ContainerSliceInterface`](../../../../../shared/types/interfaces/ContainerSliceInterface.md)[]; `keys`: `number`; \}

#### containers.activeContainer

`null` \| [`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md) & `object`

#### containers.allContainers

[`ContainerInterface`](../../../../../shared/types/interfaces/ContainerInterface.md)[]

#### containers.data

[`ContainerSliceInterface`](../../../../../shared/types/interfaces/ContainerSliceInterface.md)[]

#### containers.keys

`number`

#### dialyRewards

\{ `allDays`: `number`; `canGetReward`: `boolean`; `currentDay`: `null` \| `number`; `data`: [`dailyRewardInterface`](../../../daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md)[]; `hoursToNextReward`: `number`; \}

#### dialyRewards.allDays

`number`

#### dialyRewards.canGetReward

`boolean`

#### dialyRewards.currentDay

`null` \| `number`

#### dialyRewards.data

[`dailyRewardInterface`](../../../daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md)[]

#### dialyRewards.hoursToNextReward

`number`

#### miglioramenti

\{ `data`: [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)[]; \}

#### miglioramenti.data

[`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)[]

#### miglioramentiClicks

\{ `data`: `null` \| [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md); \}

#### miglioramentiClicks.data

`null` \| [`miglioramentiInterface`](../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md)

#### notifications

\{ `data`: [`notificationDataInterface`](../../../../../shared/types/interfaces/notificationDataInterface.md)[]; \}

#### notifications.data

[`notificationDataInterface`](../../../../../shared/types/interfaces/notificationDataInterface.md)[]

#### user

[`userDataInterface`](../../../../../shared/types/interfaces/userDataInterface.md)

#### windows

\{ `auth`: `boolean`; `dailyReward`: `boolean`; `improvements`: `boolean`; `inProcess`: `boolean`; `miglioramentiClick`: `null` \| `number`; `register`: `boolean`; `tutorials`: \{ `clicker`: `boolean`; `randomizer`: `boolean`; `rewards`: `boolean`; \}; \}

#### windows.auth

`boolean`

#### windows.dailyReward

`boolean`

#### windows.improvements

`boolean`

#### windows.inProcess

`boolean`

#### windows.miglioramentiClick

`null` \| `number`

#### windows.register

`boolean`

#### windows.tutorials

\{ `clicker`: `boolean`; `randomizer`: `boolean`; `rewards`: `boolean`; \}

#### windows.tutorials.clicker

`boolean`

#### windows.tutorials.randomizer

`boolean`

#### windows.tutorials.rewards

`boolean`

## Returns

`number`
