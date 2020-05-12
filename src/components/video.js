import React, { Component } from 'react';
import Video from 'react-native-video';
import { StyleSheet } from 'react-native';

export default class VideoComp extends Component {
  render() {
    const { src } = this.props;

    return (
      <Video
        /* For ExoPlayer */
        source={{ uri: src }}
        // source={require('./videos/tom_and_jerry_31.mp4')}
        style={styles.fullScreen}
        // rate={this.state.rate}
        // paused={this.state.paused}
        // volume={this.state.volume}
        // muted={this.state.muted}
        // resizeMode={this.state.resizeMode}
        // onLoad={this.onLoad}
        // onProgress={this.onProgress}
        // onEnd={this.onEnd}
        // onAudioBecomingNoisy={this.onAudioBecomingNoisy}
        // onAudioFocusChanged={this.onAudioFocusChanged}
        // repeat={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    borderWidth: 3,
  },
});
