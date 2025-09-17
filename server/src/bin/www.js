import config from 'config';
import app from '../app.js';

const port = config.get('port') || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}.`);
});
