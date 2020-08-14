import {useSelector} from "react-redux";
import {AppState} from "../../store";

type Selector<T> = (state: AppState) => T
type EqualityFn<T> = (left: T, right: T) => boolean

export function useStateSelector<T = unknown>(selector: Selector<T>, equalityFn?: EqualityFn<T>): T {
    return useSelector<AppState, T>(selector, equalityFn)
}