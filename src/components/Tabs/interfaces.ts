import { RefObject } from "react";
import { Animated } from "react-native";
import { IData } from "../../_shared/interfaces";

export interface IProps {
    data: IData[],
    scrollX: Animated.Value
    onItemPress(index: number): void
}

export interface IIndicatorProps {
    indicatorMeasures: IIndicatorMeasures[]
    scrollX: Animated.Value
    dataIndex: number[]
}

export interface IIndicatorMeasures {
    x: number,
    y: number,
    width: number,
    height: number
}