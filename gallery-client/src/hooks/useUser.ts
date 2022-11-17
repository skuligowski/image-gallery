import { useAppSelector } from "../state/hooks";
import { selectUser } from "../state/user/userSlice";

export function useUser() {
    return useAppSelector(selectUser);
}