import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, FAB, Appbar, Avatar } from 'react-native-paper';

interface Draft {
  id: number;
  subject: string;
  recipients: string;
  body: string;
  status: 'Draft' | 'Sent';
}

const HomeScreen = ({ navigation }: any) => {
  const [drafts, setDrafts] = useState<Draft[]>([
    { id: 1, subject: 'Meeting Update', recipients: 'example@domain.com', body: 'The meeting is scheduled for 3 PM.', status: 'Draft' },
    { id: 2, subject: 'Project Update', recipients: 'team@domain.com', body: 'The project is on track.', status: 'Sent' },
  ]);

  const createNewDraft = () => {
    navigation.navigate('EmailEditor', { draft: null });
  };

  const handleDraftPress = (draft: Draft) => {
    navigation.navigate('EmailEditor', { draft });
  };

  return (
    <View style={styles.container}>
      {/* Appbar Header */}
      <Appbar.Header>
        <Appbar.Content title="Emails" />
      </Appbar.Header>

      {/* Drafts List */}
      <FlatList
        data={drafts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDraftPress(item)}>
            <Card style={styles.card}>
              <Card.Title
                title={item.subject}
                subtitle={item.recipients}
                left={(props) => (
                  <Avatar.Text
                    {...props}
                    label={item.status === 'Sent' ? 'S' : 'D'}
                    style={item.status === 'Sent' ? styles.sentAvatar : styles.draftAvatar}
                  />
                )}
              />
              <Card.Content>
                <Text>{item.body.substring(0, 50)}...</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      <FAB style={styles.fab} icon="plus" label='Create New Draft'  onPress={createNewDraft} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
  },
  draftAvatar: {
    backgroundColor: '#FFA500',
  },
  sentAvatar: {
    backgroundColor: '#007BFF',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
