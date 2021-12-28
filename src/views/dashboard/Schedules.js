import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  TableHead,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  TableContainer,
  Button,
} from '@material-ui/core';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import http from '../../lib/http';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Jadwal Kajian',
  },
];

const Schedules = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [schedules, setSchedules] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [page, setPage] = React.useState(0)

  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function fetchSchedules() {
    http.get('admin/schedules', {params: {
        page: page+1,
        per_page: rowsPerPage
    }}).then((response) => {
        setSchedules(response.data.data)
        setTotal(response.data.meta.total)
    }).catch(() => {
      window.location.href = '/auth/login'
    })
  }

  React.useEffect(() => {
    if (schedules.length > 0)
        setSchedules([])
    fetchSchedules()
  }, [page, rowsPerPage])

  const deleteRow = (_id) => {
    if (window.confirm("Hapus?"))
    http.delete(`admin/schedule/${_id}`).then(() => {
      fetchSchedules()
    })
  }

  const copyId = (_id) => {
    navigator.clipboard.writeText(_id).then(() => {
      window.alert("Berhasil disalin : ".concat(_id))
    }, (err) => {
      console.error('Async: Could not copy text: ', err);
    });
  }

  return (
    <PageContainer title="Jadwal Kajian" description="this is Pagination Table page">
      {/* breadcrumb */}
      <Breadcrumb title="Jadwal Kajian" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>

        <CardContent>
          <Button variant="contained" component={Link} to="/schedule/create">
              <Typography variant="body2">Buat Jadwal</Typography>
          </Button>

        </CardContent>
        <CardContent>
          <Box
            sx={{
              overflow: {
                xs: 'auto',
                sm: 'unset',
              },
            }}
          >
            <TableContainer>
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Nama</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Ustadz</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Waktu</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Lokasi</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">Kuota</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Status</Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="h5">Opsi</Typography>
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((row, index) => (
                  <TableRow key={index.toString()}>
                    <TableCell>
                      <Link to={`/${row.slug}/users`}>
                        <Typography color="textPrimary" variant="h5">{row.name}</Typography>
                      </Link>
                    </TableCell>
                    
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.facilitator}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {moment(row.datetime).format('DD-MM-YYYY, HH:mm')}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.location}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h6">
                        Ikhwan {row.male_taken}/{row.male_quota}<br/>
                        Akhwat {row.female_taken}/{row.female_quota}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          backgroundColor:
                          new Date(row.datetime) >= new Date
                              ? (theme) => theme.palette.success.light
                              : row.status === 'Pending',
                          color:
                          new Date(row.datetime) >= new Date
                              ? (theme) => theme.palette.success.main
                              : row.status === 'Pending',
                          borderRadius: '6px',
                          pl: '3px',
                          pr: '3px',
                        }}
                        size="small"
                        label={new Date(row.datetime) >= new Date ? 'Aktif' : 'Tidak Aktif'}
                      />
                    </TableCell>

                    <TableCell>
                        <Link to={`/schedule/${row._id}/edit`}>
                          <Button>

                            <Typography variant="h6">Edit</Typography>
                          </Button>
                        </Link>
                        
                        <Button onClick={() => window.open(`https://kjr.kampustsl.id/${row.slug}`, '_blank')}>
                            <Typography variant="h6">Lihat</Typography>
                        </Button>

                        
                        <Button onClick={() => copyId(row._id)}>
                            <Typography variant="h6">Get ID</Typography>
                        </Button>

                        <Button onClick={() => deleteRow(row._id)}>
                            <Typography variant="h6" color="error">Hapus</Typography>
                        </Button>



                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={7}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputprops: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Schedules;
