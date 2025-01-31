
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Text, FAB, Appbar, Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDraft } from '../store/slices/draftsSlice';
// import { setDrafts } from '../store/slices/draftsSlice';

const HomeScreen = ({ navigation }: any) => {
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const storedDrafts = await AsyncStorage.getItem('drafts');
        if (storedDrafts) {
          // dispatch(setDrafts(JSON.parse(storedDrafts)));
          dispatch(addDraft(JSON.parse(storedDrafts)));
        }
      } catch (error) {
        console.error('Error loading drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, [dispatch]);


  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Emails" />
      </Appbar.Header>

      {loading ? (
        <Text style={styles.loadingText}>Loading drafts...</Text>
      ) : drafts.length === 0 ? (
        <Text style={styles.noDraftsText}>No drafts available. Create one!</Text>
      ) : (
        <FlatList
          data={drafts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Email', { draft: item })}>
              <Card style={styles.card}>
                <Card.Title
                  title={item.subject || 'No Subject'}
                  subtitle={item.recipients || 'No Recipient'}
                  left={(props) => (
                    <Avatar.Icon
                      {...props}
                      icon={item.status === 'Sent' ? 'check-circle' : 'pencil'}
                      style={item.status === 'Sent' ? styles.sentAvatar : styles.draftAvatar}
                    />
                  )}
                />
              </Card>
            </TouchableOpacity>
          )}
        />
      )}

      <FAB style={styles.fab} icon="plus" label="Create New Draft" onPress={() => navigation.navigate('Email')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  card: { margin: 8, elevation: 3 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
  loadingText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
  noDraftsText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
  draftAvatar: { backgroundColor: '#FFA500' },
  sentAvatar: { backgroundColor: '#007BFF' },
});

export default HomeScreen;
