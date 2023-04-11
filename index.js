
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
        </ul>

        </div>
        `
        document.getElementById('total').innerHTML = `<h1>TOTAL: R$${Number(Total).toFixed(2)}</h1>`
    }


}

var SalvarLocal = () => {
    localStorage.setItem('Gastos', JSON.stringify(gastos));
}

CriarCard()
