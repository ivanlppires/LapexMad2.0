<template>
    <page-text :icon="icon" :title="title" :subtitle="subtitle" :text="text" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PageText from '@/components/pages/PageText.vue'
const title = ref("Lei Geral de Proteção de Dados");
const icon = ref("mdi-shield-check");
const subtitle = ref("Conheça a política de LGPD sobre os dados apresentados e coletados neste sistema online.");
const text = ref([
    "Política de privacidade: O sistema deve ter uma política de privacidade clara e concisa que informa aos usuários quais informações pessoais são coletadas, como são utilizadas e compartilhadas, e como são armazenadas e protegidas.",
    "Consentimento: O sistema deve obter o consentimento explícito do usuário antes de coletar, processar ou compartilhar seus dados pessoais. Esse consentimento deve ser específico, informado e livre.",
    "Direitos do titular dos dados: O sistema deve informar aos usuários seus direitos como titulares dos dados, incluindo o direito de acessar, corrigir, excluir e limitar o processamento de seus dados pessoais. Deve haver um mecanismo para que os usuários possam exercer esses direitos.",
    "Encarregado de proteção de dados: O sistema deve designar um Encarregado de Proteção de Dados (DPO) se o processamento de dados envolver dados pessoais em grande escala.",
    "Notificação de violações de dados: O sistema deve estabelecer procedimentos para notificar os usuários e a Autoridade Nacional de Proteção de Dados (ANPD) sobre violações de dados no prazo estabelecido na lei.",
    "Treinamento de funcionários: Os funcionários que lidam com dados pessoais devem ser treinados sobre a LGPD e sobre suas responsabilidades em relação à proteção de dados pessoais.",
    "Fornecedores de serviços terceirizados: Se o sistema utilizar serviços de terceiros que processem dados pessoais em seu nome, deve garantir que esses fornecedores estejam em conformidade com a LGPD.",
    "Ao implementar essas medidas, o sistema pode garantir que está cumprindo as disposições da LGPD e protegendo adequadamente os dados pessoais dos usuários. Além disso, a política de privacidade deve ser facilmente acessível e claramente visível no sistema."
]);
</script>