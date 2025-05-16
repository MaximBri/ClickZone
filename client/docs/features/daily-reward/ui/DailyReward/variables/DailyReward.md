[**clickzone**](../../../../../README.md)

***

[clickzone](../../../../../README.md) / [features/daily-reward/ui/DailyReward](../README.md) / DailyReward

# Variable: DailyReward

> `const` **DailyReward**: `FC`\<\{ `currentDay`: `number`; `data`: [`dailyRewardInterface`](../../../../../entities/user/daily-rewards/model/dailyRewardsSlice/interfaces/dailyRewardInterface.md); \}\>

Defined in: [src/features/daily-reward/ui/DailyReward.tsx:15](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/features/daily-reward/ui/DailyReward.tsx#L15)

Функция для отрисовки отдельной ежедневной награды (рендер происходит списком). Если награда по этому дню уже была получена, то дополнительно показывается значок галочки, говорящий об этом. Сам помпонент показывает день, саму награду.

## Param

data, currentDay } - объект с текущим днём (нужен для того, чтобы определить, нужно ли ставить галочку, или нет) и сама информация о награде.
