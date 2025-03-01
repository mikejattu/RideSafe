import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import { Card } from 'react-native-paper';

// Local placeholder image - ensure this exists in your project
const placeholderImage = require('/Users/guneet/Desktop/RideSafe/RideSafe/assets/pic.png'); // Adjust path as needed

const ProfileScreen: React.FC = () => {
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [isViewingReports, setIsViewingReports] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Mock user data
  const userData = {
    name: 'James Brown',
    email: 'j.brown27@gmail.com',
    reportsSubmitted: 3,
  };

  // Sample submitted reports (similar to news updates in AnalysisScreen)
  const submittedReports = [
    { title: "Incident at Southgate", content: "Reported a theft incident near the main entrance..." },
    { title: "Suspicious Activity", content: "Observed unusual behavior at Century Park..." },
    { title: "Harassment Report", content: "Witnessed verbal harassment on the platform..." },
  ];

  const handleSavePassword = () => {
    if (newPassword === confirmPassword && newPassword.length > 0) {
      // Here you would typically make an API call to update the password
      console.log('Password updated:', newPassword);
      setIsEditingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Passwords must match and cannot be empty');
    }
  };

  const renderPasswordSection = () => (
    isEditingPassword ? (
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="New Password"
          placeholderTextColor="#666666"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          placeholderTextColor="#666666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.passwordButtons}>
          <TouchableOpacity
            style={[styles.passwordButton, styles.saveButton]}
            onPress={handleSavePassword}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.passwordButton, styles.cancelButton]}
            onPress={() => setIsEditingPassword(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null
  );

  const renderSubmittedReports = () => (
    isViewingReports ? (
      <View style={styles.reportsContainer}>
        {submittedReports.map((report, index) => (
          <View key={index} style={styles.reportBox}>
            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportContent}>{report.content}</Text>
          </View>
        ))}
      </View>
    ) : null
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <Image
                source={placeholderImage}
                style={styles.profileImage}
                defaultSource={placeholderImage}
              />
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
            </View>

            <View style={styles.reportsSection}>
              <Text style={styles.sectionTitle}>Reports Submitted</Text>
              <Text style={styles.reportsNumber}>{userData.reportsSubmitted}</Text>
            </View>

            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={() => setIsEditingPassword(!isEditingPassword)}
            >
              <Text style={styles.changePasswordText}>
                {isEditingPassword ? 'Hide Password Change' : 'Change Password'}
              </Text>
            </TouchableOpacity>

            {renderPasswordSection()}

            <TouchableOpacity
              style={styles.viewReportsButton}
              onPress={() => setIsViewingReports(!isViewingReports)}
            >
              <Text style={styles.viewReportsText}>
                {isViewingReports ? 'Hide Submitted Reports' : 'View Submitted Reports'}
              </Text>
            </TouchableOpacity>

            {renderSubmittedReports()}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#023E8A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileCard: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  reportsSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  reportsNumber: {
    fontSize: 32,
    fontWeight: '600',
    color: '#023E8A',
    textAlign: 'center',
  },
  changePasswordButton: {
    backgroundColor: '#023E8A',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  changePasswordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  viewReportsButton: {
    backgroundColor: '#023E8A',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  viewReportsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  passwordInputContainer: {
    width: '80%',
    alignSelf: 'center',
    gap: 12,
    marginBottom: 16,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F9F9F9',
    textAlign: 'center',
  },
  passwordButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  passwordButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    maxWidth: 120,
  },
  saveButton: {
    backgroundColor: '#023E8A',
  },
  cancelButton: {
    backgroundColor: '#666666',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  reportsContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  reportBox: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  reportContent: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default ProfileScreen;