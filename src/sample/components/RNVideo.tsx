import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';

import { H_scale } from '../../../utils/index';
const { getScreenDimension } = H_scale;
const { SCREEN_WIDTH } = getScreenDimension();

type ResizeMode = 'stretch' | 'contain' | 'cover' | 'none';

function VideoPlayer() {
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [resizeMode, setResizeMode] = useState<ResizeMode>('contain');
  const [duration, setDuration] = useState(0.0);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [paused, setPaused] = useState(false);
  const [progressBarWidth, setProgressBarWidth] = useState(SCREEN_WIDTH);

  const video = useRef<Video>(null);
  const onLoad = (data: any) => {
    setDuration(data.duration);
  };

  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const onEnd = () => {
    setPaused(true);
    video.current?.seek(0);
  };

  const onAudioBecomingNoisy = () => {
    setPaused(true);
  };

  const onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    setPaused(!event.hasAudioFocus);
  };

  const getCurrentTimePercentage = () => {
    if (currentTime > 0) {
      return currentTime / duration;
    }
    return 0;
  };

  const renderRateControl = (new_rate: number) => {
    const isSelected = new_rate === rate;

    return (
      <TouchableOpacity
        onPress={() => {
          setRate(new_rate);
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}
        >
          {new_rate}x
        </Text>
      </TouchableOpacity>
    );
  };

  const renderResizeModeControl = (new_resizeMode: ResizeMode) => {
    const isSelected = new_resizeMode === resizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          setResizeMode(new_resizeMode);
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}
        >
          {new_resizeMode}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVolumeControl = (new_volume: number) => {
    const isSelected = new_volume === volume;

    return (
      <TouchableOpacity
        onPress={() => {
          setVolume(volume);
        }}
      >
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}
        >
          {new_volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  };

  const flexCompleted = getCurrentTimePercentage() * 100;
  const flexRemaining = (1 - getCurrentTimePercentage()) * 100;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fullScreen}
        onPress={() => setPaused(!paused)}
        onLayout={(layoutEvent) => {
          // console.log({ layoutWidth: layoutEvent.nativeEvent.layout.width });
          setProgressBarWidth(layoutEvent.nativeEvent.layout.width);
        }}
      >
        <Video
          ref={video}
          /* For ExoPlayer */
          source={require('../../assets/test_video001.mp4')}
          // source={{
          //   uri: 'https://www.youtube.com/watch?v=VziEZ8c-iDQ',
          // }}
          style={styles.fullScreen}
          rate={rate}
          paused={paused}
          volume={volume}
          muted={muted}
          repeat={false}
          onLoad={onLoad}
          onProgress={onProgress}
          onAudioBecomingNoisy={onAudioBecomingNoisy}
          resizeMode={resizeMode}
          // onEnd={onEnd}
          // onAudioFocusChanged={onAudioFocusChanged}
        />
      </TouchableOpacity>

      <View style={styles.controls}>
        <View style={styles.generalControls}>
          <View style={styles.rateControl}>
            {renderRateControl(0.25)}
            {renderRateControl(0.5)}
            {renderRateControl(1.0)}
            {renderRateControl(1.5)}
            {renderRateControl(2.0)}
          </View>

          <View style={styles.volumeControl}>
            {renderVolumeControl(0.5)}
            {renderVolumeControl(1)}
            {renderVolumeControl(1.5)}
          </View>

          <View style={styles.resizeModeControl}>
            {renderResizeModeControl('cover')}
            {renderResizeModeControl('contain')}
            {renderResizeModeControl('stretch')}
          </View>
        </View>

        <TouchableOpacity
          style={styles.progress}
          onPress={(e) => {
            const { pageX, locationX } = e.nativeEvent;
            const progressRatio = pageX / progressBarWidth;
            const touchedTime = duration * progressRatio;
            video.current?.seek(touchedTime);
          }}
        >
          <View
            style={[styles.innerProgressCompleted, { flex: flexCompleted }]}
          />
          <View
            style={[styles.innerProgressRemaining, { flex: flexRemaining }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    flex: 1,
    width: '100%',
    // borderColor: 'yellow',
    // borderWidth: 5,
  },
  controls: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  generalControls: {
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
    // borderColor: 'red',
    // borderWidth: 5,
  },
  rateControl: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeControl: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  progress: {
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    // borderColor: 'blue',
    // borderWidth: 5,
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
});

export default VideoPlayer;
