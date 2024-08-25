import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

const {width: viewportWidth} = Dimensions.get('window');

interface CarouselProps {
  images: string[];
}

const CustomCarousel: React.FC<CarouselProps> = ({images}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / viewportWidth);
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    if (scrollViewRef.current && activeIndex < images.length - 1) {
      scrollViewRef.current.scrollTo({
        x: (activeIndex + 1) * viewportWidth,
        animated: true,
      });
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (scrollViewRef.current && activeIndex > 0) {
      scrollViewRef.current.scrollTo({
        x: (activeIndex - 1) * viewportWidth,
        animated: true,
      });
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}>
        {images?.map((image, index) => (
          <Image
            key={index}
            resizeMode={'cover'}
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePrev}
          style={styles.arrowButton}>
          <Text
            style={[
              styles.arrowText,
              activeIndex > 0 ? styles.activeArrow : styles.inactiveArrow,
            ]}>
            ‹
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleNext}
          style={styles.arrowButton}>
          <Text
            style={[
              styles.arrowText,
              activeIndex === images?.length - 1
                ? styles.inactiveArrow
                : styles.activeArrow,
            ]}>
            ›
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: viewportWidth * 0.75,
    backgroundColor: 'white',
  },
  image: {
    width: viewportWidth,
    height: viewportWidth * 0.75,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 4,
    height: 4,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  activeArrow: {
    color: '#000',
  },
  inactiveArrow: {
    color: '#ccc',
  },
  navigationContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  arrowButton: {
    padding: 2,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  arrowText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 50,
  },
});

export default CustomCarousel;
