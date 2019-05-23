pragma solidity ^0.4.18;

contract Eleicao {
    
    mapping (bytes32 => uint8)

    public votosRecebidos;

    bytes32[] public candidatos;

    constructor(bytes32[] nomes) public {
        candidatos = nomes;
    }

    function listarVotosPara(bytes32 candidato) view public returns (uint8) {
        require(validarCandidato(candidato));
        return votosRecebidos[candidato];
    }

    function votarNoCandidato(bytes32 candidato) public {
        require(validarCandidato(candidato));
        votosRecebidos[candidato]++;
    }

    function validarCandidato(bytes32 candidato) view public returns (bool) {
        for(uint i = 0; i < candidatos.length; i++)
            if (candidatos[i] == candidato) return true;
        return false;
    }

}
