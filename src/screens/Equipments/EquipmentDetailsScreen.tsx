
import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';

interface Post {
  id: number;
  nom: string;
  email: string;
}

const EquipmentDetailsScreen: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('http://192.168.1.70/api/api.php')
      .then(response => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  return (

    <View>
      <Text>Equipment Detailssss</Text>  
      
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.nom}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
   </View>

  );

};



export default EquipmentDetailsScreen;
