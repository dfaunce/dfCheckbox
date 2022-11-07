# dfCheckbox
A javascript plugin for stylized checkboxes - Click label or checkbox to activate.<br>
*This plugin utilizes the built-in HTML checkbox to trigger checked/unchecked status*


## Required Libraries
- None *(If you wish to use an icon-library such as font-awesome, icomoon, material, etc... you may substitute that for checkbox icons)*

## Basic Usage
```
<input type="checkbox" id="mycheckbox" checked title="Click me to turn off and on"/>
```

```
const $chk = document.getElementById("mycheckbox");
$chk.dfCheckbox();
```

## Advanced Usage
Assume we want to create a checkbox element that is 
  - Large
  - Turns Red when OFF and Green when ON  *(The classes must define the correct styles in your stylesheet)*
  - Utilizes Icomoon icon library
  - Override the title of the label

```
const $chk = document.getElementById("mycheckbox");
$chk.dfCheckbox({
  size: "large",
  label: {
    title: "Click me to turn GREEN and RED",
    checkedClass: "turnGreen",
    uncheckedClass: "turnRed"
  },
  icons: {
    checked: "icon-checkbox-checked",
    unchecked: "icon-checkbox-unchecked"
  }
});
```

## Default Parameters
The following object depicts the default parameters that are used if the user does not declare parameters.
```
var defaults = {
      size: "normal",
      side: "left",  
      label: {
        title: this.getAttribute("title") || null,
        fontWeight: null,
        fontSize: null,
        color: null,
        backgroundColor: null,
        padding: null,
        margin: null,
        textDecoration: null,
        fontFamily: null,        
        checkedClass: null,
        uncheckedClass: null
      },
      icons: {
        checked: null,     //Default Checkbox is ASCII code: `&#10003;`
        unchecked: null
      },
      cursor: "pointer",
      disabledProps:  {
        disabled: this.disabled,
        cursor: "not-allowed",
        opacity: 0.7
      }, 
      width: "fit-content"
    };

```

### Parameters
 - **size:**  `[string]`      `"normal", "small", "large"`        *Changes the scale of the checkbox element*
 - **size:**  `[string]`      `"left", "right"`                   *Notates where the checkbox is in relation to the title label*
 - **label:** `[object]`
   - **title:** `[string]`    *Overrides the title of the checkbox (Note: You may initialize the title of the checkbox by including a title attribute)*
   - **fontWeight:** `[string]`
   - **fontSize:** `[string]`
   - **color:** `[string]`
   - **backgroundColor:** `[string]`
   - **padding:** `[string]`   *Controls the padding of the title/label of the checkbox*
   - **margin:** `[string]` *Controls the margin of the title/label of the checkbox*
   - **textDecoration:** `[string]`
   - **fontFamily:** `[string]`
   - **checkedClass:** `[string]`  *Apply a css class to the title/label when checkbox is checked*
   - **uncheckedClass:** `[string]` *Apply a css clas to the title/label when checkbox is UNCHECKED*
 - **icons** `[object]` *Only to be used in conjunction with an icon library - icon library is not required.*
   - **checked:** `[string]`  *Used with an icon library, notate the class for the "checked" status. (Default checkbox is ASCII &#10003;)*
   - **unchecked:** `[string]` *Used with an icon library, notate the class for the "unchecked" status.*
 - **cursor:** `[string]`    `css cursor, ie: "default", "pointer", "not-allowed", "cross-hair", ...` *Hovered cursor style of the dfCheckbox*
 - **disabledProps:** `[object]`   *What is visible when the checkbox is disabled.*
   - **disabled:**  `[bool]`  `true, false`  *Override the initial status of the checkbox* 
   - **cursor:** `[string]` *See previous property 'cursor' for more details*
   - **opacity:** `[float]`  `opacity > 0 <=> opacity < 1`  *Sets the opacity of the checkbox when it is disabled.*
 - **width:** `[string]`  *Sets the css style of the width of the dfCheckbox




