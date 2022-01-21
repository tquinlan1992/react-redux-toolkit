import MaterialUiDrawer from '@mui/material/Drawer';

export const Drawer = ({ onClose }: { onClose: () => void }) => (
  <MaterialUiDrawer anchor={'left'} open={true} onClose={onClose}>
    Drawer
  </MaterialUiDrawer>
);
