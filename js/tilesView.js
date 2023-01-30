import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import ComponentView from 'core/js/views/componentView';

class TilesView extends ComponentView {

  events() {
    return {
      'click .js-tiles-item': 'onClick'
    };
  }

  initialize(...args) {
    super.initialize(...args);
  }

  preRender() {
    this.checkIfResetOnRevisit();

    this.model.resetActiveItems();

    this.listenTo(this.model.getChildren(), {
      'change:_isActive': this.onItemsActiveChange,
      'change:_isVisited': this.onItemsVisitedChange
    });

    this.listenTo(Adapt, 'device:changed', this.updateLayout);
    this.listenTo(Adapt, "device:resize", this.resizeHeight);
  }

  postRender() {
    this.$('.tiles__widget').imageready(this.setReadyStatus.bind(this));

    this.updateLayout();
    this.resizeHeight();
  }

  checkIfResetOnRevisit() {
    const isResetOnRevisit = this.model.get('_isResetOnRevisit');

    // If reset is enabled set defaults
    if (isResetOnRevisit) {
      this.model.reset(isResetOnRevisit);
    }
  }

  resizeHeight() {
    let imageHeight = 0;
    let bodyHeight = 0;
    let titleHeight = 0;
    let bodyPadding = 0;
    let titlePadding = 0;

    const $element = this.$('.tiles-item');
    // Reset
    $element.find('.tiles-item__body-inner').css('min-height', "");
    $element.find('.tiles-item__title-inner').css('min-height', "");

    const numItems = $element.length;

    let imageArray = [];
    let bodyArray = [];
    let titleArray = [];

    for (let i = 0; i < numItems; i++) {
      imageArray[i] = this.$('[data-index="' + i + '"]').find('.tiles-item__image').height();

      if (imageArray[i] > imageHeight) {
        imageHeight = imageArray[i];
      }
    }

    for (let i = 0; i < numItems; i++) {
      bodyArray[i] = this.$('[data-index="' + i + '"]').find('.tiles-item__body-inner').height();

      if (bodyArray[i] > bodyHeight) {
        bodyHeight = bodyArray[i];
      }
    }

    for (let i = 0; i < numItems; i++) {
      if (this.$('[data-index="' + i + '"]').hasClass('title-enabled')) {
        titlePadding = this.$('[data-index="' + i + '"]').find('.tiles-item__title').outerHeight() - this.$('[data-index="' + i + '"]').find('.tiles-item__title').height();
        titleArray[i] = this.$('[data-index="' + i + '"]').find('.tiles-item__title-inner').height();

        if (titleArray[i] > titleHeight) {
          titleHeight = titleArray[i];
        }
      }
    }

    bodyPadding = this.$('[data-index="0"]').find('.tiles-item__body').outerHeight() - this.$('[data-index="0"]').find('.tiles-item__body').height();

    $element.find('.tiles-item__body-inner').css('min-height', bodyHeight);
    $element.find('.tiles-item__title-inner').css('min-height', titleHeight);

    const totalHeight = bodyHeight + titleHeight + bodyPadding + titlePadding;

    let itemMinHeight = this.model.get('_itemMobileHeight');

    if (device.screenSize === 'large') {
      itemMinHeight = this.model.get('_itemHeight');
    }

    if (totalHeight > itemMinHeight) {
      $element.find('.tiles-item__image').css('min-height', totalHeight);
    } else {
      $element.find('.tiles-item__image').css('min-height', itemMinHeight);
    }
  }

  onClick(event) {
    event.preventDefault();

    this.model.toggleItemsState($(event.currentTarget).parent().data('index'));
  }

  updateLayout() {
    const columns = this.model.get('_columns');
    const mobileColumns = this.model.get('_mobileColumns');

    if (device.screenSize === 'large') {
      if (columns) {
        this.$('.tiles-item').css('width', (100 / columns) + '%');
      } else {
        this.$('.tiles-item').css('width', '100%');
      }
    } else {
      if (mobileColumns) {
        this.$('.tiles-item').css('width', (100 / mobileColumns) + '%');
      } else {
        this.$('.tiles-item').css('width', '100%');
      }
    }
  }

  onItemsActiveChange(item, isActive) {
    this.toggleItem(item, isActive);
  }

  toggleItem(item, shouldExpand) {
    const $item = this.getItemElement(item);
    const $body = $item.find('.tiles-item__body');

    $item.children('.tiles-item__container')
      .toggleClass('selected', shouldExpand)
      .attr('aria-expanded', shouldExpand);

    if (!shouldExpand && !this.model.get('_shouldDisplayAllItems')) {
      $body.css('opacity', 0);
      return;
    }

    $body.css('opacity', 1);
  }

  getItemElement(item) {
    const index = item.get('_index');

    return this.$('.tiles-item').filter('[data-index="' + index + '"]');
  }

  onItemsVisitedChange(model, _isVisited) {
    if (!_isVisited) return;
    const $item = this.getItemElement(model);

    // Append the word 'visited' to the item's aria-label
    const visitedLabel = this.model.get('_globals')._accessibility._ariaLabels.visited + '.';
    $item.find('.aria-label').each(function(index, ariaLabel) {
      ariaLabel.innerHTML += ' ' + visitedLabel;
    });

    $item.addClass('is-visited');
  }
}

TilesView.template = 'tiles';

export default TilesView;
