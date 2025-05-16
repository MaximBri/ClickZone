[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [entities/user/account/thunks/changeUserData.thunk](../README.md) / changeUserData

# Variable: changeUserData

> `const` **changeUserData**: `AsyncThunk`\<`any`, \{ `about_me`: `string`; `name`: `string`; `nickname_price`: \{ `coins`: `number`; `diamonds`: `number`; \}; \}, `AsyncThunkConfig`\>

Defined in: [src/entities/user/account/thunks/changeUserData.thunk.ts:10](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/entities/user/account/thunks/changeUserData.thunk.ts#L10)

Функция для смены данных о пользователе (никнейм или описание). В запросе отправляются никнейм, описание, цена на изменение никнейма
Возвращает ответ от бэкенда
