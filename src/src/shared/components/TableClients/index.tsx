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
import styles from "./tableclients.module.css";
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

export const TableClients = ({ 
  title = "💰 Gestión de Datos Dinámicos",
  accentColor = "#4f46e5",
  initialRows = [
    { id: 1, nombre: 'Mónica', apellido: 'Villegas', profesion: 'Developer' },
    { id: 2, nombre: 'Financia', apellido: 'Crédito', profesion: 'Sistema' },
  ] 
}: TableClientsProps) => {

  const [rows, setRows] = useState<ClientRow[]>(initialRows);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);


  useEffect(() => {
    if (rows.length > 0) {
      const generatedCols: GridColDef[] = Object.keys(rows[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex: 1,
        minWidth: 150,
        editable: true,
      }));
      setColumns(generatedCols);
      setVisibleFields(generatedCols.map(c => c.field));
    }
  }, [rows]);

  const handleProcessRowUpdate = (newRow: ClientRow) => {
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

  const columnsToShow = useMemo(() => 
    columns.filter(col => visibleFields.includes(col.field)), 
    [columns, visibleFields]
  );

  return (
    <Box className={styles.mainContainer} sx={{ width: '100%', p: { xs: 1, md: 3 }, boxSizing: 'border-box' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" className={styles.title} sx={{ color: accentColor }}>
          {title}
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
            sx={{ borderColor: accentColor, color: accentColor, '&:hover': { borderColor: accentColor } }}
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
          autoHeight
          sx={{ border: 'none' }}
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