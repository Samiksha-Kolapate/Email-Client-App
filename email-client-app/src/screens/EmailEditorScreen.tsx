
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addDraft, updateDraft } from '../store/slices/draftsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendEmail } from '../services/emailService';

const EmailEditorScreen = ({ route, navigation }: any) => {
  const { draft } = route.params || {};
  const [subject, setSubject] = useState(draft?.subject || '');
  const [recipients, setRecipients] = useState(draft?.recipients || '');
  const [body, setBody] = useState(draft?.body || '');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();

  const handleSaveDraft = () => {
    const newDraft = { id: draft?.id || Date.now().toString(), subject, recipients, body, status: 'Draft' };
    dispatch(draft ? updateDraft(newDraft) : addDraft(newDraft));
    setSnackbarMessage('Draft Saved!');
    setSnackbarVisible(true);
    navigation.goBack();
  };

  const handleSendEmail = async (recipients, subject, body) => {
    if (!recipients.trim() || !subject.trim() || !body.trim()) {
      setSnackbarMessage('All fields are required to send an email.');
      setSnackbarVisible(true);
      return;
    }

    try {
      await sendEmail(subject, recipients, body);
      const newSentEmail = { id: Date.now().toString(), subject, recipients, body, status: 'Sent' };
      // await AsyncStorage.setItem('sentEmails', JSON.stringify([...sentEmails, newSentEmail]));
      dispatch(draft ? updateDraft(newSentEmail) : addDraft(newSentEmail));
      setSnackbarMessage('Email Sent Successfully!');
      setSnackbarVisible(true);
      navigation.goBack(); // Navigate back after email is sent
    } catch (error) {
      setSnackbarMessage('Failed to send email. Please try again.');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
        <Appbar.Content title={draft ? 'Edit Email' : 'New Email'} />
      </Appbar.Header>

      <View style={styles.form}>
        <TextInput
          label="Recipients"
          value={recipients}
          onChangeText={setRecipients}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Subject"
          value={subject}
          onChangeText={setSubject}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Body"
          value={body}
          onChangeText={setBody}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={styles.textArea}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSaveDraft} style={styles.button}>Save Draft</Button>
        <Button mode="contained" onPress={() => handleSendEmail(recipients, subject, body)} style={[styles.button, styles.sendButton]}>Send Email</Button>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  form: { padding: 16 },
  input: { marginBottom: 12 },
  textArea: { height: 120, marginBottom: 12 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  button: { flex: 1, marginHorizontal: 8 },
  sendButton: { backgroundColor: '#007BFF' },
});

export default EmailEditorScreen;
