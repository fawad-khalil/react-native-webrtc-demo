// import React, { useEffect, createRef } from 'react';
// import { WebRtcPeer } from 'react-native-kurento-utils-js';

// import Video from './components/video';

// export default ({}) => {
//   const ws = new WebSocket('wss://localhost:8443/one2many');
//   let webRtcPeer = null;
//   let videoSrc = createRef();

//   useEffect(() => {
//     // InCallManager.setSpeakerphoneOn(true);
//     // InCallManager.setKeepScreenOn(true);

//     if (!webRtcPeer) {
//       // showSpinner(video);

//       var options = {
//         remoteVideo: videoSrc.current,
//         onicecandidate: onIceCandidate,
//       };

//       const newWebRtcPeer = WebRtcPeer.WebRtcPeerRecvonly(options, function(
//         error,
//       ) {
//         // if (error) return onError(error);

//         this.generateOffer(onOfferViewer);
//       });

//       // webRtcPeer = newWebRtcPeer;
//     }
//   }, []);

//   ws.onmessage = function(message) {
//     var parsedMessage = JSON.parse(message.data);
//     console.info('Received message: ' + message.data);

//     switch (parsedMessage.id) {
//       case 'viewerResponse':
//         viewerResponse(parsedMessage);
//         break;
//       case 'stopCommunication':
//         // dispose();
//         break;
//       case 'iceCandidate':
//         webRtcPeer.addIceCandidate(parsedMessage.candidate);
//         break;
//       default:
//         console.error('Unrecognized message', parsedMessage);
//     }
//   };

//   function viewerResponse(message) {
//     if (message.response != 'accepted') {
//       var errorMsg = message.message ? message.message : 'Unknow error';
//       console.warn('Call not accepted for the following reason: ' + errorMsg);
//       // dispose();
//     } else {
//       webRtcPeer.processAnswer(message.sdpAnswer);
//     }
//   }

//   const onOfferViewer = (error, offerSdp) => {
//     // if (error) return onError(error);

//     var message = {
//       id: 'viewer',
//       sdpOffer: offerSdp,
//     };
//     sendMessage(message);
//   };

//   const onIceCandidate = candidate => {
//     console.log('Local candidate' + JSON.stringify(candidate));

//     var message = {
//       id: 'onIceCandidate',
//       candidate: candidate,
//     };
//     sendMessage(message);
//   };

//   const sendMessage = message => {
//     var jsonMessage = JSON.stringify(message);
//     console.log('Sending message: ' + jsonMessage);
//     ws.send(jsonMessage);
//   };

//   return <Video ref={videoSrc} />;
// };
