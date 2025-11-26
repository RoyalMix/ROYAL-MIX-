import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import ServiceButton from '../components/ServiceButton';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FAF7F0'}}>
      <ScrollView contentContainerStyle={{padding:20}}>
        <Text style={{fontSize:24, fontWeight:'700', marginBottom:16}}>Royal Mix</Text>
        <ServiceButton title="Food Delivery" onPress={() => navigation.navigate('Menu')} />
        <ServiceButton title="Health Services" onPress={() => alert('Health coming soon')} />
        <ServiceButton title="Rewards" onPress={() => alert('Rewards coming soon')} />
      </ScrollView>
    </SafeAreaView>
  );
  }
