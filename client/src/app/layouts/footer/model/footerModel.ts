import { useAppDispatch } from '@/app/store/store';
import { setAuthWindow } from '@/widgets/pop-ups/model/popUpsSlice';

export const footerModel = () => {
  const dispatch = useAppDispatch();

  const openAuthWindow = () => {
    dispatch(setAuthWindow(true));
  };

  return { openAuthWindow };
};
