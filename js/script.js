var noticias = [];

function cargarNoticias(){
    var datos = localStorage.getItem("noticias");
    if (datos!==null){
        noticias = JSON.parse(datos);
    }
}
function dibujarNoticias(){
    for(i=0;i<noticias.length;i++){

        var noticiaTemplate = $("#noticia-template").html();
        var li = $(noticiaTemplate);

        li.find("h3").text(noticias[i].titulo);
        li.find("h4").text(noticias[i].categoria);
        li.find("p").text(noticias[i].descripcion);
        li.find("img").attr("src",noticias[i].titulo);
        li.appendTo("#noticias");


        /*$("<li/>").text(noticias[i].titulo + noticias[i].descripcion + noticias[i].imagen +
                        noticias[i].categoria).appendTo("#noticias");*/
    }
}


function Noticia(id, titulo, descripcion, imagen, categoria){
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;    
    this.categoria = categoria;
}

function ordenarPorId(noti1, noti2){
    rdo = 0;
    if(noti1.id < noti2.id){
        rdo = -1;
    }
    if(noti1.id > noti2.id){
        rdo = 1;
    }
    return rdo;   
};

function ordenarAZ(noti1, noti2){
    rdo = 0;
    if(noti1.titulo < noti2.titulo){
        rdo = -1;
    }
    if(noti1.titulo > noti2.titulo){
        rdo = 1;
    }
    return rdo;        
};

function ordenarZA(noti1, noti2){
    rdo = 0;
    if(noti1.titulo < noti2.titulo){
        rdo = 1;
    }
    if(noti1.titulo > noti2.titulo){
        rdo = -1;
    }
    return rdo;        
};



function generarId(){
    var id = 0;
    var dato = localStorage.getItem("id");
    if (dato !== null){
        id = parseInt(dato)+1;
    }
    localStorage.setItem("id",id);
    return id;
}

function vincularElementos(){    
    $("#boton").click(function (){
        var id = generarId();
        var noticia = new Noticia(id,$("#titulo").val(), $("#descripcion").val(), $("#imagen").val(), 
                                    $("#categoria").val());

        if(noticia.titulo !== "" && noticia.descripcion !=="" && noticia.imagen !==""){
            
            noticias.push(noticia);

            localStorage.setItem("noticias",JSON.stringify(noticias));
        }else{
            alert("Cargar datos");
        }

        /*var titulo = $("#titulo");
        var descripcion = $("#descripcion");
        var imagen = $("#imagen");
        var categoria = $("#categoria");
        $("<li/>").text(titulo.val() + descripcion.val() + imagen.val() + categoria.val()).appendTo("#noticias");
        /*$("<li/>").text("#titulo".val() + "#descripcion".val() + "#imagen".val() 
        + "#categoria".val()).appendTo("#noticias");*/     
        var noticiaTemplate = $("#noticia-template").html();
        var li = $(noticiaTemplate);
        

        li.attr("id",id);
        li.find("h3").text(noticia.titulo);
        li.find("h4").text(noticia.categoria);
        li.find("p").text(noticia.descripcion);
        li.find("img").attr("src",noticia.imagen);
        li.appendTo("#noticias");//append agrega al final prepend agregar al principio 

        
    });
$("#id").click(function (){
    noticias.sort(ordenarPorId);    
    $("#noticias").empty();
    dibujarNoticias();
})
$("#az").click(function (){
    noticias.sort(ordenarAZ);    
    $("#noticias").empty();
    dibujarNoticias();  
})
$("#za").click(function (){
    noticias.sort(ordenarZA);    
    $("#noticias").empty();
    dibujarNoticias();
})
}

function iniciarPagina(){
    
    cargarNoticias();
    dibujarNoticias();
    vincularElementos();
}

$(document).ready(iniciarPagina);