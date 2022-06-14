import React, { Component } from 'react'
import Header from './Components/Header';
import AfterHeader from './Components/AfterHeader';
import Top from './Components/Top';
import Stock from './Components/Stock';
import AllProduct from './Components/AllProduct';
export class App extends Component {
  render() {
    return (
      <div>
                        <Header />
                <AfterHeader />
                <Top />
                <Stock />
                <AllProduct />
      </div>
    )
  }
}

export default App