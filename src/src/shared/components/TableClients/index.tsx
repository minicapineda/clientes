import { useState, useMemo, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { 
  Box, Paper, Typography, FormControl, InputLabel, 
  Select, MenuItem, Checkbox, ListItemText, OutlinedInput,
  Button, Stack 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddColumnModal } from '../AddColumnModal';
import type { GridColDef } from '@mui/x-data-grid';

interface ClientRow {
  id: number;
  [key: string]: any;
}

interface TableClientsProps {
  title?: string;
  initialRows?: ClientRow[];
  accentColor?: string;
}

const DEFAULT_ROWS = [
  { id: 1, nombre: 'Mónica', apellido: 'Villegas', profesion: 'Senior Developer', estado: 'Activo' },
  { id: 2, nombre: 'Financia', apellido: 'Crédito', profesion: 'Sistema', estado: 'Pendiente' },
  { id: 3, nombre: 'Juan', apellido: 'Pérez', profesion: 'Auditor', estado: 'Activo' },
  { id: 4, nombre: 'Elena', apellido: 'Gómez', profesion: 'Documentalista', estado: 'Inactivo' },
  { id: 5, nombre: 'Luis', apellido: 'Gómez', profesion: 'Documentalista', estado: 'Inactivo' },
];

export const TableClients = ({ 
  title = "💰 Gestión de Clientes",
  accentColor = "#4f46e5", 
  initialRows = DEFAULT_ROWS 
}: TableClientsProps) => {

  const [rows, setRows] = useState<ClientRow[]>(initialRows);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

 useEffect(() => {
 
  if (Array.isArray(initialRows)) {
    const validRows = initialRows.filter(row => typeof row === 'object' && row !== null);
    setRows(validRows);
  }
}, [initialRows]);


  useEffect(() => {
    if (rows.length > 0) {
      const generatedCols: GridColDef[] = Object.keys(rows[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex: 1,
        minWidth: 120,
        editable: true,
      }));
      setColumns(generatedCols);
      if (visibleFields.length === 0) {
        setVisibleFields(generatedCols.map(c => c.field));
      }
    }
  }, [rows]);

  const handleProcessRowUpdate = (newRow: ClientRow) => {
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const handleAddColumn = (name: string) => {
    const field = name.toLowerCase().trim().replace(/\s+/g, '_');
    if (columns.some(col => col.field === field)) return;
    
    const newCol: GridColDef = { field, headerName: name, width: 150, editable: true };
    setColumns([...columns, newCol]);
    setVisibleFields([...visibleFields, field]);
    setOpenModal(false); 
  };

  const columnsToShow = useMemo(() => 
    columns.filter(col => visibleFields.includes(col.field)), 
    [columns, visibleFields]
  );

  return (
    <Box sx={{ width: '100%', p: 3, boxSizing: 'border-box' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>

        <Typography variant="h4" sx={{ color: accentColor, fontWeight: 'bold' }}>
          {title}
        </Typography>

        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel>Columnas</InputLabel>
            <Select
              multiple
              value={visibleFields}
              onChange={(e) => setVisibleFields(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              input={<OutlinedInput label="Columnas" />}
              renderValue={(selected) => `${selected.length} visibles`}
            >
              {columns.map((col) => (
                <MenuItem key={col.field} value={col.field}>
                  <Checkbox checked={visibleFields.includes(col.field)} />
                  <ListItemText primary={col.headerName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenModal(true)} 
    
            sx={{ 
                bgcolor: accentColor, 
                '&:hover': { bgcolor: accentColor, filter: 'brightness(0.8)' } 
            }}
          >
            Nueva Columna
          </Button>
        </Stack>
      </Stack>

      <Paper elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <DataGrid
          rows={rows}
          columns={columnsToShow}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          processRowUpdate={handleProcessRowUpdate}
          autoHeight
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ 
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f8fafc',
            }
          }}
        />
      </Paper>

      <AddColumnModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onAdd={handleAddColumn} 
        buttonColor={accentColor} 
      />
    </Box>
  );
};

export default TableClients;