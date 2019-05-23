web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidatos","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votosRecebidos","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidato","type":"bytes32"}],"name":"validarCandidato","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidato","type":"bytes32"}],"name":"listarVotosPara","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidato","type":"bytes32"}],"name":"votarNoCandidato","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"nomes","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
Contrato = web3.eth.contract(abi)
copiaDoContratoSubmetido = Contrato.at('0xa342e4617b91770d32f733ba88e1fed0be013eca');
candidatos = {"Fernando Haddad - PT":"candidato-1", "Jair Bolsonaro - PSL":"candidato-2"}

function votarNoCandidato(candidato) {
  nome = candidato.value;
  try {
    copiaDoContratoSubmetido.votarNoCandidato(nome, {from: web3.eth.accounts[0]}, function() {
      let div_id = candidatos[nome];
      $("#" + div_id).html(copiaDoContratoSubmetido.listarVotosPara.call(nome).toString());
    });
      $("#candidato").val("");
  } catch (err) {
    alert(err.toString);
  }
  
}


$(document).ready(function() {
  nomes = Object.keys(candidatos);
  for (var i = 0; i < nomes.length; i++) {
    let nome = nomes[i];
    let val = copiaDoContratoSubmetido.listarVotosPara.call(nome).toString()
    $("#" + candidatos[nome]).html(val);
  }
});




