<template>
  <q-page padding>
    <h1>Popis Knjiga</h1>
    <p>Popis svih dostupnih knjiga.</p>
    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      books: [
        { 
          id: 1, 
          naslov: 'Put oko svijeta u 80 dana', 
          autor: 'Jules Verne', 
          opis: 'Avanturistički roman o putovanju Phileasa Fogga koji pokušava obići svijet u 80 dana kako bi dobio okladu.', 
          stanje: 4 
        },
        { 
          id: 2, 
          naslov: 'Bratstvo prstena', 
          autor: 'J.R.R. Tolkien', 
          opis: 'Prva knjiga epske trilogije o ratu za Prsten i sudbinama koje ga okružuju.', 
          stanje: 5 
        },
        { 
          id: 3, 
          naslov: 'Djevojka iz vlaka', 
          autor: 'Paula Hawkins', 
          opis: 'Psihološki triler o ženi koja svjedoči nečemu jezivom dok putuje vlakom i postaje upletena u istragu.', 
          stanje: 3 
        },
        { 
          id: 4, 
          naslov: 'Alkemičar', 
          autor: 'Paulo Coelho', 
          opis: 'Inspirativna priča o mladom pastiru koji kreće na putovanje kako bi pronašao svoju osobnu legendu.', 
          stanje: 4
        },
        { 
          id: 5, 
          naslov: 'Hari Poter i Kamen mudraca', 
          autor: 'J.K. Rowling', 
          opis: 'Prvi roman o Hariju Poteru, mladom čarobnjaku koji otkriva svoje magične moći i kreće u školu čarobnjaštva.', 
          stanje: 2 
        },
        { 
          id: 6, 
          naslov: 'Ubiti pticu rugalicu', 
          autor: 'Harper Lee', 
          opis: 'Priča o odrastanju i nepravdi kroz oči djevojčice Scout u južnjačkom gradu 1930-ih.', 
          stanje: 5 
        },
        { 
          id: 7, 
          naslov: 'Don Quijote', 
          autor: 'Miguel de Cervantes', 
          opis: 'Satiričan roman o vitezu Don Quijoteu i njegovom vjernom štitonoši Sanču Panzi.', 
          stanje: 2 
        },
        { 
          id: 8, 
          naslov: 'Frankenstein', 
          autor: 'Mary Shelley', 
          opis: 'Klasična priča o znanstveniku Viktoru Frankensteinu i stvorenju koje dolazi u sukob sa svojim tvorcem.', 
          stanje: 4 
        }
      ],
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'naslov', label: 'Naslov', field: 'naslov', align: 'left' },
        { name: 'autor', label: 'Autor', field: 'autor', align: 'left' },
        { name: 'opis', label: 'Opis', field: 'opis', align: 'left' },
        { name: 'stanje', label: 'Stanje', field: 'stanje', align: 'left' }
      ]
    };
  }
};
</script>
