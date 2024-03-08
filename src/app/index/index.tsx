import {View, Text, ScrollView, Alert} from 'react-native'
import {styles} from './styles'
import { Ingredient } from '@/src/components/ingredient'
import { useEffect, useState } from 'react'
import { Selected } from '@/src/components/Selected';
import { router } from 'expo-router';
import { services } from "@/src/services";

export default function Index(){

    const [selected, setSelected] = useState<String[]>([]);
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

    function handleToggleSelected(value: String){
        if(selected.includes(value)){
            return setSelected((state)=> state.filter((item)=> item !== value))
        }
        setSelected((state)=> [...state, value])
        console.log(selected)
    }    

    function handleClearSelected(){
        Alert.alert("Limpar", "Deseja realmente limpar a lista?", [
            {text: "Não", style: "cancel"},
            {text: "Sim", onPress: ()=> setSelected([])}
        ])
    }

    function handleSearch(){
        router.navigate("./recipes/" + selected)
    }
   
    useEffect(()=>{
        services.ingredients.findAll().then(setIngredients)
    }, [])

    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Escolha {"\n"}
                <Text style={styles.subtitle}>os produtos</Text>
            </Text>
            <Text style={styles.message}>
                Descubra receitas baseadas nos produtos que você escolheu
            </Text>
            <ScrollView  contentContainerStyle={styles.ingredients} showsVerticalScrollIndicator={false}>
            {
                ingredients.map((item)=>(
                    <Ingredient 
                    key={item.id} 
                    name={item.name}
                    image={`${services.storage.imagePath}/${item.image}`}
                    selected = {selected.includes(item.id)} 
                    onPress={() => handleToggleSelected(item.id)}/>
                ))
            }
        </ScrollView>
       { selected.length > 0 && (
        <Selected 
        quantity={selected.length}
         onClear={handleClearSelected} 
         onSearch={handleSearch}/>
         )}
        </View>


    )
}