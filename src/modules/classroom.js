import React, { useEffect, useState } from 'react';
import { WebRtcPeer } from 'react-native-kurento-utils-js';

import { View, StyleSheet } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';

const ws = new WebSocket('wss://api.classroom.terkwaz.com/one2many/');

export default ({}) => {
  let webRtcPeer = null;
  const [remoteStream, setRemoteStream] = useState(null);
  const [webRtcPeerState, setWebRtcPeer] = useState(webRtcPeer);

  useEffect(() => {
    // InCallManager.setSpeakerphoneOn(true);
    // InCallManager.setKeepScreenOn(true);
  }, []);

  ws.onerror = e => {
    console.error('Error: ', e);
  };

  ws.onopen = () => {
    if (!webRtcPeerState) {
      // showSpinner(video);
      var options = {
        remoteVideo: { src: '' },
        configuration: {
          audio: true,
          // video: true,
        },
        onicecandidate: onIceCandidate,
        // onaddstream: e => {
        //   console.log('*********** RemotePC tracking with ', e);
        //   if (e.stream && remoteStream !== e.stream) {
        //     console.log('************ RemotePC received the stream', e.stream);
        //     setRemoteStream(e.stream);
        //   }
        // },
        onaddstream: (e, pc) => {
          console.log('*********** RemotePC tracking with ', e);
          if (e.stream && remoteStream !== e.stream) {
            console.log('************ RemotePC received the stream', e.stream);
            setRemoteStream(e.stream);
          }
        },
        onAddRemoteStream: stream => {
          console.warn('***************Remote stream*****************');
          setRemoteStream(stream);
        },
        onicecandidateerror: err => {
          console.error('onicecandidateerror', err);
        },
        oniceconnectionstatechange: err => {
          console.error('onicecandidateerror', err);
        },
        onsignalingstatechange: err => {
          console.error('onicecandidateerror', err);
        },
        onnegotiationneeded: err => {
          console.error('onicecandidateerror', err);
        },
        onremovestream: err => {
          console.error('onicecandidateerror', err);
        },
      };

      const newWebRtcPeer = WebRtcPeer.WebRtcPeerRecvonly(options, function(
        error,
      ) {
        if (error) {
          console.error(error);
          //  return onError(error);
        }

        this.generateOffer(onOfferViewer);
      });

      webRtcPeer = newWebRtcPeer;

      setWebRtcPeer(webRtcPeer);

      // webRtcPeer.addStream(localMediaStream);
    }
  };

  ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);
    console.info('Received message: ' + message.data);

    switch (parsedMessage.id) {
      case 'viewerResponse':
        viewerResponse(parsedMessage);
        break;
      case 'stopCommunication':
        // dispose();
        break;
      case 'iceCandidate':
        webRtcPeerState.addIceCandidate(parsedMessage.candidate);
        // webRtcPeerState.addIceCandidate(
        //   new RTCIceCandidate(parsedMessage.candidate),
        // );
        break;
      default:
        console.error('Unrecognized message', parsedMessage);
    }
  };

  function viewerResponse(message) {
    if (message.response !== 'accepted') {
      var errorMsg = message.message ? message.message : 'Unknow error';
      console.warn('Call not accepted for the following reason: ' + errorMsg);
      // dispose();
    } else {
      webRtcPeerState.processAnswer(message.sdpAnswer);
    }
  }

  const onOfferViewer = (error, offerSdp) => {
    if (error) {
      console.error(error);
    }

    var message = {
      id: 'viewer',
      sdpOffer: offerSdp,
    };
    sendMessage(message);
  };

  const onIceCandidate = candidate => {
    console.info('Local candidate' + JSON.stringify(candidate));

    var message = {
      id: 'onIceCandidate',
      candidate: candidate,
    };
    sendMessage(message);
  };

  const sendMessage = message => {
    var jsonMessage = JSON.stringify(message);
    console.info('Sending message: ' + jsonMessage);
    ws.send(jsonMessage);
  };

  return (
    <>
      <View style={styles.rtcview}>
        {console.log('has no video')}
        <RTCView key={1} style={styles.rtc} />
      </View>

      {remoteStream != null && (
        <View style={styles.rtcview}>
          {console.warn('has video from ', remoteStream.toURL())}
          <RTCView
            key={10}
            style={styles.rtc}
            streamURL={remoteStream.toURL()}
            objectFit="cover"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rtcview: {
    backgroundColor: 'black',
    flex: 1,
    marginBottom: 5,
  },
});
