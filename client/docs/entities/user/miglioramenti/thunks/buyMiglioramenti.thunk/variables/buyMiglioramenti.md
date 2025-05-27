[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [entities/user/miglioramenti/thunks/buyMiglioramenti.thunk](../README.md) / buyMiglioramenti

# Variable: buyMiglioramenti

> `const` **buyMiglioramenti**: `AsyncThunk`\<`any`, \{ `cost_coins`: `number`; `id`: `number`; \}, `AsyncThunkConfig`\>

Defined in: [src/entities/user/miglioramenti/thunks/buyMiglioramenti.thunk.ts:9](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/entities/user/miglioramenti/thunks/buyMiglioramenti.thunk.ts#L9)

Функция на покупку улучшения. Отправляет на бэкенд запрос с параметрами id улучшения, которое хотим купить. И цену: монеты и алмазы. Цена алмазов ставится в 0, т.к. все улучшения покупаются исключительно за монеты
