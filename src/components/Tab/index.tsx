import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IProps } from './interfaces';

const Tab: React.ForwardRefRenderFunction<any, IProps> = ({ item, dataLength, onItemPress }, ref) => {
  return (
    <TouchableOpacity
      onPress={onItemPress}
      hitSlop={{
        top: 10,
        right: 10,
        left: 10,
        bottom: 10
      }}
    >
      <View ref={ref}>
        <Text style={[styles.name, { fontSize: 84 / dataLength }]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  name: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})

export default React.forwardRef(Tab);