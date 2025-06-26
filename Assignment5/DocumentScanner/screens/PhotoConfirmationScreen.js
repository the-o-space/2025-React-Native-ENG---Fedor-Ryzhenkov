import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PhotoConfirmationScreen = ({ route, navigation }) => {
  const { photo, photoType } = route.params;

  const handleAccept = () => {
    // Navigate back to home with the photo
    navigation.navigate('Home', {
      ...(photoType === 'selfie' ? { selfiePhoto: photo } : { documentPhoto: photo })
    });
  };

  const handleRetake = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {photoType === 'selfie' ? 'Selfie Preview' : 'Document Preview'}
        </Text>
        <Text style={styles.subtitle}>
          Is this photo clear and properly aligned?
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: photo.uri }} style={styles.image} />
        <View style={styles.photoTypeLabel}>
          <Ionicons 
            name={photoType === 'selfie' ? 'person' : 'document-text'} 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.photoTypeLabelText}>
            {photoType === 'selfie' ? 'Selfie' : 'Document'}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
          <Ionicons name="camera-reverse-outline" size={24} color="#e74c3c" />
          <Text style={styles.retakeButtonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
          <Text style={styles.acceptButtonText}>Use This Photo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  photoTypeLabel: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoTypeLabelText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  retakeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e74c3c',
    gap: 8,
  },
  retakeButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PhotoConfirmationScreen; 