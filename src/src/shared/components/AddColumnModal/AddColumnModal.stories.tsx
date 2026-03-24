import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { AddColumnModal } from './index';
import { fn } from '@storybook/test';

const meta: Meta<typeof AddColumnModal> = {
  title: 'FinanciaCredito/Components/AddColumnModal',
  component: AddColumnModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    buttonColor: { control: 'color', description: 'Color del botón Crear' },
    title: { control: 'text', description: 'Título del Modal' },
    helperText: { control: 'text', description: 'Subtítulo o texto de ayuda' },
  },
  args: { 
    open: false, 
    onClose: fn(), 
    onAdd: fn(),
    title: 'Nueva Columna',
    buttonColor: '#4f46e5',
    helperText: 'Escribe el nombre de la columna que quieres añadir a la tabla.'
  },
};

export default meta;
type Story = StoryObj<typeof AddColumnModal>;

export const Interactiva: Story = {
  render: (args) => {
 
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box sx={{ textAlign: 'center', minHeight: '100px' }}>
        <Button 
          variant="contained" 
          onClick={() => setIsOpen(true)}
          sx={{ backgroundColor: args.buttonColor }}
        >
          Abrir {args.title}
        </Button>
        
        <AddColumnModal 
          {...args} 
          open={isOpen} 
          onClose={() => setIsOpen(false)} 
          onAdd={(name) => {
            args.onAdd(name);
            setIsOpen(false);
          }} 
        />
      </Box>
    );
  }
};

export const VistaPreviaAbierta: Story = {
  args: { 
    open: true,
  },
  parameters: {
    docs: { disable: true }, 
  },
};