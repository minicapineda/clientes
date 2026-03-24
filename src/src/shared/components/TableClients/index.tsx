import { useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales'; // Traducción oficial
import { 
  Box, Paper, Typography, FormControl, InputLabel, 
  Select, MenuItem, Checkbox, ListItemText, OutlinedInput,
  Button, Stack 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddColumnModal } from '../AddColumnModal';
import styles from "./tableclients.module.css";
import type { GridColDef } from '@mui/x-data-grid';

const INITIAL_COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'Factura #', width: 120 },
  { field: 'cliente', headerName: 'Cliente', flex: 1, minWidth: 200, editable: true },
  { field: 'monto', headerName: 'Total', type: 'number', width: 150, editable: true },
  { field: 'estado', headerName: 'Estado', width: 150, editable: true },
  { field: 'test', headerName: 'test', width: 150, editable: true },
  { field: 'apellido', headerName: 'apellido', width: 150, editable: true },
];

export const TableClients = () => {
  const [columns, setColumns] = useState<GridColDef[]>(INITIAL_COLUMNS);
  const [rows, setRows] = useState(rows_ejemplo);
  const [visibleFields, setVisibleFields] = useState<string[]>(INITIAL_COLUMNS.map(c => c.field));
  const [openModal, setOpenModal] = useState(false);
  const handleProcessRowUpdate = (newRow: any) => {
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const handleAddColumn = (name: string) => {
    const technicalField = name.toLowerCase().trim().replace(/\s+/g, '_');
    
    if (columns.some(col => col.field === technicalField)) {
      alert("Esta columna ya existe");
      return;
    }

    const newColumn: GridColDef = {
      field: technicalField,
      headerName: name,
      width: 150,
      editable: true
    };

    setColumns([...columns, newColumn]);
    setVisibleFields([...visibleFields, technicalField]);
    setOpenModal(false); 
  };

  const columnsToShow = columns.filter(col => visibleFields.includes(col.field));

  return (
    <Box className={styles.mainContainer} sx={{ width: '100%', p: { xs: 1, md: 3 }, boxSizing: 'border-box' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" className={styles.title}>
          💰 Gestión de Facturas
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ width: 220 }}>
            <InputLabel>Columnas Visibles</InputLabel>
            <Select
              multiple
              value={visibleFields}
              onChange={(e) => setVisibleFields(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              input={<OutlinedInput label="Columnas Visibles" />}
              renderValue={(selected) => `${selected.length} seleccionadas`}
            >
              {columns.map((col) => (
                <MenuItem key={col.field} value={col.field}>
                  <Checkbox checked={visibleFields.indexOf(col.field) > -1} />
                  <ListItemText primary={col.headerName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="outlined" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenModal(true)} 
            className={styles.addButton}
          >
            Añadir Columna
          </Button>
        </Stack>
      </Stack>

      <Paper elevation={4} className={styles.tablePaper}>
        <DataGrid
          rows={rows}
          columns={columnsToShow}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          processRowUpdate={handleProcessRowUpdate}
          disableRowSelectionOnClick
          autoHeight={false}
          sx={{ border: 'none' }}
        />
      </Paper>

      <AddColumnModal
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onAdd={handleAddColumn} 
      />
    </Box>
  );
};

const rows_ejemplo = [
  { id: 'INV-001', cliente: 'Mónica Villegas', monto: 150000, estado: 'Pagada', test: 'amarilla', apellido: 'villegas'},
  { id: 'INV-002', cliente: 'Tienda Central', monto: 85000, estado: 'Pendiente', test: 'amarilla', apellido: 'villegas' },
];

export default TableClients;