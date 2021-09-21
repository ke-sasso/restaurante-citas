import React, { useState } from 'react';
import {
    SafeAreaView, Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView, FlatList
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';
import colors from './src/utils/colors';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

   
const Formulario = ({ citas, setCitas, guardarMostrarForm, guardarCitasStorage }) => {
    //variables para el formulario

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [area, guardarArea] = useState({value:'NO'});
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };
    // Muestra u oculta el Time Picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
        guardarHora(hora.toLocaleString('es-ES', opciones));
        hideTimePicker();
    };
    // Crear nueva cita
    const crearNuevaCita = () => {
        // Validar
        if (paciente.trim() === '' ||
            propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ) {
            // Falla la validación
            console.log(area)
            mostrarAlerta();
            return;
        }
        // Crear una nueva cita
        const cita = { paciente, propietario, telefono, fecha, hora,area };
        cita.id = shortid.generate();
        // console.log(cita);
        // Agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);
        // Pasar las nuevas citas a storage
        guardarCitasStorage(JSON.stringify(citasNuevo));
        // Ocultar el formulario
        guardarMostrarForm(false);
        // Resetear el formulario
        guardarPropietario('');
        guardarPaciente('');
        guardarHora('');
        guardarFecha('');
        guardarTelefono('');
        guardarArea('');
    }
    // Muestra la alerta si falla la validación
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', // Titulo
            'Todos los campos son obligatorios', // mensaje
            [{
                text: 'OK' // Arreglo de botones
            }]
        )
    }
    var radio_props = [
        {label: 'NO', value: 'NO' },
        {label: 'SI', value: 'SI' }
      ];
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Cantidad de personas:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPropietario(texto)}
                        keyboardType="numeric"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Area de fumadores?</Text>
                   <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => {guardarArea({value:value})}}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora de reservación:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()}
                        style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>GUARDAR</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Formulario;