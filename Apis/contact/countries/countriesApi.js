
const URL_API = "http://localhost:3000/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});


const getPaises = async() => {
    try {
        const respuesta = await fetch(`${URL_API}paises`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Países obtenidos:', datos);
            return datos;
        } else {
            console.error('Error al obtener países:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getPaises:', error);
        return [];
    }
}

const postPais = async (datos) => {
    try {
        console.log('Enviando país:', datos);
        const response = await fetch(`${URL_API}paises`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('País guardado exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST país:', error);
        throw error;
    }
}

const patchPais = async (datos, id) => {
    try {
        console.log('Actualizando país:', id, datos);
        const response = await fetch(`${URL_API}paises/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('País actualizado:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH país:', error);
        throw error;
    }
}

const deletePais = async (id) => {
    try {
        console.log('Eliminando país:', id);
        const response = await fetch(`${URL_API}paises/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('País eliminado:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE país:', error);
        throw error;
    }
}
export {
    getPaises,
    postPais,
    patchPais,
    deletePais
};
