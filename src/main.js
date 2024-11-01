import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

library.add(faCopy);
library.add(faTrash); 
library.add(faQuoteLeft); 
library.add(faQuoteRight);
library.add(faTwitterSquare);


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
