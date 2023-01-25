import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectHomeCity, selectTrips } from "../../features/auth/authSlice";
import '../css/itinerary.css'

const { DirectionsService, DirectionsRenderer } = window.google.maps;


const Mapper = () => {


    const homeCity = useSelector(selectHomeCity);

    let homeCountry;
    let homeLat;
    let homeLng;

    const {trip} = useParams();

    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);

    const trips = useSelector(selectTrips);
    const itineraryKeys = Object.keys(trips[trip]['itinerary'])

    useEffect(() => {

        console.log(`homeCity is: ${homeCity}`)
        homeCountry = homeCity ? homeCity['country'] : '';
        homeLat = homeCity ? homeCity['lat'] : '';
        homeLng = homeCity ? homeCity['lng'] : '';
            
        console.log(itineraryKeys.map((key) => {
            return {position: {lat: trips[trip]['itinerary'][key]['lat'], lng: trips[trip]['itinerary'][key]['lng']},
            stopover: true}}))
            
        // check if the script has already been loaded
        if (!window.google) {
            const googleMapsScript = document.createElement('script');
            googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA6ygtruyXbyLlcGt_trafIzqAeTNTOcKM&libraries=places`;
            window.document.body.appendChild(googleMapsScript);
            googleMapsScript.addEventListener('load', () => {
                initializeMap();
            });
        } else {
            initializeMap();
        }
    })

        const initializeMap = () => {
            // Create map
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: Number(homeLat), lng: Number(homeLng) },
                zoom: 5,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                
            styles: [{
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "hue": "#ffd600"
                        },
                        {
                            "saturation": "-17"
                        },
                        {
                            "lightness": "0"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#dfede5"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "gamma": "2.37"
                        },
                        {
                            "saturation": "44"
                        },
                        {
                            "lightness": "10"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "gamma": "2.37"
                        },
                        {
                            "weight": "2.07"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#6aa872"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#519371"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#7bb9c8"
                        }
                    ]
                }
            ]
        });
        
            const markers = itineraryKeys.map((key) => {
                const marker = new window.google.maps.Marker({
                    position: { lat: trips[trip]['itinerary'][key]['lat'], lng: trips[trip]['itinerary'][key]['lng'] },
                    map: map,
                    title: 'hello world'
                });

                const infowindow = new window.google.maps.InfoWindow({
                    content: `<div class="info-window">
                                <h3>${key}</h3>
                                <p><b>Location: </b> ${trips[trip]['itinerary'][key]['location']}</p>
                                <p><b>Category:</b> ${trips[trip]['itinerary'][key]['category']}</p>
                                <p><b>From:</b> ${trips[trip]['itinerary'][key]['startTime']} ${trips[trip]['itinerary'][key]['startDate']}</p>
                                <p><b>Till</b> ${trips[trip]['itinerary'][key]['endTime']} ${trips[trip]['itinerary'][key]['endDate']}</p>
                            </div>`
                  });

                marker.addListener("click", () => {
                    infowindow.open({
                      anchor: marker,
                      map,
                    });
                  });
                
                return marker;
            });
            

            
        
            // Create directions service and renderer
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
                map: map,
                polylineOptions: {
                    strokeColor: '#0000FF',
                    strokeOpacity: 0.8,
                    strokeWeight: 3
                }
            });
        
            for (let i = 0; i < markers.length - 1; i++) {
                // Set driving travel mode for directions request
                const start = markers[i].position;
                const end = markers[i+1].position;
                const request = {
                    origin: start,
                    destination: end,
                    travelMode: 'DRIVING'
                };
                directionsService.route(request, (response, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                        // Use polyline as fallback if directions are not available
                    } else {
                        //create polyline
                        const path = [start, end];
                        const polyline = new window.google.maps.Polyline({
                            path: path,
                            geodesic: true,
                            strokeColor: '#FF0000',
                            strokeOpacity: 1.0,
                            strokeWeight: 2
                        });
                        polyline.setMap(map);
                    }
                });
            }
            
        }
    
        return (
            <div id="map" className="map-style"></div>
        )
    }

export default Mapper;