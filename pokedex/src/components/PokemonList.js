import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  TextInput,
  Text,
  Button,
  View,
} from "react-native";
import PokemonCard from "./PokemonCard";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Button } from "react-native-web";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function PokemonList(props) {
  const {
    pokemons,
    loadPokemons,
    isNext,
    filterData,
    setFilterData,
    valor,
    load,
  } = props;

  const laodMore = () => {
    loadPokemons();
  };

  const [search, setSearch] = useState("");
  const [poke, setPoke] = useState(false);

  useEffect(() => {}, [search]);

  const searchFilter = (text) => {
    setSearch(text);
    if (text) {
      setFilterData(pokemons);
    }
  };
  const searchFilterDone = () => {
    if (search) {
      const newData = filterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilterData(newData);
      setSearch("");
      if (Object.keys(newData).length == 0) {
        setPoke(true);
      } else {
        setPoke(false);
      }
      console.log(`aqui ${Object.keys(newData).length}`);
    } else {
      setFilterData(pokemons);
      setSearch(search);
    }
  };
  const Reload = () => {
    setFilterData(pokemons);
  };

  //Si queriamos que filtre al escribir
  // const searchFilter = (text) => {
  //   if (text) {
  //     const newData = filterData.filter((item) => {
  //       const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });

  //     setFilterData(newData);
  //     setSearch(text);
  //   } else {
  //     setFilterData(pokemons);
  //     setSearch(text);
  //   }
  // };
  return (
    <SafeAreaView>
      {valor && (
        <View style={styles.search}>
          <TextInput
            style={styles.textInputStyle}
            value={search}
            placeholder="  Nombre del Pokemon  "
            onChangeText={(text) => searchFilter(text)}
          />
          <Button title="Search" color="#6890f0" onPress={searchFilterDone} />
          <Button title="All" color="#6890f0" onPress={Reload} />
        </View>
      )}
      <FlatList
        data={filterData}
        numColumns={2}
        showsVerticalScrollIndicator={false} //Quita la bara de scroll
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={isNext && laodMore} //Cuando llegas al final de la lista ejecuta esto
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <View style={styles.list}>
            {poke && (
              <View style={styles.aviso}>
                <Text style={styles.alertaText}>
                  No encontramos Pokemons con ese nombre
                </Text>
              </View>
            )}
            {!load && (
              <View style={styles.alerta}>
                <Text style={styles.alertaText}>Cargando...</Text>

                <ActivityIndicator
                  size="large"
                  style={styles.spinner}
                  color="#6b57ff"
                />
              </View>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 5 : 0,
  },

  list: {
    marginBottom: 100,
  },
  alerta: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  alertaText: {
    fontSize: 17,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
  textInputStyle: {
    height: 40,
    margin: 12,
    marginLeft: 0,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "60%",
  },

  search: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 25,
    height: 40,
    width: "100%",
    justifyContent: "space-evenly",
  },
  aviso: {
    width: "100%",
    height: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
