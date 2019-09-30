![author](https://img.shields.io/badge/author-Marco%20Cusano-blue.svg) ![version](https://img.shields.io/badge/jQuery-3%2B-brightgreen.svg?logo=jquery) ![jquery-version](https://img.shields.io/badge/version-1.0-brightgreen.svg)

# jquery.editable
Let's start using any DOM as an input with data-types. Adding a **data-type** the plugin will automatically check the content allowing you to write and copy informations only onAllowed values. You can also bind an **editable** dom to an input, using `data-input`, to copy the editable dom data in the input value.

*Attributes listed [here](#attributes)*.


## Requirements
- jQuery 3+ (**[Download](https://jquery.com)**) .

## Initialization
Basic usage of **jquery.editable**:
```HTML
<p><span editable="true" data-type="price">0.00</span>€</p>
```
The plugin will automatically transform your element as [described here](https://developer.mozilla.org/it/docs/Web/Guide/HTML/Editable_content), into a standard `editableContent` element.
By defining the data-type to an element, you will allow the current element to receive specific values only, like a price (`0.00` or `0,00`), an email (`your@email.abc`), a link (`https://something.com`) etc.

You can also add a custom element after the first initialization, initializing it using the method `jQueryEditable(dom)`. Here two examples:
```HTML
<script src="jquery.editable.min.js"></script>
<!-- Element editable -->
<div id="container">
  <div id="ex1" editable="true" data-type="link"></div>
  <!-- Container with editable elements -->
  <div id="ex2">
    <p editable="true" data-type="textarea"></p>
    <p editable="true" data-type="number" data-min="0" data-max="5" data-input="myinputnumber">5</p>
      <input class="hide hidden" id="myinputnumber" type="number" value="5"></input>
    <p editable="true" data-type="link" data-input="myinputlink"></p>
      <input class="hide hidden" id="myinputlink" type="text"></input>
  </div>
</div>
<script>
  // Method 1
  jQueryEditable($("#ex1"));
  jQueryEditable($("#ex2"));
  // Method 2
  jQueryEditable($("#container"));
</script>
```

## Attributes
PARAMETER | DESCRIPTION
----------|------------
`data-content` | Force check content only in `data-content` value.
`data-max` | Define a maximum number (for **data-type**="number/double/price" only).
`data-max` | Define a minimum number (for **data-type**="number/double/price" only).
`data-onchange` | Execute a custom function on data change.
`data-onevent` | Setup a custom event.
`data-onfunction` | Execute a custom function on a defined custom event.
`data-type="<type>"` | `double`, `email`, `link`, `number`, `price`, __`text` *(**default**)*__, `textarea`.
`editable="true"`| Initialize an object as a standard text input.

## Examples

#### Standard `<p>` binbed to a text `<input>` element:
This kind of binding, allows you to copy everything you write in your `<p>` tag into the `<input>` element. Also works during a **POST** or a **GET** method.
```HTML
<p editable="true" data-input="myinput">You can also write content here, it will be copied when you will type something here.</p>
<input class="hide hidden" id="myinput" type="text" name="input-name" required></input>.
```

#### Standard `<div>` binded to an email `<input>` element:
This kind of binding, allows you to copy everything you write in your `<div>` into the `<input>` element. It will automatically check for a **@** and a **.**, to copy the data into the input value. Also works during a **POST** or a **GET** method, only if the check will result **true** as an email.
```HTML
<div editable="true" data-type="email" data-input="myinput">something@email.abc</div>
<input class="hide hidden" type="email" id="myinput" required></input>
```

#### Standard `<h1>` binded to a number `<input>` element, with a custom function:
This kind of binding, allows you to copy a number you write in your `<h1>` into the `<input>` element. It will automatically check for a number, with the defined `min` and `max` values. Also execute a custom function `my_function();`.
```HTML
<script>
  function my_function() {
    alert($("#myinput").val());
  }
</script>
<div class="container">
  <h1 id="myh1" editable="true" data-min="0" data-max="100" data-onchange="my_function" data-input="myinput">0</h1>%
  <input class="hide hidden" id="myinput" type="number" value="0"></input>
</div>
```

#### Call a custom event and a custom function
You can also call a custom event on an element, executing a custom function as in the following example:
```HTML
<script>
  function my_function() {
    alert($("#myinput").val());
  }
</script>
<div class="container">
  <p id="myp" editable="true" data-min="0" data-max="100" data-onevent="keyup" data-onfunction="my_function" data-input="myinput">0</p>%
  <input class="hide hidden" id="myinput" type="number" value="0"></input>
</div>
```

## Change Log
#### v1.0 (2019/09/26)
First release of jquery.editable
