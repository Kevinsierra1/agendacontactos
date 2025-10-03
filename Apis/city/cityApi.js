const URL_API = "http://localhost:3001";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const getCity = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/contacts`);
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
		} else if(respuesta.status === 401){
            console.log('La url no es correcta');
		} else if(respuesta.status === 404){
            console.log('El el contacto  no existe');
		} else {
            console.log('Se presento un error en la peticion consulte al Administrador');
		} 
	} catch(error){
        console.log(error);
	}
    
}
const postCity = async (datos) => {
    try {
        return await fetch(`${URL_API}/contacts`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchCity = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/contacts/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
const deleteCity = async (id) =>{

    try {
        return await fetch(`${URL_API}/contacts/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
export {
    getCity as getCities,
    postCity as postCities,
    patchCity as patchCities,
    deleteCity as deleteCities
};