[**clickzone**](../../../../../../README.md)

***

[clickzone](../../../../../../README.md) / [features/clicker/miglioramenti/ui/Miglioramenti](../README.md) / Miglioramenti

# Variable: Miglioramenti

> `const` **Miglioramenti**: `FC`\<\{ `coins`: `number`; `data`: [`miglioramentiInterface`](../../../../../../widgets/clicker-shop/model/miglioramentiSlice/interfaces/miglioramentiInterface.md); \}\>

Defined in: [src/features/clicker/miglioramenti/ui/Miglioramenti.tsx:14](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/features/clicker/miglioramenti/ui/Miglioramenti.tsx#L14)

Функция, отрисовывающая улучшения в магазине. Если улучшение бесконечное и уже есть у пользователя, кнопка покупки будет заблокирована. Если у пользователя не хватает ресурсов на покупку какого-либо улучшения, кнопка покупки тоже будет заблокирована.

## Param

data, coins } - объект с самим улучшением и количеством монет пользователя
