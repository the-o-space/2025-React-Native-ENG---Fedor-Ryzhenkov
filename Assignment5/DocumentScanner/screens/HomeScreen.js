import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [documentPhoto, setDocumentPhoto] = useState(null);

  useEffect(() => {
    // Update photos from navigation params
    if (route.params?.selfiePhoto) {
      setSelfiePhoto(route.params.selfiePhoto);
    }
    if (route.params?.documentPhoto) {
      setDocumentPhoto(route.params.documentPhoto);
    }
  }, [route.params]);

  useEffect(() => {
    // If both photos are captured, proceed to contact selection
    if (selfiePhoto && documentPhoto) {
      navigation.navigate('ContactSelection', {
        selfiePhoto,
        documentPhoto,
      });
    }
  }, [selfiePhoto, documentPhoto]);

  const handleCaptureSelfie = () => {
    navigation.navigate('Camera', { 
      initialType: 'front',
      selfiePhoto: selfiePhoto,
      documentPhoto: documentPhoto 
    });
  };

  const handleCaptureDocument = () => {
    navigation.navigate('Camera', { 
      initialType: 'back',
      selfiePhoto: selfiePhoto,
      documentPhoto: documentPhoto 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Scanner</Text>
        <Text style={styles.subtitle}>
          Capture your selfie and document to proceed
        </Text>
      </View>

      <View style={styles.content}>
        {/* Selfie Section */}
        <TouchableOpacity 
          style={[styles.captureCard, selfiePhoto && styles.captureCardCompleted]}
          onPress={handleCaptureSelfie}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              {selfiePhoto ? (
                <Image source={{ uri: selfiePhoto.uri }} style={styles.thumbnail} />
              ) : (
                <Ionicons name="person-circle-outline" size={60} color="#3498db" />
              )}
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Selfie Photo</Text>
              <Text style={styles.cardDescription}>
                {selfiePhoto ? 'Tap to retake' : 'Take a front-facing photo'}
              </Text>
            </View>
            <View style={styles.statusIcon}>
              {selfiePhoto ? (
                <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
              ) : (
                <Ionicons name="camera" size={24} color="#666" />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Document Section */}
        <TouchableOpacity 
          style={[styles.captureCard, documentPhoto && styles.captureCardCompleted]}
          onPress={handleCaptureDocument}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              {documentPhoto ? (
                <Image source={{ uri: documentPhoto.uri }} style={styles.thumbnail} />
              ) : (
                <Ionicons name="document-text-outline" size={60} color="#e74c3c" />
              )}
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Document Photo</Text>
              <Text style={styles.cardDescription}>
                {documentPhoto ? 'Tap to retake' : 'Capture ID or passport'}
              </Text>
            </View>
            <View style={styles.statusIcon}>
              {documentPhoto ? (
                <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
              ) : (
                <Ionicons name="camera" size={24} color="#666" />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(!!selfiePhoto + !!documentPhoto) * 50}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {!!selfiePhoto + !!documentPhoto} of 2 photos captured
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>Instructions:</Text>
          <View style={styles.instructionItem}>
            <Ionicons name="information-circle" size={20} color="#666" />
            <Text style={styles.instructionText}>
              Ensure photos are clear and well-lit
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="shield-checkmark" size={20} color="#666" />
            <Text style={styles.instructionText}>
              Your data is secure and encrypted
            </Text>
          </View>
        </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  captureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  captureCardCompleted: {
    borderColor: '#27ae60',
    borderWidth: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  statusIcon: {
    marginLeft: 12,
  },
  progressContainer: {
    marginVertical: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  instructions: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 16,
    marginTop: 'auto',
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
});

export default HomeScreen; 