import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Face, Point, RNCamera } from 'react-native-camera';

import { H_colors, H_scale } from '../../../utils';

const { ORIGIN_HEIGHT, ORIGIN_WIDTH } = H_scale;

const landmarkSize = 2;

const CameraScreen = () => {
  const camera = useRef<RNCamera>(null);
  const recordOptions = {
    mute: false,
    maxDuration: 5,
    quality: RNCamera.Constants.VideoQuality['288p'],
  };
  const canDetectFaces = true;

  const [isRecording, setIsRecording] = useState(false);
  const [faces, setFaces] = useState<Face[]>([]);

  const takePicture = async function () {
    if (camera.current) {
      const data = await camera.current.takePictureAsync();
      console.warn('takePicture ', data);
    }
  };

  const takeVideo = async function () {
    if (camera.current) {
      try {
        const promise = camera.current.recordAsync(recordOptions);

        if (promise) {
          setIsRecording(true);
          const data = await promise;
          setIsRecording(false);
          console.warn('takeVideo', data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const facesDetected = (response: { faces: Face[] }) => {
    // console.log({ faces })
    setFaces(response.faces);
  };

  const faceDirectMsg = (face: Face) => {
    let {
      rollAngle = 0, // 갸우뚱X: 0
      yawAngle = 0, // 정면: 0
      bounds,
      // leftEarPosition,
      // rightEarPosition,
      // bottomMouthPosition,
    } = face;

    const leftSide = bounds.origin.x;
    const rightSide = leftSide + bounds.size.width;
    const topSide = bounds.origin.y;
    const bottomSide = topSide + bounds.size.height;

    let infoMsg = '자 찍습니다~';
    if (leftSide < 0) {
      infoMsg = '오른쪽으로 좀 가주세요~';
    } else if (rightSide > ORIGIN_WIDTH) {
      infoMsg = '왼쪽으로 좀 가주세요~';
    } else if (bottomSide > ORIGIN_HEIGHT) {
      infoMsg = '위로 좀 가주세요~';
    } else if (topSide < 0) {
      infoMsg = '아래로 좀 가주세요~';
    } else if (rollAngle < -20 || rollAngle > 20) {
      infoMsg = '얼굴을 반듯이 해주세요~';
    } else if (yawAngle < -20 || yawAngle > 20) {
      infoMsg = '정면을 봐주세요~';
    }

    return {
      infoMsg,
      leftSide,
      rightSide,
      topSide,
      bottomSide,
      rollAngle,
      yawAngle,
    };
  };

  const renderFace = (face: Face) => {
    const { faceID, rollAngle = 0, yawAngle = 0, bounds } = face;

    const { infoMsg } = faceDirectMsg(face);

    return (
      <View
        key={faceID}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
            transform: [
              { perspective: 600 },
              { rotateZ: `${rollAngle.toFixed(0)}deg` },
              { rotateY: `${yawAngle.toFixed(0)}deg` },
            ],
          },
        ]}
      >
        <Text style={styles.faceText}>{infoMsg}</Text>
        {/* <Text style={styles.faceText}>상: {topSide}</Text>
        <Text style={styles.faceText}>하: {bottomSide}</Text>
        <Text style={styles.faceText}>좌: {leftSide}</Text>
        <Text style={styles.faceText}>우: {rightSide}</Text>
        <Text style={styles.faceText}>갸우뚱: {rollAngle}</Text>
        <Text style={styles.faceText}>정면: {yawAngle}</Text> */}
      </View>
    );
  };

  const renderLandmarksOfFace = (face: Face) => {
    const renderLandmark = (position: Point<number> | undefined) => {
      return (
        position && (
          <View
            style={[
              styles.landmark,
              {
                left: position.x - landmarkSize / 2,
                top: position.y - landmarkSize / 2,
              },
            ]}
          />
        )
      );
    };

    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  };

  const renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {faces.map(renderFace)}
    </View>
  );

  const renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {faces.map(renderLandmarksOfFace)}
    </View>
  );

  const renderCamera = () => {
    return (
      <RNCamera
        ref={camera}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        type="front"
        ratio="16:9"
        flashMode={'off'}
        autoFocus={'on'}
        whiteBalance={'auto'}
        zoom={0}
        focusDepth={0}
        // FOR faceDetection
        trackingEnabled
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        onFacesDetected={canDetectFaces && facesDetected}
      >
        {!!canDetectFaces && renderFaces()}
        {!!canDetectFaces && renderLandmarks()}
      </RNCamera>
    );
  };

  return <View style={styles.container}>{renderCamera()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: 'white',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

export default CameraScreen;
