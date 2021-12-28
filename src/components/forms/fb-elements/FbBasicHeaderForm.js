import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Grid,
  TextField,
  FormLabel,
} from '@material-ui/core';
import moment from 'moment';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import 'moment/locale/id'
import http from '../../../lib/http'


const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload }
    case 'UNSET':
      return state
    default:
      return state
  }
}


const FbBasicHeaderForm = () => {
  const [form, dispatchForm] = React.useReducer(formReducer, {
    name: "",
    location: "",
    facilitator: "",
    datetime: "",
    male_quota: 0,
    female_quota: 0
  })
  const [saved, setSaved] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const params = useParams()

  console.log(form)

  useEffect(() => {
    if (params.slug) {
      http.get(`admin/schedule/${params.slug}`).then((response) => {
        dispatchForm({type: 'SET', payload: {...response.data.data, id: response.data.data._id}})
      })
    }
  }, [params])

  function save() {
    const slug = 'kajian-'.concat(moment(form.datetime).locale('id').format('dddd-DD-MMMM-YYYY-HH-mm')).toLowerCase()
    setSaving(true)
    http.post('admin/schedule', {...form, slug}).then(() => {
      setSaved(true)
      setSaving(false)
    })
  }

  if (saved) {
    return <Navigate to="/schedules" />
  }

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Card
        sx={{
          p: 0,
        }}
      >
        

        <CardContent
          sx={{
            padding: '30px',
            width: '100%'
          }}
        >
            <Grid container sx={{width: '100%'}} spacing={3}>
              <Grid item lg={6} sm={12}>

                <FormLabel>Nama Kajian</FormLabel>
                <TextField value={form.name} fullWidth size="small" onChange={e => dispatchForm({type: 'SET', payload: {name: e.target.value}})}/>
              </Grid>
              
              <Grid item lg={6}>

                <FormLabel>Ustadz</FormLabel>
                <TextField value={form.facilitator} fullWidth size="small" onChange={e => dispatchForm({type: 'SET', payload: {facilitator: e.target.value}})}/>
              </Grid>
              
              <Grid item lg={6}>

                <FormLabel>Lokasi</FormLabel>
                <TextField value={form.location} fullWidth size="small" onChange={e => dispatchForm({type: 'SET', payload: {location: e.target.value}})}/>
              </Grid>
              
              <Grid item lg={6}>

                <FormLabel>Waktu</FormLabel>
                <TextField value={moment(form.datetime).format('YYYY-MM-DDTHH:mm')} fullWidth size="small" type="datetime-local" onChange={e => dispatchForm({type: 'SET', payload: {datetime: e.target.value}})}/>
              </Grid>
              
              <Grid item lg={6}>

                <FormLabel>Kuota Ikhwan</FormLabel>
                <TextField value={form.male_quota} fullWidth size="small" type="number" onChange={e => dispatchForm({type: 'SET', payload: {male_quota: e.target.value}})}/>
              </Grid>
              
              <Grid item lg={6}>

                <FormLabel>Kuota Akhwat</FormLabel>
                <TextField value={form.female_quota} fullWidth size="small" type="number" onChange={e => dispatchForm({type: 'SET', payload: {female_quota: e.target.value}})}/>
              </Grid>
              
              <Grid item lg={6}>

                <FormLabel>Bot Whatsapp</FormLabel>
                <TextField value={form.whatsapp_bot} fullWidth size="small" type="number" onChange={e => dispatchForm({type: 'SET', payload: {whatsapp_bot: e.target.value}})}/>
              </Grid>

            </Grid>
        </CardContent>


        <Divider />
        <Box p={3}>
          <Button
            to="/schedules"
            variant="contained"
            color="error"
            component={Link}
            sx={{
              mr: 1,
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={() => save()} disabled={saving || Object.values(form).some(item => item === "")}>
            {!saving ? "Submit" : "Saving..."}
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default FbBasicHeaderForm;
