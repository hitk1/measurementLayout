import React from 'react';
import { Animated, Dimensions, StyleSheet, View, findNodeHandle } from 'react-native';

import { IIndicatorMeasures, IProps, IIndicatorProps } from './interfaces';
import Tab from '../Tab';

const { width } = Dimensions.get('screen')

const Indicator: React.FC<IIndicatorProps> = ({ indicatorMeasures, scrollX, dataIndex }) => {
    const inputRange = dataIndex.map((_, index) => index * width)

    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: indicatorMeasures.map(measure => measure.width)
    })
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: indicatorMeasures.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={[
                styles.indicator,
                {
                    left: 0,
                    width: indicatorWidth,
                    transform: [{ translateX }]
                }
            ]}
        />
    )
}

const Tabs: React.FC<IProps> = ({ data, scrollX, onItemPress }) => {
    const containerRef = React.useRef()
    const [indicatorMeasures, setIndicatorMeasures] = React.useState<IIndicatorMeasures[]>([])

    React.useEffect(() => {
        let measures: IIndicatorMeasures[] = []

        data.forEach(item => {
            item.ref.current.measureLayout(
                containerRef.current,
                (x: number, y: number, width: number, height: number) => {
                    measures.push({ x, y, width, height })

                    if (measures.length === data.length)
                        setIndicatorMeasures(measures) 
                }
            )
        })
    }, [containerRef.current])

    return (
        <View style={styles.container}>
            <View
                ref={containerRef as any}
                style={styles.individualItems}>
                {data.map((item, index) => {
                    return <Tab
                        key={item.name}
                        item={item}
                        dataLength={data.length}
                        ref={item.ref}
                        onItemPress={() => onItemPress(index)}
                    />
                })}
            </View>
            {
                indicatorMeasures.length > 0 &&
                <Indicator
                    indicatorMeasures={indicatorMeasures}
                    scrollX={scrollX}
                    dataIndex={data.reduce((prev: number[], _, index) => [...prev, index], [])}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        width
    },
    individualItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    indicator: {
        position: 'absolute',
        height: 3,
        backgroundColor: '#FFF',
        bottom: -10
    }
})

export default Tabs;