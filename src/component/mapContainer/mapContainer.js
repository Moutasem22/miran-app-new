
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react'

class MapContainer extends Component {

    render() {
        const { latLng } = this.props;
        console.log('latLng', latLng)
        return (
            <Map

                google={this.props.google}
                zoom={8}
                style={{ width: 750, height: 300 }}
                initialCenter={latLng ? latLng.length > 0 ? { lat: latLng[0], lng: latLng[1] } : { lat: 48.00, lng: -122.00 } : { lat: 48.00, lng: -122.00 }}
            >
                <Marker position={latLng ? latLng.length > 0 ? { lat: latLng[0], lng: latLng[1] } : { lat: 48.00, lng: -122.00 } : { lat: 48.00, lng: -122.00 }} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'FCBajLv2GNYOY238vDMWUfeacGIYfo3CkETXPOQXlI8'
})(MapContainer);