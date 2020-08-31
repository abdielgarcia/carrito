var portafolio = function() {
    const inicio = document.getElementById('inicio');
    const nombreUsuario = document.getElementById('nombre-usuario');
    const imgUsuario = document.getElementById('img-usuario');
    const profesion = document.getElementById('profesion');
    const contenedorDetallePortafolio = document.getElementById('contenedor-detalle-portafolio');
    const contenedorModals = document.getElementById('contenedor-modals');
    ListarDetallePortafolio();

    function ListarPortafolio() {

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("GET", '/productos', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("token", localStorage.getItem('token'));

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                debugger;
                console.log(xhr.response);
                inicio.innerText = xhr.response.usuario.nombre;
                nombreUsuario.innerText = xhr.response.usuario.nombre;
                imgUsuario.src = xhr.response.usuario.img;
                profesion.innerText = xhr.response.usuario.profesion;
                ListarDetallePortafolio(xhr.response.portafolios[0].usuario);

            }
        }
        xhr.send();
    }

    function ListarDetallePortafolio() {

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        let url = `/productos`;
        xhr.open("GET", url, true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

                InsertarDetallePortafolio(xhr.response.productos);
            }
        }
        xhr.send();
    }


    //Inserta curso en el DOM del carrito
    function InsertarDetallePortafolio(detallesPortafolio) {

        detallesPortafolio.forEach(function(detalle, index) {

            let div = document.createElement('div');
            div.classList = "col-md-6 col-lg-4 mb-5";
            div.innerHTML += `    
                    
                        <div class="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal${index+1}">
                            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid imgPrincipal" src=${detalle.imgPrincipal} alt="" title="" />
                            <figcaption class="p-4 card-img-bottom">
                            <h2 class="h5 font-weight-bold mb-2 font-italic">${detalle.nombre}</h2>
                            <p class="mb-0 text-small text-dark font-weight-bold"> ₡ ${new Intl.NumberFormat().format(detalle.precioVenta)}</p>
                          </figcaption>
                        </div>  
                        
                        `
            contenedorDetallePortafolio.appendChild(div);




            let divModal = document.createElement('div');
            divModal.classList = "portfolio-modal modal fade";
            divModal.id = `portfolioModal${index+1}`;
            divModal.setAttribute("tabindex", "-1");
            divModal.setAttribute("role", "dialog");
            divModal.setAttribute("aria-labelledby", `portfolioModal${index+1}Label`);
            divModal.setAttribute("aria-hidden", "true");

            divModal.innerHTML += `  <div class="modal-dialog modal-xl" role="document">
                            <div class="modal-content">
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"><i class="fas fa-times"></i></span>
                                    </button>
                                <div class="modal-body text-center">
                                    <div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-lg-8">
                                                <!-- Portfolio Modal - Title-->
                                                <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0" id=portfolioModal${index+1}Label">${detalle.nombre}</h2>
                                                <!-- Icon Divider-->
                                                <div class="divider-custom">
                                                    <div class="divider-custom-line"></div>
                                                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                                    <div class="divider-custom-line"></div>
                                                </div>
                                                <!-- Portfolio Modal - Image-->
                                                <a title="${detalle.nombre}" href=${detalle.link}  target="_blank"> <img class="img-fluid rounded mb-5" src=${detalle.imgPrincipal} alt="" /></a>
                                                <!-- Portfolio Modal - Text-->
                                                <p class="mb-5">${detalle.descripcion}</p>
                                                <button class="btn btn-primary" data-dismiss="modal">
                                                        <i class="fas fa-times fa-fw"></i>
                                                       Cerrar
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  
                        `
            contenedorModals.appendChild(divModal);

        });



    }



    //return an object that represents our new module
    return {
        listarPortafolio: ListarPortafolio,
        listarDetallePortafolio: ListarDetallePortafolio
    }
}(); //← This is called a immediately invoked function definition,   
// or IIFE