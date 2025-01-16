
import React from 'react';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';

interface Post {
  id: number;
  nom_client: string;
  email: string;
}

const EquipmentDetailsScreen: React.FC = () => {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('http://192.168.1.66/api/clients.php')
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
          <Text>{item.nom_client}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
   </View>

  );

};



export default EquipmentDetailsScreen;
