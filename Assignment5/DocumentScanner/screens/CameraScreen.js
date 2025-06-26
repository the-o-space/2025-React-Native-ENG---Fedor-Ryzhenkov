import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Brightness from 'expo-brightness';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState(
    route.params?.initialType === 'front' ? 'front' : 'back'
  );
  const [previousBrightness, setPreviousBrightness] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      // Store current brightness
      const { brightness } = await Brightness.getBrightnessAsync();
      setPreviousBrightness(brightness);
    })();

    // Cleanup function to restore brightness
    return () => {
      if (previousBrightness !== null) {
        Brightness.setBrightnessAsync(previousBrightness);
      }
    };
  }, []);

  useEffect(() => {
    // Adjust brightness based on camera type
    (async () => {
      if (facing === 'front') {
        // Set brightness to 100% for front camera
        await Brightness.setBrightnessAsync(1);
      } else if (previousBrightness !== null) {
        // Restore previous brightness for back camera
        await Brightness.setBrightnessAsync(previousBrightness);
      }
    })();
  }, [facing, previousBrightness]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        // Navigate to confirmation screen with photo data
        navigation.navigate('PhotoConfirmation', {
          photo: photo,
          photoType: facing === 'front' ? 'selfie' : 'document',
          selfiePhoto: route.params?.selfiePhoto,
          documentPhoto: route.params?.documentPhoto,
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
        console.error(error);
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
        <Text style={styles.submessage}>Please enable camera access in settings</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      
      {/* Overlay for document alignment */}
      <View style={styles.overlay}>
        <View style={styles.overlayTop} />
        <View style={styles.overlayMiddle}>
          <View style={styles.overlaySide} />
          <View style={styles.focusBox}>
            <View style={styles.focusCorner} />
            <View style={[styles.focusCorner, styles.topRight]} />
            <View style={[styles.focusCorner, styles.bottomLeft]} />
            <View style={[styles.focusCorner, styles.bottomRight]} />
          </View>
          <View style={styles.overlaySide} />
        </View>
        <View style={styles.overlayBottom} />
      </View>

      {/* Instructions */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          {facing === 'front' 
            ? 'Position your face within the frame' 
            : 'Align your document within the frame'}
        </Text>
      </View>

      {/* Camera controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={30} color="white" />
          <Text style={styles.controlText}>
            {facing === 'front' ? 'Document' : 'Selfie'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <View style={styles.controlButton}>
          <Ionicons 
            name={facing === 'front' ? 'sunny' : 'sunny-outline'} 
            size={30} 
            color="white" 
          />
          <Text style={styles.controlText}>
            {facing === 'front' ? '100%' : 'Auto'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  message: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  submessage: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: height * 0.4,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  focusBox: {
    width: width * 0.8,
    height: height * 0.4,
    position: 'relative',
  },
  focusCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fff',
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderBottomWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  instructionContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    alignItems: 'center',
    padding: 10,
  },
  controlText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  permissionButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraScreen; 