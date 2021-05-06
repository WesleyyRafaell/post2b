export default function loadLists() {
  return [
    {
      title: 'todo',
      newTask: true,
      cards: [
        {
          id: 1,
          content: 'Estudar módulo 01 de NodeJS',
        },
        {
          id: 2,
          content: 'Criar vídeo para o Youtube ensinando a recriar a interface do Pipefy',
        },
        {
          id: 3,
          content: 'Estudar módulo 03 de React Native',
        },
        {
          id: 4,
          content: 'Gravar Aula "NextJS: Utilizando server-side rendering com ReactJS"',
        },
        {
          id: 5,
          content: 'Gravar testes e deploy ReactJS',
        },
      ]
    },
    {
      title: 'doing',
      newTask: false,
      cards: [
        {
          id: 6,
          content: 'Recriando clone do Pipe'
        }
      ]
    },
    {
      title: 'done',
      newTask: false,
      cards: [
        {
          id: 7,
          content: 'Gravar sobre Geolocalização e mapas com React Native',
        },
        {
          id: 8,
          content: 'Gravar testes e deploy ReactJS',
        },
        {
          id: 9,
          content: 'Ajustes na biblioteca unform',
        }
      ]
    },
  ];
}