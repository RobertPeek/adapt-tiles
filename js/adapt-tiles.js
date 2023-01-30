import components from 'core/js/components';
import TilesView from './tilesView';
import TilesModel from './tilesModel';

export default components.register('tiles', {
  model: TilesModel,
  view: TilesView
});
