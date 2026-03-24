import  { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Typography 
} from '@mui/material';

interface AddColumnModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export const AddColumnModal = ({ open, onClose, onAdd }: AddColumnModalProps) => {
  const [newColName, setNewColName] = useState('');

  const handleConfirm = () => {
    if (newColName.trim()) {
      onAdd(newColName);
      setNewColName(''); 
    }
  };

  const handleCancel = () => {
    setNewColName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Nueva Columna</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Escribe el nombre de la columna que quieres añadir a la tabla.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre de la Columna"
          fullWidth
          variant="outlined"
          value={newColName}
          onChange={(e) => setNewColName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleCancel} color="inherit">Cancelar</Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          disabled={!newColName.trim()}
          sx={{ backgroundColor: '#4f46e5' }}
        >
          Crear Columna
        </Button>
      </DialogActions>
    </Dialog>
  );
};