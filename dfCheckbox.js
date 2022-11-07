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


Element.prototype.dfCheckbox = function(options) {
    
    if (this.parentNode.classList.contains("_dfCheckbox_label")) return;
    
    const CHECKBOX = "&#10003;";
    var $CHK = this;

    var defaults = {
      size: "normal",
      side: "left",  //Checkbox is left-side of label
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
        checked: null,
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

    this.style.display = "none";
    
    var settings = (options !== null) ? _dfMergeDeep({}, defaults, options) : defaults;
    
    console.log(settings.disabledProps);

    var id = this.id || null;
      

    //Get Label Styles
    var labelStyles = [];
    if (settings.label.fontWeight !== null)
        labelStyles.push(`font-weight:${settings.label.fontWeight};`);

    if (settings.label.fontSize !== null) 
        labelStyles.push(`font-size:${settings.label.fontSize};`);

    if (settings.label.color !== null)
        labelStyles.push(`color:${settings.label.color};`);

    if (settings.label.backgroundColor !== null) 
        labelStyles.push(`background-color:${settings.label.backgroundColor}`);

    if (settings.label.padding !== null)
        labelStyles.push(`padding:${settings.label.padding};`);
    
    if (settings.label.margin !== null)
        labelStyles.push(`margin:${settings.label.margin};`);  

    if (settings.label.textDecoration !== null)
        labelStyles.push(`text-decoration:${settings.label.textDecoration};`);

    if (settings.label.fontFamily !== null)
        labelStyles.push(`font-family:${settings.label.fontFamily};`);

    var labelStyle = (labelStyles.length > 0) ? labelStyles.join("") : "";
    
    
    //Create the label
    const $LABEL = document.createElement("label");
    $LABEL.classList.add("_dfCheckbox_label");
    $LABEL.setAttribute("data-dfcid", id);
    $LABEL.setAttribute("style", "display:flex;width:auto;");

    const $TITLE = document.createElement("span");
    $TITLE.classList.add("_dfCheckbox_title");
    $TITLE.innerHTML = settings.label.title;
    $TITLE.setAttribute("style", labelStyle);

    $LABEL.append($TITLE);

    
    if (settings.disabledProps.disabled === true) {
      $LABEL.disabled = true;
      $LABEL.style.opacity= settings.disabledProps.opacity;
      $LABEL.style.cursor = settings.disabledProps.cursor;
    }
    else {
        $LABEL.disabled = false;
        $LABEL.style.opacity= "initial";
        $LABEL.style.cursor = settings.cursor;
    }
    
    //Wrap the checkbox inside the label
    //_dfCheckboxwrap(this, $LABEL);
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

    $LABEL.style.width = settings.width;

    if (settings.size == "small") {
        $TITLE.style.fontSize = "0.8em";
        $checkbox.style.width = "10px";
        $checkbox.style.height = "12px";
        $checkbox.style.fontSize = "8px";
        $uncheckbox.style.width = "10px";
        $uncheckbox.style.height = "12px";
        
    }
    else if (settings.size == "large") {
        $TITLE.style.fontSize = "1.05em";
        $checkbox.style.width = "14px";
        $checkbox.style.height = "16px";
        $checkbox.style.fontSize = "18px";
        $uncheckbox.style.width = "16px";
        $uncheckbox.style.height = "18px";
    }


    function DisplayCheck() {
        if ($CHK.checked === true) {
            $uncheckbox.style.display = "none";
            $checkbox.style.display = "block";
            
            $LABEL.classList.remove(settings.label.uncheckedClass);
            $TITLE.classList.remove(settings.label.uncheckedClass);
            $LABEL.classList.add(settings.label.checkedClass);
            $TITLE.classList.add(settings.label.checkedClass);   
        }
        else {
            $checkbox.style.display = "none";
            $uncheckbox.style.display = "block";           
            
            $LABEL.classList.remove(settings.label.checkedClass);
            $TITLE.classList.remove(settings.label.checkedClass);
            $LABEL.classList.add(settings.label.uncheckedClass);
            $TITLE.classList.add(settings.label.uncheckedClass);  
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
  
/*
var $chk = document.getElementById("chk");
$chk.dfCheckbox(
    { 
        size: "large",
        label: 
            { 
            color: "#990000",
            fontWeight: "bold"
        }
    }
);
*/
