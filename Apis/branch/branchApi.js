const URL_API = "http://localhost:3001";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const getBranch = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/branches`);
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
const postBranch = async (datos) => {
    try {
        return await fetch(`${URL_API}/branches`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchBranch = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/branches/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
const deleteBranch = async (id) =>{

    try {
        return await fetch(`${URL_API}/branches/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
export {
    getBranch as getBranches,
    postBranch as postBranches,
    patchBranch as patchBranches,
    deleteBranch as deleteBranches
};