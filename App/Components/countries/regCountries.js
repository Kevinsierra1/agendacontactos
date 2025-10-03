import { postCountries, patchCountries, deleteCountries } from '../../../Apis/country/countryApi.js';
import CountryModel from '../../../Models/countryModel.js';

export class RegCountry extends HTMLElement {
  constructor() {
    super();
    this._current = { ...CountryModel }; // Initialize with a fresh copy of the model
    this.render();
    this.cache();
    this.wire(); // Wire up event listeners
    this.lock(); // Initial lock, though disableFrm will handle button states
  }

  // Caches important DOM elements for later use
  cache() {
    this.form = this.querySelector('#frmCountry');
    this.idViewSpan = this.querySelector('#idView');
    this.nameInput = this.form.elements['name']; // Access input by name
    this.btnNuevo = this.querySelector('#btnNuevo');
    this.btnGuardar = this.querySelector('#btnGuardar');
    this.btnCancelar = this.querySelector('#btnCancelar');
    // Add edit/delete buttons if they exist in the UI for this component
    this.btnEditar = this.querySelector('#btnEditar'); // Assuming an #btnEditar exists for editing
    this.btnEliminar = this.querySelector('#btnEliminar'); // Assuming an #btnEliminar exists for deleting
  }

  // Wires up all event listeners
  wire() {
    this.btnNuevo.addEventListener('click', this.handleNuevoClick.bind(this));
    this.btnCancelar.addEventListener('click', this.handleCancelarClick.bind(this));
    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // Assuming these buttons exist in the DOM or will be added
    if (this.btnEditar) {
      this.btnEditar.addEventListener('click', this.handleEditClick.bind(this));
    }
    if (this.btnEliminar) {
      this.btnEliminar.addEventListener('click', this.handleDeleteClick.bind(this));
    }
  }

  // Initial lock for buttons and form fields
  lock() {
    this.disableFrm(true); // Disable form fields
    this.updateButtonStates({ nuevo: false, guardar: true, cancelar: true, editar: true, eliminar: true });
  }

  render() {
    this.innerHTML = /* html */ `
      <style>@import "./App/Components/countries/countriesStyle.css";</style>
      <div class="card mt-3">
        <div class="card-header">Registro de Countries <span id="idView"></span></div>
        <div class="card-body">
          <form id="frmCountry">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input class="form-control" name="name" required />
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-primary" id="btnNuevo" type="button">Nuevo</button>
              <button class="btn btn-success" id="btnGuardar" type="submit" disabled>Guardar</button>
              <button class="btn btn-secondary" id="btnCancelar" type="button" disabled>Cancelar</button>
              <!-- Add Edit and Delete buttons if they are part of this component's UI -->
              <!-- <button class="btn btn-warning" id="btnEditar" type="button" disabled>Editar</button> -->
              <!-- <button class="btn btn-danger" id="btnEliminar" type="button" disabled>Eliminar</button> -->
            </div>
          </form>
        </div>
      </div>
    `;
  }

  resetIdView() {
    this.idViewSpan.innerHTML = '';
  }

  viewData(id) {
    this.idViewSpan.innerHTML = id;
  }

  disableFrm(estado) {
    this.nameInput.disabled = estado;
    if (estado) {
      // Clear form when disabling
      this.nameInput.value = '';
    } else {
      // Populate with current data if available, or empty for new
      this.nameInput.value = this._current.name || '';
    }
  }

  updateButtonStates(states) {
    if (this.btnNuevo) this.btnNuevo.disabled = states.nuevo;
    if (this.btnGuardar) this.btnGuardar.disabled = states.guardar;
    if (this.btnCancelar) this.btnCancelar.disabled = states.cancelar;
    if (this.btnEditar) this.btnEditar.disabled = states.editar;
    if (this.btnEliminar) this.btnEliminar.disabled = states.eliminar;
  }

  // Event Handlers
  handleNuevoClick() {
    this.resetIdView();
    this._current = { ...CountryModel }; // Reset current data for a new entry
    this.disableFrm(false); // Enable form fields
    this.updateButtonStates({ nuevo: true, guardar: false, cancelar: false, editar: true, eliminar: true });
  }

  handleCancelarClick() {
    this.resetIdView();
    this._current = { ...CountryModel }; // Clear current data
    this.disableFrm(true); // Disable form fields and clear them
    this.updateButtonStates({ nuevo: false, guardar: true, cancelar: true, editar: true, eliminar: true });
  }

  handleFormSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    this.saveData();
  }

  handleEditClick() {
      this.editData();
  }

  handleDeleteClick() {
      this.delData();
  }


  // Data operations
  saveData() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    postCountries(data)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
        }
      })
      .then(responseData => {
        console.log('Country saved:', responseData);
        this._current = responseData; // Update current data with saved data
        this.viewData(responseData.id); // Display the new ID
        this.disableFrm(true); // Disable form after saving
        this.updateButtonStates({ nuevo: false, guardar: true, cancelar: true, editar: false, eliminar: false }); // Enable edit/delete
        // Optionally, emit an event to notify other components of the change
      })
      .catch(error => {
        console.error('Error saving country:', error.message);
      });
  }

  editData() {
    const formData = new FormData(this.form);
    const datos = Object.fromEntries(formData.entries());
    const id = this.idViewSpan.textContent;

    if (!id) {
        console.warn('No ID available for editing.');
        return;
    }

    patchCountries(datos, id)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error en la solicitud PATCH: ${response.status} - ${response.statusText}`);
        }
      })
      .then(responseData => {
        console.log('Country updated:', responseData);
        this._current = responseData;
        this.disableFrm(true); // Disable form after saving
        this.updateButtonStates({ nuevo: false, guardar: true, cancelar: true, editar: false, eliminar: false });
      })
      .catch(error => {
        console.error('Error updating country:', error.message);
      });
  }

  delData() {
    const id = this.idViewSpan.textContent;

    if (!id) {
        console.warn('No ID available for deletion.');
        return;
    }

    deleteCountries(id)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error en la solicitud DELETE: ${response.status} - ${response.statusText}`);
        }
      })
      .then(() => {
        console.log('Country deleted successfully.');
        this.resetIdView();
        this._current = { ...CountryModel }; // Clear current data
        this.disableFrm(true); // Disable form and clear
        this.updateButtonStates({ nuevo: false, guardar: true, cancelar: true, editar: true, eliminar: true }); // Reset buttons
      })
      .catch(error => {
        console.error('Error deleting country:', error.message);
      });
  }
}

customElements.define("reg-country", RegCountry);