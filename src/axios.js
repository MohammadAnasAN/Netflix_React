import axios from 'axios';
import {baseUrl} from './constantsFile/constants'
// import { getDefaultNormalizer } from '@testing-library/react';

const instance = axios.create({
    baseURL: baseUrl,
    
  });

  export default instance;