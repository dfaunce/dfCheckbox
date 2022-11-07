# dfCheckbox
A pure javascript plugin for stylized checkboxes - Click label or checkbox to activate instead of clicking directly on the checkbox element.<br>Browser must be ES6 compatible.<br>

## Required Libraries
- None

## Basic Usage
```
<input type="checkbox" id="mycheckbox" checked title="Click me to turn off and on"/>
```

```
const $chk = document.getElementById("mycheckbox");
$chk.dfCheckbox();
```

## Advanced Usage
Assume we want to create a checkbox element that: 
  - Is Large
  - Turns Red when OFF and Green when ON  *(The classes must define the correct styles in your stylesheet)*
  - Overrides the title of the label

```
const $chk = document.getElementById("mycheckbox");
$chk.dfCheckbox({
  size: "large",
  checkedClass: "turnGreen",
  uncheckedClass: "turnRed",
  title: "I'm overriding this title!"
});
```

## Default Parameters
The following object depicts the default parameters that are used if the user does not declare parameters.

*Note: if defaults.size is NULL then the code defaults to defaults.sizeProps
```
var defaults = {
      title: this.getAttribute("title") || null,
      size: null,
      side: "left",
      sizeProps: {
        checkbox: {
            width: "0.7em",
            height: "0.81em",
            fontSize: "0.55em",
            marginTop: "0.13em",
            separation: "0.43em"
        },
        label: {
            fontSize: "1em",
            fontWeight: "600"
        }
      },
      checkedClass: null,
      uncheckedClass: null,        
      labelStyles: {
        fontWeight: null,
        fontSize: null,
        color: null,
        backgroundColor: null,
        padding: null,
        margin: null,
        textDecoration: null,
        fontFamily: null
      },
      cursor: "pointer",     
      width: "fit-content"
};

```

### Parameters
 - **title:**  `[string]`  *Sets the title of the checkbox. This overrides the "title" property inside the input element*
 - **size:**  `[string]`      `"normal", "small", "large", "xlarge"`        *Changes the scale of the checkbox element. If this is null, code defaults to `sizeProps`*
 - **side:**  `[string]`      `"left", "right"`                   *Notates where the checkbox is in relation to the title label*
 - **sizeProps:** `[object]`   
   - **checkbox:** `[object]`   *object of properties for styling the checkbox*
     - **width:** `[string]`    *width of the checkbox*
     - **height:** `[string]`   *height of the checkbox*
     - **fontSize:**  `[string]`  *size of the checkmark*
     - **marginTop:**  `[string]`
     - **separation:** `[string]`  `ie: "5px" or "0.3em"`   *the distance between the text label and the checkbox*
   - **label** `[object]`  *object properties for styling the text label*
     - **fontSize:** `[string]`
     - **fontWeight:** `[string]`
 - **checkedClass:** `[string]`  *Apply a css class to the title/label when checkbox is checked*
 - **uncheckedClass:** `[string]` *Apply a css clas to the title/label when checkbox is UNCHECKED*
 - **labelStyles:** `[object]`   *For styling the text label*<br>
   ***Any javascript notated stylings such as:***
   - **fontWeight:** `[string]`
   - **fontSize:** `[string]`
   - **color:** `[string]`
   - **backgroundColor:** `[string]`
   - **padding:** `[string]`
   - **margin:** `[string]` 
 - **cursor:** `[string]`    `css cursor, ie: "default", "pointer", "not-allowed", "cross-hair", ...` *Hovered cursor style of the dfCheckbox*
 - **width:** `[string]`  *Sets the css style of the width of the dfCheckbox*
