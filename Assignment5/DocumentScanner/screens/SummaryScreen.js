import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SummaryScreen = ({ navigation, route }) => {
  const { selfiePhoto, documentPhoto, emergencyContacts } = route.params;
  const submissionTime = new Date().toLocaleString();

  const handleStartOver = () => {
    Alert.alert(
      'Start Over',
      'Are you sure you want to start over? All current data will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Over',
          style: 'destructive',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          }),
        },
      ]
    );
  };

  const handleSubmit = () => {
    Alert.alert(
      'Success!',
      'Your information has been submitted successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="checkmark-circle" size={60} color="#27ae60" />
          <Text style={styles.title}>Submission Summary</Text>
          <Text style={styles.subtitle}>Review your information before submitting</Text>
        </View>

        {/* Photos Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Captured Photos</Text>
          
          <View style={styles.photosContainer}>
            {/* Selfie */}
            <View style={styles.photoItem}>
              <Image source={{ uri: selfiePhoto.uri }} style={styles.photo} />
              <View style={styles.photoLabel}>
                <Ionicons name="person" size={16} color="#fff" />
                <Text style={styles.photoLabelText}>Selfie</Text>
              </View>
            </View>

            {/* Document */}
            <View style={styles.photoItem}>
              <Image source={{ uri: documentPhoto.uri }} style={styles.photo} />
              <View style={styles.photoLabel}>
                <Ionicons name="document-text" size={16} color="#fff" />
                <Text style={styles.photoLabelText}>Document</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Emergency Contacts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          
          {emergencyContacts.map((contact, index) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactNumber}>
                <Text style={styles.contactNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phoneNumber}</Text>
              </View>
              <Ionicons name="call" size={20} color="#3498db" />
            </View>
          ))}
        </View>

        {/* Timestamp Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submission Details</Text>
          <View style={styles.timestampCard}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.timestampText}>{submissionTime}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.startOverButton} onPress={handleStartOver}>
            <Ionicons name="refresh" size={20} color="#e74c3c" />
            <Text style={styles.startOverButtonText}>Start Over</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="paper-plane" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <Ionicons name="shield-checkmark" size={16} color="#666" />
          <Text style={styles.privacyText}>
            Your data is encrypted and securely stored
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  photoItem: {
    flex: 1,
    position: 'relative',
  },
  photo: {
    width: '100%',
    aspectRatio: 3/4,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  photoLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photoLabelText: {
    color: '#fff',
    fontSize: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  contactNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactNumberText: {
    color: '#fff',
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  timestampCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  timestampText: {
    fontSize: 16,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  startOverButton: {
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
  startOverButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    gap: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SummaryScreen; 