import type { Meta, StoryObj } from '@storybook/react';
import { TableClients } from './index';

const meta: Meta<typeof TableClients> = {
  title: 'FinanciaCredito/Components/TableClients',
  component: TableClients,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    accentColor: { control: 'color' },
    title: { control: 'text' },
    initialRows: { control: 'object' } 
  },
  args: {
    title: '💰 Gestión de Datos Dinámicos',
    accentColor: '#4f46e5',
    initialRows: [
      { id: 1, maduro: 'Mónica', chavez: 'Villegas', uribe: 'Developer', petro: new Date() },
    
      
    ]
  }
};

export default meta;
type Story = StoryObj<typeof TableClients>;

export const Interactiva: Story = {};