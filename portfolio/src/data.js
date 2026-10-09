// Edite apenas este arquivo para trocar textos, projetos e links.
import tomaStudyLogo from "./assets/tomastudylogo.png";
import tomaStudy1 from "./assets/tomastudy1.png";
import tomaStudy2 from "./assets/tomastudy2.png";
import tomaStudy3 from "./assets/tomastudy3.png";
import tomaStudy4 from "./assets/tomastudy4.png";
import tomaStudy5 from "./assets/tomastudy5.png";
import tomaStudy6 from "./assets/tomastudy6.png";
import tomaStudy7 from "./assets/tomastudy7.png";
import tomaStudy8 from "./assets/tomastudy8.png";
import tomaStudy9 from "./assets/tomastudy9.png";
import maenduavLogo from "./assets/maenduavlogo.png";
import maenduav1 from "./assets/maenduav1.png";
import maenduav2 from "./assets/maenduav2.png";
import maenduav3 from "./assets/maenduav3.png";
import maenduav4 from "./assets/maenduav4.png";
import cidadeVivaLogo from "./assets/cidadevivalogo.png";
import cidadeViva1 from "./assets/cidadeviva1.png";
import cidadeViva2 from "./assets/cidadeviva2.png";
import cidadeViva3 from "./assets/cidadeviva3.png";
import cidadeViva4 from "./assets/cidadeviva4.png";

export const profile = {
  name: "Arthur Ítalo, CodesArth",
  role: "Desenvolvedor Fullstack",
  headline: "Construo aplicações modernas e eficientes.",
  about:
    "Desenvolvedor fullstack com experiência em criar sites e aplicações mobile, usando tecnologias para desenvolver front-end e back-end.",
  email: "arthuritalocorporativo@gmail.com",
  links: [
    { label: "GitHub", url: "https://github.com/CodesArth" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/arthur-ítalo-santos-oliveira-434445406" },
  ],
};

export const skills = ["JavaScript", "React", "HTML & CSS", "Git", "React Native", "Firebase", "Supabase"];

export const projects = [
  {
    title: "TomaStudy!",
    status: "Completo / Em atualização",
    description: "O TomaStudy! é um aplicativo focado em estudos na área de programação, contando com um sistema de método pomodoro com notificação para estudo mais focado, dessa forma facilitando o acesso ao estudo de forma prática e interativa, incentivando públicos de todas as idades a começarem seus estudos na área da programação de forma rápida, interativa e gratuita.",
    logo: tomaStudyLogo,
    images: [
      tomaStudy1,
      tomaStudy2,
      tomaStudy3,
      tomaStudy4,
      tomaStudy5,
      tomaStudy6,
      tomaStudy7,
      tomaStudy8,
      tomaStudy9,
    ],
    tags: ["JavaScript", "HTML", "CSS", "Firebase", "FIGMA", "ReactNative"],
    demo: "https://exemplo.com",
    repo: "https://github.com/seu-usuario/projeto-1",
  },
  {
    title: "Avaliação Mercure Maendu",
    status: "Completo (em uso)",
    description: "O site de avaliação para o restaurante Maendú, do hotel Mercure em Maceió AL tem o intuito de facilitar o controle relacionado às necessidades do restaurante/cozinha de acordo com a visão e experiência do mais importante avaliador, o cliente.",
    logo: maenduavLogo,
    images: [maenduav1, maenduav2, maenduav3, maenduav4],
    tags: ["React", "CSS", "HTML", "Firebase"],
    demo: "",
    repo: "https://github.com/seu-usuario/projeto-2",
  },
  {
    title: "Cidade Viva",
    status: "Em desenvolvimento",
    description: "Cidade viva é um aplicativo pensado para facilitar o registro e o acompanhamento de problemas urbanos. O morador utiliza o celular para fotografar uma ocorrência, informar detalhes e enviar a localização para que outros moradores possam evitar um caminho obstruído, uma localização perigosa, uma obra em andamento entre outros.",
    logo: cidadeVivaLogo,
    images: [cidadeViva1, cidadeViva2, cidadeViva3, cidadeViva4],
    tags: ["ReactNative", "FIGMA", "CSS", "HTML", "JavaScript"],
    demo: "",
    repo: "https://github.com/seu-usuario/projeto-3",
  },
];
