import React from 'react';
import {SafeAreaView} from 'react-native';

import ProductDetailPage from './src/pages/ProductDetail';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ProductDetailPage />
    </SafeAreaView>
  );
}

export default App;
