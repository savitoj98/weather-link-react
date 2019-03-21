import React, { Component } from 'react';
import axios from 'axios';

//Material
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



const inputStyle = {
    marginLeft: 8,
    flex: 1
}

const iconButtonStyle = {
    padding: 10
}


const rootStyle = {
    padding: '2px 4px',
    alignItems: 'center',
    display:'inline-flex',
    position:"absolute",
    zIndex: "100",
    width:"400px"
}

const listStyle = {
    marginTop:"44px",
    padding:"2px 4px",
    backgroundColor:"white",
    alignItems: 'center',
    display: 'block',
    position: "absolute",
    zIndex: "100",
    width: "400px"
}

class SearchComponent extends Component {


    state = {
        autoCompleteResults: [],
        value: ""
    }

    handleClick(data, resultSelected) {
        resultSelected(data)
        this.setState({autoCompleteResults:[], value:data.name})
    }

    updateValueHandler(e) {
        this.setState({value: e.target.value})
    }

    autoCompleteHandler(e, access_token){
        let new_query = e.target.value

        if (new_query){
            let uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${new_query}.json?access_token=${access_token}&cachebuster=1553113638912&autocomplete=true`
            axios.get(uri)
                .then(res => {
                    let newResults = []
                    res.data.features.forEach(elem => {
                        newResults.push({
                            "coords": {
                                "lat": elem.center[1],
                                "long": elem.center[0]
                            },
                            "zoom": 9,
                            "name": elem.place_name,
                            "id": elem.id
                        })
                    });

                    this.setState({autoCompleteResults:newResults})

                })
        }
        else{
            this.setState({autoCompleteResults:[]})
        }
    }

    render(){
        let allAutocompleteResults = null
        if(this.state.autoCompleteResults.length > 0){
            allAutocompleteResults = this.state.autoCompleteResults.map((elem,i) => (
                <div key={i}>
                    <Divider  />
                    <ListItem button onClick={() => this.handleClick(elem, this.props.resultSelected)}>
                        <ListItemIcon>
                            <RoomIcon />
                        </ListItemIcon>
                        <ListItemText primary={elem.name} />
                    </ListItem>
                </div>
            ));
        }

        return (
            <div style={{positon:"absolute", zIndex:'500'}}>
                <Paper style={rootStyle} elevation={3}>
                    <IconButton style={iconButtonStyle} aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase 
                        style={inputStyle} 
                        value={this.state.value}
                        placeholder="Search for places" 
                        onChange={(e) => {  
                            this.updateValueHandler(e)  
                            this.autoCompleteHandler(e, this.props.accessToken)
                        }}/>
                    <IconButton style={iconButtonStyle} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                    
                </Paper>    
                <List component="nav" style={listStyle}>
                    {allAutocompleteResults}                
                </List>
                
            </div>
        );
    }
    
}

export default SearchComponent;