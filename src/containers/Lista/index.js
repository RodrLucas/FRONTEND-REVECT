import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
// import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import api from '../../services/api'
import { Container } from './styles'
import formatDate from '../../utilities/formatDate'
import { Button } from '@mui/material'

import { useHistory } from 'react-router-dom'

function ShowAllCostumersAndUpdate () {
  const [customers, setCustomers] = useState([])
  const [rows, setRows] = useState([])
  const { push } = useHistory()

  useEffect(() => {
    async function loadCustomers () {
      const response = await api.get('customer')
      const arrCustomers = response.data
      setCustomers(arrCustomers)
    }

    loadCustomers()
  }, [])

  function editCustomer (customer) {
    push('edit', { customer })
  }

  const columns = [
    { id: 'id', label: 'Customer_ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'cpf', label: 'CPF', minWidth: 170 },
    { id: 'genre', label: 'Gênero', minWidth: 170 },
    { id: 'birth', label: 'Nascimento', minWidth: 170 },
    { id: 'cellPhone', label: 'Celular', minWidth: 170 },
    { id: 'occupation', label: 'Profissão', minWidth: 170 },
    { id: 'street', label: 'Avenida / Rua', minWidth: 170 },
    { id: 'number', label: 'Número', minWidth: 170 },
    { id: 'complement', label: 'Complemento', minWidth: 170 },
    { id: 'district', label: 'Bairro', minWidth: 170 },
    { id: 'city', label: 'Cidade', minWidth: 170 },
    { id: 'state', label: 'Estado', minWidth: 170 },
    { id: 'country', label: 'País', minWidth: 170 },
    { id: 'postalCode', label: 'CEP', minWidth: 170 },
    { id: 'createdAt', label: 'Criado em', minWidth: 170 },
    { id: 'updatedAt', label: 'Atualizado em', minWidth: 170 },
    { id: 'edit', label: 'Editar', minWidth: 170 }
  ]

  function createData (customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      genre: customer.genre,
      birth: formatDate(customer.birth),
      cellPhone: customer.cell_phone,
      occupation: customer.occupation,
      street: customer.street,
      number: customer.number,
      complement: customer.complement,
      district: customer.district,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      postalCode: customer.postal_code,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      edit: <Button onClick={() => editCustomer(customer)} variant="contained">Editar</Button>
    }
  }

  useEffect(() => {
    const newRows = customers.map(customer => createData(customer))
    setRows(newRows)
  }, [customers])

  return (
    <Container>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell style={{ color: '#000000' }} key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}
  </Paper>
  </Container>
  )
}

export default ShowAllCostumersAndUpdate
