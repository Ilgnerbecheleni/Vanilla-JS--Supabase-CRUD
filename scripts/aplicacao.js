var card = document.getElementById('cards');
var btnsalvar = document.getElementById('salvar');
var form = document.getElementById('form');
var atualiza = false;


async function loadData() {

    const { data, error } = await _supabase.from('Contatos').select(); // faz o select na tabela

    console.table(data);
    console.log(error);



    data.map((item) => {

        var div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('m-4');
        div.classList.add('cardwidth');
        div.innerHTML = ` 
    
    <div class="card-body">
        <h5 class="card-title">${item.Nome}</h5>
        <h5 class="card-text">${item.Telefone}</h5>
        <button class="btn btn-primary" onclick='update(${item.id})'>Editar</button>
        <button class="btn btn-danger" onclick='deleteData(${item.id})'>Apagar</button>
    </div>
`
        card.appendChild(div);


    })


}

loadData();

form.addEventListener('submit', (e) => {

    e.preventDefault();
    let id = form.userId.value;
    let nome = form.nome.value;
    let telefone = form.telefone.value;



    if (atualiza) {
        dados = { id: id, Nome: nome, Telefone: telefone };
        updateData(dados);
        atualiza = false;
        btnsalvar.classList.toggle('btn-primary');
        btnsalvar.classList.toggle('btn-success');
        btnsalvar.innerText = "Salvar";
    } else {
        dados = { Nome: nome, Telefone: telefone };
        insertData(dados);
    }


    form.reset();
})


async function insertData(dados) {
    const { data, error } = await _supabase.from('Contatos').insert(dados);
    console.log(data);
    console.log(error);

    window.location.reload();
}

async function update(id) {

    atualiza = true;
    btnsalvar.classList.toggle('btn-primary');
    btnsalvar.classList.toggle('btn-success');
    btnsalvar.innerText = "Atualizar";


    const { data, error } = await _supabase.from('Contatos').select().eq('id', id); // faz o select na tabela

    console.log(error)
    console.log(data.Nome)
    if (!error) {
        data.map((item => {
            form.userId.value = item.id
            form.nome.value = item.Nome;
            form.telefone.value = item.Telefone;
        }))
    }

}

async function updateData(dados) {

    const { data, error } = await _supabase
        .from('Contatos')
        .update(dados)
        .eq('id', dados.id)

    window.location.reload();

}


async function deleteData(id) {




    resposta = confirm('deseja apagar contato?')
    if (resposta) {
        const { data, error } = await _supabase
            .from('Contatos')
            .delete(id)
            .eq('id', id)

        console.log(error)
    }
    window.location.reload();

}


