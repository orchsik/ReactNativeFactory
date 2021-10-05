import React, { useRef, useState } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { H_colors, H_scale } from '../../index';

const { getScreenDimension, vs, ss } = H_scale;
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

  const onAudioBecomingNoisy = () => {
    setPaused(true);
  };

  const onEnd = () => {
    setPaused(true);
    video.current?.seek(0);
  };

  const onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    setPaused(!event.hasAudioFocus);
  };

  const touchSeekBar = (e: GestureResponderEvent) => {
    const { pageX, locationX } = e.nativeEvent;
    const progressRatio = pageX / progressBarWidth;
    const touchedTime = duration * progressRatio;
    setPaused(false);
    video.current?.seek(touchedTime);
  };

  const getCurrentTimePercentage = () => {
    if (currentTime > 0) {
      return currentTime / duration;
    }
    return 0;
  };

  const flexCompleted = getCurrentTimePercentage() * 100;
  const flexRemaining = (1 - getCurrentTimePercentage()) * 100;
  return (
    <View style={[styles.container]}>
      <View
        style={[styles.container]}
        onLayout={(layoutEvent) => {
          setProgressBarWidth(layoutEvent.nativeEvent.layout.width);
        }}
      >
        <Video
          /* For ExoPlayer */
          ref={video}
          // source={{ uri: 'https://www.youtube.com/watch?v=VziEZ8c-iDQ' }}
          source={require('../../assets/test_video001.mp4')}
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
          onEnd={onEnd}
          // onAudioFocusChanged={(e) => onAudioFocusChanged(e)}
          minLoadRetryCount={3} // 서버 장애시 재시도 횟수
        />

        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10 }}
          style={{ flexDirection: 'row', paddingBottom: vs(20) }}
          onPress={(e) => touchSeekBar(e)}
        >
          <View
            style={[styles.innerProgressCompleted, { flex: flexCompleted }]}
          />
          <View
            style={[styles.innerProgressRemaining, { flex: flexRemaining }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.controls}>
        <View style={styles.generalControls}>
          <TouchableOpacity onPress={() => setPaused(!paused)}>
            <MaterialCommunityIcons
              name={paused ? 'play' : 'pause'}
              color="white"
              size={ss(31)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    flex: 1,
    width: '100%',
  },
  controls: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  progress: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: vs(2),
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: vs(2),
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
});

export default VideoPlayer;
