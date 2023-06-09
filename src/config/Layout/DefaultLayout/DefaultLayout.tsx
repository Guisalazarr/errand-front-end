import { Grid } from '@mui/material';
import React from 'react';
import ResponsiveAppBar from '../../../components/ResponsiveAppBar';
import BoxGrid from '../../../components/BoxGrid';
import ContainerLayout from './components/ContainerLayout';

interface DefaultLayoutProps {
  component: React.FC;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ component: Component }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ResponsiveAppBar />
      </Grid>

      <Grid item xs={12}>
        <ContainerLayout>
          <BoxGrid item xs={12}>
            <Component />
          </BoxGrid>
        </ContainerLayout>
      </Grid>
    </Grid>
  );
};

export default DefaultLayout;
