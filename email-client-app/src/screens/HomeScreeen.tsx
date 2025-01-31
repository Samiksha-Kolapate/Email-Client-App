
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card, Text, FAB, Appbar, Avatar, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  setDrafts } from '../store/slices/draftsSlice';
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
          dispatch(setDrafts(JSON.parse(storedDrafts)));
        }
      } catch (error) {
        console.error('Error loading drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
      <Image
          source={require('../../assets/images/logo.webp')} // Update the path to your logo
          style={styles.logo}
        />
      <Appbar.Content
          title="Mail-Wave"
          titleStyle={styles.title}
        />
        
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
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
  button: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 20,
    elevation: 2,
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    resizeMode: 'cover',
    
  },
  title: {
    flex: 1,
    textAlign: 'left',
  },
});

export default HomeScreen;
