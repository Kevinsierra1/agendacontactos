export class NavMenu extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
      <style rel="stylesheet">
        @import "./App/Components/navMenu/menuStyle.css";
      </style>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="#" data-verocultar='["countries"]'>Countries</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#" data-verocultar='["cities"]'>Cities</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#" data-verocultar='["regions"]'>Regions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#" data-verocultar='["companies"]'>Companies</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#" data-verocultar='["branches"]'>Branches</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#" data-verocultar='["contactos"]'>Contactos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-verocultar='["citas"]'>Citas contactos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>        
    `;

    this.querySelectorAll(".nav-link").forEach((val) => {
      val.addEventListener("click", (e) => {
        const data = JSON.parse(e.target.dataset.verocultar);
        let mainContent = document.querySelector("#mainContent");
        mainContent.innerHTML = "";

        switch (data[0]) {
          case "countries":
            mainContent.innerHTML = "<countries-component></countries-component>";
            break;
          case "cities":
            mainContent.innerHTML = "<cities-component></cities-component>";
            break;
          case "regions":
            mainContent.innerHTML = "<regions-component></regions-component>";
            break;
          case "companies":
            mainContent.innerHTML = "<companies-component></companies-component>";
            break;
          case "branches":
            mainContent.innerHTML = "<branches-component></branches-component>";
            break;
          case "contactos":
            mainContent.innerHTML = "<contacto-component></contacto-component>";
            break;
          default:
            mainContent.innerHTML = "<h3>Sección no encontrada</h3>";
        }

        e.stopImmediatePropagation();
        e.preventDefault();
      });
    });
  }
}

customElements.define("nav-menu", NavMenu);