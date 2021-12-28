import React from 'react';
import { Grid } from '@material-ui/core';
import {
  FbBasicHeaderForm,
} from '../../components/forms/fb-elements/index';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/schedules',
    title: 'Jadwal',
  },
  {
    title: 'Buat/Edit Jadwal',
  },
];

const CreateSchedule = () => (
  <PageContainer title="Buat/Edit Jadwal" description="this is innerpage">
    {/* breadcrumb */}
    <Breadcrumb title="Buat/Edit Jadwal" items={BCrumb} />
    {/* end breadcrumb */}
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <FbBasicHeaderForm />
      </Grid>
      
    </Grid>
  </PageContainer>
);

export default CreateSchedule;
