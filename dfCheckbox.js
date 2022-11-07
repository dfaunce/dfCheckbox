Element.prototype.dfCheckbox = function(options) {
    
    if (this.parentNode.classList.contains("_dfCheckbox_label")) return;
    
    const CHECKBOX = "&#10003;";
    var $CHK = this;

    var defaults = {
      size: "normal",
      sizeProps: {
        small: {
            checkbox: {
                width: "0.63em",
                height: "0.63em",
                fontSize: "0.43em",
                marginTop: "-1px"
            },
            label: {
                fontSize: "0.8em"
            }
        },
        large: {
            checkbox: {
                width: "0.88em",
                height: "1em",
                fontSize: "0.68em",
                marginTop: "initial"
            },
            label: {
                fontSize: "1.05em"
            }
        }
      },
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
    $checkbox.setAttribute("style", "padding:0px 1px;border:1px solid #ccc;width:12px;height:14px;text-align:center;margin-top:1px;");
    $checkbox.classList.add("_dfCheckbox_checked");      
    var $_checkbox = document.createElement("div");
    $_checkbox.setAttribute("style", "font-size:10px;font-weight:bold;");
    $_checkbox.innerHTML = CHECKBOX;    
    $checkbox.append($_checkbox);
    
    var $uncheckbox = document.createElement("div");
    $uncheckbox.setAttribute("style", "padding:0px 1px;border:1px solid #ccc;width:12px;height:14px;text-align:center;margin-top:1px;");
    $uncheckbox.classList.add("_dfCheckbox_unchecked");      
    var $_uncheckbox = document.createElement("div");    
    $uncheckbox.append($_uncheckbox);
      
    
    // Setting the checkbox orientation
    if (settings.side === "right") {
      $LABEL.append($checkbox);
      $LABEL.append($uncheckbox);
      $checkbox.style.marginLeft = "5px";
      $uncheckbox.style.marginLeft = "5px";
    }
    else {
      $LABEL.prepend($checkbox);
      $LABEL.prepend($uncheckbox);
      $checkbox.style.marginRight = "5px";
      $uncheckbox.style.marginRight = "5px";
    }

    //Setting the checkbox scale
    if (settings.size == "small" || settings.size == "large") {
        var $o = settings.sizeProps[settings.size];
        $TITLE.style.fontSize = $o.label.fontSize;
        $checkbox.style.width = $o.checkbox.width;
        $checkbox.style.height = $o.checkbox.height;
        $_checkbox.style.fontSize = $o.checkbox.fontSize;
        $_checkbox.style.marginTop = $o.checkbox.marginTop;

        $uncheckbox.style.width = $o.checkbox.width;
        $uncheckbox.style.height = $o.checkbox.height;
    }
   

    function DisplayCheck() {
        if ($CHK.checked === true) {
            $uncheckbox.style.display = "none";
            $checkbox.style.display = "block";  
        }
        else {
            $checkbox.style.display = "none";
            $uncheckbox.style.display = "block";
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
