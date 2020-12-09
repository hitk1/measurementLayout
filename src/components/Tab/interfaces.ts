import { IData } from "../../_shared/interfaces";

export interface IProps {
    item: IData,
    dataLength: number
    onItemPress(): void
}