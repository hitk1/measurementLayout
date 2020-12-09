import React from 'react';
import {
  findNodeHandle,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import rawData from '../content/data'

import Tabs from '../components/Tabs'

const { width, height } = Dimensions.get('screen')
const data = rawData.map((item) => ({ ...item, ref: React.createRef<any>() }))

const App = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const flatListRef = React.useRef<any>()

  const onItemPress = React.useCallback((itemIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: itemIndex * width
    })
  }, [])

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          ref={flatListRef as any}
          data={data}
          keyExtractor={item => item.name}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => {

            return (
              <View
                style={{ width, height }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    flex: 1,
                    resizeMode: 'cover'
                  }}
                />
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
                  ]}
                />
              </View>
            )
          }}
        />
        <Tabs
          data={data}
          scrollX={scrollX}
          onItemPress={onItemPress}
        />
      </View>
    </>
  )
}
export default App;
