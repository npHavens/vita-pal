import React from 'react';
import TitleInput from './TitleInput.jsx';
import UrlInput from './UrlInput.jsx';
import ProductInfoForm from './ProductInfoForm.jsx';
import FavoritesList from './FavoritesList.jsx'
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props)
    this.state = {
      products: [],
      currentProductTitle: '',
      currentProductUrl: '',
      currentQty: 0
    };
    this.getSavedProducts();
  }

  componentDidMount() {
    this.getSavedProducts();
  }

  setTitle(title) {
    this.setState({
      currentProductTitle: title
    });
  }

  setUrl(url) {
    //console.log('setting url to', url)
    this.setState({
      currentProductUrl: url
    });
  }


  setQty(qty) {
   // console.log('setting qty to', qty)
    this.setState({
      currentQty: qty
    });
  }

  getSavedProducts() {
    console.log('Getting saved products');
    axios.get('http://localhost:4568/')
    .then(function(res) {
      //console.log(res);
      console.log(res.data)
      this.setState({
      products: res.data
    });
      console.log(this.state.products)
    }.bind(this))
  }

  addProduct() {
    //console.log('Adding Product', this.state);
    axios.post('http://localhost:4568/products',
      {
        title: this.state.currentProductTitle,
        url: this.state.currentProductUrl,
        datePurchased: new Date,
        qtyPurchased: this.state.currentQty
      }).then(function(res) {
        this.getSavedProducts();
      });
  }

  render() {
    return (
     <div>
        <ProductInfoForm
          handleProductAdd={this.addProduct.bind(this)}
          handleTitleInput={this.setTitle.bind(this)}
          handleUrlInput={this.setUrl.bind(this)}
          handleQtyInput={this.setQty.bind(this)}
        />
        {!this.state.products ? <p>Loading</p> :
        <FavoritesList products={this.state.products}/>}
    </div>);
  }
}