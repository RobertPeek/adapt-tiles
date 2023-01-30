# adapt-tiles

**Tiles** is a *presentation component* which displays a set of images in a grid layout.

When a learner selects an image, text is displayed over the image.

## Settings Overview

The attributes listed below are used in *components.json* to configure **Tiles**, and are properly formatted as JSON in [*example.json*](https://github.com/RobertPeek/adapt-tiles/blob/master/example.json).

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `tiles`. (One word.)

**_classes** (string): CSS class name to be applied to **Tiles**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**instruction** (string): This optional text appears above the component. It is frequently used to guide the learner’s interaction with the component.  

**_columns** (number): This value determines the number of tiles in a row on the large device size. Any number of columns can be set however keep in mind the more columns there are the smaller the tiles will be.  

**_mobileColumns** (number): This value determines the number of tiles in a row on medium and small device sizes. Any number of columns can be set however keep in mind the more columns there are the smaller the tiles will be.  

**_mobileColumns** (number): This value determines the number of tiles in a row on medium and small device sizes. Any number of columns can be set however keep in mind the more columns there are the smaller the tiles will be.  

**_itemHeight** (number): This value determines the minimum height for the items.

**_itemMobileHeight** (number): This value determines the minimum height for the items when viewed on medium and small devices.

**_shouldDisplayAllItems** (boolean): If set to `true`, each item will stay visible after it has been selected. The default is `false`.   

**_items** (string): Multiple items may be created. Each item represents one tile for this component and contains values for **title**, **body**, **_backgroundColor**, and **_graphic**.  

>**title** (string): This is the title text for a tile.  

>**body** (string): This is the main text for a tile.  

>**_backgroundColor** (string): Defines the CSS background color in a hex code format.

>**_graphic** (object): This `_graphic` attributes group stores the graphic properties for the item. It contains values for **_src**, and **alt**.  

>>**_src** (string): File name (including path) of the image. Path should be relative to the *src* folder.

>>**alt** (string): This text becomes the image’s `alt` attribute.

### Accessibility
**Tiles** has a label assigned using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**. These labels are not visible elements. They are utilized by assistive technology such as screen readers. This label is included within the *example.json* and may need to be added to the _globals in *course.json*.

----------------------------
**Version number:**  1.0.0
**Framework versions:**  5.20.1+
**Author / maintainer:** Robert Peek
**Accessibility support:** WAI AA
**RTL support:** yes
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 11+12 for macOS+iOS, Opera
**Authoring tool support:** yes