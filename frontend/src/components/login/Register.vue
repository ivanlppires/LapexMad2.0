<template>
    <v-form @submit.prevent class="pa-5">
        <v-row>
            <v-col cols="12" sm="6" class="pa-1">
                <v-text-field type="text" variant="underlined" prepend-inner-icon="mdi-account" label="Nome"
                    clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
                <v-text-field type="text" variant="underlined" prepend-inner-icon="mdi-account" label="Sobrenome"
                    clearable></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" class="pa-1">
                <v-text-field type="email" variant="underlined" prepend-inner-icon="mdi-email" label="Email"
                    clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
                <v-text-field type="date" variant="underlined" prepend-inner-icon="mdi-account" label="Data de Nascimento"
                    clearable></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" class="pa-1">
                <v-select clearable label="Gênero" prepend-inner-icon="mdi-human-male"
                    :items="['Masculino', 'Feminino', 'Outro']" variant="underlined"></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
                <v-select clearable label="Nacionalidade" prepend-inner-icon="mdi-earth"
                    :items="['Masculino', 'Feminino', 'Outro']" variant="underlined"></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" class="pa-1">
                <v-text-field type="password" variant="underlined" label="Digite a senha"
                    prepend-inner-icon="mdi-key"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
                <v-text-field type="password" variant="underlined" label="Repita a senha"
                    prepend-inner-icon="mdi-key"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="12" class="pa-0">
                <v-btn class="ma-0 pa-0" color="teal-darken-4" block type="submit" rounded="0">Cadastrar</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>