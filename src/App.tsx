import React from 'react';
import { SimpleForm} from './modules/HomeModule/components/SimpleForm';
import { ImageComponent } from './modules/HomeModule/components/ImageComponent';

const App: React.FC = () => (
  <>
    <SimpleForm>
      <ImageComponent src="/nx logo.png" />
    </SimpleForm>
  </>
);

export default App;
