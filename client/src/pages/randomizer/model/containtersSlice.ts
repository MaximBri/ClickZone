import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { fetchClickerData, loginUser } from "@/entities/user/model/thunks";
import { ContainerInterface, ContainerSliceInterface } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Начальное состояние объекта, который хранит информацию о режиме "Рандомайзер".
 * Включает в себя количество ключей, список контейнеров, которые есть у игрока, список контейнеров в магазине, активный контейнер
 */
const initialState: {
  data: ContainerSliceInterface[];
  keys: number;
  allContainers: ContainerInterface[];
  activeContainer: (ContainerInterface & { key: boolean }) | null;
} = {
  data: [],
  keys: 0,
  allContainers: [],
  activeContainer: null,
};

/**
 * Функция, отвечающая за обновление данных о режиме "Рандомайзер", пришедших с бэкенда.
 * @param {{
 *     data: ContainerSliceInterface[];
 *     keys: number;
 *     allContainers: ContainerInterface[];
 *   }} state - глобальный объект по режиму "Рандомайзер", включающий в себя контейнеры, которые есть у игрока, количество ключей, общий список контейнеров в магазине.
 * @param {*} data - данные с бэкенда
 */
const setContainersData = (
  state: {
    data: ContainerSliceInterface[];
    keys: number;
    allContainers: ContainerInterface[];
  },
  data: any
) => {
  state.data = data.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      imagePath: item.imagePath,
      price: item.price,
      rewards: item.rewards,
      count: item.quantity,
    };
  });
};

const containersSlice = createSlice({
  name: "containers",
  initialState,
  reducers: {
    /**
     * Метод для добавления контейнера. Принимает на вход сам контейнер. Дальше идёт поиск по массиву из хранилища. Если такой контейнер уже есть, то к свойству count прибавляется 1, иначе в массив добавляется контейнер, который пришёл в параметре, со свойством count = 1
     */
    addContainer: (state, action: PayloadAction<ContainerInterface>) => {
      const item = state.data.find((item) => item.name === action.payload.name);
      if (item) {
        item.count++;
      } else {
        state.data.push({ ...action.payload, count: 1 });
      }
    },
    /**
     * Метод для добавления контейнеров одного типа. Сначала идёт поиск по хранилищу, если там уже есть экземпляр этого же контейнера, то к его count прибавляется count у контейнеров. В противном случае в массив добавляются контейнеры с count, который пришёл в параметре.
     */
    addContainerWithCount: (
      state,
      action: PayloadAction<ContainerSliceInterface>
    ) => {
      const id = action.payload.id;
      const curContainer = state.data.find((item) => item.id === id);
      if (curContainer) {
        curContainer.count += action.payload.count;
      } else {
        state.data.push(action.payload);
      }
    },
    /**
     * Метод для установки количества ключей (используется, чтобы установить количество ключей, которые прислал бэкенд)
     */
    setContainerKeys: (state, action: PayloadAction<number>) => {
      state.keys = action.payload;
    },
    /**
     * Метод для вычетания общего количества ключей. Используется после открытия контейнера с ключом
     */
    removeOneKey: (state) => {
      state.keys--;
    },
    /**
     * Метод для списания одного контейнера. На вход принимается id контейнера, по этому id идёт поиск в хранилище. count у этого контейнера уменьшается на 1. Если count уже был 1, то массив фильтруется по id, который пришёл в параметре.
     */
    removeOneContainer: (state, action: PayloadAction<number>) => {
      const needContainer = state.data.find(
        (item) => item.id === action.payload
      );
      if (needContainer) {
        if (needContainer.count === 1) {
          state.data = state.data.filter((item) => item.id !== action.payload);
        } else {
          needContainer.count--;
        }
      } else {
        console.error("Нет нужного контейнера в хранилище");
      }
    },
    /**
     * Метод для установки активного контейнера, который пользователь открыл.
     */
    setActiveContainer: (
      state,
      action: PayloadAction<(ContainerInterface & { key: boolean }) | null>
    ) => {
      state.activeContainer = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getContainers.fulfilled, (state, action) => {
      state.allContainers = action.payload;
    });
    builder.addCase(fetchClickerData.fulfilled, (state, action) => {
      setContainersData(state, action.payload.containers);
      state.keys = action.payload.resources.keys;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      setContainersData(state, action.payload.containers);
      state.keys = action.payload.resources.keys;
    });
  },
});

export const {
  addContainer,
  setContainerKeys,
  setActiveContainer,
  addContainerWithCount,
  removeOneContainer,
  removeOneKey,
} = containersSlice.actions;

export default containersSlice.reducer;
