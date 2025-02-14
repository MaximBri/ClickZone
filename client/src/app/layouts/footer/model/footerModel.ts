import { useAppDispatch } from '@/app/store/store';
import {
  setAuthWindow,
  setInProcess,
} from '@/widgets/pop-ups/model/popUpsSlice';

export const footerModel = () => {
  const dispatch = useAppDispatch();
  // const [activeButton, setActiveButton] = useState<number>(0)

  const openAuthWindow = () => {
    dispatch(setAuthWindow(true));
    dispatch(setInProcess(true));
  };

  return { openAuthWindow };
};
