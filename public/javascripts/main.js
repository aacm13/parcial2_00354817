let app = {
init: function () {
    this.addEvents();
},
addEvents: function () {
    let loadContent = function () {
        fetch("/serie")
            .then(res => res.json())
            .then(data => {
                let series = document.getElementsByClassName("series")[0];

                series.innerHTML = data.reduce((cadena, element) => {
                    return cadena +
                        ` <tr>
                            <td class="id">${element.id}</td>
                            <td class="name">${element.nombre}</td>
                            <td class="genero">${element.genero}</td>
                            <td class="capitulos">${element.capitulos}</td>
                            <td class="options"> 
                                <a class="edit" href=""><i class="fas fa-edit"></i></a>
                                <a class="delete" href=""><i class="fas fa-minus-circle"></i></a>
                            </td>
                        </tr>`
                }, "");

                document.querySelectorAll(".edit").forEach(element => {
                    element.addEventListener('click', function (evnt) {
                        evnt.preventDefault();
                        let id = this.parentElement // td
                            .parentElement // tr
                            .getElementsByClassName("id")[0]
                            .innerText;
                            fetch('/serie/' + id, {
                                method: 'POST',
                                body: new URLSearchParams(new FormData(form))
                            }).then(res => res.json())
                            .then(data => {
                                loadContent();
                            });
                    });
                });

                document.querySelectorAll(".delete").forEach(element => {
                    element.addEventListener('click', function (evnt) {
                        evnt.preventDefault();
                        let id = this.parentElement // td
                            .parentElement // tr
                            .getElementsByClassName("id")[0]
                            .innerText;
                        fetch('/serie/delete/' + id)
                            .then(res => res.json())
                            .then(function (data) {
                                alert('Serie eliminada');
                                loadContent();
                            });
                    });
                });
            });
    }
    let form = document.forms.saveSerie;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        fetch(form.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(form))
            }).then(res => res.json())
            .then(data => {
                loadContent();
            });
    });

    loadContent();
}
};
window.onload = () => app.init();