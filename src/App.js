import React, { Component } from 'react';
import MapComponent from './Components/MapComponent/MapComponent';
import SearchComponent from './Components/SearchComponent/SearchComponent';
import ModalComponent from './Components/ModalComponent/ModalComponent';
import WeatherComponent from './Components/WeatherComponent/WeatherComponent';

class App extends Component {

  state = {
    coords:{
      lat: 27.0616,
      long: 77.3839
    },
    zoom: 5,
    accessToken: "pk.eyJ1IjoiYm9yYXJvamlrIiwiYSI6ImNqdGg4dzNhdTA5MjY0NHF6dGExcThvNWIifQ.ROK46MEB0aA00QYNxQvPUw",
    selected: null,
    modalShow: false,
    weatherKey: "8969ee2359844332a02103719192103"
  }

  resultSelectHandler = (selectedData) => {
    this.setState({selected: selectedData})
  }

  modalOpenHandler = () => {
    this.setState({modalShow:true})
  }

  modalCloseHandler = () => {
    this.setState({ modalShow: false })
  }

  render() {

    let modalComponent = (this.state.modalShow)?(
      <ModalComponent show={this.state.modalShow} modalClosed={this.modalCloseHandler}>
        <WeatherComponent location={this.state.selected} apiKey={this.state.weatherKey} />
      </ModalComponent>
    ):(null)

    return (
      <div>
        {modalComponent}
        
        <SearchComponent accessToken={this.state.accessToken} resultSelected={this.resultSelectHandler}/>
        <MapComponent 
          openModel={this.modalOpenHandler}
          selected={this.state.selected}
          coords={this.state.coords} 
          zoom={this.state.zoom}
          accessToken={this.state.accessToken}  />
        
      </div>
    );
  }
}

export default App;
