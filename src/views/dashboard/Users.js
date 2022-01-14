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
import { useParams } from 'react-router-dom';

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
    title: 'Jadwal',
  },
  {
    title: 'Daftar Peserta',
  },
];

const Users = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [page, setPage] = React.useState(0)
  const [schedule, setSchedule] = React.useState({
    name: "",
    facilitator: ""
  })
  const params = useParams()

  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function fetchUsers() {
    http.get(`admin/${params.slug}/users`, {params: {
        page: page+1,
        per_page: rowsPerPage
    }}).then((response) => {
        setUsers(response.data.data)
        setTotal(response.data.meta.total)
        setSchedule(response.data.meta.schedule)
    })
  }

  React.useEffect(() => {
    if (users.length > 0)
        setUsers([])

    if (params.slug)
    fetchUsers()
  }, [page, rowsPerPage, params.slug])

  const deleteRow = (_id) => {
    if (window.confirm("Hapus?"))
    http.delete(`admin/user/${_id}`).then(() => {
      fetchUsers()
    })
  }

  return (
    <PageContainer title="Jadwal Kajian" description="this is Pagination Table page">
      {/* breadcrumb */}
      <Breadcrumb title={schedule.name.concat(' - ').concat(schedule.facilitator)} items={BCrumb} />
      {/* end breadcrumb */}
      <Card>

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
                    <Typography variant="h5">Ikhwan/Akhwat</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Usia</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Email</Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="h5">Whatsapp</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h5">Domisili</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Hadir</Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="h5">Kendaraan</Typography>
                  </TableCell>

                  
                  <TableCell>
                    <Typography variant="h5">Opsi</Typography>
                  </TableCell>

                  

                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
                  <TableRow key={index.toString()}>
                    <TableCell>
                      <a href={`https://kjr.kampustsl.id/detail/${row._id}`} target="_blank" rel="noreferrer">
                        <Typography color="textPrimary" variant="h5">{row.name}</Typography>
                      </a>
                    </TableCell>
                    
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.gender}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                      {row.age} Tahun
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.email}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.whatsapp}
                      </Typography>
                    </TableCell>


                    <TableCell>
                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.city}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          backgroundColor:
                          row.present_at
                              ? (theme) => theme.palette.success.light
                              : row.status === 'Pending',
                          color:
                          row.present_at
                              ? (theme) => theme.palette.success.main
                              : row.status === 'Pending',
                          borderRadius: '6px',
                          pl: '3px',
                          pr: '3px',
                        }}
                        size="small"
                        label={row.present_at ? 'Hadir' : '-'}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.transport}
                      </Typography>
                    </TableCell>

                    <TableCell>
                        
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

export default Users;
