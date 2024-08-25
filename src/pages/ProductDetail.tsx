import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomCarousel from '../components/CustomCarousel';
import {AvailableSize, Size, Product, SHIPPING_METHOD} from '../types';
import Header from '../components/Header';
const {width: viewportWidth} = Dimensions.get('window');

const ProductDetailPage: React.FC = () => {
  const [selectedAvailableSize, setAvailableSelectedSize] =
    useState<AvailableSize | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sizes, setSizes] = useState<Size[]>([]);
  const availableSizes: AvailableSize[] = [
    {key: 'uk', label: 'UK'},
    {key: 'eu', label: 'EU'},
    {key: 'us', label: 'US'},
  ];
  const [product, setProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        'https://assets.staging.laced.com/laced_app_assets/product.json',
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product) {
      onAvailableSizeSelectionChange(availableSizes[0]);
    }
  }, [product]);

  const renderSizeOption = (size: Size) => {
    const premium = size?.saleCollections?.find(
      x => x.shippingMethod === SHIPPING_METHOD.PREMIUM,
    );

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={size.id}
        style={[
          styles.sizeOption,
          selectedSize === size && styles.selectedSizeOption,
        ]}
        onPress={() => onSizeSelectionChange(size)}>
        {premium && <View style={[styles.premiumDot]} />}
        <Text style={styles.sizeText}>{size[selectedAvailableSize?.key]}</Text>
      </TouchableOpacity>
    );
  };

  const onSizeSelectionChange = (size: Size) => {
    setSelectedSize(size);
    const standard = size?.saleCollections?.find(
      x => x.shippingMethod === SHIPPING_METHOD.STANDARD,
    );
    const premium = size?.saleCollections?.find(
      x => x.shippingMethod === SHIPPING_METHOD.PREMIUM,
    );
    // Display premium price if saleCollections contains 'premium' shipping method
    let product_price: string = premium
      ? premium?.price?.formatted
      : standard?.price?.formatted;
    setPrice(product_price);
  };

  const onAvailableSizeSelectionChange = (availableSize: AvailableSize) => {
    setAvailableSelectedSize(availableSize);
    if (product?.sizes && product?.sizes?.length > 0) {
      setSizes(product?.sizes);
      onSizeSelectionChange(product?.sizes[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Header cartCount={cartCount} />
      <CustomCarousel images={product?.imageUrls} />
      <View style={styles.productInfo}>
        <Text
          style={
            styles.productSubtitle
          }>{`AIR JORDAN / ${product?.styleCode}`}</Text>
        <Text style={styles.productTitle}>{product?.title}</Text>

        <View style={styles.availableSizeContainer}>
          <Text style={styles.availableSizesText}>Available Sizes:</Text>
          <View style={styles.availableSizeListContainer}>
            {availableSizes.map((size: AvailableSize) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={size.key}
                style={[
                  styles.availableSizeOption,
                  selectedAvailableSize?.key === size.key &&
                    styles.availableSelectedSizeOption,
                ]}
                onPress={() => onAvailableSizeSelectionChange(size)}>
                <Text style={styles.availableSizeText}>{size.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.sizesContainer}>{sizes.map(renderSizeOption)}</View>
        <Text style={styles.priceText}>{price}</Text>
        <TouchableOpacity
          style={styles.addToBagButton}
          onPress={() => handleAddToCart()}>
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  availableSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  availableSizeListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productInfo: {
    padding: 20,
  },
  productTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  productSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  premiumDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#000000',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
    top: 5,
    right: 5,
  },
  availableSizesText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  availableSizeOption: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  availableSelectedSizeOption: {
    borderColor: '#000000',
  },
  availableSizeText: {
    fontSize: 12,
    color: 'black',
  },
  sizeOption: {
    borderWidth: 1,
    width: (viewportWidth - 40) / 4,
    borderColor: '#ccc',
    paddingVertical: 15,
  },
  selectedSizeOption: {
    borderColor: '#000000',
  },
  sizeText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 30,
    color: 'black',
  },
  addToBagButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    bottom: 0,
  },
  addToBagText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailPage;
