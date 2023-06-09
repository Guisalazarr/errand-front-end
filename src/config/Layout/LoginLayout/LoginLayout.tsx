import { Grid } from '@mui/material';
import React from 'react';
import BoxGrid from '../../../components/BoxGrid';
import GridContainerLogin from './componets/GridContainerLogin';
import ContainerLayout from '../DefaultLayout/components/ContainerLayout';

interface LoginLayoutProps {
  component: React.FC;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ component: Component }) => {
  return (
    <GridContainerLogin container>
      <ContainerLayout>
        <BoxGrid item xs={12}>
          <Component />
        </BoxGrid>
      </ContainerLayout>
    </GridContainerLogin>
  );
};

export default LoginLayout;
