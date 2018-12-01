let app = {
    init:function(){
        this.addEvents();
    },
    addEvents= function(){
        fetch("/serie")
            .then(res=>res.json())
            .then(data=>{
                let series=document.getElementsByClassName("series")[0];
                series.innerHTML = data.reduce((cadena, element)=>{
                    return cadena +
                        `<tr>
                            <td class="id">${element.id}</td>
                            <td class="name">${element.nombre}</td>
                            <td class="genero">${element.genero}</td>
                            <td class="capitulos">${element.capitulos}</td>
                            <td class="options">
                                <a class="edit"><i class="fas fa-edit"></i></a>
                                <a class="delete"><i class="fas fa-minus-circle"></i></a>
                            </td>
                            `
                })
            })
    }
}