
var gastos = JSON.parse(localStorage.getItem('Gastos')) ?? [];


var Abrir = () => {

    RestForm();

}

var Data = () => {

    //Data atual Pré estabelecida Add
    var inputDate = document.getElementById('Data');
    var dataAtual = new Date();
    inputDate.value = dataAtual.toISOString().slice(0, 10);
    //

    //Data atual Pré estabelecida Dell
    var inputDateDell = document.getElementById('DataDell');
    var dataAtualDell = new Date();
    inputDateDell.value = dataAtualDell.toISOString().slice(0, 10);
    //

}

var Adicionar = (tipo) => {

    if (tipo === '+') {


        let newGasto = {

            "Tipo": tipo,
            "Valor": document.getElementById('Valor').value,
            "Titulo": document.getElementById('Titulo').value,
            "Data": document.getElementById('Data').value,
            "Descricao": document.getElementById('Descricao').value

        }

        Validar(newGasto);


    } else if (tipo === '-') {

        let newGasto = {

            "Tipo": tipo,
            "Valor": document.getElementById('ValorDell').value,
            "Titulo": document.getElementById('TituloDell').value,
            "Data": document.getElementById('DataDell').value,
            "Descricao": document.getElementById('DescricaoDell').value

        }

        Validar(newGasto);

    }

}

var Validar = (newGasto) => {

    let msg = '';

    if (newGasto.Valor == '') {
        msg += 'Por Favor, insira um Valor! \n'
    }

    if (newGasto.Titulo == '') {
        msg += 'Por Favor, insira um Titulo \n'
    }

    if (msg != '') {
        alert(msg)
    }

    else {

        RestForm();
        gastos.push(newGasto);
        CriarCard();
        SalvarLocal();
        console.log(gastos)

    }

}

var RestForm = () => {

    document.getElementById('Valor').value = ""
    document.getElementById('Titulo').value = ""
    document.getElementById('Descricao').value = ""

    document.getElementById('ValorDell').value = ""
    document.getElementById('TituloDell').value = ""
    document.getElementById('DescricaoDell').value = ""

    Data();
}

var CriarCard = () => {

    var Total = "";
    let main = document.getElementById('Main');
    main.innerHTML = "";

    for (i = 0; i < gastos.length; i++) {

        var classDiv = "";
        var classLi = "";

        //vereficação de tipo para aplicação de estilo e calculo do Total
        if (gastos[i].Tipo === "+") {
            var classDiv = "fs-3 fw-bold card-header CardMainADD";
            var classLi = "CardItensADD list-group-item";
            var Total = Number(Total) + Number(gastos[i].Valor);
        } else if (gastos[i].Tipo === "-") {
            var classDiv = "fs-3 fw-bold card-header CardMain";
            var classLi = "CardItens list-group-item";
            var Total = Number(Total) - Number(gastos[i].Valor);
        } else { }

        main.innerHTML = main.innerHTML +
            `
        <div class="card  my-3 " style="width: 18rem;">

        <div class="${classDiv}">
            ${gastos[i].Tipo}R$${Number(gastos[i].Valor).toFixed(2)}
        </div>

        <ul class="fs-5 fw-bold list-group list-group-flush">
            <li class="${classLi} list-group-item">${gastos[i].Titulo}</li>
            <li class="${classLi} list-group-item">${gastos[i].Data}</li>
            <li class="${classLi} list-group-item">Descrição: ${gastos[i].Descricao}</li>
            <li class="${classLi} list-group-item"><button id="btn" onclick="DellCard(${i})">
             <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" id="icon">
              <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
             </svg></button>
            </li>
        </ul>

        </div>
        `
        document.getElementById('total').innerHTML = `<h1>TOTAL: R$${Number(Total).toFixed(2)}</h1>`
    }


}

var DellCard = (index) => {

    gastos.splice(index, 1);
    CriarCard();
    SalvarLocal();

}

var SalvarLocal = () => {
    localStorage.setItem('Gastos', JSON.stringify(gastos));
}

CriarCard()
