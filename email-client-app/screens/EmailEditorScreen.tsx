import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, Snackbar, Card } from 'react-native-paper';

interface Draft {
  id: number;
  subject: string;
  recipients: string;
  body: string;
  status: 'Draft' | 'Sent';
}

const EmailEditorScreen = ({ route, navigation }: any) => {
  const { draft } = route.params;

  const [subject, setSubject] = useState(draft ? draft.subject : '');
  const [recipients, setRecipients] = useState(draft ? draft.recipients : '');
  const [body, setBody] = useState(draft ? draft.body : '');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSendEmail = () => {
    if (!subject || !recipients || !body) {
      setSnackbarMessage('All fields are required');
      setSnackbarVisible(true);
      return;
    }

    const updatedDraft = { ...draft, subject, recipients, body, status: 'Sent' };
    setSnackbarMessage('Email sent successfully!');
    setSnackbarVisible(true);
    navigation.goBack();
  };

  const handleSaveDraft = () => {
    const newDraft = { id: draft?.id || Date.now(), subject, recipients, body, status: 'Draft' };
    setSnackbarMessage('Draft saved successfully!');
    setSnackbarVisible(true);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Appbar Header */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={draft ? 'Edit Email' : 'New Email'} />
      </Appbar.Header>

      {/* Email Editor Form */}
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Subject"
            value={subject}
            onChangeText={setSubject}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Recipients"
            value={recipients}
            onChangeText={setRecipients}
            mode="outlined"
            keyboardType="email-address"
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
          {/* Action Buttons */}
          <Button mode="contained" onPress={handleSendEmail} style={styles.sendButton}>
            Send Email
          </Button>
          <Button mode="outlined" onPress={handleSaveDraft} style={styles.draftButton}>
            Save Draft
          </Button>
        </Card.Content>
      </Card>

      {/* Snackbar for Feedback Messages */}
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={2000}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  card: {
    margin: 16,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: '#6200ee',
    marginBottom: 10,
  },
  draftButton: {
    borderColor: '#6200ee',
  },
});

export default EmailEditorScreen;
