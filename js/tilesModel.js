import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class TilesModel extends ItemsComponentModel {

  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _toggleSpeed: 200
    });
  }

  toggleItemsState(index) {
    const item = this.getItem(index);
    const previousActiveItem = this.getActiveItem();

    item.toggleActive();
    item.toggleVisited(true);

    if (previousActiveItem && !this.get('_shouldDisplayAllItems')) {
      previousActiveItem.toggleActive(false);
    }
  }
  
}
