import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import "./map.css";

var center;

async function getUserCoords() {
  let pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
}
getUserCoords()

const containerStyle = {
  width: '100%',
  height: '100vh',
  zindex: '0'
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
    className="map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      <Marker position={center} />
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)


//import React, { useState, useRef } from "react";
//import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, Text, SkeletonText } from "@chakra-ui/react";
//import { FaLocationArrow, FaTimes } from "react-icons/fa";
//import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
//
//var center; //= { lat: 39.8283, lng: -98.5795};
//
////getUserCoords()
//
////default center for google maps = eifel tower
////const center = { lat: 48.8584, lng: 2.2945 };
//
//function Map() {
//  async function getUserCoords() {
//    let pos = await new Promise((resolve, reject) => {
//      navigator.geolocation.getCurrentPosition(resolve, reject);
//    });
//    center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//    <Marker position={center} />
//  }
//  getUserCoords()
//  // imports from cdn to be used in app
//  const { isLoaded } = useJsApiLoader({
//    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//    //libraries to be used
//    libraries: ["places"],
//  });
//
//  const [map, setMap] = useState(/** @type google.maps.Map */ null);
//  const [directionsResponse, setDirectionsResponse] = useState(null);
//  const [distance, setDistance] = useState("");
//  const [duration, setDuration] = useState("");
//  /** @type React.MutableRefObject<HTMLInputElement> */
//  const originRef = useRef();
//  /** @type React.MutableRefObject<HTMLInputElement> */
//  const destiantionRef = useRef();
//  //makes it look like its loading with skeletontext from chakra
//  if (!isLoaded) {
//    return <SkeletonText />;
//  }
//  async function calculateRoute() {
//    if (originRef.current.value === "" || destiantionRef.current.value === "") {
//      return;
//    }
//    // eslint-disable-next-line no-undef
//    const directionsService = new google.maps.DirectionsService();
//    const results = await directionsService.route({
//      //value - input
//      origin: originRef.current.value,
//      destination: destiantionRef.current.value,
//      // eslint-disable-next-line no-undef
//      travelMode: google.maps.TravelMode.DRIVING,
//    });
//    setDirectionsResponse(results);
//    setDistance(results.routes[0].legs[0].distance.text);
//    setDuration(results.routes[0].legs[0].duration.text);
//  }
//  function clearRoute() {
//    setDirectionsResponse(null);
//    setDistance("");
//    setDuration("");
//    originRef.current.value = "";
//    destiantionRef.current.value = "";
//  }
//  return (
//    <div>
//      <Flex
//        className="map-container"
//        position="relative"
//        flexDirection="column"
//        alignItems="center"
//        bgPos="bottom"
//        h="100vh"
//        w="100vw"
//        margin="auto"
//        padding={8}
//        bgColor="#669bbc"
//      >
//        <Box
//          className="destination-container"
//          p={4}
//          borderRadius="lg"
//          mt={4}
//          bgColor="white"
//          shadow="base"
//          minW="container.md"
//          zIndex="1"
//          m={12}
//          border="solid 1.5px"
//          position="relative"
//          right={80}
//          top={5}
//        >
//          <HStack spacing={4}>
//            {/*  autocomplete = automatic tries to complete origin location or destination when starting to type */}
//            <Autocomplete>
//              <Input type="text" placeholder="Origin" ref={originRef} />
//            </Autocomplete>
//
//            <Autocomplete>
//              <Input
//                type="text"
//                placeholder="Destination"
//                ref={destiantionRef}
//              />
//            </Autocomplete>
//
//            <ButtonGroup>
//              <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
//                Calculate Route
//              </Button>
//              <IconButton
//                aria-label="center back"
//                icon={<FaTimes />}
//                onClick={clearRoute}
//              />
//            </ButtonGroup>
//          </HStack>
//          <HStack spacing={4} mt={4} justifyContent="space-between">
//            <Text>Distance: {distance} </Text>
//            <Text>Duration: {duration} </Text>
//            <IconButton
//              aria-label="center back"
//              icon={<FaLocationArrow />}
//              isRound
//              onClick={async () => {
//                await getUserCoords()
//                map.panTo(center);
//              }}
//            />
//          </HStack>
//        </Box>
//        <Box position="absolute" left={0} top={0} h="100%" w="100%" m={2}></Box>
//        {/* google map box */}
//        {/* doesnt load without map container style */}
//        <GoogleMap
//          center={center}
//          zoom={15}
//          mapContainerStyle={{ width: "100%", height: "100%" }}
//          options={{
//            zoomControl: true,
//            streetViewControl: true,
//            mapTypeControl: true,
//            fullscreenControl: true,
//          }}
//          onLoad={(map) => setMap(map)}
//        >
//          {/* display markers, directions */}
//          <Marker position={center} />
//          {directionsResponse && (
//            <DirectionsRenderer directions={directionsResponse} />
//          )}
//        </GoogleMap>
//      </Flex>
//    </div>
//  );
//}
//
//export default Map;