import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TodoItem = {
  _id: string;
  name: string;
};
const App=()=>{
  const [todo,settodo]=useState<TodoItem[]>([]);
  const [visible,setvisible]=useState(false);
  const [it,setit]=useState("");
  const [change,setchange]=useState("");
  //const [todo,settodo]=useState([]);
  const [newtask,settask]=useState("");
  const api="https://todo-app-1eon.onrender.com/api/users";
  useEffect(()=>{
    loadData();
    fetch();
  },[]);
  const loadData=async()=>{
    try{
  const saved=await AsyncStorage.getItem("todos");
  if(saved){
    settodo(JSON.parse(saved));
  }
    }
    catch(error){
      console.log("failed to load data");
    }
  }
  const saveData=async(data:TodoItem[])=>{
    try{
     await AsyncStorage.setItem("todos",JSON.stringify(data));

    }
    catch(error){
      console.log("failed to save data");
    }
  }
  const fetch=async()=>{  
   try{
    const res=await axios.get(api);
    settodo(res.data);
    saveData(res.data);
   }
   catch(error){
    console.log("not found");
   }
  };
  const add=async()=>{
    if (!newtask.trim()) {
    Alert.alert("Add a task");
      return;
    }

    try{
      const resp=await axios.post(api,{name:newtask});
      const updateddata=[...todo,resp.data];
      settodo(updateddata);
      saveData(updateddata);
      settask("");

    }
    catch(error){
      console.log(error);
    }
  };
  const deleting=async(id:string)=>{
   try{
    await axios.delete(`${api}/${id}`);
    settodo(todo.filter(todo=>todo._id!==id));
   }
   catch(error){
    console.error('Error deleting todo:', error);
   }
  };
  const putting=async(id:string)=>{
    try{
       const userd= await axios.put(`${api}/${id}`,{name:change});
       fetch();
        console.log('Updated User:', userd.data);
    }
    catch(error){
      console.log("error updating",error);
    }
  };
  const handleInputChange = (text: string) => {
    if (text.trim() === '') {
      Alert.alert('Validation Error', 'Text input cannot be empty.');
      return;
    }
    if (text.length <= 25) {
      setchange(text);
    } else {
      Alert.alert('Validation Error', 'Text input cannot exceed 25 characters.');
    }
  };
  const handleInputChange1 = (text: string) => {
    if (text.trim() === '') {
      Alert.alert('Validation Error', 'Text input cannot be empty.');
      return;
    }
    if (text.length <= 25) {
      settask(text);
    } else {
      Alert.alert('Validation Error', 'Text input cannot exceed 25 characters.');
    }
  };
    return (
      
      <SafeAreaView style={styles.main}>
        <View style={styles.first}>
          <Text style={styles.heading}>Tasks</Text>
        </View>
        <View style={styles.second} >
          <TextInput style={styles.input} onChangeText={handleInputChange1} placeholder='Add new task' value={newtask} placeholderTextColor={'red'} />
          <Button title='ADD' onPress={add}/>
        </View>
        <View style={styles.middle}>
          <Text style={styles.firsttext}>To-Do List :</Text>
          <Modal animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setvisible(false)} // Android back button
      >
        <View style={styles.modalOverlay}>
                  <View style={styles.modalView}>
          
                   <TextInput style={styles.input} onChangeText={handleInputChange}  value={change} placeholderTextColor={'red'} /> 
                  <View style={styles.sec}>
                    <View style={styles.btn}>
                    <Button title={"Save"} onPress={()=>{setvisible(false);putting(it)}}/>
                      </View>
                      <View style={styles.btn}>
                    <Button title={"Delete"} onPress={()=>{setvisible(false);deleting(it)}}/></View>

                  </View>
          </View>
        </View> 
      </Modal>
         <View style={styles.list}>
          <FlatList
     
  data={todo} keyExtractor={(item)=>item._id.toString()}
  renderItem={({item})=>(
            <View style={styles.once}>  
             {/* <Text style={styles.indi}>{item._id}</Text> */}
              <Text style={styles.indi}>{item.name}</Text>
              <TouchableOpacity onPress={()=>{setvisible(true);setit(item._id);setchange(item.name)}}>
              <Image source={require("./components/image.png")} style={styles.img}/>
              </TouchableOpacity>
              </View>
    )}

/>

</View>
        </View>
      </SafeAreaView>
    )
};
const styles=StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'#fff'
    },
    first:{
      height:40,
      justifyContent:'center',
      alignItems:'center',
      borderBottomWidth:2
    },
    second:{
      height:50,
      flexDirection:'row'
    },
    middle:{
      flex:1
    },
    heading:{
      fontSize:20,
    },
    firsttext:{
       fontSize:20
    },
    input:{
      flex:1,
      borderColor:'red',
      borderBottomWidth:2,
      fontSize:20,
      
    },
    list:{
       marginBottom:20
    },
    once:{
      flexDirection:"row",
       height:60,
       borderWidth:2,
       margin:10,
       borderRadius:10,
       justifyContent:"space-between",
       padding:3
      
    },
    indi:{
      fontSize:20,
      margin:10

    },
    img:{
      height:50,
      width:50,
      
     
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
    },
    modalView:{
      borderWidth:2,
      height:150,
      width:300,
      backgroundColor:"#fff",

    },
    sec:{
      margin:20,
       flexDirection:'row',
       justifyContent:'space-evenly'
    },
    btn:{
      height:40,
      width:70
    } 
   
    
});
export default App;
