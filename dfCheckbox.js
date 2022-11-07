/*
    Title:  dfCheckbox.js
    Author: David Faunce,
    Date:   2022-11-07
    Rev:    0.0.0.5
    Requirements: N/A
    Usage:
        document.getElementById("mycheckbox").dfCheckbox();
*/
Element.prototype.dfCheckbox = function(options) {
    
    if (this.parentNode.classList.contains("_dfCheckbox_label")) return;
    
    const CHECKBOX = "&#10003;";
    var $CHK = this;

    var defaults = {
      size: null,
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
      side: "left",
      title: this.getAttribute("title") || null,  
      labelStyles: {
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
      cursor: "pointer",     
      width: "fit-content"
    };

    const small = {
        checkbox: {
            width: "0.52em",
            height: "0.63em",
            fontSize: "0.43em",
            marginTop: "0.08em",
            separation: "0.3em"
        },
        label: {
            fontSize: "0.8em",
            fontWeight: "600"
        }
    };
    const normal = {
        checkbox: {
            width: "0.7em",
            height: "0.81em",
            fontSize: "0.55em",
            marginTop: "0px",
            separation: "0.5em"
        },
        label: {
            fontSize: "1em",
            fontWeight: "600"
        }
    };
    const lg = {
        checkbox: {
            width: "0.88em",
            height: "1em",
            fontSize: "0.68em",
            marginTop: "0.2em",
            separation: "0.6em"
        },
        label: {
            fontSize: "1.25em",
            fontWeight: "400"
        }
    };
    const xlg = {
        checkbox: {
            width: "1.2em",
            height: "1.3em",
            fontSize: "0.9em",
            marginTop: "0.36em",
            separation: "0.8em"
        },
        label: {
            fontSize: "1.9em",
            fontWeight: "400"
        }
    };

    function _dfIsObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    function _dfMergeDeep(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();
        if (_dfIsObject(target) && _dfIsObject(source)) {
            for (const key in source) {
                if (_dfIsObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                _dfMergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return _dfMergeDeep(target, ...sources);
    }
    


    this.style.display = "none";    
    var settings = (options !== null) ? _dfMergeDeep({}, defaults, options) : defaults;    
    var id = this.id || null;      
    
    //Create the label
    const $LABEL = document.createElement("label");
    $LABEL.classList.add("_dfCheckbox_label");
    $LABEL.setAttribute("data-dfcid", id);
    $LABEL.setAttribute("style", "display:flex;width:auto;");
    $LABEL.style.cursor = settings.cursor;

    const $TITLE = document.createElement("span");
    $TITLE.classList.add("_dfCheckbox_title");
    $TITLE.innerHTML = settings.title;

    //Setting the Title CSS Style Properties
    Object.keys(settings.labelStyles).forEach(key => {
        if (settings.labelStyles[key] != null) {
         $TITLE.style[key] = settings.labelStyles[key];
        }
     });

    $LABEL.append($TITLE);

     
    //Setting Label Width
    $LABEL.style.width = settings.width;
    
    //Wrap the checkbox inside the label
    this.parentNode.insertBefore($LABEL, this);
    $LABEL.appendChild(this);

    //Create the CHECKBOX and UNCHECKED BOX
    var $checkbox = document.createElement("div");
    $checkbox.setAttribute("style", "padding:0px 1px;border:1px solid #ccc;width:12px;height:14px;text-align:center;");
    $checkbox.classList.add("_dfCheckbox_checked");      
    var $_checkbox = document.createElement("div");
    $_checkbox.setAttribute("style", "font-size:10px;font-weight:bold;");
    $_checkbox.innerHTML = CHECKBOX;    
    $checkbox.append($_checkbox);
    
    var $uncheckbox = document.createElement("div");
    $uncheckbox.setAttribute("style", "padding:0px 1px;border:1px solid #ccc;width:12px;height:14px;text-align:center;");
    $uncheckbox.classList.add("_dfCheckbox_unchecked");      
    var $_uncheckbox = document.createElement("div");    
    $uncheckbox.append($_uncheckbox);
      
    

    var $o;

    if (settings.size === null) {
        console.log("sizeprops!");
        $o = settings.sizeProps;
    }
    else {
        switch(settings.size) {
            case "small":
                $o = small;
                console.log("small");
                break;
            case "large":
                $o = lg;
                console.log("large");
                break;
            case "xlarge":
                $o = xlg;
                console.log("x-large");
                break;
            case "normal":
            default:
                $o = normal;
                console.log("normal");
                break;
        }
        console.log("");
    }

    console.log($o);

    //Setting the checkbox scale
    $TITLE.style.fontSize = $o.label.fontSize;
    $checkbox.style.width = $o.checkbox.width;
    $checkbox.style.height = $o.checkbox.height;
    
    $checkbox.style.marginTop = $o.checkbox.marginTop;

    $_checkbox.style.fontSize = $o.checkbox.fontSize;
    $_checkbox.style.fontWeight = $o.checkbox.fontWeight;

    $uncheckbox.style.width = $o.checkbox.width;
    $uncheckbox.style.height = $o.checkbox.height;
    $uncheckbox.style.marginTop = $o.checkbox.marginTop;
   

        // Setting the checkbox orientation
        if (settings.side === "right") {
            $LABEL.append($checkbox);
            $LABEL.append($uncheckbox);
            $checkbox.style.marginLeft = $o.checkbox.separation;
            $uncheckbox.style.marginLeft =  $o.checkbox.separation;
          }
          else {
            $LABEL.prepend($checkbox);
            $LABEL.prepend($uncheckbox);
            $checkbox.style.marginRight =  $o.checkbox.separation;
            $uncheckbox.style.marginRight = $o.checkbox.separation;
          }
      


    var c = settings.checkedClass != null && settings.checkedClass.length > 0;
    var u = settings.uncheckedClass != null && settings.uncheckedClass.length > 0;


    function DisplayCheck() {
        if ($CHK.checked === true) {
            $uncheckbox.style.display = "none";
            $checkbox.style.display = "block";
            if (c) {
                if (u) {
                    $LABEL.classList.remove(settings.uncheckedClass);
                    $TITLE.classList.remove(settings.uncheckedClass);
                }                
                $LABEL.classList.add(settings.checkedClass);         
                $TITLE.classList.add(settings.checkedClass);     
                $checkbox.classList.add(settings.checkedClass);  
            }
        }
        else {
            $checkbox.style.display = "none";
            $uncheckbox.style.display = "block";
            if (u) {
                if (c) {
                    $LABEL.classList.remove(settings.checkedClass);
                }                
                $LABEL.classList.add(settings.uncheckedClass);
                $TITLE.classList.add(settings.uncheckedClass);
                $uncheckbox.classList.add(settings.uncheckedClass);  
            }           
        }
    }
    function CheckboxClicked() {
        if ($LABEL.disabled === true)  return;
        DisplayCheck();
    }
    $CHK.addEventListener("click", CheckboxClicked);
    $LABEL.addEventListener("click", CheckboxClicked);

    DisplayCheck();
  }
