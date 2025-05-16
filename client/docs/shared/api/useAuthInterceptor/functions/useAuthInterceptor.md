[**clickzone**](../../../../README.md)

***

[clickzone](../../../../README.md) / [shared/api/useAuthInterceptor](../README.md) / useAuthInterceptor

# Function: useAuthInterceptor()

> **useAuthInterceptor**(): `void`

Defined in: [src/shared/api/useAuthInterceptor.ts:14](https://github.com/MaximBri/ClickZone/blob/20f3f0d061a7c50a96ed5bba64acbc325a456072/client/src/shared/api/useAuthInterceptor.ts#L14)

Глобальная функция для дублирования запросов в случае, если они пришли с 401 ошибкой (ошибка авторизации, скорее всего была вызвана тем, что JWT access token истёк). Функция отслеживает запросы с 401 ошибками, отправляет запрос на обновление токена, и потом вновь дублирует запрос, который пришёл с 401 ошибкой. Распространяется на все запросы, кроме авторизации и регистрации (там не должно быть проверки access токена)

## Returns

`void`
