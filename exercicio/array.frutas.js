
// 1

const numeros = [2, 5, 10, 20];
const dobro = numeros.map(functio (numero => numero * 2) );

console.log(dobro);


const precosString = ["R$ 10.00", "R$ 25.50", "R$ 75.90"];

// 2 Faz a limpeza e a conversão direto no retorno da arrow function

const precosNumeros = precosString.map(preco => parseFloat(preco.replace("R$ ", "")));

console.log(precosNumeros); // [10, 25.5, 75.9]

const usuarios = [
    { id: 1, nome: "Aline", idade: 25 },
    { id: 2, nome: "Bruno", idade: 30 },
    { id: 3, nome: "Carla", idade: 22 }
  ];
  
  // 3 Mapeia cada item: 'usuario' extraindo apenas o 'usuario.nome'

  const minhasRedes = [
    { rede: "github", usuario: "TiciMilfont" },
    { rede: "linkedin", usuario: "in/ticimilfont" }, // exemplo caso mude
    { rede: "instagram", usuario: "ticimilfont" }
  ];
  
  // O .map() acessa as duas propriedades de cada objeto para montar a URL
  const linksFinais = minhasRedes.map(item => `https://${item.rede}.com/${item.usuario}`);
  
  console.log(linksFinais);
  /*
  Resultado:
  [
    "https://github.com/TiciMilfont",
    "https://linkedin.com/in/ticimilfont",
    "https://instagram.com/ticimilfont"
  ]
  */
  